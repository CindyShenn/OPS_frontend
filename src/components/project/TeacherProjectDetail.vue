<template>
  <PageHeader content="实验详情"></PageHeader>
  <div id="teacher-project-detail">
    <div id="body" class="flex align-center justify-center">
      <div class="container">
        <div id="section" class="flex flex-column align-center justify-center">
          <ProjectContent
              :title="title"
              :dead_line="dead_line"
              :attachment-url="attachmentUrl"
              :description="description"
              :created_at="created_at">
          </ProjectContent>
          <div id="user-operation">
            <div id="user-operation-content" style="padding: 10px 20px 20px">
              <el-tabs v-model="activeName" @tab-click="handleTabClick" stretch="true">
                <el-tab-pane label="作业完成情况" name="finish_situation">
                  <el-table
                      :data="homework_records"
                      style="width: 100%">
                    <el-table-column
                        prop="stu_num"
                        label="学生编号">
                    </el-table-column>
                    <el-table-column
                        prop="stu_real_name"
                        label="学生姓名">
                    </el-table-column>
                    <el-table-column
                        label="完成情况">
                      <template #default="scope">
                        <el-tag v-if="scope.row.is_finish == 1" type="success">已完成</el-tag>
                        <el-tag v-if="scope.row.is_finish == 0" type="danger">未开始</el-tag>
                        <el-tag v-if="scope.row.is_finish == 2" type="warning">进行中</el-tag>
                      </template>
                    </el-table-column>
                    <el-table-column
                        prop="coding_time"
                        label="编码时长(min)">
                    </el-table-column>
                    <el-table-column
                        label="查看代码"
                        width="200">
                      <template #default="scope">
                        <div class="flex flex-row">
                          <el-button :disabled="true ? scope.row.finish_stat == 0:false" size="mini" type="primary" @click="checkCode(scope.row.stu_id)">查看
                          </el-button>
                          <el-button :disabled="true ? scope.row.finish_stat == 0:false" size="mini" type="primary" @click="checkCodeQuick(scope.row.stu_id)">快速查看
                          </el-button>
                          <el-dialog title="快速查看学生代码" v-model="QuickCheckCodeDialogVisible" width="90%" fullscreen=true>
                            <QuickCheckCode
                              :content="content"
                              :fileNode="fileNode">
                            </QuickCheckCode>
                          </el-dialog>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                        label="实验报告">
                      <template #default="scope">
                        <el-button :disabled="true ? scope.row.report_url == '':false" size="small" type="primary" @click="checkReport(scope.row.report_url)">查看
                        </el-button>
                      </template>
                    </el-table-column>
                    <el-table-column
                        label="实验评语">
                      <template #default="scope">
                        <el-button type="text" style="margin-left: 10px" @click="projectComment(scope.row.stu_id)">评语</el-button>
                        <el-dialog title="实验评语" v-model="commentDialogVisible">
                          <el-form :model="comment_form" :rules="comment_rules">
                            <el-form-item prop="comment">
                              <el-input
                                  type="textarea"
                                  placeholder="请输入内容"
                                  v-model="project_comment"
                                  maxlength="200"
                                  show-word-limit
                              >
                              </el-input>
                            </el-form-item>
                          </el-form>
                          <template #footer>
    <span class="dialog-footer">
      <el-button @click="commentDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="modifyComment(scope.row.stu_id)">确 定</el-button>
    </span>
                          </template>
                        </el-dialog>
                      </template>
                    </el-table-column>
                    <el-table-column
                        label="实验评分">
                      <template #default="scope">
                        <el-tag>{{ scope.row.score }}</el-tag>
                        <el-button type="text" style="margin-left: 10px" @click="gradeDialogVisible=true">修改</el-button>
                        <el-dialog title="修改成绩" v-model="gradeDialogVisible">
                          <el-form :model="grade_form" :rules="grade_rules">
                            <el-form-item label="成绩：" :label-width="formLabelWidth" prop="grade">
                              <el-input
                                  type="text"
                                  placeholder="请输入成绩"
                                  v-model="grade"
                                  maxlength="3"
                                  clearable>
                              </el-input>
                            </el-form-item>
                          </el-form>
                          <template #footer>
    <span class="dialog-footer">
      <el-button @click="gradeDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="modifyGrade(scope.row.stu_id)">确 定</el-button>
    </span>
                          </template>
                        </el-dialog>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-tab-pane>
                <el-tab-pane label="代码查重" name="code_plagiarism">
                  <div class="flex justify-between">
                    <div style="text-align: center;color: #dd6161;font-size: 15px">* 请勿频繁刷新代码抄袭情况！</div>
                    <el-button icon="el-icon-refresh-right" @click="getPlagiarism" :loading="loading">刷新</el-button>
                  </div>
                  <div id="plagiarism">
                    <el-table
                        :data="plagiarism_records"
                        style="width: 100%">
                      <el-table-column
                          prop="real_name_1"
                          label="学生1姓名">
                      </el-table-column>
                      <el-table-column
                          prop="num_1"
                          label="学生1学号">
                      </el-table-column>
                      <el-table-column
                          label="学生2姓名"
                          prop="real_name_2">
                      </el-table-column>
                      <el-table-column
                          prop="num_2"
                          label="学生2学号">
                      </el-table-column>
                      <el-table-column
                          prop="similarity"
                          label="代码相似度">
                      </el-table-column>
                      <el-table-column
                          label="查看详情">
                        <template #default="scope">
                          <el-button @click="enterPlagiarism(scope.row.url)" type="text">查看</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="编译失败日志收集" name="compile_error_log">
                  <div id="log-error" class="flex flex-column">
                    <div class="refresh flex justify-flex-end">
                      <el-button icon="el-icon-refresh-right" @click="getLogs">刷新</el-button>
                    </div>
                    <div class="logs flex">
                      {{ logs }}
                    </div>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="修改实验信息" name="modify_project">
                  <el-form :model="project_form" :rules="project_rules" :label-position="top" label-width="80px">
                    <el-form-item label="实验标题" prop="title">
                      <el-input v-model="project_form.title" autocomplete="off" placeholder="请输入实验标题"></el-input>
                    </el-form-item>
                    <el-form-item label="实验描述" prop="content">
                      <el-input v-model="project_form.content" autocomplete="off" placeholder="请输入实验描述"></el-input>
                    </el-form-item>
                    <el-form-item label="截止日期" prop="deadLine">
                      <el-input v-model="project_form.deadLine" autocomplete="off" placeholder="请输入实验截止日期"></el-input>
                    </el-form-item>
                    <el-form-item label="上传附件" prop="attachmentUrl" style="margin-top: 40px">
                      <UploadRar v-on:getUrl="getProjectUploadUrl"></UploadRar>
                    </el-form-item>
                  </el-form>
                  <el-button type="primary" @click="modify">确认修改</el-button>
                  <el-button type="danger" @click="deleteProject" style="margin-left: 30px">删除该实验</el-button>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProjectContent from "./ProjectContent.vue";
