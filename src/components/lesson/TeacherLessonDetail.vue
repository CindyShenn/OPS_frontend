<template>
  <PageHeader content="课程详情"></PageHeader>
  <div id="teacher-lesson-detail" class="flex justify-center">
    <div id="body">
      <el-tabs :tab-position="tabPosition" v-model="activeName" stretch style="height: auto;font-size: 30px">
        <el-tab-pane name="first">
          <template #label>
            <span style="font-size: 15px"> 课程信息</span>
          </template>
          <div style="padding: 20px">
            <div class="lesson-info">
              <span style="font-size: 14px;margin-bottom: 7px;margin-top: 0px" class="flex user-input">课程封面</span>
              <el-upload
                  class="avatar-uploader el-upload "
                  :action="uploadUrl"
                  name="pic"
                  :headers="headers"
                  :data="uploadData"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                <div class="user-img">
                  <el-image :src="src" style="width: 100%; height: 100%" fit="cover">
                    <template #placeholder>
                      <div class="image-slot">
                        加载中<span class="dot">...</span>
                      </div>
                    </template>
                  </el-image>
                </div>
              </el-upload>
              <span style="font-size: 14px;margin-bottom: 7px" class="flex user-input">课程名</span>
              <el-input placeholder="请输入课程名" v-model="course_name"/>
              <span style="font-size: 14px;margin-bottom: 7px" class="flex user-input">课程描述</span>
              <el-input placeholder="请输入课程描述" v-model="course_des" autosize/>
              <span style="font-size: 14px;margin-bottom: 7px" class="flex user-input">选课密码</span>
              <el-input placeholder="请输入选课密码" v-model="secret_key"/>
              <span style="font-size: 14px;margin-bottom: 7px" class="flex user-input">是否关闭</span>
              <el-radio-group v-model="is_close" class="flex align-left">
                <el-radio :label=1>是</el-radio>
                <el-radio :label=2>否</el-radio>
              </el-radio-group>
              <div class="flex justify-between" style="margin-top: 20px">
                <el-button type="primary" style=""
                           @click="modify()">确认修改
                </el-button>
                <el-button type="danger" style="margin-left: 200px"
                           @click="deleteLesson()">删除课程
                </el-button>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane name="second">
          <template #label>
            <span style="font-size: 15px">课程签到</span>
          </template>
          <div class="check-in">
            <div id="new-check-in" class="flex">
              <el-button plain icon="el-icon-plus" @click="newCheckInFormVisible = true">新建签到</el-button>
              <el-button plain icon="el-icon-download" @click="exportCheckInTable" style="margin-left: 20px">导出签到表</el-button>
              <el-dialog title="新建签到" v-model="newCheckInFormVisible" append-to-body="true" lock-scroll="true" modal="true">
                <el-form :model="check_in_form">
                  <el-form-item label="签到名称" :label-width="formLabelWidth">
                    <el-input v-model="check_in_form.name" placeholder="请输入签到名称"></el-input>
                  </el-form-item>
                  <el-form-item label="签到时长(秒)" :label-width="formLabelWidth">
                    <el-input v-model="check_in_form.duration" placeholder="请输入签到时长"></el-input>
                  </el-form-item>
                  <el-form-item label="签到密码" :label-width="formLabelWidth">
                    <el-input v-model="check_in_form.secretKey"  placeholder="请输入签到密码"></el-input>
                  </el-form-item>
                </el-form>
                <template #footer>
    <span class="dialog-footer">
      <el-button @click="newCheckInFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="newCheckIn">确 定</el-button>
    </span>
                </template>
              </el-dialog>
            </div>
            <div class="check-in-record-table" style="margin-top: 30px">
              <el-table
                  :data="check_in_records"
                  style="width: 100%">
                <el-table-column
                    prop="name"
                    label="签到名称">
                </el-table-column>
                <el-table-column
                    prop="total"
                    label="选课人数">
                </el-table-column>
                <el-table-column
                    label="签到人数"
                    prop="actual">
                </el-table-column>
                <el-table-column
                    prop="created_at"
                    label="签到时间">
                </el-table-column>
                <el-table-column
                    label="查看详情">
                  <template #default="scope">
                    <el-button @click="checkInDetail(scope.row.checkin_record_id)" type="text">查看</el-button>
                  </template>
                </el-table-column>
                <el-table-column
                    label="删除签到">
                  <template #default="scope">
                    <el-button @click="deleteCheckIn(scope.row.checkin_record_id)" type="text" style="color: #f56c6c">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane name="third">
          <template #label>
            <span style="font-size: 15px">课程实验</span>
          </template>
          <div id="lesson-project" style="padding: 20px">
            <div id="new-project" class="flex">
              <el-button plain icon="el-icon-plus" @click="newProjectFormVisible = true">新建实验</el-button>
              <el-dialog title="新建实验" v-model="newProjectFormVisible"  append-to-body="true" lock-scroll="true" modal="true">
                <el-form :model="project_form" :rules="project_rules">
                  <el-form-item label="实验标题" :label-width="formLabelWidth" prop="title">
                    <el-input v-model="project_form.title" autocomplete="off" placeholder="请输入实验标题"></el-input>
                  </el-form-item>
                  <el-form-item label="实验描述" :label-width="formLabelWidth" prop="content">
                    <el-input v-model="project_form.content" autocomplete="off" placeholder="请输入实验描述"  maxlength="200" autosize show-word-limit></el-input>
                  </el-form-item>
                  <el-form-item label="截止日期" :label-width="formLabelWidth" prop="deadLine" >
                    <el-date-picker
                        v-model="project_form.deadLine"
                        type="datetime"
                        placeholder="请选择截止时间">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="上传附件" :label-width="formLabelWidth" prop="attachmentUrl" style="margin-top: 40px">
                    <UploadRar v-on:getUrl = "getProjectUploadUrl"></UploadRar>
                  </el-form-item>
                </el-form>
                <template #footer>
    <span class="dialog-footer">
      <el-button @click="newProjectFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="newProject">确 定</el-button>
    </span>
                </template>
              </el-dialog>
            </div>
            <div id="project-list">
              <teacher-project-list
                  :project_records="project_records">
              </teacher-project-list>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane name="fourth">
          <template #label>
            <span style="font-size: 15px">学生管理</span>
          </template>
          <div class="student-management">
            <div>
              <div class="flex justify-between" style="width: 100%">
                <div>
                  <el-button plain icon="el-icon-plus" @click="newStudentFormVisible = true">添加学生</el-button>
                  <el-button plain icon="el-icon-plus" @click="dialogFormVisible = true">导入学生列表</el-button>
                </div>
                <div style="width: 200px">
                  <el-input
                      width="200px"
                      placeholder="搜索学生"
                      prefix-icon="el-icon-search"
                      v-model="search">
                  </el-input>
                </div>
              </div>
            </div>
            <div style="margin-top: 30px">
              <el-table
                  :data="student_record"
                  style="width: 100%">
                <el-table-column
                    prop="user_id"
                    label="学生编号">
                </el-table-column>
                <el-table-column
                    prop="email"
                    label="邮箱地址">
                </el-table-column>
                <el-table-column
                    label="昵称"
                    prop="nick_name">
                </el-table-column>
                <el-table-column
                    prop="real_name"
                    label="真实姓名">
                </el-table-column>
                <el-table-column
                    prop="major"
                    label="专业">
                </el-table-column>
                <el-table-column
                    prop="organization"
                    label="单位">
                </el-table-column>
                <el-table-column
                    label="操作">
                  <template #default="scope">
                    <el-button @click="handleClick(scope.row)" type="text">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane name="fifth">
          <template #label>
            <span style="font-size: 15px">课程公告</span>
          </template>
          <div id="lesson-resource">
            <div id="new-resource" class="flex">
              <el-button plain icon="el-icon-plus" @click="newResourceFormVisible = true">新建公告</el-button>
              <el-dialog title="新建公告" v-model="newResourceFormVisible"  append-to-body="true" lock-scroll="true" modal="true">
                <el-form :model="resource_form" :rules="project_rules">
                  <el-form-item label="公告标题" :label-width="formLabelWidth" prop="title">
                    <el-input v-model="resource_form.title" autocomplete="off" placeholder="请输入公告标题"></el-input>
                  </el-form-item>
                  <el-form-item label="公告详情" :label-width="formLabelWidth">
                    <el-input v-model="resource_form.content" placeholder="请输入公告详情" show-word-limit prop="content" maxlength="200" autosize></el-input>
                  </el-form-item>
                  <el-form-item label="上传附件" :label-width="formLabelWidth" prop="attachmentUrl" style="margin-top: 40px">
                    <UploadRar v-on:getUrl = "getResourceUploadUrl"></UploadRar>
                  </el-form-item>
                </el-form>
                <template #footer>
    <span class="dialog-footer">
      <el-button @click="newResourceFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="newResource">确 定</el-button>
    </span>
                </template>
              </el-dialog>
            </div>
            <div id="resource-list">
              <TeacherResourceList
                  :resource_records="resource_records">
              </TeacherResourceList>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane name="seventh">
          <template #label>
            <span style="font-size: 15px">课程问答</span>
          </template>
          <TeacherQA
              :records="comments_records"
              :user_id="user_id"
              :courseId="course_id"
              :total="comments_total">
          </TeacherQA>
        </el-tab-pane>
        <el-tab-pane name="eighth">
          <template #label>
            <span style="font-size: 15px">学生编码活跃度</span>
          </template>
          <div id="student-coding-time">
            <el-table
                :data="coding_time_records"
                style="width: 100%">
              <el-table-column
                  prop="num"
                  label="学生学号">
              </el-table-column>
              <el-table-column
                  prop="real_name"
                  label="学生姓名">
              </el-table-column>
              <el-table-column
                  label="编码活跃度">
                <template #default="scope">
                  <el-popover
                      placement="bottom"
                      :width="800"
                      trigger="click"
                  >
                    <template #reference>
                      <el-button>查看</el-button>
                    </template>
                    <CodingTimeTable :table_data="scope.row.coding_time"></CodingTimeTable>
                  </el-popover>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane name="grade">
          <template #label>
            <span style="font-size: 15px">学生成绩</span>
          </template>
          <div class="flex justify-start">
            <el-button plain icon="el-icon-plus" @click="exportGrade">导出成绩</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>

