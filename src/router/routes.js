export default [
  {
    name: 'empty',
    path: '*',
    component: () => import(/* webpackChunkName: 'index' */ '../page/404.vue'),
    meta: {
      name: 'Not found',
      title: '404'
    }
  },
  {
    name: 'home',
    path: '/',
    component: () =>
      import(/* webpackChunkName: 'index' */ '../page/home/index'),
    meta: {
      // keepAlive: true
    }
  },
  {
    name: 'chat',
    path: '/chat/:id',
    component: () =>
      import(/* webpackChunkName: 'index' */ '../page/home/chat'),
    meta: {
      keepAlive: false
    }
  },
  {
    name: 'history',
    path: '/history',
    component: () =>
      import(/* webpackChunkName: 'index' */ '../page/home/history'),
    meta: {
      title: '历史会话'
      // keepAlive: true
    }
  }
];
