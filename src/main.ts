import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import './themes/index.css';
import './components/common/global.css'
import App from './App.vue'
import router from  './components/router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from "./components/store";

const app = createApp(App)
app.use(VueAxios, axios)
app.use(ElementPlus)
app.use(router)
app.use(store)


axios.defaults.baseURL = 'http://118.178.253.239:3000/mock/22';//后端开发环境地址
//添加请求拦截器
axios.interceptors.request.use(
    config =>{
        if(store.state.token){
            config.headers.common['token'] =store.state.token
        }
        return config;
    },
    error =>{
        //对请求错误做什么
        return Promise.reject(error);
    }
)
//http response拦截器
axios.interceptors.response.use(
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
)

app.mount('#app')
