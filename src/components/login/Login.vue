<template>
  <div id="login">
    <div id="body" class="flex align-center justify-center">
      <div id="login-card" class="flex flex-column">
        <span style="margin-top: 25px;font-size: 32px;text-align: center">请登录您的账号</span>
        <div style="margin:40px 46px 0px 46px">
          <span style="font-size: 14px;margin-bottom: 7px" class="flex">用户名</span>
          <el-input placeholder="请输入用户名" v-model="user" clearable/>
          <div style="margin-top: 36px;margin-bottom: 7px" class="flex justify-between align-center">
            <span style="font-size: 14px;">密码</span>
            <el-button type="text" style="font-size: 14px; color: #3F9EFF" @click="redirect('change_pwd')">忘记密码？
            </el-button>
          </div>
          <el-input placeholder="请输入密码" v-model="pwd" show-password @keyup.enter="login"/>
          <el-button type="primary" style="width: 100%;margin-top: 40px;height: 50px" @click="login">立即登录</el-button>
          <div class="flex justify-between align-center" style="margin-top: 10px;font-size: 14px">
            <div>
              <el-button type="text" style="font-size: 14px; color: #3F9EFF" @click="redirect('login_by_code')">验证码登录
              </el-button>
            </div>
            <div><span>还没有账号？</span>
              <el-button type="text" style="font-size: 14px; color: #3F9EFF" @click="redirect('register')">马上注册
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ElMessage} from 'element-plus';
import store from "../store";

export default {
  name: "Login",
  data() {
    return {
      user: '',
      pwd: '',
      token:'',
    };
  },
  methods: {
    redirect(url) {
      this.$router.push({ path:url})
    },
    login() {
      let that = this
      this.axios({
        method: "post",
        url: "/web/login",
        data: {
          username: that.user,
          password: that.pwd,
        },
      }).then((res) => {
        this.info = res;
        console.log(res);
        if (res.status == 200) {
          if (res.data.code == 0) {
            let token = res.data.data.token
            //let role = res.data.data.role
            console.log(token);
            this.$store.commit('$_setStorage', token);
            ElMessage.success({
              message: '登录成功！',
              type: 'success'
            });
            this.redirect('user_center')
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

}

</script>

<style scoped>
#login {
  width: 100%;
  height: 100%;
}

#body {
  height: 100%;
  width: 100%;
  background: #002d54;
}

#login-card {
  width: 480px;
  height: 450px;
  padding: 20px;
  background: #FFFFFF;
  box-shadow: 0px 0px 15px 0px #504d5f;
}
</style>