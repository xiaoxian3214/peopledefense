import Vue from 'vue';
import md5 from 'md5';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import * as api from "./request/api"
import { objValuefilter } from "./utils/tools.js"
import { UPLOAD_URL } from "./request/http.js"
import 'element-ui/lib/theme-chalk/index.css';
import "./assets/css/global.scss";
import "./assets/css/notify.scss";
import "./assets/css/reset.scss";
import "./assets/css/table.scss";
// main.js
import "./assets/css/from.scss"
import "./assets/css/listQuery.scss"
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme
import VueQuillEditor from 'vue-quill-editor'
// import zzd from "../src/vendors/zzd 2/index.js"
Vue.use(VueQuillEditor, /* { default global options } */)
// app.use(zzd, {
//   bid: "WZ_RFB_zzdpro",
//   /**浙政钉-appId */
//   sapp_id: "21548",
//   /**浙政钉-项目名称 */
//   sapp_name: 'WZ_RFB',
//   /**???-域名  不知道什么域名 删了 js加载失败*/
//   site: "域名",
// });
let echarts = require('echarts')
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.$md5 = md5;
Vue.prototype.$api = api;
Vue.prototype.$echarts = echarts;
Vue.prototype.$UPLOAD_URL = UPLOAD_URL;
Vue.prototype.$objValuefilter = objValuefilter;
// Vue.prototype.$clearObjvlues = clearObjvlues
export const vue= new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

