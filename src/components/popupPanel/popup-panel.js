!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n,o=e();for(n in o)("object"==typeof exports?exports:t)[n]=o[n]}}(window,(function(){return e={2:function(t,e,n){"use strict";function o(t,e,n,o,i,s,r,a){var l,c,u=typeof(t=t||{}).default;u="function"==typeof(t="object"==u||"function"==u?t.default:t)?t.options:t;return e&&(u.render=e,u.staticRenderFns=n,u._compiled=!0),o&&(u.functional=!0),s&&(u._scopeId=s),r?(l=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),i&&i.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(r)},u._ssrRegister=l):i&&(l=a?function(){i.call(this,this.$root.$options.shadowRoot)}:i),l&&(u.functional?(u._injectStyles=l,c=u.render,u.render=function(t,e){return l.call(e),c(t,e)}):(a=u.beforeCreate,u.beforeCreate=a?[].concat(a,l):[l])),{exports:t,options:u}}n.d(e,"a",(function(){return o}))},27:function(t,e,n){"use strict";function o(t){this.option=Object.assign({disableX:!1,disableY:!1,disable:!1},1<arguments.length&&void 0!==arguments[1]?arguments[1]:{}),this.$el=t,this.addEvent()}o.prototype.updateSet=function(t){this.option=Object.assign(this.option,t)},o.prototype.getPointXY=function(t){t=(e=t.targetTouches?t.targetTouches[0]:t).clientX||e.pageX;var e=e.clientY||e.pageY;return{x:t-this.$el.offsetLeft,y:e-this.$el.offsetTop}},o.prototype.addEvent=function(){var t,e,n,o,i,s=this;this.$el.children[0]&&((t=this.$el.children[0]).style.cursor="move",e="ontouchstart"in window,n=!1,i=o=0,t.addEventListener(e?"touchstart":"mousedown",(function(t){n=!0,t=s.getPointXY(t||window.event),o=t.x,i=t.y,document.body.style.touchAction="none"}),!1),document.body.addEventListener(e?"touchmove":"mousemove",(function(t){var e;n&&(t.preventDefault(),t.stopPropagation(),t=(e=t.targetTouches?t.targetTouches[0]:t).clientX||e.pageX,e=e.clientY||e.pageY,t-=o,e-=i,s.option.disable||(s.$el.style.marginLeft="unset",s.$el.style.marginTop="unset",s.option.disableX||(s.$el.style.left=t+"px"),s.option.disableY||(s.$el.style.top=e+"px"),s.option.onchange&&s.option.onchange.call(s,{x:t,y:e})))}),!1),document.body.addEventListener(e?"touchend":"mouseup",(function(t){n=!1,document.body.style.touchAction="unset"}),!1))},e.a=o},54:function(t,e,n){"use strict";n.r(e);var o=n(27),i={name:"TyPopupPanel",props:{title:String,customClass:String,hideHead:{type:Boolean,default:!0},show:{type:Boolean,default:!1},mask:{type:Boolean,default:!0},drag:{type:Boolean,default:!1},maskClose:{type:Boolean,default:!1},bgColor:String,option:Array},data:function(){return{visable:!1,enterAni:"ty-popup-panel-enter",leaveAni:"ty-popup-panel-leave",classAni:"",btnAni:"",duration:0,timer:null,curEl:null}},computed:{classStr:function(){return this.classAni+" "+this.customClass},bgStyle:function(){return this.bgColor?{"background-color":this.bgColor}:null},showHead:function(){return this.hideHead||this.$slots.header},curShow:function(){return this.show},showOption:function(){return this.option&&"[object Array]"==Object.prototype.toString.call(this.option)&&0<this.option.length}},watch:{curShow:function(t){var e=this;t?(this.classAni=this.enterAni,this.visable=!0,this.$emit("onOpen",this),this.$nextTick((function(){e._enterHandel()}))):this.close()}},created:function(){this.visable=this.curShow,this.classAni=this.enterAni},mounted:function(){var t=this;this.$nextTick((function(){t.visable&&t._enterHandel()}))},methods:{leave:function(){var t=this;this.timer=setTimeout((function(){clearTimeout(t.timer),t.classAni=t.leaveAni,t.removeEl()}),this.duration)},removeEl:function(){var t=this;this.timer=setTimeout((function(){clearTimeout(t.timer),t.visable=!1,t.$emit("onClose",t)}),300)},close:function(){this.visable&&(this.btnAni="",this.duration=0,this.leave())},_cancel:function(){this.btnAni||(this.duration=0,this.$emit("onCancel",this),this.leave())},_confirm:function(){this.btnAni="ty-popup-panel-confirm-load",this.$emit("onConfirm",this)},_enterHandel:function(){var t;this.curEl=this.mask?this.$el.children[1]:this.$el.children[0],this.curEl.style.cssText=(t=this.curEl,"position:fixed;z-index:999;width:".concat(t.clientWidth,"px;height:").concat(t.clientHeight,"px;top:50%;left:50%;margin-left:").concat(-t.clientWidth/2,"px;margin-top:").concat(-t.clientHeight/2,"px;")),this.drag&&new o.a(this.curEl)}},activated:function(){console.log("打开")}},s=(n=n(2),Object(n.a)(i,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.visable?n("div",{staticClass:"ty-popup-panel-main"},[t.mask?n("div",{staticClass:"ty-popup-panel-mask",style:t.bgStyle,on:{touchmove:function(t){t.preventDefault()},mousewheel:function(t){t.preventDefault()},click:function(e){e.stopPropagation(),t.maskClose&&t.close()}}}):t._e(),t._v(" "),n("div",{staticClass:"ty-popup-panel",class:t.classStr},[t.showHead?t._e():n("div",{staticClass:"ty-popup-panel-head"},[n("span",{staticClass:"ty-popup-panel-title"},[t._v(t._s(t.title))]),t._v(" "),n("button",{staticClass:"ty-popup-panel-close",on:{click:function(e){return e.stopPropagation(),t.close()}}})]),t._v(" "),t._t("header"),t._v(" "),n("div",{staticClass:"ty-popup-panel-content"},[t._t("default"),t._v(" "),t.showOption?n("div",{staticClass:"ty-popup-panel-option"},t._l(t.option,(function(e,o){return n("button",{key:o,class:"取消"===e?"ty-popup-panel-cancel":"ty-popup-panel-confirm "+t.btnAni,on:{click:function(n){"取消"===e?t._cancel():t._confirm()}}},[t._v("\n          "+t._s(e)+"\n        ")])})),0):t._e()],2)],2)]):t._e()}),[],!1,null,null,null).exports);s.install=function(t){t.component(s.name,s)},e.default=s}},n={},t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:o})},t.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(t.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var i in e)t.d(o,i,function(t){return e[t]}.bind(null,i));return o},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},t.p="/lib/",t(t.s=54);function t(o){if(n[o])return n[o].exports;var i=n[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var e,n}));