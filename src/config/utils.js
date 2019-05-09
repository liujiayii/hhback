export {formatDate, formatState}

function formatState(state) {/*格式化订单状态*/
  if (state == -1) {
    return '订单取消'
  } else if (state == 0) {
    return '待付款'
  } else if (state == 1) {
    return '已付款，待发货'
  } else if (state == 2) {
    return '已发货'
  } else if (state == 3) {
    return '已签收'
  } else if (state == 4) {
    return '已完成'
  } else if (state == 5) {
    return '退货中'
  } else if (state == 6) {
    return '退货审核通过'
  } else if (state == 7) {
    return '退货审核不通过'
  }
}

function formatDate(date, fmt) {// 时间格式化
  let o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'S': date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

let validUser = (rule, value, callback) => {
  const valid = /^[a-zA-Z0-9_-]{6,12}$/
  if (!valid.test(value)) {
    callback(new Error('请输入6到12位正确的用户名'));
  } else {
    callback();
  }
}

let validPhone = (rule, value, callback) => {
  const valid = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
  if (!valid.test(value)) {
    callback(new Error('请输入正确的手机号'));
  } else {
    callback();
  }
}

let validPass = (rule, value, callback) => {
  const valid = /^[a-zA-Z0-9_-]{6,12}$/
  if (value && value.length != 0) {
    if (!valid.test(value)) {
      callback(new Error('请输入正确的密码'));
    } else if (value.length < 6 || value.length > 12) {
      callback(new Error('长度在 6 到 12 个字符'));
    } else {
      callback();
    }
  } else {
    callback();
  }
}
