<template>
  <div id="app" v-cloak>
    <div class="app-container">
      <SlideMenu />
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
  </div>
</template>
<script>
import SlideMenu from '@/page/home/slideMenu.vue';
export default {
  name: 'app',
  components: {
    SlideMenu
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>
<style lang="less">
@import './assets/css/common.css';
@import './assets/css/markdown.css';
.app-container {
  animation: fadeIn 1000ms both;
  height: 100%;
}
</style>
