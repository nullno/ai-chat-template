<template>
  <div class="panel-loading-mask" v-if="$store.state.loading.show">
    <div class="panel-loading">
      <i class="icon-loading"></i>
      <span>{{ $store.state.loading.text || '加载中...' }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PanelLoading',
  props: {
    params: Object
  }
};
</script>
<style lang="less" scoped>
.panel-loading-mask {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0);
  z-index: 999;
}
.panel-loading {
  width: 100px;
  height: 100px;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  .icon-loading {
    width: 40px;
    height: 40px;
    margin: 15px auto;
    background-image: url('data:image/png;base64,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');
    background-size: 100% 100%;
    display: block;
    animation: spinner 1000ms linear infinite both;
  }
  span {
    color: #fff;
    display: block;
    text-align: center;
  }
}

@keyframes spinner {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
