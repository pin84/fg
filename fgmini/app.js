// 配置相关    引入core/index
const ALL = require('./core/index');
// getApp => app
ALL.mount(Object.prototype, 'app', () => getApp());

App({
  onLaunch: function (options) {
    // 重写Page函数
    ALL.initPage();

    // 检查是否有可更新版本
    ALL.info.version();
    
    // 用户信息
    this.globalData.userInfo = wx.getStorageSync("userInfo") || {};
  },
  
  onShow(options) {
    
  },

  globalData: { // 全局数据
    isReady: null, // 可用于判断onLaunch异步回调是否完成
    participate: {}, // 跳入小程序参数处理
    locationInfo: null, // 经纬度信息
    authSetting: null, // 权限信息
    userInfo: {}, // 用户信息
  },

  // 请求方法
  $http: ALL.http,
  // async await
  $awaitWrap: ALL.awaitWrap,
  // API
  $apis: ALL.apis,
  // 公共配置
  $CONFIG: ALL.CONFIG,
  // 获取小程序相关信息
  $info: ALL.info,
  // 用户校验，登录，code，权限相关
  $auth: ALL.auth,
  // 图片相关
  $img: ALL.img,
  // new Map() 用于缓存页面数据
  $NMap: ALL.nmap,
  // 工具函数
  $tools: ALL.tools,
  // 页面栈(用于invoke)
  $pagesStack: new ALL.pagesStack(),
  // 处理外链跳转
  $link: ALL.externalLink,
  // mock
  $mock: ALL.mock,
  // 静默登录
  handleLoginByCode: handleLoginByCode,
});

// 静默登录
async function handleLoginByCode() {
  return new Promise(async (resolve, reject) => {
    let tempCode = await ALL.auth.getCode();
    !tempCode && reject(err);
    let [err, res] = await ALL.awaitWrap(ALL.apis.common.code2Session({code: tempCode }));
    if (err) return reject(err);
    wx.setStorageSync('token', res.data.token || "");
    resolve(res)
  });
}
