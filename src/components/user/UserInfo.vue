<template>
  <div id="user-info">
    <div id="body" class="flex align-center justify-center">
      <div class="container">
        <div id="section" class="flex flex-column">
          <span style="margin: 30px 40px 0px;font-size: 28px;text-align: left;font-weight: 400">个人信息</span>
          <div style="margin:20px 40px 0px 40px">
            <span style="font-size: 14px;margin-bottom: 7px" class="flex user-input">邮箱*</span>
            <el-input
                v-model="email"
                :disabled="true">
            </el-input>
            <span style="font-size: 14px;margin-bottom: 7px" class="flex user-input">昵称*</span>
            <el-input placeholder="请输入昵称" v-model="nickName"/>
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
            <el-button type="primary" style="width: 100%;margin-top: 30px;margin-bottom: 30px;height: 50px"
                       @click="login">确认修改
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
      email:''
    };
  },
  mounted() {
    this.axios({
      method: "get",
      url: "/web/user/"+"12",
      data: {},
    }).then((res) => {
      //this.info=res;
      let data = res.data.data;
      this.nickName = data.nick_name;
      this.organization = data.organization;
      this.realName = data.real_name;
      this.major = data.major;
      this.num = data.num;
      this.email = data.email;
      this.radio_sex = Number(data.gender);
      console.log(res);
      console.log(data.gender)
    });
  }

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
</style>