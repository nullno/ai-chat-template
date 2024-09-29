import axios from 'axios';
// 用户基础信息
const getUserInfo = function() {
  return {};
};

const AxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL || 'https://kimi.moonshot.cn/',
  timeout: 15000
});

//请求拦截器
AxiosInstance.interceptors.request.use(
  function(config) {
    const user = getUserInfo();
    return config;
  },
  function(error) {
    console.warn(error);
  }
);

//响应拦截器
AxiosInstance.interceptors.response.use(
  function(response) {
    return response.data;
  },
  err => {
    return Promise.reject('请求异常，请稍后重试');
  }
);

export default AxiosInstance;
