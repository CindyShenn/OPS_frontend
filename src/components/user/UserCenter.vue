<template>
<div id="user-center">
  <div id="main" class="flex align-center justify-center">
    <div id="user-center-card" class="flex flex-column">
      <span style="margin-top: 10px;font-size: 32px;text-align: center">编辑个人信息</span>
      <div style="margin:40px 46px 0px 46px; overflow:auto">
        <span style="font-size: 14px;margin-bottom: 7px" class="flex user-input">邮箱</span>
        <el-input
            placeholder="12345678@qq.com"
            v-model="input"
            :disabled="true">
        </el-input>
        <span style="font-size: 14px;margin-bottom: 15px" class="flex user-input">身份</span>
        <el-radio-group v-model="radio" class="flex align-left">
          <el-radio :label="1">学生</el-radio>
          <el-radio :label="2">其他</el-radio>
        </el-radio-group>
        <span style="font-size: 14px;margin-bottom: 7px" class="flex user-input">昵称*</span>
        <el-input placeholder="请输入昵称"  v-model="user" clearable/>
        <span style="font-size: 14px;margin-bottom: 7px" class="flex user-input">真实姓名</span>
        <el-input placeholder="请输入真实姓名"  v-model="user" clearable/>
        <span style="font-size: 14px;margin-bottom: 7px" class="flex user-input">电话</span>
        <el-input placeholder="请输入电话"  v-model="user" clearable/>
        <span style="font-size: 14px;margin-bottom: 7px" class="flex user-input">年级</span>
        <el-input placeholder="请输入年级"  v-model="user" clearable/>
        <span style="font-size: 14px;margin-bottom: 7px" class="flex user-input">编号</span>
        <el-input placeholder="请输入编号"  v-model="user" clearable/>
        <span style="font-size: 14px;margin-bottom: 15px" class="flex user-input">性别</span>
        <el-radio-group v-model="radio_sex" class="flex align-left">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="2">女</el-radio>
        </el-radio-group>
        <el-button type="primary" style="width: 100%;margin-top: 30px;margin-bottom: 30px;height: 50px" @click="login">确认修改</el-button>
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
      radio: 1,
      radio_sex: 1,
    };
  }
}
</script>

<style scoped>
#user-center {
  width: 100%;
  height: 100%;
}

#main {
  height: 100%;
  width: 100%;
  background: #3589BF;
}

#user-center-card {
  width:50%;
  height: 700px;
  background: #FFFFFF;
  box-shadow: 0px 0px 15px 0px #504d5f;
  border-radius: 10px;
}
.user-input{
  margin-top: 20px;
}
</style>