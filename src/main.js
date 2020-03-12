import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
import { setCookie, getCookie } from "./utils/index"

Vue.config.productionTip = false
Vue.use(ElementUI);

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
  let token = getCookie("token")
  if (!token && to.path !== '/login') {
    next('/login');
  } else {
    next()
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
