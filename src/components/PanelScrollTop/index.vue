<template>
  <div id="goTop">
    <div class="btn-top" v-show="goTopShow" @click="goTop"></div>
  </div>
</template>
<script>
export default {
  name: 'PanelScrollTop',
  data() {
    return {
      scrollTop: '',
      goTopShow: false
    };
  },
  watch: {
    scrollTop(val) {
      if (this.scrollTop > 500) {
        this.goTopShow = true;
      } else {
        this.goTopShow = false;
      }
    }
  },
  methods: {
    handleScroll() {
      this.scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (this.scrollTop > 500) {
        this.goTopShow = true;
      }
    },
    goTop() {
      let timer = null,
        _that = this;
      cancelAnimationFrame(timer);
      timer = requestAnimationFrame(function fn() {
        if (_that.scrollTop > 0) {
          _that.scrollTop -= 500;
          document.body.scrollTop = document.documentElement.scrollTop =
            _that.scrollTop;
          timer = requestAnimationFrame(fn);
        } else {
          cancelAnimationFrame(timer);
          _that.goTopShow = false;
        }
      });
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  }
};
</script>

<style scoped>
.btn-top {
  opacity: 0.3;
  cursor: pointer;
  z-index: 999;
  position: fixed;
  right: 3%;
  bottom: 30%;
  background-image: url(./assets/icon-top.png);
  background-size: 50px 50px;
  width: 50px;
  height: 50px;
}
</style>
