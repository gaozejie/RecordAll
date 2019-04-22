let cacheHelper = {
  setLocalStorage: (key, value) => {
    var curtime = new Date().getTime() // 获取当前时间 ，转换成JSON字符串序列
    var valueDate = JSON.stringify({
      val: value,
      timer: curtime
    })
    try {
      localStorage.setItem(key, valueDate)
    } catch (e) {
      if (
        e.name === 'QUOTA_EXCEEDED_ERR' ||
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED'
      ) {
        localStorage.clear()
      } else {
      }
    }
  },

  getLocalStorage: key => {
    if (localStorage.getItem(key)) {
      let exp = 60 * 60 * 24 // 一天的秒数
      let vals = localStorage.getItem(key) // 获取本地存储的值
      let dataObj = JSON.parse(vals) // 将字符串转换成JSON对象
      // 如果(当前时间 - 存储的元素在创建时候设置的时间) > 过期时间
      let isTimed = new Date().getTime() - dataObj.timer > exp
      if (isTimed) {
        localStorage.removeItem(key)
        return null
      } else {
        return dataObj.val
      }
    } else {
      return null
    }
  }
}

let formaterHelper = {
  formatDate: (idate = Date.now(), fmt = 'yyyy-MM-dd hh:mm:ss') => {
    let date = new Date(idate)
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        (date.getFullYear() + '').substr(4 - RegExp.$1.length)
      )
    }
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    }

    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + ''
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length === 1 ? str : ('00' + str).substr(str.length)
        )
      }
    }
    return fmt
  }
}

export { cacheHelper, formaterHelper }
