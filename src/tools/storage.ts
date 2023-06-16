// 封装操作localstorage本地存储的方法  模块化


const storage = {
  set(key: string, value: string) {
    localStorage.setItem(key, JSON.stringify(value))
    // localStorage.key = value;
    // localStorage[key] = value;
  },
  get(key: string) {
    const result = localStorage.getItem(key)
    if (result) return JSON.parse(result)
  },

  remove(key: string) {
    localStorage.removeItem(key)
  },
  /*removeAll() {
    localStorage.clear()
  }*/
}

export default storage
