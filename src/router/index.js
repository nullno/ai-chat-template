/*
 * @Author: your name
 * @Date: 2021-07-12 16:12:22
 * @LastEditTime: 2021-08-18 13:45:39
 * @LastEditors: Please set LastEditors
 * @Description: 路由实例
 * @FilePath: \ai-chat\src\router\index.js
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import tempCache from '@/store/tempCache';
import qs from 'qs';
Vue.use(VueRouter);

// 两次路由报错问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

// 初始化路由实例
const router = new VueRouter({
  routes,
  base: process.env.BASE_URL,
  linkActiveClass: 'act',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 从载入链接处获取用户信息 !sessionStorage.userInfo
  if (
    location.href.indexOf('personId=') != -1 &&
    location.href.indexOf('usessionId=') != -1
  ) {
    let enterParam = location.search
      ? /\?[^#]+/.exec(location.search)[0]
      : null;
    if (!location.search) {
      enterParam = location.hash ? /\?[^#]+/.exec(location.hash)[0] : null;
    }
    const query = qs.parse(enterParam.replace('?', ''));

    sessionStorage.userInfo = JSON.stringify(query);
    // next(to.path);
    // 防止二次进入缓存
    // location.href = location.origin + location.pathname;
    // return;
  }
  // 开发环境默认用户数据
  if (process.env.NODE_ENV == 'development') {
    if (!sessionStorage.userInfo) {
      sessionStorage.userInfo = JSON.stringify(tempCache.userInfo);
    }
  }
  next();
});

// 全局后置守卫
router.afterEach((to, from) => {
  if (to.path && process.env.NODE_ENV === 'production') {
    // console.log('正式上线执行...');
  }
  sessionStorage.curHref = location.href;
});

export default router;
