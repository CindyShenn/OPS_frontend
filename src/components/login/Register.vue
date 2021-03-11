<template>
  <div id="register">
    <div id="body" class="flex align-center justify-center">
      <div id="register-card" class="flex flex-column">
        <el-button type="text" style="font-size: 20px;margin-left: 20px" icon="el-icon-d-arrow-left" class="flex justify-start" @click="redirect('login')">返回</el-button>
        <span style="margin-top: 40px;margin-bottom: 9px;font-size: 32px;text-align: center">用户注册</span>
        <div style="margin:40px 46px 0px 46px">
          <el-form :model="registerForm" :rules="rules" label-position="left" ref="ruleForm" label-width="auto">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="registerForm.email" clearable></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="verificationCode">
              <div class="flex justify-between">
                <el-input placeholder="请输入验证码" v-model="registerForm.verificationCode"/>
                <el-button style="margin-left: 30px" type="primary" @click="code">获取验证码</el-button>
              </div>
            </el-form-item>
            <el-form-item label="昵称" prop="nickName">
              <el-input v-model="registerForm.nickName" clearable></el-input>
            </el-form-item>
            <el-form-item label="真实姓名" prop="realName">
              <el-input v-model="registerForm.realName" clearable></el-input>
            </el-form-item>
            <el-form-item label="学号" prop="num">
              <el-input v-model="registerForm.num" clearable></el-input>
            </el-form-item>
            <el-form-item label="专业" prop="major">
              <el-input v-model="registerForm.major" clearable></el-input>
            </el-form-item>
            <el-form-item label="单位" prop="organization">
              <el-input v-model="registerForm.organization" clearable></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="registerForm.password" clearable></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="password1">
              <el-input v-model="registerForm.password1" clearable></el-input>
            </el-form-item>
            <el-form-item label="性别" class="flex justify-start" >
              <el-radio-group v-model="radio_sex">
                <el-radio :label="1">男</el-radio>
                <el-radio :label="2">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <el-button type="primary" style="width: 100%;margin-top: 10px;height: 50px" @click="register">立即注册</el-button>
          <div class="flex justify-between align-center" style="margin-top: 25px;margin-bottom:46px;font-size: 14px">
            <div><span>已经有账号？</span><el-button type="text" style="font-size: 14px; color: #3F9EFF" @click="redirect('login')">马上登录</el-button></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { ElMessage } from 'element-plus'

export default {
  name: "Register",
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      radio: 1,
      radio_sex: 1,
      registerForm: {
        email: '',
        nickName: '',
        organization: '',
        realName: '',
        major: '',
        num: '',
        password: '',
        password1: '',
        verificationCode:'',
      },
      rules: {
        email:[
          {required:true,message:'请输入邮箱',trigger:'blur'},
          { pattern: '^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$', message: '请输入正确格式的邮箱', trigger: 'blur' },
        ],
        nickName: [
          {required:true,message:'请输入昵称',trigger:'blur'},
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
        organization:[
          {required:false,message:'请输入单位',trigger:'blur'},
        ],
        realName: [
          {required:false,message:'请输入真实姓名',trigger:'blur'},
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
        major: [
          {required:false,message:'请输入专业',trigger:'blur'},
        ],
        num:[
          {required:false,message:'请输入学号',trigger:'blur'},
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
      },
    };
  },
  methods:{
    redirect(url){
      this.$router.push({ path:url})
    },
    register(){
      let self = this
      console.log(self.registerForm)
      this.axios({
        method: "post",
        url: "/web/user/signup/stu",
        data: {
          email:self.registerForm.email,
          nickName: self.registerForm.nickName,
          realName: self.registerForm.realName,
          major: self.registerForm.major,
          num:self.registerForm.num,
          gender:String(self.registerForm.radio_sex),
          password:self.registerForm.password,
          organization:self.registerForm.organization,
          verificationCode:self.registerForm.verificationCode,
        },
      }).then((res) => {
        this.info=res;
        console.log(res);
        if (res.status==200){
          ElMessage.success({
            message: '注册成功！ 请登录。',
            type: 'success'
          });
          self.redirect('login');
        }
      });
    },
    code(){
      let self = this
      this.axios({
        method: "post",
        url: "/web/user/verificationCode",
        data: {
          email:self.registerForm.email
        },
      }).then((res) => {
            this.info=res;
            console.log(res);
          }
      );
    },
  },
}
</script>

<style scoped>
#register {
}

#body {
  width: 100%;
  background: #f9f9f9;
}

#register-card {
  width: 60%;
  margin: 40px 0px;
  background: #FFFFFF;
  box-shadow: 0px 0px 15px 0px #504d5f;
  padding: 20px;
}

</style>