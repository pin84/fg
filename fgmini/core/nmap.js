class NMap {
    constructor() {
        if(!NMap.instance) {
            NMap.instance = this
        }
        return NMap.instance
    }
    set(name, data = "") {
        this.instance.set(name, data);
    }
    get(name) {
        this.instance.set(name);
    }
    has(name) {
        this.instance.has(name);
    }
    delete(name) {
        this.instance.delete(name);
    }
    clear() {
        this.instance.clear();
    }
    static getInstance() {
        if (!this.instance) {
            return this.instance = new Map();
        };
        return this.instance;
    }
}

let dataMap = NMap.getInstance();

module.exports = dataMap;