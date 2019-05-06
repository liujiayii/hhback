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
// http response 拦截器
instance.interceptors.response.use(
  response => {
    if (response.data.code === -2) {
      window.$Vue.$confirm({
        title: "提示",
        content: response.data.msg,
        okText: "确认",
        cancelText: "取消",
        onOk: () => {
          sessionStorage.clear();
          window.$Vue.$store.state.menu = [];
          window.$Vue.$router.push({path: "/login"});
        },
        onCancel: () => {
          sessionStorage.clear();
        }
      });
    } else if (response.data.code !== 1) {
      window.$Vue.$message.error(response.data.msg)
    }
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 302:
          sessionStorage.clear();
          window.$Vue.$router.push({path: '/login'})
          break
        case 404:
          window.$Vue.$router.push({path: '/404'})
          break
        case 403:
          window.$Vue.$router.push({path: '/403'})
          break
        case 500:
          window.$Vue.$router.push({path: '/500'})
          break
        default:
          window.$Vue.$message.error(error)
      }
    }
    return Promise.reject(error.response.data)   // 返回接口返回的错误信息
  });
instance.interceptors.response.use(
  response => {
    if (response.data.code === -2) {
      window.$Vue.$confirm({
        title: "提示",
        content: response.data.msg,
        okText: "确认",
        cancelText: "取消",
        onOk: () => {
          sessionStorage.clear();
          window.$Vue.$store.state.menu = [];
          window.$Vue.$router.push({path: "/login"});
        },
        onCancel: () => {
          sessionStorage.clear();
        }
      });
    } else if (response.data.code !== 1) {
      window.$Vue.$message.error(response.data.msg)
    }
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 302:
          sessionStorage.clear();
          window.$Vue.$router.push({path: '/login'})
          break
        case 404:
          window.$Vue.$router.push({path: '/404'})
          break
        case 403:
          window.$Vue.$router.push({path: '/403'})
          break
        case 500:
          window.$Vue.$router.push({path: '/500'})
          break
        default:
          window.$Vue.$message.error(error)
      }
    }
    return Promise.reject(error.response.data)   // 返回接口返回的错误信息
  });

Vue.prototype.$ajax_ = instance_
Vue.prototype.$ajax = instance
