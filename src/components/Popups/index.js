/*
 * @Author: your name
 * @Date: 2021-07-15 14:53:41
 * @LastEditTime: 2021-07-29 10:37:56
 * @LastEditors: Please set LastEditors
 * @Description: 挂载弹窗类组件
 * @FilePath: \ai-chat\src\components\popups\index.js
 */
import Vue from 'vue';
import MsgAlert from './MsgAlert.vue';
import Toast from './Toast.vue';

const PopUpsInstanceArr = [
  {
    name: 'msgAlert',
    Instance: Vue.extend(MsgAlert),
    vm: null
  }
  // {
  //   name: 'toast',
  //   Instance: Vue.extend(Toast),
  //   vm: null
  // }
];

PopUpsInstanceArr.forEach(InstanceItem => {
  InstanceItem.vm = function(options = {}) {
    if (Vue.prototype.$isServer) return;
    if (typeof options === 'string') {
      options = {
        visible: true
      };
    }
    const instance = new InstanceItem.Instance({ data: options });
    instance.vm = instance.$mount();
    document.body.appendChild(instance.vm.$el);
    return instance.vm;
  };
});

export default {
  install(Vue) {
    PopUpsInstanceArr.forEach(InstanceItem => {
      Vue.prototype['$' + InstanceItem.name] = InstanceItem.vm;
    });
  }
};
