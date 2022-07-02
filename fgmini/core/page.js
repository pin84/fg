const createPage = require('./create/createPage');

const noop = function () { };

function initPage(config = {}) {
    // 重写page构造器
    let oldPage = Page
    Page = function (obj) {
        // 配置__img参数
        let oldData = obj.data || {};
        !oldData.__img && (oldData.__img = getApp()?.$img || {});

        // 重写onLoad方法
        let oldOnLoad = obj.onLoad;
        obj.onLoad = function () {
            let httplist = getApp()?.$NMap?.get("HTTPLIST") || [];
            if (httplist.lenght) {
                wx.hideLoading();
                getApp()?.$NMap?.set("HTTPLIST", [])
            }
            // 如果不存在$invoke则初始化$invoke方法
            !this.$invoke && (this.$invoke = noop);
            oldOnLoad && oldOnLoad.call(this, this.options || {});
        };

        // 重写onShow方法
        let oldOnShow = obj.onShow;
        obj.onShow = function () {
            oldOnShow && oldOnShow.call(this);
        };

        // 重写onHide方法
        let oldOnHide = obj.onHide;
        obj.onHide = function () {
            oldOnHide && oldOnHide.call(this);
        };
        
        return oldPage(createPage(obj));
    };

    // 重写Component构造器
    let oldComponent = Component;
    Component = function (obj) {
        // 配置__img参数
        let oldData = obj.data || {};
        !oldData.__img && (oldData.__img = getApp()?.$img || {});
        return oldComponent(obj);
    };
};

module.exports = initPage
