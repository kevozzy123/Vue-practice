import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import icon from '@/plugins/icon.js'
import api from '@/api/api.js'
import 'element-plus/dist/index.css'
import validation from '@/validation'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'


createApp(App).use(store).use(router).use(icon).use(validation).use(api).use(ElementPlus, {
    locale: zhCn
}).mount('#app')

// http://mall.itanychw.online:8888/api/v2/user?pagenum=1&pagesize=5