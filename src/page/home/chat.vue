<template>
  <div class="chat">
    <div class="header">
      <div class="tit">
        <span @click.stop="showDownPanel = !showDownPanel">{{
          chatTitle
        }}</span>
        <ul class="down-panel" v-show="showDownPanel">
          <li @click="popupPanelShow = true">修改名称</li>
          <li @click="del()">删除</li>
        </ul>
      </div>
    </div>
    <div class="main" id="chatMain">
      <div class="wrap">
        <ChatItem
          v-for="(item, index) in chatList"
          :key="index"
          :item="item"
          @closeOutput="closeOutput"
          @submitPrompt="onEnter"
        ></ChatItem>
      </div>
    </div>
    <div class="edit">
      <StartPrompt :type="'chat'" :isAnswering="isAnswering" @enter="onEnter" />
    </div>
    <ty-popup-panel
      title="修改名称"
      :show="popupPanelShow"
      :option="['取消', '确定']"
      :hideHead="false"
      :drag="true"
      bgColor="rgba(0,0,0,0.5)"
      @onConfirm="popupPanelConfirm"
      @onCancel="popupPanelCancel"
      @onClose="popupPanelClose"
      @onOpen="popupPanelOpen"
    >
      <input type="text" v-model="tempEditTitle" class="edit-title" />
    </ty-popup-panel>
  </div>
</template>
<script>
import StartPrompt from './startPrompt.vue';
import ChatItem from './chatItem.vue';
import ai from '@/utils/ai';
import tempCache from '@/store/tempCache';
import api from '@/api/index';
export default {
  components: {
    StartPrompt,
    ChatItem
  },
  data() {
    return {
      isAnswering: false,
      showDownPanel: false,
      chatTitle: '未命名会话',
      tempEditTitle: '',
      chatList: [
        {
          role: 1,
          type: 'text',
          state: 3,
          content: 'Hi~，我是你的AI助手，你有什么问题都可以问我哦~'
        }
      ],
      eventSourceController: null,
      pagination: {
        page_index: 1,
        page_size: 10
      },
      loadingState: 1,
      popupPanelShow: false,
      curChatInfo: {}
    };
  },
  computed: {
    chatId() {
      return this.$route.params.id;
    }
  },
  watch: {
    chatId(val) {
      console.log(val);
      this.init();
    }
  },
  created() {
    this.init();
  },

  mounted() {
    this.addEventListener();
  },

  methods: {
    init() {
      if (localStorage.curChat) {
        this.curChatInfo = JSON.parse(localStorage.curChat);
        this.chatTitle = this.curChatInfo.title;
      }
      if (tempCache.homePrompt) {
        this.chatTitle = tempCache.homePrompt.prompt;
        this.onEnter(tempCache.homePrompt);
      } else {
        this.chatList = [];
        this.pagination.page_index = 1;
        this.getList();
      }
    },
    async getList() {
      if (this.loadingState == 2) return;
      this.loadingState = 2;
      // const { info, list } = await api.getChatDetail({
      //   qkey: this.chatId,
      //   ...this.pagination
      // });

      this.curChatInfo = {};
      const list = [];
      const tempList = [];

      list.forEach(item => {
        if (item.q_content && item.q_content.includes('{')) {
          tempList.push(JSON.parse(item.q_content));
        }
        if (item.a_content && item.a_content.includes('{')) {
          tempList.push(JSON.parse(item.a_content));
        }
      });
      this.chatList = this.chatList.concat(tempList);
      this.loadingState = 1;
      if (list.length < this.pagination.page_size) {
        this.loadingState = 3;
      }
      if (this.loadingState != 3) {
        this.pagination.page_index++;
        this.getList();
      }
      if (this.pagination.page_index == 1 && this.chatList.length == 0) {
        this.chatList.push({
          role: 1,
          type: 'text',
          state: 3,
          content: 'Hi~，我是你的AI助手，你有什么问题都可以问我哦~'
        });
      }
      this.$nextTick(() => {
        this.listenScrollBottom();
      });
    },
    // 保存会话
    async pushChatDetail(chatUserObj, chatAiObj) {},
    closeOutput() {
      this.eventSourceController.abort();
    },
    async onEnter(e) {
      const _scope = this;
      if (this.isAnswering) return;
      const chatUserObj = {
        role: 2,
        type: 'text',
        content: e.prompt,
        state: 0,
        from: e.from
      };
      const chatAiObj = {
        role: 1,
        type: 'markdown',
        content: '',
        state: 1,
        course: [],
        suggest: [],
        from: e.from
      };
      this.chatList.push(chatUserObj);
      this.chatList.push(chatAiObj);
      this.isAnswering = true;
      this.eventSource = null;
      tempCache.homePrompt = null;
      this.$nextTick(() => {
        _scope.listenScrollBottom();
      });

      const completion = await ai({
        prompt: e.prompt,
        init(controller) {
          _scope.eventSourceController = controller;
        },
        onMessage(content) {
          chatAiObj.state = 2;
          chatAiObj.content += content;
          _scope.listenScrollBottom();
        }
      });

      if (completion.error || chatAiObj.content.length === 0) {
        chatAiObj.type = 'text';
        chatAiObj.content = completion.msg;
      }

      chatAiObj.state = 3;
      if (completion.over) {
        await this.getRecommend(chatUserObj, chatAiObj);
      }

      this.pushChatDetail(chatUserObj, chatAiObj);

      this.isAnswering = false;
      this.$nextTick(() => {
        this.listenScrollBottom();
      });
    },

    async getRecommend(chatUserObj, chatAiObj) {
      // const suggestList = await api.getSuggestQuestion(chatUserObj.content);
      // chatAiObj.suggest = suggestList;
    },
    listenScrollBottom() {
      const conversationEl = document.querySelector('#chatMain');
      conversationEl.scrollTop =
        conversationEl.scrollHeight + conversationEl.clientHeight;
    },
    addEventListener() {
      const conversationEl = document.querySelector('#chatMain');
      document.body.addEventListener('click', this.clearBubble, false);
    },
    clearBubble() {
      this.showDownPanel = false;
    },
    del() {
      const _scope = this;
      this.$alert({
        type: 'wran',
        message: '会话删除后不能恢复，要删除吗？',
        option: ['删除', '取消'],
        async onConfirm(_this) {
          // const res = await api.delChat({
          //   id: _scope.curChatInfo.id,
          //   qkey: _scope.chatId
          // });

          await api.newChat();

          _this.close();
        }
      });
    },
    popupPanelOpen() {
      this.tempEditTitle = this.chatTitle;
    },
    async popupPanelConfirm(_this) {
      // const Res = await api.updateChat({
      //   title: this.tempEditTitle,
      //   id: this.curChatInfo.id,
      //   qkey: this.chatId
      // });
      // if (Res) {
      // }
      this.chatTitle = this.tempEditTitle;

      _this.close();
    },
    popupPanelCancel() {},
    popupPanelClose() {
      this.popupPanelShow = false;
    }
  },
  destroyed() {
    document.body.removeEventListener('click', this.clearBubble, false);
  }
};
</script>

