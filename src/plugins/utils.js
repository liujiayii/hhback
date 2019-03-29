export {formatDate, formatState}

function formatState(state) {/*格式化订单状态*/
  if (state == -1) {
    return '订单取消'
  } else if (state == 0) {
    return '待付款'
  } else if (state == 1) {
    return '已付款，代发货'
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
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}
