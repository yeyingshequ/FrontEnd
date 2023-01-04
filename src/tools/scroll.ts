const scroll = {
  //禁止滚动
  stop() {
    var mo = function (e: { preventDefault: () => void }) {
      e.preventDefault()
    }
    document.body.style.overflow = 'hidden'
    document.addEventListener('touchmove', mo, false) //禁止页面滑动
  },
  /***取消滑动限制***/
  move() {
    var mo = function (e: { preventDefault: () => void }) {
      e.preventDefault()
    }
    document.body.style.overflow = '' //出现滚动条
    document.removeEventListener('touchmove', mo, false)
  },
}

export default scroll
