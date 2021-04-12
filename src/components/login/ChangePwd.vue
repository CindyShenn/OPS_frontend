<template>
  <div id="change-pwd">
    <div id="body" class="flex align-center justify-center flex-column">
      <div class="flex flex-column" style="margin-bottom: 20px;color: #FFFFFF">
        <span style="font-size: 25px">华南师范大学</span>
        <span style="font-size: 30px">在线编程教学平台</span>
      </div>

      <div id="ch-pwd-card" class="flex flex-column">
        <el-button type="text" style="font-size: 20px;margin-left: 20px" icon="el-icon-d-arrow-left" class="flex justify-start" @click="redirect('login')">返回</el-button>
        <span style="margin-top: 10px;margin-bottom: 9px;font-size: 32px;text-align: center">修改密码</span>
        <div style="margin:40px 46px 0px 46px">
          <el-form :model="changePwdForm" :rules="rules" label-position="left" ref="ruleForm" label-width="auto">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="changePwdForm.email" clearable></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="verificationCode">
              <div class="flex justify-between">
                <el-input placeholder="请输入验证码" v-model="changePwdForm.verificationCode"/>
                <el-button style="margin-left: 30px" type="primary" @click="getCode">获取验证码</el-button>
              </div>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="changePwdForm.password" clearable></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="password1">
              <el-input v-model="changePwdForm.password1" clearable></el-input>
            </el-form-item>
          </el-form>
          <el-button type="primary" style="width: 100%;margin-top: 10px;height: 50px" @click="changePwd">确认修改</el-button>
          <div class="flex justify-between align-center" style="margin-top: 10px;margin-bottom:46px;font-size: 14px">
            <div><span>已经有账号？</span><el-button type="text" style="font-size: 14px; color: #3F9EFF" @click="redirect('login')">马上登录</el-button></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChangePwd",
  data(){
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.changePwdForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return{
      changePwdForm: {
        email: '',
        password: '',
        password1: '',
        verificationCode:'',
      },
      rules: {
        email:[
          {required:true,message:'请输入邮箱',trigger:'blur'},
          { pattern: '^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$', message: '请输入正确格式的邮箱', trigger: 'blur' },
        ],
        password: [
          {required:true,message:'请输入密码',trigger:'blur'},
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
        password1: [
          {required:true,message:'请重新输入密码',trigger:'blur'},
          { validator: validatePass, trigger: 'blur' }
        ],
        verificationCode:[
          {required:true,message:'请输入验证码',trigger:'blur'},
          { min: 6,max:6, message: '请输入 6 位验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods:{
    redirect(url){
      this.$router.push({ path:url})
    },
    getCode(){
      let that=this
      this.axios({
        method: "post",
        url: "/web/user/verificationCode",
        data: {
          email: that.email,
        },
      }).then((res) => {
        console.log(res);
      });
    },
    changePwd(){
      let that=this
      this.axios({
        method: "post",
        url: "/web/user/password",
        data: {
          email: that.email,
          password: that.password,
          verificationCode: that.verificationCode,
        },
      }).then((res) => {
        this.info=res;
        console.log(res);
      });
    }
  },
}
</script>

<style scoped>
#change-pwd {
  width: 100%;
  height: 100%;
}

#body {
  height: 100%;
  width: 100%;
  background: #002d54
}

#ch-pwd-card {
  width: 480px;
  height: 520px;
  background: #FFFFFF;
  box-shadow: 0px 0px 15px 0px #504d5f;
  padding: 20px;
}
</style>