<template>
  <!-- user-item -->
  <div
    class="chat-item"
    :class="{ 'ai-item': item.role == 1, 'user-item': item.role == 2 }"
  >
    <div class="avatar">
      <img
        :src="
          item.role == 1
            ? require('./assets/avatar-ai.png')
            : (userInfo && userInfo.avatar) || require('./assets/avatar.png')
        "
        :onerror="`javascript:this.src ='${require('./assets/avatar.png')}'`"
      />
    </div>
    <div class="content">
      <div class="wrap">
        <div class="loading" v-if="isLoading">
          正在思考...
        </div>
        <template v-else>
          <div class="text-content" v-if="item.type == 'text'">
            {{ item.content }}
          </div>
          <div class="html-content" v-if="item.type == 'markdown'">
            <span class="blinker" ref="blinker" v-if="item.state === 2"></span>
            <div
              class="markdown-content"
              v-html="markdownContent"
              ref="markdownContent"
            ></div>
            <!-- 本地知识库搜索数据 -->
            <!-- <div class="target-list" v-if="showCourse">
              <span>已搜索{{ item.course.length }}个资源</span>
              <ul>
                <li class="item-video" v-for="(s, i) in item.course" :key="i">
                  {{ s.fileName }}
                </li>
              </ul>
            </div> -->
          </div>

          <!-- isAnswering -->
        </template>
      </div>
      <button class="btn-stop" v-if="isAnswering" @click="closeOutput">
        停止回答
      </button>
      <!-- 推荐问题 -->
      <ul class="suggest-list" v-if="showSuggest">
        <li v-for="(s, i) in item.suggest" :key="i" @click="submitPrompt(s)">
          {{ s }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import useMarkdown from '@/utils/useMarkdown';
import qs from 'qs';
export default {
  props: {
    item: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      blinkerTextNode: null
    };
  },
  watch: {
    'item.content'() {
      this.renderContent();
      // const pos = this.getLastTextNodeCoordinates(this.$refs.markdownContent);
      // console.log(pos);
    }
  },
  computed: {
    isLoading() {
      return this.item.state == 1 && this.item.role == 1;
    },
    isAnswering() {
      return this.item.state == 2 && this.item.role == 1;
    },
    showSuggest() {
      return (
        this.item.suggest && this.item.suggest.length > 0 && this.item.role == 1
      );
    },
    showCourse() {
      return (
        this.item.course && this.item.course.length > 0 && this.item.role == 1
      );
    },
    markdownContent() {
      return useMarkdown.render(this.item.content);
    },
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  mounted() {
    this.renderContent();
  },
  methods: {
    closeOutput() {
      this.$emit('closeOutput');
    },
    submitPrompt(text) {
      this.$emit('submitPrompt', { prompt: text, from: this.item.from || 2 });
    },
    renderContent() {
      this.$nextTick(() => {
        /* eslint-disable */
        Prism && Prism.highlightAll();
        if (!this.isAnswering) return;
        this.getLastTextNodeCoordinates(this.$refs.markdownContent);
      });
    },

    getLastTextNodeCoordinates(element) {
      if (!element) return;
      const lastNode = element.children[element.children.length - 1];
      const blinker = this.$refs.blinker;
      const textNodes = [];
      function traverseNodes(node) {
        if (node.nodeType === Node.TEXT_NODE && node.data != '\n') {
          textNodes.push(node);
        } else {
          for (let child of node.childNodes) {
            traverseNodes(child);
          }
        }
      }
      traverseNodes(lastNode);
      const lastTextNode = textNodes[textNodes.length - 1];
      if (lastTextNode && blinker) {
        this.blinkerTextNode = document.createTextNode('|');
        lastTextNode.parentElement.appendChild(this.blinkerTextNode);
        let range = document.createRange();
        range.selectNodeContents(this.blinkerTextNode);
        let rect = range.getBoundingClientRect();
        const parent = blinker.parentElement.getBoundingClientRect();
        blinker.style.left = rect.x - parent.x + 'px';
        blinker.style.top = rect.y - parent.y + rect.height - 20 + 'px';
        this.blinkerTextNode && this.blinkerTextNode.remove();
        return {
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height
        };
      }

      return null;
    }
  }
};
</script>
<style lang="less" scoped>
.chat-item {
  width: 100%;
  display: flex;
  margin-bottom: 20px;
  animation: fadeIn 1000ms both;
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 10px;
    img {
      width: 100%;
    }
  }
  .content {
    flex: 1;
    margin-right: 50px;
    display: flex;
    align-items: center;
    align-items: flex-start;
    flex-flow: column;
    .wrap {
      background-color: #fff;
      border-radius: 12px;
      padding: 10px 16px;
      display: flex;
      position: relative;
      align-items: center;
      line-height: 25px;
    }
    .text-content {
      white-space: pre-wrap;
      overflow-wrap: break-word;
      word-break: break-word;
    }
    .loading {
      display: flex;
      align-items: center;
      gap: 8px;
      &:before {
        content: '';
        width: 16px;
        height: 16px;

        display: inline-block;
        background-image: url(./assets/loading.svg);
        background-size: 100% 100%;
        animation: rotating 1000ms linear infinite;
      }
    }
    .btn-stop {
      background-color: #fff;
      border: 1px solid #adcfff;
      color: #1061ff;
      padding: 8px 10px;
      border-radius: 10px;
      // position: absolute;
      margin-top: 10px;
      &:hover {
        opacity: 0.5;
      }
    }
  }
}
.user-item {
  flex-direction: row-reverse;
  .avatar {
    margin-right: 0;
    margin-left: 10px;
  }
  .content {
    flex-direction: row-reverse;
    margin-right: 0;
    margin-left: 50px;
    .wrap {
      background-color: #0f71ff;
      color: #fff;
    }
  }
}
.target-list {
  background: #f6f9ff;
  padding: 10px;
  border-radius: 8px;
  margin-top: 10px;

  ul {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    list-style: none;
  }
  ul li {
    line-height: 25px;
    color: #0068ff;
    margin: 5px 0;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    padding-right: 10px;
    border-radius: 8px;
    &:hover {
      background-color: #e5e7ed;
    }
  }
  .item-video:before {
    content: '';
    width: 24px;
    height: 24px;
    background: url(./assets/icon-play.png) no-repeat;
    background-size: 100% 100%;
  }
}
.suggest-list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 10px;
  list-style: none;
  li {
    background-color: #fff;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    cursor: pointer;
    &:after {
      content: '';
      width: 24px;
      height: 24px;
      background: url(./assets/icon-right.png) no-repeat;
      background-size: 100% 100%;
    }
    &:hover {
      background-color: #e5e7ed;
    }
  }
}
.html-content {
  position: relative;
  .blinker {
    position: absolute;
    animation: blinker 1s step-end infinite;
    &:after {
      content: '▂';
    }
  }
}

@keyframes blinker {
  0% {
    visibility: visible;
  }
  50% {
    visibility: hidden;
  }
  100% {
    visibility: visible;
  }
}
</style>
