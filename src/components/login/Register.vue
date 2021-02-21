<template>
<div id="register">
  <div id="main" class="flex align-center justify-center">
    <div id="register-card" class="flex flex-column">
      <span style="margin-top: 40px;margin-bottom: 9px;font-size: 32px;text-align: center">请注册您的账号</span>
      <div style="overflow:auto">
      <div style="margin:40px 46px 0px 46px">
        <span style="font-size: 14px;margin-bottom: 7px" class="flex">邮箱</span>
        <el-input placeholder="请输入邮箱"  v-model="user" clearable/>
        <div style="margin-top: 36px;margin-bottom: 7px" class="flex justify-between">
          <span style="font-size: 14px;">验证码</span>
        </div>
        <div class="flex justify-between">
          <el-input placeholder="请输入验证码" v-model="pwd" show-password @keyup.enter="login"/>
          <el-button style="margin-left: 30px" type="primary">获取验证码</el-button>
        </div>
        <div style="margin-top: 36px;margin-bottom: 7px" class="flex justify-between">
          <span style="font-size: 14px;">密码</span>
        </div>
        <el-input placeholder="请输入密码" v-model="pwd" show-password @keyup.enter="login"/>
        <div style="margin-top: 36px;margin-bottom: 7px" class="flex justify-between">
          <span style="font-size: 14px;">确认密码</span>
        </div>
        <el-input placeholder="请再次输入密码" v-model="pwd" show-password @keyup.enter="login"/>
        <div style="margin-top: 36px" class="flex justify-left">
          <el-radio-group v-model="radio">
            <el-radio :label="1">注册为学生</el-radio>
            <el-radio :label="3">注册为教师</el-radio>
          </el-radio-group>
        </div>
        <el-button type="primary" style="width: 100%;margin-top: 40px;height: 50px" @click="login">立即注册</el-button>
        <div class="flex justify-between align-center" style="margin-top: 25px;margin-bottom:25px;font-size: 14px">
          <div><span>已经有账号？</span><span style="color: #3F9EFF">马上登陆</span></div>
        </div>
      </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
name: "Register",
  data () {
    return {
      radio: 1
    };
  }
}
</script>

<style scoped>
#register{
  width: 100%;
  height: 100%;
}
#main {
  height: 100%;
  width: 100%;
  background: #3589BF;
}
#register-card {
  width: 480px;
  height: 600px;
  background: #FFFFFF;
  box-shadow: 0px 0px 15px 0px #504d5f;
  border-radius: 10px;
}
</style>