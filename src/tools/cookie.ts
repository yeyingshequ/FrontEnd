export default {
  setCookie(cname: string, cvalue: string, exdays: number) {
    var d = new Date()
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
    var expires = 'expires=' + d.toString()
    document.cookie = cname + '=' + cvalue + '; ' + expires
  },
  getCookie(cname: string) {
    var name = cname + '='
    var ca = document.cookie.split(';')
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i].trim()
      if (c.indexOf(name) == 0) return c.substring(name.length, c.length)
    }
    return null
  },
  removeCookie(cname: string) {
    this.setCookie(cname, '', -1)
  },
}
