import axios from "axios";

console.log('VUE_ENV', process.env.VUE_ENV);
const request = axios.create({
  baseURL: '/api/'
});


request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data;
}, function (error) {
  // 对响应错误做点什么
  console.error('拦截到错误请求', error);
  return Promise.reject(error);
});

export default request;
