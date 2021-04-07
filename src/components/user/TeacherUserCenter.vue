<template>
  <div id="teacher-user-center">
    <div id="body" class="flex align-center justify-center">
      <div class="container">
        <div id="section" class="flex flex-column align-center justify-center">
          <span class="my-title">我的主页</span>
          <div id="user-info">
            <div class="flex justify-between" style="margin: 20px">
              <div class="flex">
                <div class="user-img">
                  <el-image :src="src" style="width: 100%; height: 100%" fit="cover">
                    <template #placeholder>
                      <div class="image-slot">
                        加载中<span class="dot">...</span>
                      </div>
                    </template>
                  </el-image>
                </div>
                <div class="user-info-content flex flex-column" style="text-align: left">
                  <div class="flex flex-row">
                    <div class="real_name flex align-end" >
                      {{ real_name }}
                    </div>
                    <div style="margin-left: 20px;" class="flex align-center">
                      <el-button type="text" icon="el-icon-edit-outline" style="font-size: 15px;padding: 0px" @click="redirect('user_info')">编辑个人信息
                      </el-button>
                    </div>
                  </div>
                  <div class="id">
                    用户id：{{ id }}&emsp;于&nbsp;{{ Day(create_time) }}&nbsp;加入
                  </div>
                </div>
              </div>
              <div class="logout" style="align-self: flex-end">
                <el-button type="danger" @click="logout()">退出登录</el-button>
              </div>
            </div>
          </div>
          <div id="user-operation">
            <div id="user-operation-content" style="padding: 10px 20px">
              <el-tabs v-model="activeName"  @tab-click="handleClick">
                <el-tab-pane label="我的课程" name="first">
                  <div id="my-lesson">
                    <div class="flex justify-between">
                      <el-button icon="el-icon-plus" type="primary" @click="dialogFormVisible = true">创建课程</el-button>
                      <el-dialog title="创建课程" v-model="dialogFormVisible" append-to-body="true" lock-scroll="true" modal="true">
                        <el-form :model="form">
                          <el-form-item label="课程名称" :label-width="formLabelWidth">
                            <el-input v-model="form.name" autocomplete="off" placeholder="请输入课程名称"></el-input>
                          </el-form-item>
                          <el-form-item label="课程描述" :label-width="formLabelWidth">
                            <el-input v-model="form.description" type="textarea"
                                      placeholder="请输入课程描述" autocomplete="off" maxlength="30"
                                      show-word-limit></el-input>
                          </el-form-item>
                          <el-form-item label="加入密码" :label-width="formLabelWidth">
                            <el-input v-model="form.password" autocomplete="off" placeholder="请输入班级加入密码"></el-input>
                          </el-form-item>
                          <el-form-item label="课程封面" :label-width="formLabelWidth">
                            <el-upload
                                class="avatar-uploader el-upload"
                                :action="uploadUrl"
                                name="pic"
                                :headers="headers"
                                :data="uploadData"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                              <img v-if="imageUrl" :src="imageUrl" class="avatar">
                              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                          </el-form-item>
                        </el-form>
                        <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="CreateLesson">确 定</el-button>
    </span>
                        </template>
                      </el-dialog>
                      <div style="width: 200px">
                        <el-input
                            width="200px"
                            placeholder="搜索课程"
                            prefix-icon="el-icon-search"
                            v-model="search">
                        </el-input>
                      </div>
                    </div>
                    <div id="lesson-list"  style="width: 100%">
                      <div v-for="(item, index) in lessons" class="flex flex-column align-center justify-center line" style="width: 100%;margin: 0px">
                        <div class="each-lesson flex flex-row" v-on:click="redirectLesson(item.course_id)" style="cursor:pointer">
                          <div class="each-lesson-img">
                            <el-image :src="item.pic_url == null ? src: item.pic_url" style="width: 100%; height: 100%" fit="cover">
                              <template #placeholder>
                                <div class="image-slot">
                                  加载中<span class="dot">...</span>
                                </div>
                              </template>
                            </el-image>
                          </div>
                          <div class="each-lesson-info flex flex-column">
                            <div class="lesson-title flex flex-row align-center" style="height: 30%">
                              <div style="text-align: left;font-size: 30px;font-weight: 600;">{{item.course_name}}</div>
                            </div>
                            <div class="lesson-description" style="text-align: left;color: #504d5f;font-size: 15px;height: 40%;margin-top: 10px">
                              {{ item.course_des }}
                            </div>
                            <div class="lesson-detail flex flex-row align-end justify-between" style="height: 30%">
                              <div class="lesson-detail-content">开课时间：{{Day(item.created_at)}}</div>
                              <div class="lesson-detail-content">是否结课：{{isClosed(item.is_close)}}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="我的班级" name="third">
                  <div id="my-class">
                    <div class="flex justify-between" style="margin-bottom: 15px">
                      <el-button icon="el-icon-plus" type="primary" @click="newClassFormVisible = true">创建班级</el-button>
                      <el-dialog title="创建班级" v-model="newClassFormVisible">
                        <el-form :model="new_class_form">
                          <el-form-item label="班级名称" :label-width="formLabelWidth">
                            <el-input v-model="new_class_form.name" autocomplete="off" placeholder="请输入班级名称"></el-input>
                          </el-form-item>
                          <el-form-item label="班级描述" :label-width="formLabelWidth">
                            <el-input v-model="new_class_form.description" type="textarea"
                                      placeholder="请输入班级描述" autocomplete="off" maxlength="30"
                                      show-word-limit></el-input>
                          </el-form-item>
                          <el-form-item label="加入密码" :label-width="formLabelWidth">
                            <el-input v-model="new_class_form.password" autocomplete="off" placeholder="请输入班级加入密码"></el-input>
                          </el-form-item>
                        </el-form>
                        <template #footer>
    <span class="dialog-footer">
      <el-button @click="newClassFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="newClassFormVisible = false">确 定</el-button>
    </span>
                        </template>
                      </el-dialog>
                      <div style="width: 150px">
                        <el-input
                            placeholder="搜索班级"
                            prefix-icon="el-icon-search"
                            v-model="search">
                        </el-input>
                      </div>
                    </div>
                    <el-table
                        :data="classTableData"
                        style="width: 100%;font-size: 15px">
                      <el-table-column
                          prop="number"
                          label="编号"
                          width="150px">
                      </el-table-column>
                      <el-table-column
                          prop="class"
                          label="班级"
                          width="150px">
                      </el-table-column>
                      <el-table-column
                          prop="description"
                          label="描述">
                      </el-table-column>
                      <el-table-column
                          prop="password"
                          label="班级密码"
                          width="150px">
                      </el-table-column>
                      <el-table-column
                          prop="createTime"
                          label="创建时间"
                          width="150px">
                      </el-table-column>
                      <el-table-column
                          prop="studentStatus"
                          label="学生情况"
                          width="150px">
                        <template #default="scope">
                          <el-button @click="handleClick(scope.row)" type="text">查看</el-button>
                          <el-button type="text">导入</el-button>
                        </template>
                      </el-table-column>
                      <el-table-column
                          prop="operation"
                          label="操作"
                          width="150px">
                        <template #default="scope">
                          <el-button type="primary" icon="el-icon-edit" circle @click="dialogForm1Visible = true"></el-button>
                          <el-dialog title="编辑班级" v-model="dialogForm1Visible">
                            <el-form :model="modify_form">
                              <el-form-item label="班级名称" :label-width="formLabelWidth">
                                <el-input v-model="modify_form.name" autocomplete="off" placeholder="请输入班级名称"></el-input>
                              </el-form-item>
                              <el-form-item label="班级描述" :label-width="formLabelWidth">
                                <el-input v-model="modify_form.description" type="textarea"
                                          placeholder="请输入班级描述" autocomplete="off" maxlength="30"
                                          show-word-limit></el-input>
                              </el-form-item>
                              <el-form-item label="加入密码" :label-width="formLabelWidth">
                                <el-input v-model="modify_form.password" autocomplete="off" placeholder="请输入班级加入密码"></el-input>
                              </el-form-item>
                            </el-form>
                            <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogForm1Visible = false">取 消</el-button>
      <el-button type="primary" @click="dialogForm1Visible = false">确 定</el-button>
    </span>
                            </template>
                          </el-dialog>
                          <el-button type="danger" icon="el-icon-delete" circle style="margin-left: 15px" @click="confirmDelete"></el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
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
import {getDay} from "../../utils/utils";
import {ElMessage} from "element-plus";
import store from "../../store";

