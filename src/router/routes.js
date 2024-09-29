/*
 * @Author: your name
 * @Date: 2021-09-10 17:05:22
 * @LastEditTime: 2021-09-10 17:27:12
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \ai-chat\src\router\routes.js
 */
export default [
  {
    name: 'empty',
    path: '*',
    component: () =>
      import(/* webpackChunkName: 'pageIndex' */ '../page/404.vue'),
    meta: {
      name: 'Not found',
      title: '404'
    }
  },
  {
    name: 'home',
    path: '/',
    component: () =>
      import(/* webpackChunkName: 'pageIndex' */ '../page/home/index'),
    meta: {
      // keepAlive: true
    }
  },
  {
    name: 'chat',
    path: '/chat/:id',
    component: () =>
      import(/* webpackChunkName: 'pageIndex' */ '../page/home/chat'),
    meta: {
      keepAlive: false
    }
  },
  {
    name: 'history',
    path: '/history',
    component: () =>
      import(/* webpackChunkName: 'pageIndex' */ '../page/home/history'),
    meta: {
      title: '历史会话'
      // keepAlive: true
    }
  }
];
