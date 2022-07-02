<template>
	<view class="tabbarBox">
		<view class="app_tabbar app_tabbar_fill">
			<view class="tabbar"></view>
		</view>
		<view class="app_tabbar app_tabbar_fixed">
			<view class="tabbar">
				<view v-for="(item, index) in tabbarList" :key="item.id" class="tabbar_item"
					:class=" item.id === tabsIndex ? 'tabbar_item_active' : ''" :style="tabbarItemWidth"
					@click="_tabbarClick(item)">
					<view class="contentBox" :class="{ 'contentBox_active' : item.id === tabsIndex }">
						<!-- <i class="iconfont tabbar_item_icon" :class="item.icon"></i> -->
						<image class="tabbar_item_img" :src="item.id === tabsIndex ? item.url_a : item.url_n " mode="aspectFill" />
						<text class="tabbar_item_text">{{item.name}}</text>
						<view class="tabbar_item_dot" v-if="Boolean(item.dot)">{{item.dot}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex';
	export default {
		name: "Tabbar",
		computed: {
			...mapGetters(['tabbarList']),
			pagesUrl() {
				let tempPages = getCurrentPages();
				let tempThisPage = tempPages[tempPages.length - 1];
				return tempThisPage?.route || "";
			},
			tabbarItemWidth() {
				return `width: ${100 / this.tabbarList.length}%`;
			},
			tabsIndex() {
				let tempTabbarItem = this.tabbarList?.find(item => item?.url?.includes(this?.pagesUrl)) || {};
				return tempTabbarItem.id || 1;
			}
		},
		created() {
			uni.hideTabBar();
		},
		methods: {
			_tabbarClick(e) {
				if (!e.url.includes(this.pagesUrl)) {
					uni.switchTab({
						url: e.url
					});
				};
			}
		}
	}
</script>

<style lang="scss" scoped>
	$app_bottom_height: 98rpx;
	$default_color: #AAB3B2;

	.tabbarBox {
		.app_tabbar {
			padding-bottom: constant(safe-area-inset-bottom);
			padding-bottom: env(safe-area-inset-bottom);
			background: white;

			.tabbar {
				width: 100vw;
				height: $app_bottom_height;
			}
		}

		.app_tabbar_fill {
			background: transparent;
		}

		.app_tabbar_fixed {
			position: fixed;
			bottom: 0;
			left: 0;
			z-index: 9999;
			box-shadow: 0px 0px 12px 0px rgba(205, 191, 195, 0.6);

			.tabbar {
				background: white;
				display: flex;
				justify-content: center;
				align-items: center;

				.tabbar_item {
					.contentBox {
						position: relative;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						width: fit-content;
						margin: 0 auto;
						color: $default_color;

						.tabbar_item_icon {
							font-size: 48rpx;
						}
						.tabbar_item_img {
							width: 48rpx;
							height: 48rpx;
						}

						.tabbar_item_text {
							font-size: 22rpx;
						}

						.tabbar_item_dot {
							position: absolute;
							width: 40rpx;
							height: 40rpx;
							top: -8rpx;
							right: -40rpx;
							border-radius: 50%;
							font-size: 22rpx;
							color: white;
							background: #E70000;
							display: flex;
							align-items: center;
							justify-content: center;
						}

						&_active {
							color: $themeColor;
						}
					}

				}

			}
		}
	}
</style>
