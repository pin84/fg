<template>
	<view class="container">
		<!-- <u-navbar
			title="工作"
			:autoBack="true"
			:bgColor="navbarBgColor"
			leftIconColor="#FFFFFF"
			titleStyle="color: #FFFFFF;"
		>
		</u-navbar> -->
		<view class="userBox">
			<image v-if="userInfo._avatar" :src="userInfo._avatar" class="infoBg" mode="aspectFill"></image>
			<view class="infoBox flex f_j_end">
				<view class="msgBox flex f_c f_j_center f_a_end">
					<view class="infoName">{{userInfo.name || ""}}</view>
					<view class="infoDesc"></view>
				</view>
				<!-- <image src="../../static/images/common/logo.png" class="infoAvatar" mode="aspectFill"></image> -->
				<view class="infoAvatar flex f_j_center f_a_center" v-if="userInfo._avatar">
					<u--image :showLoading="true" :src="userInfo._avatar" width="160rpx" height="160rpx" mode="aspectFill" radius="50%"></u--image>
				</view>
			</view>
		</view>
		<view class="messageBox">
			<view class="tabsTitle">基本信息</view>
			<view class="baseBox">
				<view class="msgLine flex">
					<view class="msgLeft">工作类别</view>
					<view class="msgRight">{{userInfo.d_type || "暂无"}}</view>
				</view>
				<view class="msgLine flex">
					<view class="msgLeft">工作内容</view>
					<view class="msgRight">{{userInfo.content || "暂无"}}</view>
				</view>
			</view>
			
			<block v-if="videoList.length">
				<view class="tabsTitle">工作视频</view>
				<view class="videoBox">
					<u-tabs :list="videoList" @click="tabsClick" lineColor="#ec519a"></u-tabs>
					<!-- 创建一个预览图片，并给予点击事件 -->
					<!-- <view class="videoItem flex f_a_center f_j_center" @click="handleVideo({detail: {fullScreen: true}})">
						<u-icon name="play-circle" color="#FFFFFF" size="32"></u-icon>
					</view> -->
					<!-- 创建一个用于预览的video标签 -->
					<!-- <video 
						v-if="videoTempUrl"
						:src="videoTempUrl" 
						x5-video-player-type="h5-page" 
						v-show="isShowVideo" 
						style="width: 100vw; height: 100vh;" 
						@fullscreenchange="handleVideo"
						id="video_play"></video> -->
					<video v-if="videoTempUrl" :src="videoTempUrl" x5-video-player-type="h5-page" class="videoItem" object-fit="cover"></video>
				</view>
			</block>

			<block v-if="audioList.length">
				<view class="tabsTitle">工作录音</view>
				<view class="audioBox">
					<u-cell-group>
						<u-cell v-for="(item, index) in audioList" :key="index" :title="item.name" @click="handleAudio(item)">
							<u-icon name="volume-fill" color="#ec519a" size="18" slot="icon"></u-icon>
							<u-icon :name="item.isPlay ? 'pause-circle' : 'play-circle'" color="#ec519a" size="18" slot="right-icon"></u-icon>
						</u-cell>
					</u-cell-group>
				</view>
			</block>
			<block v-if="imgList.length">
				<view class="tabsTitle">工作照片</view>
				<view class="imgBox">
					<u-album :urls="imgList" keyName="url" multipleSize="220rpx"></u-album>
				</view>
			</block>
		</view>
		<view class="editBox">
			<view class="btnBox_fill"></view>
			<view class="btnBox btnBox_fixed" v-if="hasUser">
				<view class="btnItem" @click="handleEdit">编辑</view>
				<view class="btnItem btnItem_circle" @click="apiDelWork">删除</view>
			</view>
		</view>
	</view>
</template>

