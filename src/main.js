// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueCookie from 'vue-cookie';

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(VueCookie);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created() {
    this.checkLogin();
  },
  watch:{
    "$route" : 'checkLogin'
  },
  methods:{
    checkLogin(){
      let user = VueCookie.get('username');
      if(!user) {
        this.$router.push({path: '/login'});
      }else{
        this.$router.push({path: '/card'});
      }
    }
  }
})

// router.beforeEach((to, from, next) => {
//   let user = VueCookie.get('username');
//   if (!user && to.path != '/login') {
//       next({ path: '/login' });
//   } else {
//       next();
//   }
// });