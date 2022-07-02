<template>
	<view class="container">
		<!-- <u-navbar
			title="传承人"
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
				<!-- <image v-if="userInfo._avatar" :src="userInfo._avatar" class="infoAvatar" mode="aspectFill"></image> -->
				<view class="infoAvatar flex f_j_center f_a_center" v-if="userInfo._avatar">
					<u--image :showLoading="true" :src="userInfo._avatar" width="160rpx" height="160rpx" mode="aspectFill" radius="50%"></u--image>
				</view>
			</view>
		</view>
		<view class="messageBox">
			<view class="tabsTitle">基本信息</view>
			<view class="baseBox">
				<view class="msgLine flex">
					<view class="msgLeft">艺人分类</view>
					<view class="msgRight">{{userInfo.classify_name || "暂无"}}</view>
				</view>
				<view class="msgLine flex">
					<view class="msgLeft">性别</view>
					<view class="msgRight">{{userInfo.sex || "暂无"}}</view>
				</view>
				<view class="msgLine flex">
					<view class="msgLeft">民族</view>
					<view class="msgRight">{{userInfo.nation || "暂无"}}</view>
				</view>
				<view class="msgLine flex">
					<view class="msgLeft">传承等级</view>
					<view class="msgRight">{{userInfo.successor_level || "暂无"}}</view>
				</view>
				<view class="msgLine flex">
					<view class="msgLeft">批次</view>
					<view class="msgRight">{{userInfo.batch || "暂无"}}</view>
				</view>
				<view class="msgLine flex">
					<view class="msgLeft">荣誉称号</view>
					<view class="msgRight">{{userInfo.honor_names || "暂无"}}</view>
				</view>
				<view class="msgLine flex">
					<view class="msgLeft">主要徒弟</view>
					<view class="msgRight">{{userInfo.prentices || "暂无"}}</view>
				</view>
				<view class="msgLine flex">
					<view class="msgLeft">学艺师傅</view>
					<view class="msgRight">{{userInfo.sfname || "暂无"}}</view>
				</view>
				<view class="msgLine flex">
					<view class="msgLeft">学艺年代</view>
					<view class="msgRight">{{userInfo.art_year || "暂无"}}</view>
				</view>
				<view class="msgLine flex">
					<view class="msgLeft">学艺经历</view>
					<view class="msgRight">{{userInfo.art_experience || "暂无"}}</view>
				</view>
				<view class="msgLine flex">
					<view class="msgLeft">技艺特长</view>
					<view class="msgRight">{{userInfo.art_speciality || "暂无"}}</view>
				</view>
				<view class="msgLine flex">
					<view class="msgLeft">其它描述</view>
					<view class="msgRight">{{userInfo.describe || "暂无"}}</view>
				</view>
			</view>
			
			<block v-if="videoList.length">
				<view class="tabsTitle">采访视频</view>
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
				<view class="tabsTitle">采访录音</view>
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
				<view class="tabsTitle">照片</view>
				<view class="imgBox">
					<u-album :urls="imgList" keyName="url" multipleSize="220rpx"></u-album>
				</view>
			</block>
		</view>
		
		<view class="editBox">
			<view class="btnBox_fill"></view>
			<view class="btnBox btnBox_fixed" v-if="hasUser">
				<view class="btnItem" @click="handleEdit">编辑</view>
				<view class="btnItem btnItem_circle" @click="apiDeleteUser">删除</view>
			</view>
		</view>
	</view>
</template>

<script>
	let videoContext = null;
	let audioContext = null;
	export default {
		name: "InheritedDetail",
		data() {
			return {
				navbarBgColor: "rgba(204, 30, 29, 0)", // navbar背景颜色
				videoList: [], // 视频列表
				videoIndex: 0, // 视频下标
				audioList: [], // 音频列表
				audioIndex: 0, // 音频下标
				imgList: [], // 图片列表
				isShowVideo: false, // 显示/隐藏视频
				userInfo: {}, // 用户信息
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
		onShow() {
			this.apiGetUserById();
			this.hasUser = Boolean(uni.getStorageSync("i_userinfo"));
		},
		onPageScroll(e) {
			let tempAlpha = e.scrollTop / 200;
			this.navbarBgColor = `rgba(204, 30, 29, ${tempAlpha > 1 ? 1 : tempAlpha})`;
		},
		methods: {
			handleEdit() {
				uni.navigateTo({
					url: `/pages/datas/edit?id=${this.pageOptions.id}&type=inherited`
				});
			},
			// 视频切换
			tabsClick(e) {
				this.videoIndex = e.index || 0;
			},
			// 处理视频
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
				});
				return tempList;
			},
			// -----------API--------------
			// 获取用户信息
			apiGetUserById() {
				this.$apis.inherited.getUserById({
					id: this.pageOptions.id
				}).then(res => {
					let tempUserInfo = res.data || {};
					tempUserInfo._avatar = `${this.staticUrl}${tempUserInfo.cover_url}`;
					// 处理视频列表
					this.videoList = this.handleUrls(tempUserInfo?.video_name, tempUserInfo?.video_url);
					// 处理音频列表
					this.audioList = this.handleUrls(tempUserInfo?.audio_name, tempUserInfo?.audio_url);
					// 处理图片列表
					this.imgList = this.handleUrls(tempUserInfo?.img_name, tempUserInfo?.img_url);
					// 用户信息
					this.userInfo = tempUserInfo;
				});
			},
			// 删除用户
			apiDeleteUser() {
				let that = this;
				uni.showModal({
					title: '提示',
					content: '是否删除当前用户',
					confirmColor: "#ec519a",
					success: (res) => {
						if (res.confirm) {
							that.$apis.inherited.deleteUser({
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
			::v-deep .audioBox {
				margin: 12rpx auto 24rpx;
				.u-cell__body {
					    padding: 10px 0;
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
