import services from "../config/axios";

type studentRegisterParamsType = {
    email:string;
    realName:string;
    num:string;
    gender:number;
    password:string;
    major:string;
    organization:string;
    verificationCode:number;
}

type modifyUserParamsType = {
    userId:number;
    realName:string;
    num:string;
    gender:string;
    major:string;
    organization:string;
}

const UserAPI = {
    // 学生注册
    StudentRegister(params: studentRegisterParamsType) {
        return services.post('/web/user/signup/stu', params);
    },
    // 根据id查询用户信息
    GetUserById(params:{ userId:string}){
        return services.get(`/web/user/${params.userId}`,{
            params:params
        })
    },
    // 根据token查询用户信息
    GetUserByToken(){
        return services.get(`/web/user`)
    },
    // 用户修改
    ModifyUser(params: modifyUserParamsType){
        return services.put('/web/user', params);
    },
    // 修改用户头像
    ModifyUserAvatarUrl(params:{avatarUrl:string}){
        return services.put('/web/user', params);
    },
    // 重置密码
    ModifyPassword(params:{email:string;password:string;verificationCode:string}){
        return services.put('/web/user/password', params);
    },
    // 发送验证码
    SendVerificationCode(params:{email:string}){
        return services.post('/web/user/verificationCode', params);
    },
}

export default UserAPI