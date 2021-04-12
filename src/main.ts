import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import 'dayjs/locale/zh-cn'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import './themes/index.css';
import './components/common/global.css'
import App from './App.vue'
import router from  './components/router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from "./store";

import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { CalendarComponent,
         VisualMapComponent,
    TitleComponent,
    LegendComponent,
} from 'echarts/components';
import { HeatmapChart } from 'echarts/charts';
import api from "./api/index";
import PageHeader from "./components/desk/PageHeader.vue";
import Pagination from "./components/common/Pagination.vue"

use([
    CanvasRenderer,
    CalendarComponent,
    VisualMapComponent,
    HeatmapChart,
    TitleComponent,
    LegendComponent,
]);



const app = createApp(App)

// 挂载api
app.config.globalProperties.$api = api;

app.use(VueAxios, axios)
app.use(ElementPlus, { locale })
app.use(router)
app.use(store)
app.component('PageHeader',PageHeader)
app.component('Pagination',Pagination)



axios.defaults.baseURL = 'http://118.178.253.239:8080';//后端开发环境地址
axios.defaults.timeout = 50000;
//添加请求拦截器
axios.interceptors.request.use(
    config =>{
        if(store.state.token){
            config.headers.common['Authorization'] = 'Bearer '+ store.state.token
        }
        return config;
    },
    error =>{
        //对请求错误做什么
        //return Promise.reject(error);
    }
);
//http response拦截器
axios.interceptors.response.use(
    response =>{
        if(response.data.code == 20001){
            localStorage.removeItem('token');
            router.push({path: 'login'});
        }
        return response;
    },
    error=>{
        if(error.response){
            switch(error.response.status){
                case 20001:
                    localStorage.removeItem('token');
                    router.push({path: 'login'});
                    break;
            }
        }

    }
);

app.mount('#app')