import UploadRar from "../common/UploadAttachment.vue";
import {ElMessage} from "element-plus";
import QuickCheckCode from "../teacher_op/QuickCheckCode.vue";

export default {
  name: "TeacherProjectDetail",
  components: {ProjectContent, UploadRar, QuickCheckCode},
  data() {
    return {
      title: '',
      dead_line: '',
      attachmentUrl: '',
      description: '',
      created_at: '',

      lab_id: '',

      loading:'false',

      logs: 'no data',

      ideUrl:'',

      activeName: 'finish_situation',

      project_comment:'',

      gradeDialogVisible: false,
      QuickCheckCodeDialogVisible:false,
      commentDialogVisible:false,

      formLabelWidth:'80px',

      grade: '',

      grade_form:{
        grade:''
      },

      comment_form:{
        comment:''
      },

      grade_rules: {
        grade:[
          { required: true, message: '请输入成绩', trigger: 'blur' },
        ],
      },

      comment_rules:{
        comment:[
          { required: true, message: '请输入评语', trigger: 'blur' },
        ],
      },

      project_form: {
        title: '',
        content: '',
        attachmentUrl: '',
        deadLine: '',
      },
      project_rules: {
        title: [
          {required: true, message: '请输入实验标题', trigger: 'blur'},
        ],
        content: [
          {required: true, message: '请输入实验描述', trigger: 'blur'},
        ],
      },

      homework_records: [
        {
          user_id: '001',
          real_name: '王小明',
          num: '123',
          report_url: 'http://www.baidu.com',
          finish_stat: 0,
          coding_time: 123,
        }
      ],
      plagiarism_records: [],

      fileNode:{
        Name:'name1',
        IsDir:true,
        Content:'content1',
        ChildNode:[{
          Name:'name2',
          IsDir:false,
          Content:'content2',
          ChildNode: {}
        }]
      },
      content:{},


    }
  },
  mounted() {
    // 获取实验id
    this.lab_id = this.$route.params.id

    // 获取实验详情
    this.axios({
      method: "get",
      url: "/web/lab/" + this.lab_id,
      params: {},
    }).then((res) => {
      console.log(res)
      this.title = res.data.data.title;
      this.created_at = res.data.data.created_at;
      this.dead_line = res.data.data.dead_line == null ? '无' : res.data.dead_line;
      this.description = res.data.data.content;
      this.attachmentUrl = res.data.data.attachmentUrl;
      this.project_form.title = this.title;
      this.project_form.dead_line = this.dead_line;
      this.project_form.content = this.description;
      this.project_form.attachmentUrl = this.attachmentUrl;
    });

    // 作业完成情况
    this.axios({
      method: "get",
      url: "/web/lab/summit/" + this.lab_id,
      params: {},
    }).then((res) => {
      console.log(res)
      this.homework_records = res.data.data.records;
    });

  },
  methods: {
    getProjectUploadUrl(url) {
      this.project_form.attachmentUrl = url;
    },

    checkReport(url){
      window.open(url);
    },

    checkCode(id){
      let that = this
      // 获取ide url
      this.axios({
        method: "post",
        url: "/web/lab/check_code",
        data: {
          labId: that.lab_id,
          stuId: id
        },
      }).then((res) => {
        console.log(res);
        if (res.status == 200) {
          if (res.data.code == 0) {
            let url = "http://" + res.data.data.url
            console.log(url)
            that.ideUrl = url;

            // 跳转
            let {href} = this.$router.resolve({
              path: '/current_ide',
              query: {
                labId: that.lab_id,
                url: that.ideUrl,
                usrId:id
              }
            });
            window.open(href, '_blank');

          } else {
            let message = res.data.message;
            console.log(message)
            ElMessage.error(message);
          }
        } else {
          ElMessage.error('服务器错误');
        }
      });
    },

    projectComment(id){
      this.commentDialogVisible=true;
      this.axios({
        method: "get",
        url: "/web/lab/summit/comment",
        params: {
          labId:this.lab_id,
          stuId:id
        },
      }).then((res) => {
        console.log(res.data.data)
        this.project_comment = res.data.data.comment
      });
    },

    checkCodeQuick(id){
      this.QuickCheckCodeDialogVisible = true;
      this.axios({
        method: "get",
        url: "/web/lab/check_code/quick",
        params: {
          labId:this.lab_id,
          stuId:id
        },
      }).then((res) => {
        console.log(res.data.data)
        let temp = []
        temp = this.dealData([],res.data.data)
        this.fileNode = temp
        console.log('temp',temp)
      });
    },



    dealData(data,fileNode){
      let treeName = fileNode.name
      // treeName:treeContent 对应树形结构目录的 目录名：内容
      // 将每次遍历得到的数据存入content[]数组中
      this.content[treeName] = fileNode.content
      // 判断当前处理的是否为目录
      if(fileNode.is_dir === false){
        // 不是目录，则直接生成目录名字典，放入data中
        let tree0 = {label:treeName}
        data.push(tree0)
        return data
      }
      else{
        // 新建一个临时变量存放子节点的目录名字典
        let children = []
        // 当前处理的是目录，则对每个子节点进行遍历
        for(let num in fileNode.child_node){
          let child = []
          // 对每个字节点递归调用本方法
          child = this.dealData(child,fileNode.child_node[num])
          // 子节点生成的目录名字典放入children[]中
          console.log('child',child[0])
          children.push(child[0])
        }
        // 生成目录名字典并放入data中
        let tree1 = {
          label:treeName,
          children:children
        }
        data.push(tree1)
        return data
      }
    },

    getLogs() {
      // 编译失败日志收集
      this.axios({
        method: "get",
        url: "/web/lab/summit/compile_error_log/" + this.lab_id,
        params: {},
      }).then((res) => {
        console.log(res)
        if (res.data.data.compiler_error_log != '') {
          this.logs = res.data.data.records;
        }
      });
    },

    getPlagiarism(){
      this.loading=true;
      // 代码抄袭
      this.axios({
        method: "get",
        url: "/web/lab/summit/plagiarism/" + this.lab_id,
        params: {},
      }).then((res) => {
        console.log(res)
        this.plagiarism_records = res.data.data.records;
        this.loading = false;
      });
    },

    handleTabClick() {
      if (this.activeName === 'compile_error_log') {
        this.getLogs()
      }
      if (this.activeName === 'code_plagiarism') {
        this.getPlagiarism()
      }

    },

    modify() {
      let that = this
      this.axios({
        method: "put",
        url: "/web/lab",
        data: {
          labId: that.lab_id,
          title: that.project_form.title,
          content: that.project_form.content,
          attachmentUrl: that.project_form.attachmentUrl,
          deadLine: that.project_form.deadLine,
        },
      }).then((res) => {
        console.log(res)
        if (res.status == 200) {
          if (res.data.code == 0) {
            ElMessage.success({
              message: '修改成功！',
              type: 'success'
            });
          } else {
            let message = res.data.message;
            console.log(message)
            ElMessage.error(message);
          }
        } else {
          ElMessage.error('服务器错误');
        }
      });
    },

    modifyGrade(userId){
      this.gradeDialogVisible=false
      let that = this
      this.axios({
        method: "put",
        url: "/web/lab/summit/score",
        data: {
          userId:userId,
          score:that.grade,
          labId:that.lab_id
        },
      }).then((res) => {
        console.log(res)
        if (res.status == 200) {
          if (res.data.code == 0) {
            ElMessage.success({
              message: '成绩修改成功！',
              type: 'success'
            });
          } else {
            let message = res.data.message;
            console.log(message)
            ElMessage.error(message);
          }
        } else {
          ElMessage.error('服务器错误');
        }
      });
    },

    modifyComment(id){
      this.commentDialogVisible = false
      let that = this
      this.axios({
        method: "put",
        url: "/web/lab/summit/comment",
        data: {
          userId:id,
          comment:that.project_comment,
          labId:that.lab_id
        },
      }).then((res) => {
        console.log(res)
        if (res.status == 200) {
          if (res.data.code == 0) {
            ElMessage.success({
              message: '评语修改成功！',
              type: 'success'
            });
          } else {
            let message = res.data.message;
            console.log(message)
            ElMessage.error(message);
          }
        } else {
          ElMessage.error('服务器错误');
        }
      });
    },

    deleteProject() {
      let that = this
      this.$confirm('此操作将永久删除该实验, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios({
          method: "delete",
          url: "/web/lab",
          data: {
            lab: that.lab_id,
          },
        }).then((res) => {
          console.log(res)
          if (res.status == 200) {
            if (res.data.code == 0) {
              ElMessage.success({
                message: '删除成功！',
                type: 'success'
              });
            } else {
              let message = res.data.message;
              console.log(message)
              ElMessage.error(message);
            }
          } else {
            ElMessage.error('服务器错误');
          }
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
  }
}
</script>

<style scoped>
#teacher-project-detail {
  width: 100%;
}

#body {
  width: 100%;
}

#user-operation {
  margin-top: 20px;
  height: auto;
  width: 100%;
  background-color: #FFFFFF;
}

.logs {
  background-color: #504d5f;
  font-size: 10px;
  color: #FFFFFF;
  padding: 10px;
  margin-top: 10px;
  height: auto;
}
</style>