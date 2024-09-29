import Request from './request';
import Vue from 'vue';
import tempCache from '@/store/tempCache';
const API = {
  isCreating: false,
  // 新建会话
  async newChat(title) {
    try {
      // if (!sessionStorage.userInfo) {
      //   Vue.prototype.$toast({
      //     type: 'error',
      //     message: '请先登录',
      //     duration: 1000
      //   });
      //   return;
      // }
      if (this.isCreating) return;
      this.isCreating = true;
      // const Res = await Request.post('create_chat', {
      //   title: title || '未命名会话',
      //   is_main: 1
      // });
      // if (Res.recode != '000000') throw 'failed;';
      // localStorage.curChat = JSON.stringify(Res.data);
      // window._vm.$router.push('/chat/' + Res.data.qkey);
      window._vm.$router.push('/chat/' + new Date().getTime());
      this.isCreating = false;
      return {};
    } catch (err) {
      console.log(err);
      tempCache.homePrompt = null;
      Vue.prototype.$toast({
        type: 'error',
        message: '创建会话失败',
        duration: 1000
      });
      this.isCreating = false;
      return false;
    }
  },
  async getRecommend() {
    try {
      const Res = await Request.post('/api/show_case/list', {
        offset: 0,
        size: 5,
        enable_cache: true,
        user_type: 'old',
   
      });
      if (!Res.items) throw 'failed';
      return Res.items;
    } catch (err) {
      return [];
    }
  }
};

export default API;
