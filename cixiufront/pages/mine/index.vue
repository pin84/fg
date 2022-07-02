<template>
	<view class="container">
		<view class="userBox">
			<image :src="img.mine.bg" class="userBoxBg"></image>
			<view class="userMessage flex f_a_center" @click="handleNavClick({ type: 'login' })">
				<!-- <image :src="userInfo.avatar" class="userAvatar"></image> -->
				<view class="userAvatar flex f_a_center f_j_center">
					<u--image :showLoading="true" :src="userInfo.avatar || 'https://cdn.uviewui.com/uview/album/1.jpg'" width="128rpx" height="128rpx" mode="aspectFill" radius="50%"></u--image>
				</view>
				<text class="userName" v-if="!hasUser">请登录</text>
				<text class="userName" v-else>{{userInfo.nickname || ""}}</text>
			</view>
		</view>
		<view class="navBox">
			<u-cell-group :border="false">
				<u-cell 
					v-for="(item, index) in navList" 
					:key="index" 
					:title="item.title" 
					:border="false" 
					:titleStyle="item.sytle"
					@click="handleNavClick(item)">
					<i slot="icon" class="iconfont cell_icon" :class="item.icon"></i>
					<u-icon slot="right-icon" name="arrow-right" :size="16"></u-icon>
				</u-cell>
			</u-cell-group>
		</view>
		<tabbar />
	</view>
</template>

<script>
	import tabbar from "@/components/common/tabbar.vue";
	export default {
		name: "Mine",
		components: {
			tabbar
		},
		data() {
			return {
				img: this.$img,
				userInfo: {
					avatar: 'https://cdn.uviewui.com/uview/album/5.jpg',
				},
				hasUser: false,
				// navList: [
				// 	{ title: "用户协议", sytle: "font-weight: bold; font-size: 30rpx;", icon: "icon-protocol", type: "protocol" },
				// 	{ title: "隐私政策", sytle: "font-weight: bold; font-size: 30rpx;", icon: "icon-privacy", type: "privacy" },
				// 	{ title: "注销", sytle: "font-weight: bold; font-size: 30rpx;", icon: "icon-logout", type: "logout" },
				// ]
			}
		},
		computed: {
			navList() {
				let tempList = [
					{ title: "用户协议", sytle: "font-weight: bold; font-size: 30rpx;", icon: "icon-protocol", type: "protocol" },
					{ title: "隐私政策", sytle: "font-weight: bold; font-size: 30rpx;", icon: "icon-privacy", type: "privacy" },
					{ title: "注销", sytle: "font-weight: bold; font-size: 30rpx;", icon: "icon-logout", type: "logout" },
				];
				return this.hasUser ? tempList : tempList.filter(item => item.type !== "logout");
			}
		},
		onShow() {
			let tempUserInfo = uni.getStorageSync("i_userinfo");
			this.userInfo = tempUserInfo;
			this.hasUser = Boolean(uni.getStorageSync("i_userinfo"));
		},
		methods: {
			handleNavClick(e) {
				switch (e.type){
					case "login":
						if (this.hasUser) return false;
						uni.navigateTo({
							url: "/pages/login/index"
						});
						break;
					case "logout":
						uni.showModal({
							title: '提示',
							content: '是否退出登录',
							confirmColor: "#ec519a",
							success: (res) => {
								if (res.confirm) {
									getApp().changeTabbars(false);
									uni.removeStorageSync('i_userinfo');
									uni.navigateTo({
										url: "/pages/login/index"
									});
								};
							}
						});
						break;
					case "protocol": // 用户协议
					case "privacy": // 隐私政策
						uni.navigateTo({
							url: `/pages/article/index?type=${e.type}`
						});
						break;
					default:
						console.log(e);
						break;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		min-height: 100vh;
		background: #F8F8F8;
		.userBox {
			width: 100vw;
			height: 552rpx;
			position: relative;
			overflow: hidden;
			&Bg {
				width: 100vw;
				height: 552rpx;
				position: absolute;
				z-index: 0;
				top: 0;
				left: 0;
				filter: blur(10px);
				transform: scale(1.2);
			}
			.userMessage {
				position: absolute;
				z-index: 1;
				width: 100vw;
				top: 256rpx;
				padding: 0 64rpx;
				.userAvatar {
					width: 128rpx;
					height: 128rpx;
					border-radius: 50%;
					border: 4rpx solid $uni-border-white;
					overflow: hidden;
				}
				.userName {
					color: #191A19;
					font-size: 36rpx;
					font-weight: bold;
					padding-left: 32rpx;
				}
			}
		}
		.navBox {
			width: 100vw;
			margin: 36rpx 0;
			.cell_icon {
				font-size: 40rpx;
			}
		}
	}
</style>
