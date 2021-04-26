import services from "../config/axios";

// 定义参数类型
type loginParamsType = {
    username: string; // 用户名
    password: string; // 密码
};

const LoginAPI = {
    Login(params: loginParamsType) {
        return services.post(`/web/login`, params);
    },
}

export default LoginAPI;