<script>
	let videoContext = null;
	let audioContext = null;
	export default {
		name: "WorksDetail",
		data() {
			return {
				navbarBgColor: "rgba(204, 30, 29, 0)", // navbar背景颜色
				videoList: [],
				videoIndex: 0,
				audioList: [],
				audioIndex: 0,
				imgList: [],
				isShowVideo: false,
				userInfo: {},
				hasUser: false
			}
		},
		computed: {
			// 页面信息
			pageOptions() {
				let routes = getCurrentPages() || []; // 获取当前打开过的页面路由数组
				let curParam = routes[routes.length - 1]?.options || {}; //获取路由参数
				return curParam;
			},
			// 静态URL
			staticUrl() {
				return this.$CONFIG.STATICURL
			},
			videoTempUrl() {
				return this.videoList?.[this.videoIndex]?.url
			}
		},
		onPageScroll(e) {
			let tempAlpha = e.scrollTop / 200;
			this.navbarBgColor = `rgba(204, 30, 29, ${tempAlpha > 1 ? 1 : tempAlpha})`;
		},
		onShow() {
			this.apiGetWorkById();
			this.hasUser = Boolean(uni.getStorageSync("i_userinfo"));
		},
		methods: {
			handleEdit() {
				uni.navigateTo({
					url: `/pages/datas/edit?id=${this.pageOptions.id}&type=works`
				});
			},
			tabsClick(e) {
				this.videoIndex = e.index || 0;
			},
			handleVideo(e) {
				this.isShowVideo = e.detail.fullScreen;
				// 获取 video 上下文 videoContext 对象
				videoContext = uni.createVideoContext('video_play');
				if (e.detail.fullScreen) {
					// 进入全屏状态
					videoContext.requestFullScreen();
					videoContext.play();
				} else {
					videoContext.pause();
				}
			},
			// 处理音频
			handleAudio(e) {
				if (!audioContext) {
					audioContext = uni.createInnerAudioContext();
				};
				if (this.audioIndex !== e.index || !(audioContext || {}).src) {
					audioContext.src = e.url;
					this.$set(this.audioList[this.audioIndex], "isPlay", false);
					this.audioIndex = e.index;
				};
				if (!this.audioList[e.index].isPlay) {
					audioContext.play();
					this.$set(this.audioList[e.index], "isPlay", true);
				} else {
					audioContext.pause();
					this.$set(this.audioList[e.index], "isPlay", false);
				};
			},
			// 处理url
			handleUrls(namelist="", urllist="") {
				let tempUrl = urllist?.split(",") || [];
				let tempName = namelist?.split(",") || [];
				let tempList = [];
				tempUrl.forEach((item, index) => {
					item && tempList.push({
						index: index,
						name: tempName[index],
						url: `${this.staticUrl}${item}`
					});
					// item && tempList.push({
					// 	index: index,
					// 	name: tempName[index],
					// 	url: `http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400`
					// });
				});
				return tempList;
			},
			// -----------API--------------
			// 获取信息
			apiGetWorkById() {
				this.$apis.works.getWorkById({
					id: this.pageOptions.id
				}).then(res => {
					let tempInfo = res.data || {};
					tempInfo._avatar = `${this.staticUrl}${tempInfo.cover_url}`;
					// 处理视频列表
					this.videoList = this.handleUrls(tempInfo?.video_name, tempInfo?.video_url);
					// 处理音频列表
					this.audioList = this.handleUrls(tempInfo?.audio_name, tempInfo?.audio_url);
					// 处理图片列表
					this.imgList = this.handleUrls(tempInfo?.img_name, tempInfo?.img_url);
					// 用户信息
					this.userInfo = tempInfo;
				});
			},
			// 删除
			apiDelWork() {
				let that = this;
				uni.showModal({
					title: '提示',
					content: '是否删除当前作品',
					confirmColor: "#ec519a",
					success: (res) => {
						if (res.confirm) {
							that.$apis.work.delWork({
								id: that.pageOptions.id
							}).then(() => {
								uni.showToast({
									title: '删除成功',
									duration: 2000
								});
								setTimeout(() => {
									uni.reLaunch({
										url: "/pages/index/index"
									});
								}, 2000);
							});
						};
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	$app_bottom_height: 80rpx;
	.container {
		width: 100vw;
		.userBox {
			width: 100vw;
			height: 516rpx;
			background: $themeColor;
			position: relative;
			overflow: hidden;
			.infoBg {
				position: absolute;
				z-index: 0;
				width: 100vw;
				height: 516rpx;
				top: 0;
				left: 0;
				opacity: 1;
				filter: blur(6px);
				transform: scale(1.2);
			}
			.infoBox {
				z-index: 1;
				width: 100%;
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				padding: 0 64rpx 0 40rpx;
				.infoAvatar {
					width: 160rpx;
					height: 160rpx;
					border: 6rpx solid $uni-border-white;
					border-radius: 50%;
					overflow: hidden;
				}
				.msgBox {
					width: calc(100% - 160rpx - 64rpx - 40rpx);
					padding: 0 24rpx 0 0;
					text-align: right;
					.infoName {
						font-size: 42rpx;
						color: $uni-text-color-inverse;
						font-weight: bold;
						margin-bottom: 8rpx;
					}
					.infoDesc {
						font-size: 24rpx;
						color: $uni-text-color-inverse;
					}
				}
				
			}
		}
		.messageBox {
			width: 100vw;
			min-height: calc(100vh - 616rpx + 60rpx);
			background: $uni-bg-color;
			border-radius: 60rpx;
			margin: -60rpx auto 0;
			padding: 42rpx 30rpx;
			position: relative;
			.tabsTitle {
				width: 100%;
				font-size: 36rpx;
				font-weight: bold;
				color: $uni-text-color-black;
				line-height: 68rpx;
				position: relative;
				padding-left: 16rpx;
				margin-bottom: 12rpx;
				&::before {
					content: "";
					width: 8rpx;
					height: 32rpx;
					position: absolute;
					left: 0;
					top: 50%;
					transform: translateY(-50%);
					border-radius: 4rpx;
					background: $themeColor;
				}
			}
			.baseBox {
				margin: 12rpx auto 24rpx;
				.msgLine {
					width: 100%;
					font-size: 32rpx;
					color: $uni-text-color;
					line-height: 42rpx;
					margin: 16rpx 0;
					.msgLeft {
						width: 220rpx;
					}
					.msgRight {
						word-break: break-all;
						width: calc(100% - 220rpx);
						color: $uni-text-color-gray;
					}
				}
			}
			.videoBox {
				margin: -24rpx auto 24rpx;
				.videoItem {
					width: 100%;
					height: 388rpx;
					margin-top: 12rpx;
					border-radius: 12rpx;
					background: $uni-bg-color-black;
				}
			}
			::v-deep .imgBox {
				.u-album__row {
					// justify-content: center;
					.u-text__value {
						font-size: 52rpx;
					}
				}
			}
		}
		.editBox {
			padding-bottom: constant(safe-area-inset-bottom);
			padding-bottom: env(safe-area-inset-bottom);
			background: $uni-bg-color;
			box-sizing: border-box;
			.btnBox {
				box-sizing: border-box;
				width: 100vw;
				height: $app_bottom_height;
				&_fixed {
					position: fixed;
					bottom: 0;
					left: 0;
					z-index: 9999;
					box-shadow: 0px 0px 12px 0px rgba(205, 191, 195, 0.6);
				}
				&_fill {
					background: transparent;
					height: $app_bottom_height;
				}
				.btnItem {
					width: 50%;
					font-size: 30rpx;
					height: $app_bottom_height;
					line-height: $app_bottom_height;
					color: $uni-text-color-inverse;
					border: 2rpx solid $themeColor;
					background: $themeColor;
					text-align: center;
					box-sizing: border-box;
					display: inline-block;
					&_circle {
						background: $uni-bg-color;
						color: $themeColor;
						border: 2rpx solid $uni-border-white;
					}
				}
			}
		}
	}
</style>
