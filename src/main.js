import Vue from 'vue';
import App from './App.vue';
import router from '@/router';
import store from '@/store/index';

import { loadScript } from '@/utils/index';

// 公用组件
import '@/components/index';

// 过滤器
import '@/filters';

// 全局混入设置
import { options } from '@/mixins';

Vue.mixin(options);

// 关闭提示
Vue.config.productionTip = false;

// if (process.env.VUE_APP_MODE === 'pro') {
//   console.log('执行正式打包命令...');
// }

window._vm = new Vue({
  router,
  store,
  data: {
    eventHub: new Vue()
  },
  render: h => h(App)
}).$mount('#app');

// 开起调试
/* eslint-disable */
// if (process.env.VUE_APP_MODE != 'pro') {
//   loadScript('https://cdn.bootcss.com/eruda/1.5.8/eruda.min.js').then(() => {
//     eruda.init();
//   });
// }
