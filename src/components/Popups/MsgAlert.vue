<template>
  <div
    class="panel-popups-mask"
    @touchmove.prevent
    @mousewheel.prevent
    v-if="visible"
  >
    <div class="inner">
      <div class="header">
        <span>{{ tit }}</span>
        <button class="btn-close" @click="close()"></button>
      </div>
      <div class="content">
        <p>
          {{ content }}
        </p>
        <div class="tip" v-if="tip">
          <span>{{ tip }}</span>
        </div>

        <div class="option">
          <button class="btn-confirm" @click="confirmPre()">{{btns[0]}}</button>
          <button class="btn-cancel" @click="close()">{{btns[1]}}</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MsgAlert',
  data() {
    return {
      visible: true,
      tit: '提示',
      content: '',
      tip: '',
      btns:['确认','取消'],// btns:['确认提交','不提交']
    };
  },
  created() {},
  methods: {
    close() {
      this.visible = false;
    },
    // 预确认
    confirmPre() {
      this.visible = false;
      this.confirm && this.confirm();
    }
  }
};
</script>
<style lang="less" scoped>
.panel-popups-mask {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9;
  .inner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    min-height: 227px;
    border-radius: 8px;
    background: #fff;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.4);
    overflow: hidden;
    .header {
      width: 100%;
      height: 50px;
      border-radius: 8px;
      padding: 0 20px;
      background: #edf5ff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        font-size: 18px;
        color: #009dfd;
      }
      .btn-close {
        width: 10px;
        height: 10px;
        // background: url(./assets/icon-22.png) no-repeat;
        background-size: 100% 100%;
      }
    }
    .content {
      padding: 30px 20px;
      p {
        font-size: 18px;
        line-height: 26px;
        text-align: center;
        color: #555;
        padding-bottom: 16px;
      }
      .tip {
        width: 100%;
        text-align: center;
        font-size: 14px;
        color: #f90;
        &:before {
          content: '!';
          display: inline-block;
          width: 16px;
          height: 16px;
          line-height: 16px;
          border-radius: 16px;
          background: #f90;
          color: #fff;
          text-align: center;
          margin-right: 5px;
        }
      }
    }
    .option {
      width: 100%;
      display: flex;
      justify-content: center;
      margin-top: 30px;
      button {
        width: 100px;
        height: 32px;
        line-height: 32px;
        border-radius: 16px;
        color: #fff;
        font-size: 14px;
        text-align: center;
        margin: 0 5px;
      }
      .btn-confirm {
        background: #6ba3f6;
      }
      .btn-cancel {
        background: #ccc;
      }
    }
  }
}
</style>
