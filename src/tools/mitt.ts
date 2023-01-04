// mitt库默认导出的是一个函数，我们需要执行它从而得到事件总线的对象
/* eventbus.js */
// 这里我们在js中暴露这个事件总线对象
import mitt from "mitt";
const emitter = mitt();
export default emitter;
