<template>
	<view class="container">
		<view class="swiperBox">
			<u-swiper
				:list="swiperList"
				:circular="true"
				:radius="0"
				:current="swiperCurrent"
				height="375rpx"
				@change="swiperChange"
				@click="(i) => handleClick('swiper', i)"
			></u-swiper>
			<view class="indicatorBox flex f_a_center f_j_center">
				<view v-for="(item, index) in swiperList" :key="item" class="indicatorItem" :class="{ 'indicatorItem_active' : (index === swiperCurrent) }"></view>
			</view>
		</view>
		
		<block v-if="inheritedList.length">
			<view class="titleLine flex f_a_center f_j_between" @click="handleClick('inherited')">
				<view class="titleName flex f_a_center f_a_center">
					<image class="titleImg" :src="img.common.titleIcon" mode="aspectFill" />
					<text>传承人</text>
				</view>
				<view class="titleBtn flex f_a_center f_a_center">
					<text>更多</text>
					<u-icon class="titleIcon" name="arrow-right"></u-icon>
				</view>
			</view>
			<view class="inheritedBox flex">
				<view v-for="(item, index) in inheritedList" :key="index" class="inheritedItem" @click="handleClick('inheritedItem', item)">
					<!-- <image :src="item._url" mode="aspectFill" class="itemImg"></image> -->
					<view class="itemImg">
						<u--image :showLoading="true" :src="item._url" width="100%" height="348rpx" mode="aspectFill" radius="6rpx"></u--image>
					</view>
					<view class="itemText ellipsis">{{item.name}}</view>
				</view>
			</view>
		</block>
		
		<view class="titleLine flex f_a_center f_j_between" @click="handleClick('news')">
			<view class="titleName flex f_a_center f_a_center">
				<image class="titleImg" :src="img.common.titleIcon" mode="aspectFill" />
				<text>最新作品</text>
			</view>
			<view class="titleBtn flex f_a_center f_a_center">
				<text>更多</text>
				<u-icon class="titleIcon" name="arrow-right"></u-icon>
			</view>
		</view>
		<view class="repertoireBox">
			<view v-for="(item, index) in newsList" :key="index" class="repertoireItem" @click="handleClick('newsItem', item)">
				<!-- <image :src="item._url" mode="aspectFill" class="itemImg"></image> -->
				<view class="itemImg">
					<u--image :showLoading="true" :src="item._url" width="100%" height="344rpx" mode="aspectFill" radius="16rpx"></u--image>
				</view>
				<view class="itemMark">
					<view class="itemTitle ellipsis">{{item.name}}</view>
					<view class="itemTime ellipsis">{{item.desc}}</view>
				</view>
			</view>
			<u-empty mode="list" v-if="newsList.length === 0" style="margin: 48rpx 0;"></u-empty>
		</view>
		
		<view class="titleLine flex f_a_center f_j_between"  @click="handleClick('work')">
			<view class="titleName flex f_a_center f_a_center">
				<image class="titleImg" :src="img.common.titleIcon" mode="aspectFill" />
				<text>最新工作</text>
			</view>
			<view class="titleBtn flex f_a_center f_a_center">
				<text>更多</text>
				<u-icon class="titleIcon" name="arrow-right"></u-icon>
			</view>
		</view>
		<view class="workBox">
			<view v-for="(item, index) in workList" :key="index" class="workItem flex f_a_center" @click="handleClick('workItem', item)">
				<!-- <image :src="item._url" mode="aspectFill" class="itemImg"></image> -->
				<view class="itemImg">
					<u--image :showLoading="true" :src="item._url" width="240rpx" height="160rpx" mode="aspectFill" radius="8rpx"></u--image>
				</view>
				<view class="itemMessage flex f_c f_j_between">
					<view class="itemTitle ellipsis-more">{{item.name || ""}}</view>
					<view class="itemTime">{{item._showTime || ""}}</view>
				</view>
			</view>
			<u-empty mode="list" v-if="workList.length === 0" style="margin: 48rpx 0;"></u-empty>
		</view>
		
		<tabbar />
	</view>
</template>

