import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import './themes/index.css';
import './components/common/global.css'
import App from './App.vue'
import router from  './components/router'
import axios from 'axios'
import VueAxios from 'vue-axios'


const app = createApp(App)
app.use(VueAxios, axios)
app.use(ElementPlus)
app.use(router)


axios.defaults.baseURL = 'http://118.178.253.239:3000/mock/22';//后端开发环境地址

app.mount('#app')