</template>

<script>
import store from "../../store";
import {ElMessage} from "element-plus";
import TeacherProjectList from "../project/TeacherProjectList.vue";
import UploadRar from "../common/UploadRar.vue";
import TeacherResourceList from "../teacher_op/TeacherResourceList.vue";
import PageHeader from "../desk/PageHeader.vue";
import CodingTimeTable from "../user/CodingTimeTable.vue";
import TeacherQA from "../teacher_op/TeacherQA.vue";

export default {
  name: "TeacherLessonDetail",
  inject:['reload'],
  components:{
    TeacherProjectList,
    UploadRar,
    TeacherResourceList,
    PageHeader,
    CodingTimeTable,
    TeacherQA,
  },
  data() {
    return {
      url: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      tabPosition: 'left',
      activeName: 'first',
      course_name: '',

      course_id: '',
      user_id:'1',
      comments_records:[],
      comments_total:'',

      secret_key: '',
      is_close: 1,
      created_at:'',
      teacher_name:'',
      course_des: '',
      tableData: [{
        user_id:'',
        email:'',
        nick_name:'',
        real_name:'',
        gender:'',
        major:'',
        organization:''
      }, ],

      student_record:[],
      project_records:[],
      resource_records:[],
      coding_time_records:[],
      check_in_records:[
        {
          name:'第一次签到',
          total:'20',
          actual:'15',
          created_at:'2020.9.2',
          checkin_record_id:'001',
        }
      ],
      comments:[
      ],
      uploadData: {
        width:'256'
      },
      
      newCheckInFormVisible:false,
      newProjectFormVisible:false,
      newResourceFormVisible:false,
      
      check_in_form:{
        name:'',
        duration:'',
        secretKey:'',
      },
      project_form:{
        title:'',
        content: '',
        attachmentUrl:'',
        deadLine:'',
    },
      resource_form:{
        title:'',
        content: '',
        attachmentUrl:'',
      },

      formLabelWidth: '100px',
      project_rules: {
        title:[
          { required: true, message: '请输入实验标题', trigger: 'blur' },
        ],
        content:[
          { required: true, message: '请输入实验描述', trigger: 'blur' },
        ],
      },

      upload_url:'',
    }
  },
  mounted() {
    this.course_id = this.$route.params.id
    this.axios({
      method: "get",
      url: "/web/course/"+this.$route.params.id,
      params: {},
    }).then((res) => {
      console.log(res)
      this.course_name = res.data.data.course_name;
      this.teacher_name = res.data.data.teacher_name;
      this.created_at = res.data.data.created_at;
      this.is_close = Number(res.data.data.is_close);
      this.course_des = res.data.data.course_des;
      this.secret_key = res.data.data.secret_key;
      if(res.data.data.pic_url != null){
        this.src = res.data.data.pic_url
      }
    });


    this.axios({
      method: "get",
      url: "/web/comment/course",
      params: {
        pageCurrent:1,
        pageSize:20,
        courseId:this.course_id
      },
    }).then((res) => {
      console.log(res)
      this.comments_records = res.data.data.records;
      this.comments_total = res.data.data.page_info.total;
      console.log(this.comments_records)
    });

    // 查询签到记录
    this.axios({
      method: "get",
      url: "/web/checkin/records",
      params: {
        pageCurrent:1,
        pageSize:20,
        courseId:this.course_id
      },
    }).then((res) => {
      console.log(res)
      this.check_in_records = res.data.data.records;
    });

    this.axios({
      method: "get",
      url: "/web/course/resource",
      params: {
        pageCurrent:1,
        pageSize:20,
        courseId:this.course_id
      },
    }).then((res) => {
      console.log(res)
      this.resource_records = res.data.data.records;
      console.log(this.comments_records)
    });

    // 选课学生
    this.getStudents()

    //课程实验
    this.axios({
      method: "get",
      url: "/web/lab",
      params: {
        pageCurrent:1,
        pageSize:20,
        courseId:this.course_id
      },
    }).then((res) => {
      console.log(res)
      this.project_records = res.data.data.records
      console.log(this.records)
    });

    //编码活跃度
    this.axios({
      method: "get",
      url: "/web/coding_time/"+this.$route.params.id,
      params: {
      },
    }).then((res) => {
      console.log(res)
      this.coding_time_records = res.data.data.records;
      console.log(this.student_record)
    });
  },
  methods:{

    exportGrade(){
      let that = this
      // 导出成绩
      this.axios({
        method: "get",
        url: "/web/course/score/export/"+this.$route.params.id,
        params: {
        },
      }).then((res) => {
        console.log(res)
      });
    },

    getStudents(){
      let that = this
      // 选课学生
      this.axios({
        method: "get",
        url: "web/course/student/"+this.$route.params.id,
        params: {
        },
      }).then((res) => {
        console.log(res)
        this.student_record = res.data.data.records;
        this.total = res.data.data.page_info.total;
      });
    },

    handleAvatarSuccess(res) {
      console.log(res)
      this.src = 'http://'+res.data.url;
      console.log(this.src)
      let that = this
      this.axios({
        method: "put",
        url: "/web/course",
        data: {
          courseId:that.course_id,
          picUrl:that.src,
        },
      }).then((res) => {
        console.log(res)
        if (res.status == 200) {
          if (res.data.code == 0) {
            ElMessage.success({
              message: '课程封面修改成功！',
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
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    modify(){
      let that = this
      this.axios({
        method: "put",
        url: "/web/course",
        data: {
          courseId:that.course_id,
          secretkey:that.secret_key,
          courseName:that.course_name,
          courseDes:that.course_des,
          isClosed:that.is_close,
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
    newCheckIn(){
      let that = this
      that.newCheckInFormVisible = false;
      this.axios({
        method: "post",
        url: "/web/checkin/start",
        data: {
          secretKey: that.check_in_form.secretKey,
          courseId: that.course_id,
          duration:that.check_in_form.duration,
          name:that.check_in_form.name,
        },
      }).then((res) => {
        console.log(res);
        if (res.status == 200) {
          if (res.data.code == 0) {
            ElMessage.success({
              message: '新建签到成功！',
              type: 'success'
            });
            this.reload()
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
    newProject(){
      let that = this
      that.newProjectFormVisible = false;
      this.axios({
        method: "post",
        url: "/web/lab",
        data: {
          courseId: that.course_id,
          title: that.project_form.title,
          content:that.project_form.content,
          attachmentUrl:that.project_form.attachmentUrl,
          deadLine:that.project_form.deadLine,
        },
      }).then((res) => {
        console.log(res);
        if (res.status == 200) {
          if (res.data.code == 0) {
            ElMessage.success({
              message: '创建成功！',
              type: 'success'
            });
            this.reload()
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
    newResource(){
      let that = this
      that.newProjectFormVisible = false;
      this.axios({
        method: "post",
        url: "/web/course/resource",
        data: {
          courseId: that.course_id,
          title: that.resource_form.title,
          content:that.resource_form.content,
          attachmentUrl:that.resource_form.attachmentUrl,
        },
      }).then((res) => {
        console.log(res);
        if (res.status == 200) {
          if (res.data.code == 0) {
            ElMessage.success({
              message: '创建成功！',
              type: 'success'
            });
            this.reload()
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

    exportCheckInTable(){
      this.axios({
        method: "get",
        url: "/web/checkin/export/"+this.course_id,
        params: {
        },
      }).then((res) => {
        console.log(res)
      });
    },

    deleteCheckIn(id){
      this.$confirm('此操作将永久删除该签到记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios({
          method: "delete",
          url: "/web/checkin/record/"+id,
          params: {
          },
        }).then((res) => {
          console.log(res)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    checkInDetail(id){
      this.$router.push({path: `/check_in_detail/${id}`})
    },
    getProjectUploadUrl(url){
      this.project_form.attachmentUrl = url;
    },
    getResourceUploadUrl(url){
      this.resource_form.attachmentUrl = url;
    },
    deleteLesson() {
      let that = this
      this.$confirm('此操作将永久删除该课程, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios({
          method: "delete",
          url: "/web/course",
          data: {
            courseId: that.course_id,
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
  },
  computed: {
    // 设置请求头
    headers() {
      return {
        // 设置Content-Type类型为multipart/form-data
        'ContentType': 'multipart/form-data',
        // 设置token
        'Authorization':'Bearer '+ store.state.token
      }
    },
    // 设置上传地址
    uploadUrl() {
      // baseURL是axios的基本路径
      return this.axios.defaults.baseURL + '/web/upload/pic'
    }
  },
}
</script>

<style scoped>
#teacher-lesson-detail {
  margin-top: 15px;
  width: 100%;
  height: auto;
}

#body {
  height: auto;
  width: 90%;
  padding: 30px;
  background: #FFFFFF;
}

.lesson-info{
  background: #FFFFFF;
}

.user-input {
  margin-top: 20px;
}
.user-img {
  height: 100px;
  width: 100px;
}

.check-in{
  padding: 20px;
}
#new-check-in{
  width: 100%;
}

.student-management{
  padding: 20px;
}
#lesson-resource{
  padding: 20px;
}
#project-list{
  margin-top: 20px;
}
#lesson-comment{
  padding: 0px 20px;
}
</style>