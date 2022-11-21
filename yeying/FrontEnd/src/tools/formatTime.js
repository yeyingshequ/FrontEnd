import moment from 'moment'
moment.locale('zh-cn');
function formatTime(date) {
    let formatDate = new Date(date).getTime()
    let time = new Date().getTime() - formatDate
    if (time < 259200000) {
        return moment(date).fromNow();
    } else if (time > 259200000) {
        return moment(date).format('YYYY-MM-DD')
    }
};

export default  formatTime