const scroll = {
<<<<<<< HEAD
    //禁止滚动
    stop(){
        var mo=function(e){e.preventDefault();};
        document.body.style.overflow='hidden';
        document.addEventListener("touchmove",mo,false);//禁止页面滑动
    },
    /***取消滑动限制***/
    move(){
        var mo=function(e){e.preventDefault();};
        document.body.style.overflow='';//出现滚动条
        document.removeEventListener("touchmove",mo,false);
    }
}

export default scroll
=======
  //禁止滚动
  stop() {
    var mo = function (e) {
      e.preventDefault()
    }
    document.body.style.overflow = 'hidden'
    document.addEventListener('touchmove', mo, false) //禁止页面滑动
  },
  /***取消滑动限制***/
  move() {
    var mo = function (e) {
      e.preventDefault()
    }
    document.body.style.overflow = '' //出现滚动条
    document.removeEventListener('touchmove', mo, false)
  },
}

export default scroll
>>>>>>> 235c9f042e7a1074c9cef0bb3cddcb4f9c865708
