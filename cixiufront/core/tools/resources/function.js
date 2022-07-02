const TOOLS = { 
    /**
     * 检查是否有可更新版本
     * H5不适用
     */
    version() {
		// #ifndef H5
        if (uni.canIUse('getUpdateManager')) {
            const updateManager = uni.getUpdateManager();
            updateManager.onCheckForUpdate((res) => {
                // 请求完新版本信息的回调
                console.warn('新版本?', res.hasUpdate)
            })
            updateManager.onUpdateReady(function () {
                uni.showModal({
                    title: '更新提示',
                    content: '新版本已经准备好，需要重启应用',
                    showCancel: false,
                    success: function (res) {
                        if (res.confirm) {
                            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                            updateManager.applyUpdate()
                        }
                    }
                })
            })
            updateManager.onUpdateFailed(function () {
                // 新版本下载失败
                uni.showModal({
                    title: '更新提示',
                    content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
                    showCancel: false
                })
            })
        }
        // #endif
    },
    /**
     * getCode获取uni.login
     * H5不适用（返回false）
     */
    getCode() {
        return new Promise((resolve, reject) => {
            // #ifndef H5
            uni.login && uni.login({
                success: (res) => {
                    resolve(res)
                },
                fail: (err) => {
                    reject(err)
                }
            })
            // #endif
            // #ifdef H5
            resolve(false)
            // #endif
        })
    },
    /**
     * 获取code(微信，头条，支付宝)、iv(微信，头条)、encryptedData(微信，头条)、authCode(支付宝)
     * 如需getUserInfo中其他信息，可以添加到temp中
     * H5不适用（返回false）
     */
    login() {
        return new Promise((resolve, reject) => {
            // #ifndef H5
            uni.login && uni.login({
                force: true, // 头条小程序未登录强制登录
                success: (lRes) => {
                    let code = lRes.code
                    uni.getUserInfo && uni.getUserInfo({
                        withCredentials: true, // 头条小程序获取加密数据
                        success: (infoRes) => {
                            let iv = infoRes.iv
                            let encryptedData = infoRes.encryptedData
                            let temp = {}

                            if (lRes.code) temp.code = code
                            if (lRes.authCode) temp.authCode = lRes.authCode
                            if (infoRes.iv) temp.iv = iv
                            if (infoRes.encryptedData) temp.encryptedData = encryptedData

                            resolve(temp)
                        },
                        fail: (infoErr) => {
                            this.error('获取用户信息失败:', infoErr)
                            uni.showModal && uni.showModal({
                                title: '提示',
                                content: '该功能需要您的授权，请授权后再进行操作。',
                                success: (res) => {
                                    if (res.confirm) {
                                        uni.openSetting && uni.openSetting()
                                    }
                                }
                            })
                            reject(infoErr)
                        }
                    })
                },
                fail: (lErr) => {
                    this.error('登录失败:', lErr)
                    reject(lErr)
                }
            })
            // #endif
            // #ifdef H5
            resolve(false)
            // #endif
        })
    },
    /**
     * 检查登录态是否过期
     * @return {Boolean} true => session_key 未过期,并且在本生命周期一直有效; false => session_key 已经失效，需要重新执行登录流程
     * H5, APP不适用（返回false）
     */
    checkSession() {
        return new Promise((resolve, reject) => {
            // #ifdef MP-WEIXIN || MP-BAIDU || MP-TOUTIAO || MP-QQ
            uni.checkSession && uni.checkSession({
                success() {
                    return resolve(true)
                },
                fail() {
                    return resolve(false)
                }
            })
            // #endif
            // #ifdef APP-PLUS || APP-PLUS-NVUE || H5
            resolve(false)
            // #endif
        })
    },
	//
	uploadFile(temp) {
		return new Promise((resolve, reject) => {
			uni.uploadFile({
				url: `${getApp().$CONFIG.BASEURL}acx/uploadfile`, //仅为示例，非真实的接口地址
				filePath: temp.url,
				name: 'fileName',
				success: (uploadFileRes) => {
					let resParse = JSON.parse(uploadFileRes.data);
					resolve({...temp, s_url: resParse?.data?.filename, s_name: resParse?.data?.originalname})
				},
				fail: (err) => {
					console.warn(err);
					reject(err);
				}
			});
		});
	},
	submitAddData(temp = {}) {
		let res = {};
		Object.keys(temp).forEach(key => {
			if (![null, undefined, ""].includes(temp[key])) {
				res[key] = temp[key]
			}
		});
		return res;
	},
	submitEditData(temp = {}) {
		let res = {};
		Object.keys(temp).forEach(key => {
			if (![null, undefined].includes(temp[key])) {
				res[key] = temp[key]
			}
		});
		return res;
	}
}
module.exports = TOOLS