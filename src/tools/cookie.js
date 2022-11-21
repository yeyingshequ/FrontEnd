export default {
<<<<<<< HEAD
    setCookie(cname, cvalue, exdays){
        var d = new Date();
        d.setTime(d.getTime()+(exdays*24*60*60*1000));
        var expires = "expires="+d.toGMTString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    },
    getCookie(cname){
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++)
        {
            var c = ca[i].trim();
            if (c.indexOf(name)==0) return c.substring(name.length,c.length);
        }
        return null;
    },
    removeCookie(cname){
        this.setCookie(cname, '', -1);
    }
}
=======
  setCookie(cname, cvalue, exdays) {
    var d = new Date()
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
    var expires = 'expires=' + d.toGMTString()
    document.cookie = cname + '=' + cvalue + '; ' + expires
  },
  getCookie(cname) {
    var name = cname + '='
    var ca = document.cookie.split(';')
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i].trim()
      if (c.indexOf(name) == 0) return c.substring(name.length, c.length)
    }
    return null
  },
  removeCookie(cname) {
    this.setCookie(cname, '', -1)
  },
}
>>>>>>> 235c9f042e7a1074c9cef0bb3cddcb4f9c865708
