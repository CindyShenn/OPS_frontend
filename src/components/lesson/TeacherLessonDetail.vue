<template>
  <div id="teacher-lesson-detail" class="flex justify-center">
    <div id="body">
      <el-tabs :tab-position="tabPosition" stretch style="height: auto;font-size: 30px">
        <el-tab-pane>
          <template #label>
            <span style="font-size: 15px"> 课程信息</span>
          </template>
          <div class="lesson-info">
            <span style="font-size: 14px;margin-bottom: 7px" class="flex user-input">课程封面</span>
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
            <span style="font-size: 14px;margin-bottom: 7px" class="flex user-input">课程ID</span>
            <el-input
                v-model="course_id"
                :disabled="true">
            </el-input>
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
            <el-button type="primary" style="width: 100%;margin-top: 30px;height: 50px;margin-bottom: 30px"
                       @click="modify()">确认修改
            </el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <template #label>
            <span style="font-size: 15px">课程签到</span>
          </template>
        </el-tab-pane>
        <el-tab-pane>
          <template #label>
            <span style="font-size: 15px">课程实验</span>
          </template>
        </el-tab-pane>
        <el-tab-pane>
          <template #label>
            <span style="font-size: 15px">学生管理</span>
          </template>
          <div>
            <div class="flex justify-between" style="width: 100%">
              <div>
                <el-button plain icon="el-icon-plus" @click="dialogFormVisible = true">添加学生</el-button>
                <el-button plain icon="el-icon-plus" @click="dialogFormVisible = true">导入学生列表</el-button>
              </div>
              <div style="width: 200px">
                <el-input
                    width="200px"
                    placeholder="搜索课程"
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
        </el-tab-pane>
        <el-tab-pane>
          <template #label>
            <span style="font-size: 15px">课程评论</span>
          </template>
          <div style="background-color: #FFFFFF;padding: 20px">
            <div style="font-size: 28px;text-align: left;font-weight: 400;width: 100%">课程评论</div>
            <div v-for="(item, index) in comments" class="flex flex-column align-center justify-center" style="width: 100%;margin-top: 40px">
              <div class="each-lesson ">
                <div class="flex flex-row line">
                  <div class="each-lesson-img">
                    <el-image :src="src" style="width: 100%; height: 100%" fit="cover">
                      <template #placeholder>
                        <div class="image-slot">
                          加载中<span class="dot">...</span>
                        </div>
                      </template>
                    </el-image>
                  </div>
                  <div class="each-lesson-info flex flex-column">
                    <div class="user-info flex flex-row align-center" style="height: 20%">
                      <div style="text-align: left;font-size: 20px;font-weight: 600;">{{item.nick_name}}</div>
                      <div style="text-align: left;font-size: 15px;margin-left: 15px">(用户id:{{item.user_id}})</div>
                    </div>
                    <div class="lesson-description" style="text-align: left;color: #504d5f;font-size: 15px;height: 40%">
                      {{ item.comment }}
                    </div>
                    <div class="lesson-detail flex flex-row align-end justify-between" style="height: 20%;font-size: 8px">
                      <div class="lesson-detail-content">评论时间：{{item.created_at}}</div>
                      <div class="lesson-detail-content">更新时间：{{item.updated_at}}</div>
                    </div>
                  </div>
                </div>
                <div id="reply" class="flex flex-column">
                  <div v-for="(item, index) in comments" class="flex flex-column align-center justify-center" style="width: 100%;margin-top: 10px">
                    <div class="line each-reply">
                      <div class="flex flex-row">
                        <div class="each-reply-img">
                          <el-image :src="src" style="width: 100%; height: 100%" fit="cover">
                            <template #placeholder>
                              <div class="image-slot">
                                加载中<span class="dot">...</span>
                              </div>
                            </template>
                          </el-image>
                        </div>
                        <div class="each-reply-item flex flex-column">
                          <div class="user-info flex flex-row align-center" style="height: 30%">
                            <div style="text-align: left;font-size: 15px;font-weight: 600;">{{item.nick_name}}</div>
                            <div style="text-align: left;font-size: 12px;margin-left: 15px">(用户id:{{item.user_id}})</div>
                          </div>
                          <div class="reply-comment" style="text-align: left;color: #504d5f;font-size: 8px;height: 40%;width: auto;word-wrap:break-word">
                            {{reply-comment}}
                          </div>
                          <div class="reply-time" style="height: 30%;font-size: 8px;width: auto;text-align: left">
                            {{reply-time}}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>

</template>

<script>
import store from "../store";
import {ElMessage} from "element-plus";

export default {
  name: "TeacherLessonDetail",
  data() {
    return {
      url: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      tabPosition: 'left',
      course_name: 'c++ 基础课程',
      course_id: '12344',
      secret_key: 'abser213123sdf',
      is_close: 1,
      created_at:'',
      teacher_name:'',
      course_des: '这是c++的基础课程，在本次课程里我们将学习c++的语法和基本应用',
      tableData: [{
        user_id:'0001',
        email:'12345@qq.com',
        nick_name:'cindy',
        real_name:'王小明',
        gender:'男',
        major:'计算机科学',
        organization:'华南师范大学'
      }, ],
      student_record:[],
      comments:[
        {
          nick_name:'cindy',
          user_id:'00002',
          comment:'这个课非常好，老师讲得很棒',
          created_at:'2020.9.1',
          updated_at:'2020.9.1',
        },
        {
          nick_name:'cindy',
          user_id:'00002',
          comment:'这个课非常好，老师讲得很棒',
          created_at:'2020.9.1',
          updated_at:'2020.9.1',
        },
        {
          nick_name:'cindy',
          user_id:'00002',
          comment:'这个课非常好，老师讲得很棒',
          created_at:'2020.9.1',
          updated_at:'2020.9.1',
        },
      ],
      uploadData: {
        width:'256'
      },
    };
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
        courseId:this.$route.params.id
      },
    }).then((res) => {
      console.log(res)
      this.records = res.data.data.records;
      this.total = res.data.data.page_info.total;
      console.log(this.total)
      console.log(this.records)
    });
    this.axios({
      method: "get",
      url: "web/course/student/"+this.$route.params.id,
      params: {
      },
    }).then((res) => {
      console.log(res)
      this.student_record = res.data.data.records;
      this.total = res.data.data.page_info.total;
      console.log(this.total)
      console.log(this.student_record)
    });
  },
  methods:{
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
    }
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
  height: 100%;
  width: 100%;
}

#body {
  height: auto;
  width: 80%;
  padding: 30px;
}

.lesson-info{
  background: #FFFFFF;
  padding: 30px;
}

.user-input {
  margin-top: 20px;
}
.user-img {
  height: 100px;
  width: 100px;
}

.line {
  border-bottom: 1px solid #dcdfe6;
}

.each-lesson {
  height: auto;
  width: 80%;
  background: #FFFFFF;
  padding: 25px;
}
.each-lesson-img {
  height: 120px;
  width: 120px;
  background: #002d54;
}
.each-lesson-info {
  height: 150px;
  width:calc(100% - 180px);
  margin-left: 30px;
}

.lesson-detail-content{
  width: 50%;
  text-align: left;
}

#reply {
  height: auto;
  width: 500px;
  margin-left: 150px;
}
.each-reply {
  height: auto;
  padding: 5px;
  width: 100%;
}
.each-reply-img{
  height: 65px;
  width: 65px;
}
.each-reply-item{
  margin-left: 30px;
  width: auto;
}
</style>