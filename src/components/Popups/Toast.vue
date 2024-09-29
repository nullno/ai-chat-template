<!--
 * @Author: your name
 * @Date: 2021-07-26 10:02:47
 * @LastEditTime: 2021-09-03 11:45:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ty-approve-spa\src\components\Popups\Toast.vue
-->
<template>
  <transition name="fade">
    <div class="toast-info-wrap">
      <div class="toast-info" :class="className" v-if="visible">
        <span v-html="content"></span>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Toast',
  data() {
    return {
      visible: true,
      type: 'info', // 类型  info loading
      content: '',
      timer: null,
      time: 1000,
      className: ''
    };
  },
  mounted() {
    this.cancel();
  },
  methods: {
    cancel() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.visible = false;
        this.content = '';
        clearTimeout(this.timer);
      }, this.time);
    },
    adjustClass() {
      return 'toast-' + this.type;
    }
  }
};
</script>

<style scoped lang="less">
.toast-info {
  min-width: 260px;
  text-align: center;
  position: fixed;
  top: 50%;
  left: 50%;
  // margin-left: -130px;
  border-radius: 5px;
  font-size: 16px;
  z-index: 99;
  padding: 10px 20px;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  transform: translate(-50%, -50%);
}

.fade-enter,
.fade-enter-active {
  animation: fadeInUp 500ms both;
}
.fade-leave-active {
  animation: fadeOutDown 500ms both;
}
.toast-success {
  background: #fff;
  top: 45%;
  height: 100px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  color: #000;
  font-weight: bold;
  line-height: 75px;
  &:before {
    content: '';
    width: 40px;
    height: 40px;
    display: inline-block;
    // background: url(./assets/icon-success.png) no-repeat;
    background-size: 100% 100%;
    vertical-align: middle;
    margin: 10px;
  }
  & > span {
    vertical-align: middle;
    font-size: 20px;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
@keyframes fadeOutDown {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
}
</style>
