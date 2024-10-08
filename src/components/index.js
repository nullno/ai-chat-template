import Vue from 'vue';
import './tooltip/tooltip.css';
import './switch/switch.css';
import './toast/toast.css';
import './popupPanel/popup-panel.css';
import './alert/alert.css';
// 公用浮层
import PopUps from './Popups/index.js';
import Switch from './switch/switch.js';
import Tooltip from './tooltip/tooltip.js';
import Toast from './toast/toast.js';
import PopupPanel from './popupPanel/popup-panel.js';
import MyAlert from './alert/alert.js';
Vue.use(Switch);
Vue.use(Tooltip);
Vue.use(PopUps);
Vue.use(PopupPanel);
Vue.prototype.$toast = Toast;
Vue.prototype.$alert = MyAlert;
// 基础常用组件导入
// const requireComponent = require.context('.', true, /Panel\w*\/$/);
// requireComponent.keys().forEach(fileName => {
//   const componentConfig = requireComponent(fileName);
//   const componentName = fileName.replace('.', '').replace(/\//g, '');
//   Vue.component(componentName, componentConfig.default || componentConfig);
// });
