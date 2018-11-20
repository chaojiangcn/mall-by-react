/*对接口请求返回的数据进行统一处理*/
import axios from "axios";
import qs from "qs";
import event from "utils/event";
import store from "store";

// http response 拦截器
axios.interceptors.response.use(
  response => {
    const { status, data } = response;
    if ([200,304].includes(status)) {
      //隐藏loading
      $hideLoading.call(null);
      return response.data;
    }
  },
  error => {
    const { status, data } = error.response;
    if (status === 403) {
      // token失效
      console.error("token 失效");
      event.emit("showLogin", true);
      $hideLoading.call(null);
      return Promise.reject(error.response);
    } else {
      console.error("error", error);
      return Promise.reject(error.response);
    }
  }
);
function finalUrl(url, params) {
  return [url].concat(params).join("/");
}

//默认地址获取
function get(url, { params = [], query = {} }) {
  return axios.get(finalUrl(url, params), { params: query });
}
function post(url, { params = [], query = {} }) {
  return axios.post(finalUrl(url, params), qs.stringify(query));
}
function put(url, { params = [], query = {} }) {
  return axios.put(finalUrl(url, params), qs.stringify(query));
}
function del(url, { params = [], query = {} }) {
  return axios.del(finalUrl(url, params), qs.stringify(query));
}

export default {
  get,
  post,
  put,
  del
};
