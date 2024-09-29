import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
// 存储数据
const state = {
  userInfo: {
    userName: '豆豆',
    avatar: ''
  },
  loading: {
    show: false,
    text: ''
  },
  pageShow: false
};
// 即时更改
const mutations = {
  setUserInfo(state, obj) {
    state.userInfo = obj;
  },
  setLoading(state, obj) {
    state.loading = Object.assign(state.loading, obj);
  },
  setPageShow(state, boolean) {
    state.pageShow = boolean;
  }
};
// 异步更改
const actions = {
  setUserInfo({ commit }, obj) {
    commit('setUserInfo', obj);
  },
  setLoading({ commit }, obj) {
    commit('setLoading', obj);
  },
  setPageShow({ commit }, boolean) {
    commit('setPageShow', boolean);
  }
};

const Store = new Vuex.Store({
  state,
  mutations,
  actions
});

export default Store;