export default {
name: "TeacherUserCenter",
  data() {
    return {
      src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      real_name: '',
      id: '',
      create_time: '',
      activeName: 'first',
      lessons:[],
      project_records:[],
      dialogFormVisible: false,
      dialogForm1Visible: false,
      newClassFormVisible:false,
      formLabelWidth: '80px',
      classTableData: [{
        number: '0001',
        class: 'c++ 1班',
        description: '20级5、6班c++实训课程',
        password:'123456',
        createTime:'2020-05-06',
      }, {
        number: '0002',
        class: 'c++ 1班',
        description: '20级5、6班c++实训课程',
        password:'123456',
        createTime:'2020-05-06',
      }],
      imageUrl: '',
      uploadData: {
        width:'256'
      },
      form: {
        name: '',
        description: '',
        password:'',
      },
      new_class_form:{
        name: '',
        description: '',
        password:'',
      },
      modify_form: {
        name: '',
        description: '',
        password:'',
      },
      search: '',
    }
  },
  mounted() {
    this.axios({
      method: "get",
      url: "/web/user",
      params: {},
    }).then((res) => {
      let data = res.data.data;
      this.id = data.num;
      if(data.avatar_url != ''){
        this.src = data.avatar_url;
      }
      this.$store.commit('$_setStorageHead', this.src);
      this.create_time = data.created_at;
      this.real_name = data.real_name;
      console.log(res);
      console.log(data.gender)
    });
    this.axios({
      method: "get",
      url: "/web/course/setup",
      data: {
        pageCurrent:1,
        pageSize:20,
      },
    }).then((res) => {
      console.log(res)
      this.lessons=res.data.data.records
      console.log(res.data.data.records)
    });
    this.axios({
      method: "get",
      url: "/web/lab/student",
      params: {
        pageCurrent:1,
        pageSize:20,
      },
    }).then((res) => {
      console.log(res)
      this.project_records = res.data.data.records;
      console.log(this.total)
      console.log(this.records)
    });
  },
  methods:{
    Day(time){
      return getDay(time)
    },
    redirectProject(id){
      this.$router.push({ path:`/project_detail/${id}`})
    },
    redirect(url){
      this.$router.push({ path:url})
    },
    redirectLesson(id){
      this.$router.push({ path:`/teacher_lesson_detail/${id}`})
    },
    logout(){
      this.$store.commit('$_removeStorage');
      this.$store.commit('$_removeStorageRole')
      this.$router.push({ path:'login'})
    },
    isClosed(value){
      return value=='2' ? '是' : '否'
    },
    isFinished(value){
      return value=='2' ? '是' : '否'
    },
    CreateLesson(){
      let that = this
      that.dialogFormVisible = false;
      this.axios({
        method: "post",
        url: "/web/course",
        data: {
          courseDes: that.form.description,
          secretkey: that.form.secretkey,
          courseName:that.form.name,
          picUrl:that.imageUrl,
        },
      }).then((res) => {
        console.log(res);
        if (res.status == 200) {
          if (res.data.code == 0) {
            ElMessage.success({
              message: '创建成功！',
              type: 'success'
            });
            this.reload();
          } else {
            let message = res.data.message;
            console.log(message)
            ElMessage.error(message);
          }
        } else {
          ElMessage.error('服务器错误');
        }
        that.commentText = ''
      });
    },
    handleAvatarSuccess(res) {
      console.log(res)
      this.imageUrl = 'http://'+res.data.url;
      console.log(this.imageUrl)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    confirmDelete() {
      this.$confirm('此操作将永久删除该班级, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
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
    },
  },
}
</script>

<style scoped>
#teacher-user-center {
  height: 100%;
}

#body {
  width: 100%;
}

#user-info {
  margin-top: 20px;
  height: auto;
  width: 100%;
  background-color: #FFFFFF;

}

#user-operation {
  margin-top: 20px;
  height: auto;
  width: 100%;
  background-color: #FFFFFF;
}

.user-img {
  height: 100px;
  width: 100px;
}

.user-info-content {
  margin-left: 30px;
}

.real_name {
  font-size: 30px;
}

.id {
  color: #606266;
  font-size: 15px;
  margin-top: 10px;
}
.each-lesson {
  height: 150px;
  width: 100%;
  padding: 25px;
}

.each-lesson-img {
  height: 150px;
  width: 150px;
  background: #002d54;
}

.each-lesson-info {
  height: 150px;
  width:calc(100% - 180px);
  margin-left: 30px;
}

.lesson-detail-content{
  width: 30%;
  text-align: left;
}
.el-upload{
  border: 1px dashed #8c939d;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
#my-lesson{
  padding: 20px;
}
#my-class{
  padding: 20px;
}
</style>