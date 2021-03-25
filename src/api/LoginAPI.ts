import services from "../config/axios";

// 定义参数类型
type loginParamsType = {
    username: string; // 用户名
    password: string; // 密码
};

const LoginAPI = {
    // 登录
    // this.$api.websiteManageAPI
    //               .login({
    //                 userName: this.userName,
    //                 password: this.password
    //               })
    Login(params: loginParamsType) {
        return services.post(`/web/login`, params);
    },
}

export default LoginAPI;