import Vue from 'vue'
import ajax from 'axios'
import router from 'vue-router'

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
// // http response 拦截器
// instance.interceptors.response.use(
//   response => {
//     console.log(response.data.code)
//     return response;
//   },
//   error => {
//     if (error.response) {
//       console.log(error.response.status)
//       switch (error.response.status) {
//         case 404:
//           router.push({path: '/404'})
//           break
//         case 500:
//           router.push({path: '/500'})
//           break
//       }
//     }
//     return Promise.reject(error.response.data)   // 返回接口返回的错误信息
//   });

/*上传图片不能向上面那样写，目前还没找到比较好的解决方式*/
const instance_ = ajax.create({
  method: "post",
  baseURL: '/'
})

Vue.prototype.$ajax_ = instance_
Vue.prototype.$ajax = instance
