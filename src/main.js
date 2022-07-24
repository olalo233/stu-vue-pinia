import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
// 导入 pinia
import {createPinia} from "pinia";

createApp(App)
  // 加载pinia插件
  .use(createPinia())
  .mount('#app')
