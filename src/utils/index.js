export default {
  checkUrl (searchStr) {
    function getQueryString (name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
      var r = window.location.search.substr(1).match(reg)
      if (r != null) return unescape(r[2])
      return ''
    }
    return encodeURIComponent(getQueryString(searchStr))
  },
  getCookie (name) {
    var strcookie = document.cookie // 获取cookie字符串
    var arrcookie = strcookie.split('; ') // 分割
    // 遍历匹配
    for (var i = 0; i < arrcookie.length; i++) {
      var arr = arrcookie[i].split('=')
      if (arr[0] === name) {
        return arr[1]
      }
    }
    return ''
  },
  baidu () {
    var _hmt = _hmt || [];
    (function () {
      var hm = document.createElement('script')
      hm.src = 'https://hm.baidu.com/hm.js?96848e82bacddb1845ff8eb6328c14cc'
      var s = document.getElementsByTagName('script')[0]
      s.parentNode.insertBefore(hm, s)
    })()
  }
}
