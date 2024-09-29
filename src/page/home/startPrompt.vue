<template>
  <div class="start-prompt">
    <div class="wrap">
      <div class="logo" v-if="type === 'home'">AI CHAT</div>
      <div class="prompt-edit">
        <textarea
          v-model.trim="prompt"
          placeholder="请输入问题。Enter 发送，Ctrl + Enter 换行"
          @input="onInput"
          @keydown="Keydown"
        ></textarea>
      </div>

      <div class="tool-bar">
        <div class="switch">
          <ty-switch v-model="searchP" active-text="联网搜索"></ty-switch>
        </div>
        <ty-tooltip
          effect="dark"
          content="请输入你的问题"
          placement="top"
          :disabled="allowSubmit"
        >
          <button
            class="submit"
            :class="{ active: allowSubmit }"
            @click="onEnter('')"
          >
            <span>发送</span>
          </button>
        </ty-tooltip>
      </div>

      <ul class="prompt-list" v-if="type === 'home'">
        <li
          v-for="(item, index) in promptList"
          :key="index"
          @click="onEnter(item.title)"
        >
          <span class="icon">
            <!-- <img :src="item.avatar" alt="" /> -->
            {{ item.icon_emoji }}
          </span>
          <span>{{ item.title }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import api from '@/api/index';
export default {
  name: 'StartPrompt',
  props: {
    type: {
      type: String,
      default: 'home'
    },
    isAnswering: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prompt: '',
      searchC: false,
      searchP: true,
      promptList: []
    };
  },
  computed: {
    allowSubmit() {
      return this.prompt.length > 0 && !this.isAnswering;
    }
  },
  mounted() {
    this.getRecommendQuestion();
  },
  methods: {
    async getRecommendQuestion() {
      if (this.type != 'home') return;
      const list = await api.getRecommend();
      if (list.length > 0) {
        this.promptList = list;
      }
    },
    onInput(e) {
      this.$emit('input', e.target.value);
    },
    Keydown(e) {
      if (!e.shiftKey && e.keyCode == 13) {
        e.cancelBubble = true; //ie阻止冒泡行为
        e.stopPropagation(); //Firefox阻止冒泡行为
        e.preventDefault(); //取消事件的默认动作*换行
        this.onEnter();
      }
    },
    onEnter(text) {
      let from = 2;
      if (this.searchC) {
        from = 1;
      }
      if (this.searchP) {
        from = 2;
      }
      this.$emit('enter', {
        prompt: text || this.prompt,
        from: from
      });
      this.prompt = '';
    }
  }
};
</script>
<style lang="less" scoped>
.start-prompt {
  max-width: 800px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 100px;
  .wrap {
    width: 100%;
    display: flex;
    align-items: center;
    flex-flow: column;
  }
}

.logo {
  display: flex;
  align-items: center;
  font-size: 36px;
  font-weight: 600;

  margin-bottom: 20px;
  &::before {
    content: '';
    margin-right: 20px;
    width: 72px;
    height: 72px;
    background: url(./assets/avatar-ai.png) no-repeat;
    background-size: 100% 100%;
  }
}
.prompt-edit {
  padding: 10px;
  width: 100%;
  height: 120px;
  background-color: #fff;
  border: 1px solid #dce3f2;
  border-radius: 12px;
  textarea {
    width: 100%;
    height: 100%;
    background-color: #fff;
    font-size: 16px;
    line-height: 30px;
    resize: none;
    color: #666;
    &::placeholder {
      color: #c5d2f2;
    }
  }
  &:hover {
    box-shadow: 0px 8px 24px -4px #5b6f971f;
  }
}

.tool-bar {
  padding: 10px 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  .ty-switch {
    margin-right: 50px;
  }
  .submit {
    background-color: #c4d1f3;
    width: 84px;
    height: 32px;
    border-radius: 20px;
    color: #fff;
    padding: 0;
    cursor: default;
    span {
      vertical-align: middle;
    }
    &::before {
      content: '';
      display: inline-block;
      width: 24px;
      height: 24px;
      background: url(./assets/icon-send.png) no-repeat;
      background-size: 100% 100%;
      vertical-align: middle;
      margin-left: -5px;
    }

    &.active {
      cursor: pointer;
      background-color: #0085ff;
    }
  }
}

.prompt-list {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-top: 20px;
  list-style: none;
  li {
    display: flex;
    align-items: center;
    border-radius: 8px;
    background-color: #fff;
    padding: 5px 8px;
    color: #7284ae;
    margin-right: 15px;
    margin-bottom: 15px;
    cursor: pointer;
    animation: fadeInUp 1000ms both;
    .icon {
      margin-right: 5px;
      width: 24px;
      height: 24px;
      img {
        width: 100%;
      }
    }
    &:hover {
      background-color: #c4d1f3;
      color: #fff;
    }
  }
}
</style>
