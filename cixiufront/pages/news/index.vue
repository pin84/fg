<template>
	<view class="container">
		<view class="stickyBox">
			<u-tabs :list="tabsList" lineColor="#ec519a" :activeStyle="{ color: '#ec519a' }" @click="handleSubsection"></u-tabs>
			<view class="searchBox">
				<u-search placeholder="请输入关键词搜索" v-model="keyword" shape="round" :showAction="false" @search="handlePageChange"></u-search>
			</view>
		</view>
		<!-- <view class="repertoireBox">
			<view v-for="(item, index) in newsList" :key="index" class="repertoireItem" @click="handleClick(item)">
				<view class="itemImg">
					<u--image :showLoading="true" :src="item._url" width="100%" height="344rpx" mode="aspectFill" radius="16rpx"></u--image>
				</view>
				<view class="itemMark">
					<view class="itemTitle ellipsis">{{item.name || ""}}</view>
					<view class="itemTime ellipsis">{{item.desc || ""}}</view>
				</view>
			</view>
			<view class="emptyBox" v-if="newsList.length === 0">
				<u-empty mode="list" style="margin: 48rpx auto;"></u-empty>
			</view>
		</view> -->
		<view class="inheritedBox flex">
			<view v-for="(item, index) in newsList" :key="index" class="inheritedItem" @click="handleClick(item)">
				<view class="itemImg">
					<u--image :showLoading="true" :src="item._url" width="100%" height="250rpx" mode="aspectFill" radius="16rpx"></u--image>
				</view>
				<view class="itemMessage flex f_c">
					<view class="itemTitle ellipsis-more">{{item.name}}</view>
					<view class="itemTips ellipsis-more">{{item.desc}}</view>
				</view>
			</view>
			<view class="emptyBox" v-if="newsList.length === 0">
				<u-empty mode="list" style="margin: 48rpx auto;"></u-empty>
			</view>
		</view>
		
		<view class="nomoreBox" v-if="newsList.length !== 0 && newsList.length >= total">
			<u-loadmore status="nomore" :line="true"/>
		</view>
		<tabbar />
	</view>
</template>

<script>
	import tabbar from "@/components/common/tabbar.vue";
	export default {
		name: "News",
		components: {
			tabbar
		},
		data() {
			return {
				d_type: "全部",
				keyword: "",
				page: 1,
				total: 0,
				newsList: [],
			}
		},
		computed:{
			// 静态URL
			staticUrl() {
				return this.$CONFIG.STATICURL
			},
			tabsList() {
				return [{d_type : "", name: "全部"}, ...(this.$store.getters.newsClassification || [])]
			}
		},
		onLoad() {
			this.apiGetList();
		},
		onShow() {},
		onReachBottom() {
			if (this.newsList.length >= this.total) return false;
			this.page++;
			this.apiGetList();
		},
		methods: {
			handleSubsection(e) {
				this.d_type = e.name;
				this.keyword = "";
				this.page = 1;
				this.apiGetList();
			},
			handleClick(e) {
				uni.navigateTo({
					url: `/pages/news/detail?id=${e.id}`
				})
			},
			handlePageChange(e) {
				this.page = 1;
				this.apiGetList();
			},
			// ------------API---------------
			// 获取剧目
			apiGetList() {
				let query = {
					size: 10,
					index: this.page
				};
				this.keyword && (query.name = this.keyword);
				this.d_type && (query.d_type = this.d_type);
				this.$apis.news.getPlay(query).then(res => {
					let tempList = res?.data?.user || [];
					tempList.map(item => {
						item._url = `${this.staticUrl}${item.cover_url}`;
					});
					this.total = res?.data?.total || 0;
					this.newsList = this.page !== 1 ? [...this.newsList, ...tempList] : tempList;
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		position: relative;
		.stickyBox {
			width: 100vw;
			background: $uni-bg-color;
			position: sticky;
			top: 0;
			z-index: 99;
			.searchBox {
				padding: 24rpx 32rpx;
			}
		}
		
		.repertoireBox {
			padding: 0 0 24rpx;
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
			.emptyBox {
				width: 100%;
				padding: 20vh 0;
				text-align: center;
			}
		}
		.inheritedBox {
			flex-wrap: wrap;
			&::after {
				content: "";
				width: 332rpx;
				margin: 0 auto 32rpx;
				position: relative;
				height: 1rpx;
			}
			.inheritedItem {
				width: 332rpx;
				margin: 0 auto 32rpx;
				position: relative;
				.itemImg {
					width: 332rpx;
					height: 250rpx;
					border-radius: 16rpx;
				}
				.itemMessage {
					position: relative;
					z-index: 1;
					width: 312rpx;
					height: 160rpx;
					margin: -80rpx auto 0;
					padding: 24rpx 20rpx;
					background: $uni-bg-color;
					border-radius: 12rpx;
					box-shadow: 0px 0px 32px rgba(21, 17, 139, 0.16);
					.itemTitle {
						font-size: 32rpx;
						font-weight: bold;
						line-height: 44rpx;
						// color: $uni-text-color;
						color: $themeColor;
					}
					.itemTips {
						font-size: 24rpx;
						line-height: 30rpx;
						margin-top: 12rpx;
						color: $uni-text-color-grey;
					}
				}
			}
			.emptyBox {
				width: 100%;
				padding: 20vh 0;
				text-align: center;
			}
		}
		.nomoreBox {
			margin: 20rpx 0 40rpx;
			width: 100%;
		}
	}
	
</style>
