/**
 * 图片管理（注意区分主包与分包图片，主包不可以使用分包图片，但分包可以使用主包图片）
 * 主包相关图片请存放在根目录下的static
 * 分包相关图片请存放在对应分包目录下的static
 * 建议使用网络图片
 */
const img = {
	common: {
		titleIcon: '/static/images/common/title_img.png'
	},
	login: {
		bg: '/static/images/login/bg2.jpg',
		logo: '/static/images/common/logo.png',
		applLogo: '/static/images/common/applogo.png',
	},
	mine: {
		bg: '/static/images/mine/bg.jpg',
	},
	tabbar: {
		tab1_a: '/static/images/tabbar/tab1_a.png',
		tab1_n: '/static/images/tabbar/tab1_n.png',
		tab2_a: '/static/images/tabbar/tab2_a.png',
		tab2_n: '/static/images/tabbar/tab2_n.png',
		tab3_a: '/static/images/tabbar/tab3_a.png',
		tab3_n: '/static/images/tabbar/tab3_n.png',
		tab4_a: '/static/images/tabbar/tab4_a.png',
		tab4_n: '/static/images/tabbar/tab4_n.png',
		tab5_a: '/static/images/tabbar/tab5_a.png',
		tab5_n: '/static/images/tabbar/tab5_n.png',
	}
}

module.exports = img