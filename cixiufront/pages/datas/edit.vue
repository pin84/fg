<template>
	<view class="container">
		<!-- <u-sticky bgColor="#fff">
			<u-tabs 
				:list="menuList" 
				:scrollable="false" 
				lineColor="#ec519a"
				activeStyle="color: #ec519a;"
				@click="handleClick"
				itemStyle="font-size: 32rpx; font-weight: bold; height: 44px;"
			></u-tabs>
		</u-sticky> -->
		<compInherited v-show="menuKey === 'inherited'" :detail-id="optionId" @callback="handleCallback" />
		<compNews v-show="menuKey === 'news'" :detail-id="optionId" @callback="handleCallback" />
		<compWorks v-show="menuKey === 'works'" :detail-id="optionId" @callback="handleCallback" />
	</view>
</template>

<script>
	import tabbar from "@/components/common/tabbar.vue";
	import compInherited from "@/components/edit/inherited.vue";
	import compNews from "@/components/edit/news.vue";
	import compWorks from "@/components/edit/works.vue";
	export default {
		name: "DatasEdit",
		components: {
			tabbar,
			compInherited,
			compNews,
			compWorks
		},
		data() {
			return {
				menuList: [
					{ name: "添加传承人", key: "inherited" }, 
					{ name: "添加作品", key: "news" }, 
					{ name: "保护传承工作", key: "works" }
				],
				menuKey: "inherited", // 选择的菜单
				optionId: "", // 详情ID
			}
		},
		onLoad() {
			let routes = getCurrentPages() || []; // 获取当前打开过的页面路由数组
			let curParam = routes[routes.length - 1]?.options || {}; //获取路由参数
			if (!curParam.type || !curParam.id) {
				return uni.showModal({
					title: '提示',
					content: '数据出错，请稍后重试',
					confirmColor: "#ec519a",
					success: (res) => {
						if (res.confirm) {
							uni.navigateBack();
						};
					}
				})
			};
			this.menuKey = curParam.type;
			this.optionId = curParam.id;
		},
		methods: {
			handleClick(item) {
				if (this.menuKey !== item.key) {
					this.menuKey = item.key
				};
			},
			handleCallback(e) {
				if (e.type === "save") {
					uni.navigateBack();
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
