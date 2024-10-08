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
