import Vue from 'vue'
import ajax from 'axios'
/*注册Axios*/

const instance = ajax.create({
  baseURL: '/',
  transformRequest: [/*将JSON字符串转换成FormData*/
    function (data) {
      let ret = '';
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
      }
      return ret;
    }
  ]
})

/*上传图片不能向上面那样写，目前还没找到比较好的解决方式*/
const instances = ajax.create({
  baseURL: '/'
})

Vue.prototype.$ajaxImg = instances
Vue.prototype.$ajax = instance
