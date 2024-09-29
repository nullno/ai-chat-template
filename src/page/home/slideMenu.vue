<template>
  <div class="slide-menu">
    <ul class="list">
      <li @click="pageTo('/')" :class="{ active: $route.name === 'home' }">
        <i class="icon icon-home"></i>
        <span>首页</span>
      </li>
      <hr />
      <li @click="newChat()">
        <i class="icon icon-newChat"></i>
        <span>新会话</span>
      </li>
      <li
        @click="pageTo('/history')"
        :class="{ active: $route.name === 'history' }"
      >
        <i class="icon icon-history"></i>
        <span>历史会话</span>
      </li>
      <hr />
      <li class="user" v-if="userInfo">
        <img
          :src="userInfo.avatar || require('./assets/avatar.png')"
          :onerror="`javascript:this.src ='${require('./assets/avatar.png')}'`"
        />
        <span>{{ userInfo.userName }}</span>
      </li>
    </ul>
  </div>
</template>
<script>
import api from '@/api/index';
export default {
  data() {
    return {};
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  created() {},
  methods: {
    pageTo(path) {
      this.$router.push(path);
    },
    async newChat() {
      const Res = await api.newChat();
    }
  }
};
</script>
<style lang="less" scoped>
.slide-menu {
  position: fixed;
  top: 50%;
  left: 20px;
  transform: translateY(-65%);
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0px 0px 8px 0px #0000001a;
  z-index: 9;
}
.list {
  padding: 8px;
  list-style: none;
  hr {
    margin: 5px auto;
    width: 80%;
    height: 1px;
    background-color: #edf1f9;
  }
  li {
    width: 56px;
    height: 60px;
    margin: 0 auto;
    padding: 5px 0;
    border-radius: 8px;
    color: #7d8bb0;
    text-align: center;
    margin-bottom: 10px;
    cursor: pointer;

    span {
      font-size: 12px;
    }
    &.active,
    &:hover {
      background: #ebf1ff;
      color: #1061ff;
      .icon-home {
        background-image: url(./assets/icon-home-1.png);
      }
      .icon-newChat {
        background-image: url(./assets/icon-newChat-1.png);
      }
      .icon-history {
        background-image: url(./assets/icon-history-1.png);
      }
    }
  }
}
.icon {
  display: block;
  margin: 3px auto;
  width: 24px;
  height: 24px;
  background-size: 100% 100%;
  background-repeat: no-repeat;

  &.icon-home {
    background-image: url(./assets/icon-home.png);
  }
  &.icon-newChat {
    background-image: url(./assets/icon-newChat.png);
  }
  &.icon-history {
    background-image: url(./assets/icon-history.png);
  }
}

.list .user {
  &:hover {
    background: unset;
    color: #7d8bb0;
  }
  img {
    width: 40px;
    height: 40px;
    display: block;
    margin: 0 auto;
    border-radius: 40px;
  }
}
</style>
