<template>
  <div id="change-pwd">
    <div id="main" class="flex align-center justify-center">
      <div id="login-card" class="flex flex-column">
        <span style="margin-top: 30px;font-size: 32px;text-align: center">修改密码</span>
        <div style="margin:40px 46px 0px 46px">
          <div style="margin-top: 15px;margin-bottom: 7px" class="flex justify-between">
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
          <el-button type="primary" style="width: 100%;margin-top: 40px;margin-bottom:30px;height: 50px" @click="login">确认修改</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChangePwd"
}
</script>

<style scoped>
#change-pwd {
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
  height: 540px;
  background: #FFFFFF;
  box-shadow: 0px 0px 15px 0px #504d5f;
  border-radius: 10px;
}
</style>