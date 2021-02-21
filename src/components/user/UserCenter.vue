<template>
<div id="user-center">
  <div id="main" class="flex align-center justify-center">
    <div id="login-card" class="flex flex-column">
      <span style="margin-top: 10px;font-size: 32px;text-align: center">编辑个人信息</span>
      <div style="margin:40px 46px 0px 46px">
        <span style="font-size: 14px;margin-bottom: 7px" class="flex user-input">邮箱</span>
        <el-input
            placeholder="12345678@qq.com"
            v-model="input"
            :disabled="true">
        </el-input>
        <span style="font-size: 14px;margin-bottom: 15px" class="flex user-input">身份</span>
        <el-radio-group v-model="radio" class="flex align-left">
          <el-radio :label="1">学生</el-radio>
          <el-radio :label="3">其他</el-radio>
        </el-radio-group>
        <span style="font-size: 14px;margin-bottom: 7px" class="flex user-input">昵称*</span>
        <el-input placeholder="请输入用户名"  v-model="user" clearable/>
        <span style="font-size: 14px;margin-bottom: 7px" class="flex user-input">真实姓名</span>
        <el-input placeholder="请输入用户名"  v-model="user" clearable/>
        <span style="font-size: 14px;margin-bottom: 7px" class="flex user-input">电话</span>
        <el-input placeholder="请输入用户名"  v-model="user" clearable/>
        <span style="font-size: 14px;margin-bottom: 7px" class="flex user-input">年级</span>
        <el-input placeholder="请输入用户名"  v-model="user" clearable/>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "UserCenter",
  data () {
    return {
      radio: 1
    };
  }
}
</script>

<style scoped>
.user-input{
  margin-top: 20px;
}
</style>