<script>
	import tabbar from "@/components/common/tabbar.vue";
	export default {
		name: "Index",
		components: {
			tabbar
		},
		data() {
			return {
				img: this.$img,
				swiperCurrent: 0,
				swiperList: [
					'https://cdn.uviewui.com/uview/swiper/swiper1.png',
					'https://cdn.uviewui.com/uview/swiper/swiper2.png',
					'https://cdn.uviewui.com/uview/swiper/swiper3.png',
				],
				inheritedList: [],
				newsList: [],
				workList: [],
			}
		},
		computed:{
			// 静态URL
			staticUrl() {
				return this.$CONFIG.STATICURL
			}
		},
		onLoad() {
			this.apiGetUserList();
			this.apiGetPlayList();
			this.apiGetWorkList();
		},
		onShow() {},
		methods: {
			// 轮播图改变
			swiperChange(e) {
				if (e.current !== this.swiperCurrent) {
					this.swiperCurrent = e.current;
				};
			},
			// 页面点击
			handleClick(type, data = {}) {
				switch (type){
					case "swiper": // 轮播图
						console.info(type, data);
						break;
					case "inherited": // 传承人
						uni.switchTab({
							url: `/pages/inherited/index`
						});
						break;
					case "inheritedItem": // 传承人
						uni.navigateTo({
							url: `/pages/inherited/detail?id=${data.id}`
						});
						break;
					case "news": // 剧目
						uni.switchTab({
							url: `/pages/news/index`
						});
						break;
					case "newsItem": // 剧目
						uni.navigateTo({
							url: `/pages/news/detail?id=${data.id}`
						});
						break;
					case "work": // 最新工作
						uni.navigateTo({
							url: `/pages/works/index`
						});
						break;
					case "workItem": // 最新工作
						uni.navigateTo({
							url: `/pages/works/detail?id=${data.id}`
						});
						break;
					default:
						console.warn(type, data);
						break;
				}
			},
			// ---------API--------
			// 获取传承人
			apiGetUserList() {
				this.$apis.inherited.getUser().then(res => {
					let tempList = res?.data?.user || [];
					tempList.map(item => {
						item._url = `${this.staticUrl}${item.cover_url}`;
					});
					this.inheritedList = tempList.splice(0, 5);
				})
			},
			// 获取剧目
			apiGetPlayList() {
				this.$apis.news.getPlay().then(res => {
					let tempList = res?.data?.user || [];
					tempList.map(item => {
						item._url = `${this.staticUrl}${item.cover_url}`;
					});
					this.newsList = tempList.splice(0, 3);
				})
			},
			// 获取工作列表
			apiGetWorkList() {
				this.$apis.works.getWork().then(res => {
					let tempList = res?.data?.user || [];
					tempList.map(item => {
						item._url = `${this.staticUrl}${item.cover_url}`;
						item._showTime = item.create_time.slice(0, 10);
					});
					this.workList = tempList.splice(0, 3);
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		.swiperBox {
			position: relative;
			width: 100vw;
			height: 375rpx;
			.indicatorBox {
				width: 100%;
				height: 10rpx;
				position: absolute;
				bottom: 20rpx;
				left: 0;
				.indicatorItem {
					width: 20rpx;
					height: 8rpx;
					background: rgba(255, 255, 255, 0.2);
					border-radius: 6rpx;
					transition: all 0.3s;
					margin: 0 4rpx;
					&_active {
						width: 32rpx;
						background: white;
					}
				}
			}
		}
		.titleLine {
			width: 100%;
			height: 88rpx;
			padding: 0 32rpx;
			.titleName {
				font-size: 32rpx;
				font-weight: bold;
				color: $themeColor;
				position: relative;
				// padding-left: 16rpx;
				// &::before {
				// 	content: "";
				// 	width: 8rpx;
				// 	height: 32rpx;
				// 	position: absolute;
				// 	left: 0;
				// 	top: 50%;
				// 	transform: translateY(-50%);
				// 	border-radius: 4rpx;
				// 	background: $themeColor;
				// }
				.titleImg {
					width: 32rpx;
					height: 32rpx;
					margin-right: 8rpx;
				}
			}
			.titleBtn {
				font-size: 28rpx;
				color: #2E3041;
				.titleIcon {
					font-size: 28rpx;
				}
			}
		}
		.inheritedBox {
			width: 100%;
			padding: 24rpx 32rpx;
			overflow: auto;
			background: white;
			&::after {
				content: "";
				width: 8rpx;
				height: 440rpx;
				flex-shrink: 0;
			}
			.inheritedItem {
				width: 375rpx;
				height: 440rpx;
				border-radius: 8rpx;
				box-shadow: 0px 0px 32px rgba(21, 17, 139, 0.1);
				margin-right: 24rpx;
				overflow: hidden;
				flex-shrink: 0;
				padding: 20rpx;
				.itemImg {
					width: 100%;
					height: 348rpx;
					border-radius: 6rpx;
				}
				.itemText {
					margin-top: 12rpx;
					font-size: 32rpx;
					padding: 0 12rpx;
					color: $uni-text-color;
				}
			}
		}
		.repertoireBox {
			.repertoireItem {
				width: 686rpx;
				height: 344rpx;
				border-radius: 16rpx;
				position: relative;
				overflow: hidden;
				margin: 0 auto 20rpx;
				.itemImg {
					width: 100%;
					height: 100%;
				}
				.itemMark {
					position: absolute;
					bottom: 0;
					left: 0;
					width: 100%;
					height: 172rpx;
					background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.72) 100%);
					padding: 68rpx 32rpx 0;
					.itemTitle {
						font-size: 32rpx;
						line-height: 44rpx;
						color: $uni-text-color-inverse;
					}
					.itemTime {
						font-size: 24rpx;
						line-height: 44rpx;
						color: $uni-text-color-inverse;
					}
				}
			}
		}
		.workBox {
			.workItem {
				width: 686rpx;
				margin: 0 auto 42rpx;
				.itemImg {
					width: 240rpx;
					height: 160rpx;
					border-radius: 8rpx;
				}
				.itemMessage {
					flex: 1;
					height: 160rpx;
					padding: 10rpx 0 10rpx 24rpx;
					.itemTitle {
						font-size: 32rpx;
						line-height: 44rpx;
						color: $uni-text-color;
					}
					.itemTime {
						font-size: 24rpx;
						line-height: 44rpx;
						color: $uni-text-color-grey;
						text-align: right;
					}
				}
			}
		}
	}
</style>
