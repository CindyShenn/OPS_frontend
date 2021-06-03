<template>
  <div id="teacher-lesson">
    <div id="body" class="flex align-center justify-center">
      <div class="container">
        <div id="section" class="flex flex-column align-center justify-center">
          <span style="font-size: 28px;text-align: left;font-weight: 400;width: 100%">我的课程</span>
          <div class="flex justify-between" style="margin-top: 30px;width: 85%">
            <el-button plain icon="el-icon-plus" @click="dialogFormVisible = true">创建课程</el-button>
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
            <div v-for="(item, index) in lessons" class="flex flex-column align-center justify-center" style="width: 100%;margin-top: 40px">
              <div class="each-lesson flex flex-row" v-on:click="redirectLesson(item.course_id)" style="cursor:pointer">
                <div class="each-lesson-img">
                  <el-image :src="item.pic_url==null ? src : item.pic_url" style="width: 100%; height: 100%" fit="cover">
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
                    <div style="text-align: left;font-size: 20px;margin-left: 15px">(课程id:{{item.course_id}})</div>
                  </div>
                  <div class="lesson-description" style="text-align: left;color: #504d5f;font-size: 15px;height: 40%">
                    {{ item.description }}
                  </div>
                  <div class="lesson-detail flex flex-row align-end justify-between" style="height: 30%">
                    <div class="lesson-detail-content">开课时间：{{item.created_at}}</div>
                    <div class="lesson-detail-content">是否结课：{{isClosed(item.is_close)}}</div>
                    <div class="lesson-detail-content">更新时间：{{isUpdated(item.updated_at)}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {ElMessage} from "element-plus";
import store from "../../store";

export default {
  name: "TeacherLesson",
  inject:['reload'],
  data(){
    return{
      src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      lessons:[
        {
          title: "Title",
          id:"123456",
          created_at:"2020.9.1",
          updated_at:"2020.9.1",
          pic_url:'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          is_close:"否"
        },
      ],
      form: {
        name: '',
        description: '',
        password:'',
      },
      dialogFormVisible: false,
      formLabelWidth: '80px',
      imageUrl: '',
      uploadData: {
        width:'256'
      },
    }
  },
  methods:{
    CreateLesson(){
      let that = this
      that.dialogFormVisible = false;
      this.axios({
        method: "post",
        url: "/web/course",
        data: {
          courseDes: that.form.description,
          secretkey: that.form.password,
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
    isClosed(value){
      return value=='2' ? '是' : '否'
    },
    isUpdated(value){
      return value==null ? '无' : value
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
    redirectLesson(id){
      this.$router.push({ path:`/teacher_lesson_detail/${id}`})
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
  mounted() {
    this.axios({
      method: "get",
      url: "/web/course/setup",
      data: {},
    }).then((res) => {
      console.log(res)
      this.lessons=res.data.data.records
      console.log(res.data.data.records)
    });
  }

}
</script>

<style scoped>
#teacher-lesson {
  height: 100%;
}

#body {
  width: 100%;
}

#section {
  height: 100%;
}

.each-lesson {
  height: 150px;
  width: 80%;
  background: #FFFFFF;
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
</style>