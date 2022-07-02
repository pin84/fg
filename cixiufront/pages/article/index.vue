<template>
	<view class="container">
		<u-navbar
			:title="pageTitle"
			:autoBack="true"
			bgColor="rgba(204, 30, 29, 1)"
			leftIconColor="#FFFFFF"
			titleStyle="color: #FFFFFF;"
			:placeholder="true"
		>
		</u-navbar>
		<view class="contentBox">
			<u-parse :content="pageContent"></u-parse>
		</view>
	</view>
</template>

<script>
	import protocol from "./protocol.js";
	import privacy from "./privacy.js";

	export default {
		name: "Article",
		data() {
			return {
				pageType: "protocol",
			}
		},
		computed: {
			pageTitle() {
				let tempMap = {
					protocol: "用户协议",
					privacy: "隐私政策",
				};
				return tempMap[this.pageType];
			},
			pageContent() {
				let tempMap = {
					protocol: protocol,
					privacy: privacy,
				};
				return tempMap[this.pageType];
			}
		},
		mounted() {
			let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
			// let curRoute = routes[routes.length - 1].route //获取当前页面路由
			let curParam = routes[routes.length - 1].options; //获取路由参数
			this.pageType = curParam.type;
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		.contentBox {
			padding: 24rpx 32rpx;
			color: $uni-text-color-gray;
		}
	}
</style>
