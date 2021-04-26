<template>
  <div id="user-info">
    <div id="body" class="flex align-center justify-center">
      <div class="container">
        <div id="section" class="flex flex-column">
          <span style="margin: 30px 40px 0px;font-size: 28px;text-align: left;font-weight: 400">个人信息</span>
          <div style="margin:20px 40px 0px 40px">
            <span style="font-size: 14px;margin-bottom: 7px" class="flex user-input">头像</span>
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
                <el-image :src="avatar_url" style="width: 100%; height: 100%" fit="cover">
                  <template #placeholder>
                    <div class="image-slot">
                      加载中<span class="dot">...</span>
                    </div>
                  </template>
                </el-image>
              </div>
            </el-upload>
            <span style="font-size: 14px;margin-bottom: 7px" class="flex user-input">邮箱*</span>
            <el-input
                v-model="email"
                :disabled="true">
            </el-input>
            <span style="font-size: 14px;margin-bottom: 15px" class="flex user-input">单位</span>
            <el-input placeholder="请输入单位" v-model="organization"/>
            <span style="font-size: 14px;margin-bottom: 7px" class="flex user-input">真实姓名</span>
            <el-input placeholder="请输入真实姓名" v-model="realName"/>
            <span style="font-size: 14px;margin-bottom: 7px" class="flex user-input">专业</span>
            <el-input placeholder="请输入专业" v-model="major"/>
            <span style="font-size: 14px;margin-bottom: 7px" class="flex user-input">学号</span>
            <el-input placeholder="请输入学号" v-model="num"/>
            <span style="font-size: 14px;margin-bottom: 15px" class="flex user-input">性别</span>
            <el-radio-group v-model="radio_sex" class="flex align-left">
              <el-radio :label=0>男</el-radio>
              <el-radio :label=1>女</el-radio>
            </el-radio-group>
            <el-button type="primary" style="width: 100%;margin-top: 30px;height: 50px;margin-bottom: 30px"
                       @click="modify()">确认修改
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ElMessage} from 'element-plus';
import store from "../../store";
export default {
  name: "UserInfo",
  data() {
    return {
      user_id:'',
      radio_sex: '',
      nickName: '',
      organization: '',
      realName: '',
      major: '',
      num: '',
      email:'',
      avatar_url:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
      uploadData: {
        width:'256'
      },
    };
  },
  mounted() {
    this.axios({
      method: "get",
      url: "/web/user",
      data: {},
    }).then((res) => {
      //this.info=res;
      let data = res.data.data;
      this.organization = data.organization;
      this.realName = data.real_name;
      this.major = data.major;
      this.num = data.num;
      this.email = data.email;
      this.radio_sex = Number(data.gender);
      if(data.avatar_url!=''){
        this.avatar_url = data.avatar_url;
      }
      this.user_id = data.userid;
      console.log(res);
      console.log(data.gender)
    });
  },
  methods:{
    handleAvatarSuccess(res) {
      console.log(res)
      this.avatar_url = 'http://'+res.data.url;
      let that = this
      this.axios({
        method: "put",
        url: "/web/user",
        data: {
          userid:that.user_id,
          avatarUrl:that.avatar_url,
        },
      }).then((res) => {
        console.log(res)
        if (res.status == 200) {
          if (res.data.code == 0) {
            ElMessage.success({
              message: '头像修改成功！',
              type: 'success'
            });
            this.$store.commit('$_setStorageHead', this.avatar_url);
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
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    modify(){
      let that = this
      this.axios({
        method: "put",
        url: "/web/user",
        data: {
          userid:that.user_id,
          organization:that.organization,
          realName:that.realName,
          major:that.major,
          num:that.num,
          gender:that.radio_sex,
          avatarUrl:that.avatar_url,
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
#user-info {
  height: 100%;
}

#body {
  width: 100%;
}

#section {
  height: 100%;
  background: #FFFFFF;
}

.user-input {
  margin-top: 20px;
}
.user-img {
  height: 100px;
  width: 100px;
}
</style>