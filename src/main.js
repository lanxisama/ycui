import Vue from 'vue'
import App from './App.vue'
import './assets/scss/index.scss'
Vue.config.productionTip = false
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
 

// Vue.use(ElementUI);
new Vue({
  render: h => h(App),
}).$mount('#app')
