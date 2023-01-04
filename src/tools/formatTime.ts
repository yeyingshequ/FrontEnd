import moment from 'moment'
moment.defineLocale('zh-cn', {
  relativeTime: {
    future: '%s内',
    past: '%s前',
    s: '几秒',
    m: '1 分钟',
    mm: '%d 分钟',
    h: '1 小时',
    hh: '%d 小时',
    d: '1 天',
    dd: '%d 天',
    M: '1 个月',
    MM: '%d 个月',
    y: '1 年',
    yy: '%d 年'
  },
})

function formatTime(date: string) {
  let formatDate = new Date(date).getTime()
  let time = new Date().getTime() - formatDate
  if (time < 259200000) {
    return moment(date).fromNow()
  } else if (time > 259200000) {
    return moment(date).format('YYYY-MM-DD')
  }
}

export default formatTime
