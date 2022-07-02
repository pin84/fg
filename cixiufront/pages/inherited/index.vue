<template>
	<view class="container">
		<view class="stickyBox">
			<u-tabs :list="tabsList" lineColor="#ec519a" :activeStyle="{ color: '#ec519a' }" @click="handleSubsection"></u-tabs>
			<view class="searchBox">
				<u-search placeholder="请输入关键词搜索" v-model="keyword" shape="round" :showAction="false" @search="handlePageChange"></u-search>
			</view>
		</view>
		<view class="inheritedBox flex">
			<view v-for="(item, index) in inheritedList" :key="index" class="inheritedItem" @click="handleClick(item)">
				<view class="itemImg">
					<u--image :showLoading="true" :src="item._url" width="100%" height="250rpx" mode="aspectFill" radius="16rpx"></u--image>
				</view>

				<view class="info-box">
					<view>
						<text>姓名：</text>
						<text>{{item.name}}</text>
					</view>
					<view>
						<text>性别：</text>
						<text>{{item.sex}}</text>
					</view>
					<view>
						<text>民族：</text>
						<text>{{item.nation}}</text>
					</view>
					<view>
						<text>传承等级：</text>
						<text>{{item.successor_level}}</text>
					</view>
					<view>
						<text>批次：</text>
						<text>{{item.batch}}</text>
					</view>
					<view>
						<text>荣誉称号：</text>
						<text>{{item.honor_names}}</text>
					</view>
				</view>
			</view>
			<view class="emptyBox" v-if="inheritedList.length === 0">
				<u-empty mode="list" style="margin: 48rpx auto;"></u-empty>
			</view>
		</view>
		<view class="nomoreBox" v-if="inheritedList.length !== 0 && inheritedList.length >= total">
			<u-loadmore status="nomore" :line="true"/>
		</view>
		<tabbar />
	</view>
</template>

<script>
	import tabbar from "@/components/common/tabbar.vue";
	export default {
		name: "Inherited",
		components: {
			tabbar
		},
		data() {
			return {
				d_type: "",
				keyword: "",
				page: 1,
				total: 0,
				inheritedList: [],
			}
		},
		computed:{
			// 静态URL
			staticUrl() {
				return this.$CONFIG.STATICURL
			},
			tabsList() {
				return [{d_type : "全部", name: "全部"}, ...(this.$store.getters.inheritedClassification || [])]
			}
		},
		onLoad() {
			this.apiGetUserList();
		},
		onShow() {},
		onReachBottom() {
			if (this.inheritedList.length >= this.total) return false;
			this.page++;
			this.apiGetUserList();
		},
		methods: {
			handleSubsection(e) {
				this.d_type = e.d_type === "全部" ? "" : e.name;
				this.keyword = "";
				this.page = 1;
				this.apiGetUserList();
			},
			handleClick(e) {
				uni.navigateTo({
					url: `/pages/inherited/detail?id=${e.id}`
				})
			},
			handlePageChange(e) {
				this.page = 1;
				this.apiGetUserList();
			},
			// 获取传承人
			apiGetUserList() {
				let query = {
					size: 10,
					index: this.page
				};
				this.keyword && (query.name = this.keyword);
				this.d_type && (query.classify_name = this.d_type);
				this.$apis.inherited.getUser(query).then(res => {
					let tempList = res?.data?.user || [];
					tempList.map(item => {
						item._url = `${this.staticUrl}${item.cover_url}`;
					});
					this.total = res?.data?.total || 0;
					this.inheritedList = this.page !== 1 ? [...this.inheritedList, ...tempList] : tempList;
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
		.inheritedBox {
			flex-wrap: wrap;
			padding-left: 5rpx;
			&::after {
				content: "";
				width: 332rpx;
				margin: 0 auto 32rpx;
				position: relative;
				height: 1rpx;
			}
			.inheritedItem {
				// width: 332rpx;
				width: 100%;
				margin: 0 auto 32rpx;
				position: relative;
				display: flex;
				box-shadow:0 0  10rpx #ccc;
				.itemImg {
					width: 280rpx;
					height: 250rpx;
					border-radius: 16rpx;
				}

				.info-box{
					color: gray;
					margin-left: 20rpx;
					padding: 10rpx 0;
					box-sizing: border-box;
					font-size: 24rpx;
					display: flex;
					flex-direction: column;
					justify-content: center;
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
