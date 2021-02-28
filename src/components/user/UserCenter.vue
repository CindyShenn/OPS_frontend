<template>
<div id="user-center">
  <div id="body" class="flex align-center justify-center">
    <div class="container">
      <div id="section" class="flex flex-column">
        <span style="margin: 30px 40px 0px;font-size: 28px;text-align: left;font-weight: 400">个人信息</span>
        <div style="margin:20px 40px 0px 40px">
          <span style="font-size: 14px;margin-bottom: 7px" class="flex user-input">邮箱*</span>
          <el-input
              placeholder="12345678@qq.com"
              :disabled="true">
          </el-input>
          <span style="font-size: 14px;margin-bottom: 7px" class="flex user-input">昵称*</span>
          <el-input placeholder="请输入昵称"  v-model="nickName" />
          <span style="font-size: 14px;margin-bottom: 15px" class="flex user-input">单位</span>
          <el-input placeholder="请输入单位"  v-model="organization"/>
          <span style="font-size: 14px;margin-bottom: 7px" class="flex user-input">真实姓名</span>
          <el-input placeholder="请输入真实姓名"  v-model="realName"/>
          <span style="font-size: 14px;margin-bottom: 7px" class="flex user-input">专业</span>
          <el-input placeholder="请输入专业"  v-model="major"/>
          <span style="font-size: 14px;margin-bottom: 7px" class="flex user-input">学号</span>
          <el-input placeholder="请输入学号"  v-model="num"/>
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
</div>
</template>

<script>
export default {
  name: "UserCenter",
  data () {
    return {
      radio: 1,
      radio_sex: 1,
      nickName: '想不到昵称',
      organization:'华南师范大学',
      realName:'王小明',
      major:'计算机科学与技术',
      num:'20192321021',
    };
  }
}
</script>

<style scoped>
#user-center {
}

#body {
  width: 100%;
  background: #f9f9f9;
}

#section {
  height: 100%;
  background: #FFFFFF;
}
.user-input{
  margin-top: 20px;
}
</style>