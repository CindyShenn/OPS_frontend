import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import './theme/index.css';
import './components/common/global.css'
import App from './App.vue'
import router from  './components/router'


const app = createApp(App)
app.use(ElementPlus)
app.use(router)

app.mount('#app')
