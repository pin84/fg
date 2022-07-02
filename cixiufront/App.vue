<script>
	export default {
		globalData: {
			isReady: null, // 用于处理onLaunch异步回调问题
			userInfo: {},
		},
		onLaunch: function() {
			uni.hideTabBar();
			this.$store.dispatch("GET_CLASSIFICATION");
			/**
			 * 检查是否有可更新版本
			 */
			this.$tools.version();
			this.changeTabbars(Boolean(uni.getStorageSync("i_userinfo")));
		},
		onShow: function() {},
		onHide: function() {},
		methods: {
			changeTabbars(isLogin=true) {
				let tempMenu = [{
						id: 1,
						icon: 'icon-cultural',
						url_a: this.$img.tabbar.tab1_a,
						url_n: this.$img.tabbar.tab1_n,
						name: '首页',
						url: '/pages/index/index',
					},
					{
						id: 2,
						icon: 'icon-news',
						url_a: this.$img.tabbar.tab2_a,
						url_n: this.$img.tabbar.tab2_n,
						name: '作品',
						url: '/pages/news/index',
					},
					{
						id: 3,
						icon: 'icon-data',
						url_a: this.$img.tabbar.tab3_a,
						url_n: this.$img.tabbar.tab3_n,
						name: '数据',
						url: '/pages/datas/index',
					},
					{
						id: 4,
						icon: 'icon-inherited',
						url_a: this.$img.tabbar.tab4_a,
						url_n: this.$img.tabbar.tab4_n,
						name: '传承人',
						url: '/pages/inherited/index',
					},
					{
						id: 5,
				 		icon: 'icon-mine',
						url_a: this.$img.tabbar.tab5_a,
						url_n: this.$img.tabbar.tab5_n,
						name: '我的',
						url: '/pages/mine/index',
					},
				];
				if (isLogin) {
					this.$store.commit("SET_TABBARLIST", tempMenu);
				} else {
					this.$store.commit("SET_TABBARLIST", tempMenu.filter(item => item.id !== 3));
				}
			}
		}
	}
</script>

<style lang="scss">
	@import "@/static/css/iconfont.css";
	/*每个页面公共css */
	view{
		box-sizing: border-box;
	}
	.flex {
		display: -webkit-flex;
		display: flex;
	}
	.f_r {
		flex-direction: row;
	}
	.f_r_reverse {
		flex-direction: row-reverse;
	}
	.f_c {
		flex-direction: column;
	}
	.f_c_reverse {
		flex-direction: column-reverse;
	}
	.f_j_center {
		justify-content: center;
	}
	.f_j_end {
		justify-content: flex-end;
	}
	.f_j_between {
		justify-content: space-between;
	}
	.f_j_around {
		justify-content: space-around;
	}
	.f_a_center {
		align-items: center;
	}
	.f_a_end {
		align-items: flex-end;
	}
	.f_a_start {
		align-items: flex-start;
	}

	.ellipsis {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.ellipsis-more {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
</style>
