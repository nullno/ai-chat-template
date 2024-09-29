/*
 * @Author: your name
 * @Date: 2021-07-16 16:01:55
 * @LastEditTime: 2021-08-09 15:06:38
 * @LastEditors: Please set LastEditors
 * @Description: 常用工具类函数
 * @FilePath: \ai-chat\src\utils\index.js
 */

export const screen = {
  width: function() {
    return (
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth
    );
  },
  height: function() {
    return (
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight
    );
  },
  scrollTop: function() {
    return document.documentElement.scrollTop || document.body.scrollTop;
  },
  scrollHeight: function() {
    return document.documentElement.scrollHeight || document.body.scrollHeight;
  },
  resize: function(callback) {
    var resize = function() {
      callback({
        width: screen.width(),
        height: screen.height()
      });
    };
    resize();
    window.addEventListener('resize', resize);
  }
};
/*
 *键盘弹起无法缩回bug
 */
export function keyboardSlide() {
  var n = document.querySelectorAll('input,textarea');
  Array.prototype.forEach.call(n, function(dom) {
    var pageDom = 5;
    dom.onblur = function() {
      document.body.scrollTop = ++pageDom;
    };
  });
}

/*
 屏幕尺寸
 */
export function getScreen(callback) {
  window.onresize = function() {
    callback({ w: window.innerWidth, h: window.innerHeight });
  };
  window.onresize();
}

/**
 * 获取指定名称的 url 参数
 * @param {String} name - 参数名称
 * @param {String} url - 指定 url，不指定默认为当前页面 url
 * @returns {String} - 参数的值，未找到则返回 null
 */
export function getUrlParam(name, url) {
  const reg = new RegExp('(\\?|&)' + name + '=([^&#]*)');
  const result = reg.exec(url ? url : location.href);
  return result != null ? decodeURIComponent(result[2]) : null;
}

/*
 对象拷贝
 */
export function deepCopyObj(obj) {
  var result = Array.isArray(obj) ? [] : {};
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        result[key] = deepCopyObj(obj[key]);
      } else {
        result[key] = obj[key];
      }
    }
  }
  return result;
}

/**
 * 判断时间戳是否是当天
 * @param {Number} time - 时间戳
 */
export function isToday(time) {
  console.log(new Date(time).toDateString());
  if (new Date(time).toDateString() === new Date().toDateString()) {
    //今天
    return true;
  } else if (new Date(time) < new Date()) {
    //之前
    return false;
  }
}

/**
 * [debounce 防抖函数]
 */
export function debounce(fn, delay) {
  var timer = null;
  return function(e) {
    e.stopPropagation();
    var _this = this,
      args = arguments;
    timer && clearTimeout(timer);
    timer = setTimeout(function() {
      fn.apply(this, args);
    }, delay);
  };
}
/**
 * [throttle 节流函数]
 */
export function throttle(fn, delay) {
  var lastTime = 0;
  return function() {
    var nowTime = +new Date();
    if (nowTime - lastTime > delay) {
      fn.apply(this, arguments);
      lastTime = nowTime;
    }
  };
}

/**
 * 动态加载 script 脚本
 * @param {String} url - 要加载的脚本 url
 * @returns {Object} - Promise 对象
 */
export function loadScript(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.onload = resolve;
    script.onerror = reject;
    script.src = url;
    document.body.appendChild(script);
    script.onload = function() {
      resolve();
    };
  });
}
