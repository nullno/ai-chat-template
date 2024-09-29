<template>
  <div class="home">
    <StartPrompt @enter="onEnter" />
  </div>
</template>
<script>
import StartPrompt from './startPrompt.vue';
import tempCache from '@/store/tempCache';
import api from '@/api/index';
export default {
  components: {
    StartPrompt
  },
  data() {
    return {
      value: true
    };
  },
  created() {},
  methods: {
    async onEnter(e) {
      tempCache.homePrompt = e;
      const Res = await api.newChat(e.prompt);
    }
  }
};
</script>

<style lang="less" scoped>
.home {
  height: 100%;
}
</style>
