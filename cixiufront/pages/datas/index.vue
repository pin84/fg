<template>
	<view class="container">
		<u-sticky bgColor="#fff">
			<u-tabs 
				:list="menuList" 
				:scrollable="false" 
				lineColor="#ec519a"
				activeStyle="color: #ec519a;"
				@click="handleClick"
				itemStyle="font-size: 32rpx; font-weight: bold; height: 44px;"
			></u-tabs>
		</u-sticky>
		<compInherited v-show="menuKey === 'inherited'" />
		<compNews v-show="menuKey === 'news'" />
		<compWorks v-show="menuKey === 'works'" />
		<tabbar />
	</view>
</template>

<script>
	import tabbar from "@/components/common/tabbar.vue";
	import compInherited from "@/components/edit/inherited.vue";
	import compNews from "@/components/edit/news.vue";
	import compWorks from "@/components/edit/works.vue";
	export default {
		name: "Datas",
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
			}
		},
		onLoad() {},
		onShow() {},
		onReady() {},
		methods: {
			handleClick(item) {
				if (this.menuKey !== item.key) {
					this.menuKey = item.key
				};
			}
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