<style lang="less" scoped>
.chat {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-flow: column;
  ul {
    list-style: none;
  }
  .header {
    height: 40px;
    display: flex;
    align-items: center;
    background-color: #f3f5fa;
    box-shadow: 0px 0px 52px 24px #f3f5fa;
    position: relative;
    z-index: 2;
  }
  .main {
    flex: 1;
    width: 99%;
    margin: 0 auto;
    overflow-y: auto;
    scroll-behavior: smooth;
    .wrap {
      max-width: 800px;
      margin: 0 auto;
      padding: 30px 0;
      overflow: hidden;
    }
  }
  .edit {
    height: 200px;
    .start-prompt {
      padding-bottom: unset;
    }
  }
}
.tit {
  margin: 0 auto;
  max-width: 800px;
  text-align: center;
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 8px;
  padding: 5px 8px;
  position: relative;
  user-select: none;
  span {
    background: url(./assets/icon-down.png) no-repeat;
    background-size: 20px 20px;
    padding-right: 20px;
    background-position: center right;
    // &:after {
    //   content: '';

    // }
  }
  &:hover {
    background-color: #e5e7ed;
  }
  .down-panel {
    position: absolute;
    width: 136px;
    background-color: #fff;
    border: 1px solid #dce3f2;
    top: 35px;
    right: 0;
    border-radius: 8px;
    overflow: hidden;
    animation: zoomInUp 200ms both;

    li {
      height: 40px;
      line-height: 40px;
      text-align: left;
      padding-left: 40px;
      background-repeat: no-repeat;
      background-size: 20px 20px;
      background-position: center left 10%;
      user-select: none;
      &:first-child {
        border-bottom: 1px solid #dce3f2;
        background-image: url(./assets/icon-pen.png);
      }
      &:last-child {
        color: #e55968;
        background-image: url(./assets/icon-del.png);
      }
      &:hover {
        background-color: #e5e7ed;
      }
    }
  }
}

.edit-title {
  width: 100%;
  border: 1px solid #dce3f2;
  border-radius: 5px;
  line-height: 30px;
  padding: 0 5px;
}
</style>
