import Vue from 'vue'
import ajax from 'axios'

/*注册Axios*/
const instance = ajax.create({
  baseURL: '/',
  method: 'post', // 默认是 get
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
const instance_ = ajax.create({
  method: "post",
  baseURL: '/'
})

Vue.prototype.$ajax_ = instance_
Vue.prototype.$ajax = instance
