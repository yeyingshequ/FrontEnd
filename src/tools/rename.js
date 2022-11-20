const rename = {
    toUnderline(obj) {
        let newObj = {};
        for (let key in obj) {
            newObj[key.replace(/([A-Z])/g, "_$1").toLowerCase()] = obj[key]
        }
        return newObj
    },
    toHumpFn(name) {

        return name.replace(/\_(\w)/g, function (all, letter) {
            return letter.toUpperCase();
        });
    },
    toHump(obj){
        let newobj = {}
        for (let key in obj){
            newobj[this.toHumpFn(key)] = obj[key]
        }
        return newobj

    }
}

export default rename