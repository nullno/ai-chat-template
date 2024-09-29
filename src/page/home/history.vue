<template>
  <div class="history">
    <div class="search">
      <input
        v-model="keyword"
        type="text"
        placeholder="请输入会话内容"
        @keyup.enter="search"
      />
      <i v-if="keyword" @click="clear()"></i>
    </div>
    <ul class="list" :class="{ loading: loading }">
      <li
        v-for="(item, index) in filterList"
        :key="index"
        @click="pageTo(item)"
      >
        <div class="tit">
          <span>{{ item.title }}</span>
          <div class="op">
            <span class="date"> {{ item.update_time | formatTime }}</span>
            <button class="del" @click.stop="del(item, index)"></button>
          </div>
        </div>
        <!-- <p>
          老舍先生的作品语言生动、情感丰富，非常适合作为小学语文阅读教学的范文。
          根据搜索结果，以下是几篇适合作为小学语文阅读教学的老舍作品：《母鸡》：这篇文章通过作者对母鸡态度的转变，赞颂了母爱的伟大，语言风格亲切自然，适合引导学生体会作者情感的变化和对母爱的转变，赞颂了母爱的伟大，语言风格亲切自然，适合引导学生体会作者情感的变化和对母爱的转变，赞颂了母爱的伟大，语言风格亲切自然，适合引导学生体会作者情感的变化和对母爱
        </p> -->
      </li>
    </ul>
    <div class="empty" v-if="filterList.length == 0 && !loading">
      暂无数据
    </div>
  </div>
</template>
<script>
import tempCache from '@/store/tempCache';
import moment from 'moment';
moment.locale('zh-cn');
export default {
  data() {
    return {
      keyword: '',
      chatList: [],
      loading: false
    };
  },
  computed: {
    filterList() {
      return this.chatList.filter(e => e.title.indexOf(this.keyword) > -1);
    }
  },
  filters: {
    formatTime(time) {
      return moment(time * 1000).calendar();
    }
  },
  created() {
    this.getChatList();
  },
  methods: {
    search() {
      console.log('搜索');
    },
    clear() {
      this.keyword = '';
      console.log('清空');
    },
    pageTo(item) {
      localStorage.curChat = JSON.stringify(item);
      this.$router.push('/chat/' + item.qkey);
    },
    async getChatList() {
      this.loading = true;
      // const list = await api.getChatList();
      this.chatList = [];
      this.loading = false;
    },
    del(item, index) {
      const _scope = this;
      this.$alert({
        type: 'wran',
        message: '会话删除后不能恢复，要删除吗？',
        option: ['删除', '取消'],
        async onConfirm(_this) {
          _scope.chatList.splice(index, 1);

          _this.close();
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.history {
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  padding: 30px 0;
}
.search {
  width: 100%;
  height: 50px;
  border: 1px solid #dee4eb;
  border-radius: 50px;
  background-color: #fff;
  background-image: url(./assets/icon-search.png);
  background-size: 16px 16px;
  background-repeat: no-repeat;
  background-position: center left 20px;
  position: relative;
  &:hover {
    box-shadow: 0px 8px 24px -4px #5b6f971f;
  }
  input {
    height: 100%;
    width: calc(100% - 50px);
    margin-left: 50px;
    font-size: 16px;
  }
  i {
    width: 20px;
    height: 20px;
    position: absolute;
    right: 20px;
    top: 50%;
    margin-top: -10px;
    background: url(./assets/icon-close.png) no-repeat center;
    background-size: 100% 100%;
    cursor: pointer;
  }
}
.list {
  padding: 30px 0;
  list-style: none;
  position: relative;
  min-height: 200px;
  li {
    overflow: hidden;
    background-color: #fff;
    padding: 15px;
    margin: 15px 0;
    border-radius: 12px;
    cursor: pointer;

    .tit {
      display: flex;
      align-items: center;
      justify-content: space-between;
      & > span:first-child {
        max-width: 80%;
        font-size: 16px;
        font-weight: bold;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .op {
        display: flex;

        align-items: center;
      }
      span.date {
        font-size: 12px;
        color: #8793b0;
      }
      .del {
        width: 15px;
        height: 15px;
        margin: 3px 5px;
        background: url(./assets/icon-del.png);
        background-size: 100%;
        display: none;
      }
    }

    p {
      margin-top: 10px;
      font-size: 12px;
      line-height: 18px;
      color: #8793b0;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2; /*显示文字的行数*/
      -webkit-box-orient: vertical;
    }
    &:hover {
      box-shadow: 0px 8px 24px -4px #5b6f971f;
      .tit .del {
        display: block;
      }
    }
  }
}
.loading:after {
  content: '';
  width: 40px;
  height: 40px;
  background-image: url(./assets/loading.svg);
  background-size: 100% 100%;
  animation: rotating 1000ms linear infinite;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -20px;
}
.empty {
  text-align: center;
  color: #666;
}
</style>
