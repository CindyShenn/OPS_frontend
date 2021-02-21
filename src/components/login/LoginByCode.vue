<template>
  <div id = "login">
    <div id="main" class="flex align-center justify-center">
      <div id="login-card" class="flex flex-column">
        <span style="margin-top: 39px;font-size: 16px;color: #9DA0B4;text-align: center">欢迎使用</span>
        <span style="margin-top: 10px;font-size: 32px;text-align: center">请登录您的账号</span>
        <div style="margin:40px 46px 0px 46px">
          <span style="font-size: 14px;margin-bottom: 7px" class="flex">用户名</span>
          <el-input placeholder="请输入邮箱"  v-model="user" clearable/>
          <div style="margin-top: 36px;margin-bottom: 7px" class="flex justify-between">
            <span style="font-size: 14px;">验证码</span>
          </div>
          <div class="flex justify-between">
            <el-input placeholder="请输入验证码" v-model="pwd" show-password @keyup.enter="login"/>
            <el-button style="margin-left: 30px" type="primary">获取验证码</el-button>
          </div>
          <el-button type="primary" style="width: 100%;margin-top: 40px;height: 50px" @click="login">立即登录</el-button>
          <div class="flex justify-between align-center" style="margin-top: 25px;font-size: 14px">
            <div><span style="color: #3F9EFF">账号密码登陆</span></div>
            <div><span>还没有账号？</span><span style="color: #3F9EFF">马上注册</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginByCode"
}
</script>

<style scoped>
#login {
  width: 100%;
  height: 100%;
}
#main {
  height: 100%;
  width: 100%;
  background: #3589BF;
}
#login-card {
  width: 480px;
  height: 500px;
  background: #FFFFFF;
  box-shadow: 0px 0px 15px 0px #504d5f;
  border-radius: 10px;
}
</style>