/**
 * 对axios稍作封装
 * 1. 设置请求超时时间
 * 2. 添加请求拦截器，在每个请求的头部添加token
 * 3. 添加响应拦截器，根据服务器返回状态进行相应的结果返回
 */

import axiosObj, { AxiosRequestConfig, AxiosResponse } from "axios";
import store from "../store";
import router from "../components/router";

const defaultConfig = {
    // baseURL在此处省略配置,此处通过对api的抽离，域名单独配置在base.js中
    baseURL: 'http://118.178.253.239:8080',//后端开发环境地址
    // 请求超时时间
    timeout: 60 * 1000,

    // 使用默认请求头，当需要特殊请求头时，将其作为参数传入，即可覆盖此处的默认参数(第三个参数即config)
    // 例如：
    //     services.post(`${base.lkBaseURL}/uploads/singleFileUpload`, file, {
    //       headers: { "Content-Type": "multipart/form-data" }
    //     });

    // 跨域请求时是否需要凭证
    // withCredentials: true, // Check cross-site Access-Control

    // 在向服务器发送请求前，对数据进行处理，axios默认会序列化数据
    // transformRequest:[function(data){
    //
    // }],
    // 在传递给 then/catch 前，修改响应数据
    // transformResponse:[function(data){
    //
    // }]
};


// 创建实例
const _axios = axiosObj.create(defaultConfig);
// 请求拦截器
_axios.interceptors.request.use(
    function(config: AxiosRequestConfig) {
        // 从vuex里获取token
        if(store.state.token){
            config.headers.common['Authorization'] = 'Bearer '+ store.state.token
        }
        return config;
    },
    function(error) {
        // Do something with request error
        error.data = {};
        error.data.msg = "服务器异常";
        return Promise.reject(error);
    }
);
// 响应拦截器
_axios.interceptors.response.use(
    response =>{
        return response;
    },
    error=>{
        if(error.response){
            switch(error.response.status){
                case 401:
                    localStorage.removeItem('token');
                    router.push({path: 'login'})
            }
        }

    }
);

export default _axios;