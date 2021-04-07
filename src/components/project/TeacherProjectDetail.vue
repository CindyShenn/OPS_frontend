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
              <el-tabs v-model="activeName"  @tab-click="handleTabClick" stretch="true">
                <el-tab-pane label="查看学生代码" name="student_code">

                </el-tab-pane>
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
                        <el-tag v-if="scope.row.finish_stat == 1" type="success">已完成</el-tag>
                        <el-tag v-if="scope.row.finish_stat == 0" type="danger">未开始</el-tag>
                        <el-tag v-if="scope.row.finish_stat == 2" type="warning">进行中</el-tag>
                      </template>
                    </el-table-column>
                    <el-table-column
                        prop="coding_time"
                        label="编码时长">
                    </el-table-column>
                    <el-table-column
                        label="实验报告">
                      <template #default="scope">
                        <el-link :href="scope.row.report_url" target="_blank">{{scope.row.report_url}}</el-link>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-tab-pane>
                <el-tab-pane label="代码抄袭情况" name="code_plagiarism">
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
                      {{logs}}
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
                    <el-form-item label="截止日期" prop="deadLine" >
                      <el-input v-model="project_form.deadLine" autocomplete="off" placeholder="请输入实验截止日期"></el-input>
                    </el-form-item>
                    <el-form-item label="上传附件" prop="attachmentUrl" style="margin-top: 40px">
                      <UploadRar v-on:getUrl = "getProjectUploadUrl"></UploadRar>
                    </el-form-item>
                  </el-form>
                  <el-button type="danger" @click="modify">确认修改</el-button>
                </el-tab-pane>
                <el-tab-pane label="删除实验" name="delete_project">
                  <el-button type="danger" @click="deleteProject" style="margin-top: 10px">删除该实验</el-button>
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
import UploadRar from "../common/UploadRar.vue";
import {ElMessage} from "element-plus";
import PageHeader from "../desk/PageHeader";
export default {
name: "TeacherProjectDetail",
  components:{PageHeader, ProjectContent,UploadRar},
  data(){
  return{
    title:'',
    dead_line:'',
    attachmentUrl:'',
    description:'',
    created_at:'',

    lab_id:'',

    logs:'no data',

    activeName:'student_code',

    project_form:{
      title:'',
      content: '',
      attachmentUrl:'',
      deadLine:'',
    },
    project_rules: {
      title:[
        { required: true, message: '请输入实验标题', trigger: 'blur' },
      ],
      content:[
        { required: true, message: '请输入实验描述', trigger: 'blur' },
      ],
    },

    homework_records:[
      {
        user_id:'001',
        real_name:'王小明',
        num:'123',
        report_url:'http://www.baidu.com',
        finish_stat:0,
        coding_time:123,
      }
    ],
    plagiarism_records:[],

    }
  },
  mounted() {
    // 获取实验id
    this.lab_id = this.$route.params.id

    // 获取实验详情
    this.axios({
      method: "get",
      url: "/web/lab/"+this.lab_id,
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

    // 代码抄袭
    this.axios({
      method: "get",
      url: "/web/summit/plagiarism/"+ this.lab_id,
      params: {
      },
    }).then((res) => {
      console.log(res)
      this.plagiarism_records = res.data.data.records;
    });

    // 作业完成情况
    this.axios({
      method: "get",
      url: "/web/summit/" + this.lab_id,
      params: {
      },
    }).then((res) => {
      console.log(res)
      this.homework_records = res.data.data.records;
    });

  },
  methods:{
    getProjectUploadUrl(url){
      this.project_form.attachmentUrl = url;
    },

    getLogs(){
      // 编译失败日志收集
      this.axios({
        method: "get",
        url: "/web/summit/compile_error_log/" + this.lab_id,
        params: {
        },
      }).then((res) => {
        console.log(res)
        if (res.data.data.compiler_error_log != ''){
          console.log("hi", res.data.data.compiler_error_log)
          this.logs = res.data.data.records;
        }
      });
    },

    handleTabClick() {
      if (this.activeName=='compile_error_log'){
        this.getLogs()
      }
    },

    modify(){
      let that = this
      this.axios({
        method: "put",
        url: "/web/lab",
        data: {
          labId:that.lab_id,
          title:that.project_form.title,
          content:that.project_form.content,
          attachmentUrl:that.project_form.attachmentUrl,
          deadLine:that.project_form.deadLine,
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
    deleteProject(){
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
            lab:that.lab_id,
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

.logs{
  background-color: #504d5f;
  font-size: 10px;
  color: #FFFFFF;
  padding: 10px;
  margin-top: 10px;
  height: auto;
}
</style>