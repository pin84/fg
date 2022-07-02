<template>
	<view class="container">
		<view class="stickyBox">
			<view class="searchBox">
				<u-search placeholder="请输入关键词搜索" v-model="keyword" shape="round" :showAction="false" @search="handlePageChange"></u-search>
			</view>
		</view>
		<view class="workBox">
			<view v-for="(item, index) in workList" :key="index" class="workItem flex f_a_center" @click="handleClick(item)">
				<view class="itemImg">
					<u--image :showLoading="true" :src="item._url" width="240rpx" height="160rpx" mode="aspectFill" radius="8rpx"></u--image>
				</view>
				<view class="itemMessage flex f_c f_j_between">
					<view class="itemTitle ellipsis-more">{{item.name || ""}}</view>
					<view class="itemTime">{{item._showTime || ""}}</view>
				</view>
			</view>
		</view>
		<view class="nomoreBox" v-if="workList.length !== 0 && workList.length >= total">
			<u-loadmore status="nomore" :line="true"/>
		</view>
	</view>
</template>

<script>
	export default {
		name: "Works",
		data() {
			return {
				d_type: "全部",
				keyword: "",
				page: 1,
				total: 0,
				workList: [],
			}
		},
		computed:{
			// 静态URL
			staticUrl() {
				return this.$CONFIG.STATICURL
			},
			tabsList() {
				return [{d_type : "全部", name: "全部"}, ...(this.$store.getters.newsClassification || [])]
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
				this.d_type = e.d_type;
				this.keyword = "";
				this.page = 1;
				this.apiGetList();
			},
			handleClick(e) {
				uni.navigateTo({
					url: `/pages/works/detail?id=${e.id}`
				})
			},
			handlePageChange(e) {
				this.page = 1;
				this.apiGetList();
			},
			// ------------API---------------
			// 获取列表
			apiGetList() {
				let query = {
					size: 10,
					index: this.page
				};
				this.keyword && (query.name = this.keyword);
				this.d_type && (query.d_type = this.d_type);
				this.$apis.works.getWork(query).then(res => {
					let tempList = res?.data?.user || [];
					tempList.map(item => {
						item._url = `${this.staticUrl}${item.cover_url}`;
						item._showTime = item.create_time.slice(0, 10);
					});
					this.total = res?.data?.total || 0;
					this.workList = this.page !== 1 ? [...this.workList, ...tempList] : tempList;
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
		.nomoreBox {
			margin: 20rpx 0 40rpx;
			width: 100%;
		}
	}
	
</style>
