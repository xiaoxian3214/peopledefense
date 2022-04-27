// import router from "@/router/index";
import axios from "axios";
import qs from "qs";
import {
  vue
} from "../main"
// import md5 from "md5"
import Loading from "@/utils/loading.js"
import Vue from "vue";
// import store from "../store/index"
axios.defaults.timeout = 60000; //全局网络超时
axios.defaults.withCredentials = true; //为了使每个请求带上session信息，设置了withCredentials
// axios.defaults.headers.post["Content-Type"] =
// "application/x-www-form-urlencoded;charset=UTF-8";
// export const BASE_URL = process.env.NODE_ENV === "development" ? "https://rfb-zlf.wenzhou.gov.cn:8003/" : "https://rfb-zlf.wenzhou.gov.cn:8003/";
// 朝
export const BASE_URL = process.env.NODE_ENV === "development" ? "http://www.daoting.co:29998/" : "https://rfb-zlf.wenzhou.gov.cn:8003/";
// export const BASE_URL = process.env.NODE_ENV === "development" ? "http://121.196.27.33:8005/" : "http://121.196.27.33:8005/";
// 聂
// export const BASE_URL = process.env.NODE_ENV === "development" ? "http://192.168.1.108:8889/" : "https://rfb-zlf.wenzhou.gov.cn:8003/";
// export const BASE_URL = process.env.NODE_ENV === "development" ? "http://www.daoting.co:19999/" : "http://www.daoting.co:19999/";
export const UPLOAD_URL = `${BASE_URL}api/web/uploadFile`; //单文件上传地址common/file/upload
axios.defaults.baseURL = BASE_URL;
axios.interceptors.request.use(
  config => {
    if (sessionStorage.getItem("data")) {
      const dataJson = JSON.parse(sessionStorage.getItem("data"))
      config.headers.token = dataJson.token;
      // config.headers.type = dataJson.type;
      // config.headers.aId = dataJson.accountId;
      // config.headers.sId = dataJson.staffId;
      // config.headers.name = encodeURIComponent(dataJson.name);
    }

    let url = config.url
    if (config.method === "get" && config.params) {
      // config.params = {...signature(config.params)}
      url += "?"
      let keys = Object.keys(config.params)
      for (const key of keys) {
        if (config.params[key] !== null && config.params[key] !== undefined) {
          url += `${key}=${encodeURIComponent(config.params[key])}&`
        }
      }
      url = url.substring(0, url.length - 1)
      config.params = {}
    } else if (config.method === 'post') {
      if (config.data && config.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
        let data = qs.parse(config.data)
        // data = { ...signature(data) }
        config.data = qs.stringify(data)
      } else if (config.data && config.headers['Content-Type'] === 'application/json') {
        let data = qs.parse(config.data)
        // data = { ...signature(data) }
        config.data = data
      }
    }
    config.url = url
    return config;
  },
  error => {
    Loading.completeLoading()
    return Promise.reject(error);
  }
);

var enterTime = new Date(); //触发的时间
var gapTime = 2000; //间隔时间，5分钟
var backTime = ''; //第一次函数return即触发的时间
// return function() {
//   var context = this;
//   var backTime = new Date(); //第一次函数return即触发的时间
//   if (backTime - enterTime > gapTime) {
//     fn.call(context, arguments);
//     enterTime = backTime; //赋值给第一次触发的时间，这样就保存了第二次触发的时间
//   }
// };
axios.interceptors.response.use(
  res => {
    if (!res.data.success) {
      // console.log(res.headers.pragma);
      let token = res.headers.pragma
      // console.log('token', token);
      if (token) {
        const dataJson = JSON.parse(sessionStorage.getItem("data")) || {}
        dataJson.token = token
        sessionStorage.setItem('data', JSON.stringify(dataJson))
      }
      if (res.data.code == 1005) {
        window.location.href = '#/'
        // vue.$message.error("登录超时，请重新登录!");
        // return 
      }
      return Promise.resolve(res);
    }
    return res;
  },
  error => {
    Loading.completeLoading()
    return Promise.reject(error);
  }
);
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    axios
      .post(url, params)
      .then(
        response => {
          resolve(response.data);
        },
        err => {
          reject(err);
        }
      )
      .catch(error => {
        reject(error);
      });
  });
}
export function jsonPost(url, params) {
  return new Promise((resolve, reject) => {
    axios.defaults.headers['Content-Type'] = 'application/json';
    axios
      .post(url, params)
      .then(
        response => {
          resolve(response.data);
        },
        err => {
          reject(err);
        }
      )
      .catch(error => {
        reject(error);
      });
  });
}

export function get(url, param) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: param
      })
      .then(
        response => {
          resolve(response.data);
        },
        err => {
          reject(err);
        }
      )
      .catch(error => {
        reject(error);
      });
  });
}
export default {
  post,
  get,
  jsonPost
};