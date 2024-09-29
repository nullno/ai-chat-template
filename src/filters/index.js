import Vue from 'vue';

const Filters = {
  /**
   * 字符串数字提取
   * @param {Number} str - 待格式化的字符串
   */
  strMoney(str) {
    let amount = 0;
    if (str) {
      amount = str.replace(/[^0-9]/gi, '');
    }
    return amount;
  },
  /**
   * 性别格式化
   */
  tranGender(id) {
    if (id == 0) {
      return '女';
    }
    if (id == 1) {
      return '男';
    }
    return '--';
  },
  /**
   * 数字格式化
   * @param {Number} num - 待格式化的数字
   */
  formatNumber(num) {
    if (typeof num == 'undefined') {
      return '';
    }
    let result = num.toString();
    if (num > 100000000) {
      result = (num / 100000000).toFixed(1) + '亿';
    } else if (num > 10000) {
      result = (num / 10000).toFixed(1) + '万';
    }
    return result;
  },

  /**
   * 基本时间格式化
   * @param {Number|String} timestamp - 时间戳或字符串
   */
  tranTimestr(timestamp) {
    if (!timestamp) return '';
    let date = new Date(Number(timestamp)); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear() + '-';
    let M =
      (date.getMonth() + 1 < 10
        ? '0' + (date.getMonth() + 1)
        : date.getMonth() + 1) + '-';
    let D = date.getDate() + ' ';
    let h = date.getHours() + ':';
    let m =
      date.getMinutes() < 10
        ? '0' + date.getMinutes() + ''
        : date.getMinutes() + '';
    let s =
      date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return Y + M + D + h + m;
  }
};

for (let key in Filters) {
  Vue.filter(key, Filters[key]);
}
