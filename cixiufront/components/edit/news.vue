<template>
	<view class="formBox">
		<u--form
			labelPosition="left"
			labelWidth="auto"
			:model="editForm"
			ref="formBox"
		>
			<view class="titleLine flex f_a_center f_j_between">
				<view class="titleName">基础信息</view>
			</view>
			<u-form-item label="作品分类" prop="d_type" borderBottom @click="actionType = 'trackType'">
				<view class="formItem">{{editForm.d_type || "请选择作品分类"}}</view>
				<u-icon slot="right" name="arrow-right"></u-icon>
			</u-form-item>
			<u-form-item label="作品名称" prop="name" borderBottom>
				<view class="formItem">
					<u--input v-model="editForm.name" type="text" inputAlign="right" border="none" placeholder="请输入作品名称"></u--input>
				</view>
			</u-form-item>
			<u-form-item label="其他名称" prop="orther_name" borderBottom>
				<view class="formItem">
					<u--input v-model="editForm.orther_name" type="text" inputAlign="right" border="none" placeholder="请输入其他名称"></u--input>
				</view>
			</u-form-item>
			<u-form-item label="作者" prop="playwright" borderBottom>
				<view class="formItem">
					<u--input v-model="editForm.playwright" type="text" inputAlign="right" border="none" placeholder="请输入作者"></u--input>
				</view>
			</u-form-item>
			<u-form-item label="制作时间" prop="fistshow" borderBottom @click="actionType = 'performanceTime'">
				<view class="formItem">{{editForm.fistshow || "请选择制作时间"}}</view>
				<u-icon slot="right" name="arrow-right"></u-icon>
			</u-form-item>
			
			<view class="titleLine flex f_a_center f_j_between">
				<view class="titleName">详细信息</view>
			</view>
			<u-form-item label="地区" prop="showaddr" borderBottom>
				<view class="formItem">
					<u--input v-model="editForm.showaddr" type="text" inputAlign="right" border="none" placeholder="请输入地区"></u--input>
				</view>
			</u-form-item>
			<u-form-item label="图案纹样" prop="preview" borderBottom>
				<view class="formItem">
					<u--input v-model="editForm.preview" type="text" inputAlign="right" border="none" placeholder="请输入图案纹样"></u--input>
				</view>
			</u-form-item>
			<u-form-item label="内容描述" prop="desc"></u-form-item>
			<view class="textareaBox">
				<textarea v-model="editForm.desc" class="formTextarea" auto-height placeholder="请输入内容描述"/>
			</view>
			<u-form-item label="设置封面" borderBottom>
				<view class="formItem">
					<u-upload
						:fileList="coverImgList"
						@afterRead="handleAfterRead"
						@delete="handleDelete"
						name="coverImgList"
						:maxCount="1"
					></u-upload>
				</view>
			</u-form-item>
			<u-form-item label="添加图片" borderBottom>
				<view class="formItem">
					<u-upload
						:fileList="userImgList"
						@afterRead="handleAfterRead"
						@delete="handleDelete"
						name="userImgList"
						:maxCount="9"
						multiple
					></u-upload>
				</view>
			</u-form-item>
			<u-form-item label="添加矢量文件" borderBottom>
				<view class="formItem">
					<view @tap="$refs.uploads.select(), actionType='audioList'" class="audioBox" v-show="audioList.length < 9">
						<u-icon name="attach" color="#D3D4D6" size="26"></u-icon>
					</view>
					<view v-for="(item, index) in audioList" :key="index" class="audioItem flex f_a_center f_j_end">
						<text class="audioItemText ellipsis">{{item.name}}</text>
						<u-icon name="attach" color="#D3D4D6" size="18" @click="handleDelete({name: 'audioList', index: index})"></u-icon>
					</view>
				</view>
			</u-form-item>
			<u-form-item label="添加视频" borderBottom>
				<view class="formItem">
					<u-upload
						:fileList="videoList"
						@afterRead="handleAfterRead"
						@delete="handleDelete"
						name="videoList"
						:maxCount="9"
						accept="video"
						multiple
						uploadIcon="plus-circle-fill"
					></u-upload>
				</view>
			</u-form-item>
		</u--form>
		
		<!-- 剧目类型 -->
		<u-action-sheet
			:show="actionType === 'trackType'"
			:actions="trackTypeList"
			title="请选择剧目类型"
			@close="actionType = ''"
			@select="(e) => handleSelect('d_type', e)"
		>
		</u-action-sheet>
		<!-- 本次演出时间 -->
		<u-datetime-picker
			ref="datePicker"
			:show="actionType === 'performanceTime'"
			v-model="tempData.performanceTime"
			mode="date"
			:minDate="tempData.performanceTimeStart"
			@cancel="actionType = ''"
			@confirm="(e) => handleSelect('fistshow', e)"
		></u-datetime-picker>
		<!-- 音频 -->
		<yt-uploads ref="uploads" :options="uploadOptions" @selected="handleSelected"></yt-uploads>
		<!-- 汉译剧本 -->
		<yt-uploads ref="hanOperaUploads" :options="uploadOptions" @selected="handleSelected"></yt-uploads>
		<!-- 侗译剧本 -->
		<yt-uploads ref="dongOperaUploads" :options="uploadOptions" @selected="handleSelected"></yt-uploads>
		<!-- 剧目首演时间 -->
		<u-datetime-picker
			ref="premiereTimePicker"
			:show="actionType === 'premiereTime'"
			v-model="tempData.premiereTime"
			mode="date"
			:minDate="tempData.premiereTimeStart"
			@cancel="actionType = ''"
			@confirm="(e) => handleSelect('premiereTime', e)"
		></u-datetime-picker>
		<!-- 信息提示 -->
		<u-notify ref="uNotify"></u-notify>
		
		<u-button text="提交" class="submitBtn" :class="{'editSubmitBtn' : Boolean(detailId)}" @click="handleSubmit"></u-button>
	</view>
</template>

<script>
	import ytUploads from "@/components/yt-uploads/yt-uploads.vue";
	export default {
		name: "CompNews",
		components: {
			ytUploads
		},
		props: {
			detailId: {
				default: "",
				type: String
			}
		},
		data() {
			return {
				// 弹出框类型
				actionType: "",
				// 缓存数据
				tempData: {
					performanceTime: Number(new Date()),
					performanceTimeStart: Number(new Date("1900/01/01")),
					premiereTime: Number(new Date()),
					premiereTimeStart: Number(new Date("1900/01/01")),
				},
				// 表单数据
				editForm: {
					d_type: "", // 作品分类
					name: "", // 作品名称
					orther_name: "", // 其他名称
					playwright: "", // 作者
					fistshow: "", // 制作时间
					showaddr: "", // 地区
					preview: "", // 图案纹样
					desc: "", // 内容描述
				},
				// 类型
				trackTypeList: [
					{ name: '景物纹' },
					{ name: '植物纹' },
					{ name: '动物纹' },
				],
				// 封面图
				coverImgList: [],
				// 照片
				userImgList: [], 
				// 音频 、矢量文件
				audioList: [], 
				// 音频上传插件配置
				uploadOptions: {
					// 选则图片或者视频 图片:0 视频:1 全文件:2
					type: 2,
					// 上传文件的key 后台根据这个key取得文件
					name:'file',
					// 上传的地址
					host:"/",
					// 选择数量
					count: 9,
					// 是否自动上传
					autoUpload: false
				},
				// 视频
				videoList: [], 
				// 汉译剧本
				hanOperaList: [],
				// 侗译剧本
				dongOperaList: [],
				detailInfo: {}, // 详情信息
			}
		},
		computed: {
			// 静态URL
			staticUrl() {
				return this.$CONFIG.STATICURL
			},
			newsClassification() {
				return this.$store.getters.newsClassification || [];
			}
		},
		watch: {
			detailId: {
				immediate: true,
				handler(n, o) {
					if (n) {
						this.apiGetDetail();
					}
				}
			},
			newsClassification: {
				immediate: true,
				deep: true,
				handler(n, o) {
					if (n.length) {
						this.editForm.d_type = n[0].name
						this.trackTypeList = n
					}
				}
			},
		},
		methods: {
			// 初始化数据
			initData() {
				this.coverImgList = [];
				this.userImgList = [];
				this.audioList = [];
				this.videoList = [];
				this.detailInfo = {};
				this.editForm = {
					d_type: this.newsClassification[0].name, // 作品分类
					name: "", // 作品名称
					orther_name: "", // 其他名称
					playwright: "", // 作者
					fistshow: "", // 制作时间
					showaddr: "", // 地区
					preview: "", // 图案纹样
					desc: "", // 内容描述
				}
			},
			handleUrls(namelist="", urllist="") {
				let tempUrl = urllist?.split(",") || [];
				let tempName = namelist?.split(",") || [];
				let tempList = [];
				tempUrl.forEach((item, index) => {
					item && tempList.push({
						status: 'success', 
						message: '', 
						url: `${this.staticUrl}${item}`, 
						name: tempName[index],
						s_url: item,
						s_name: tempName[index],
						isold: true
					});
				});
				return tempList;
			},
			// 选择事件
			handleSelect(type, data) {
				if (["birthday", "fistshow"].includes(type)) {
					this.actionType = "";
					this.editForm[type] = uni.$u.timeFormat(data.value, 'yyyy-mm-dd')
				} else {
					this.editForm[type] = data.name;
				};
			},
			// 上传
			handleAfterRead(e) {
				console.log("handleAfterRead", e);
				let isArray = this.$tools.isArray(e.file);
				let tempList = [];
				if (isArray) {
					e.file.forEach(item => {
						tempList.push({status: 'success', message: '', url: item.url});
					});
				} else {
					tempList.push({status: 'success', message: '', url: e.file.url});
				};
				this[e.name] = [...this[e.name], ...tempList];
			},
			// 删除
			handleDelete(e) {
				console.log("handleDelete", e);
				this[e.name].splice(e.index, 1);
			},
			// 文件选择
			handleSelected(tempFilePaths) {
				console.log("handleSelected", tempFilePaths);
				let audioPassList = ["pdf"]; // 允许上传的类型
				let tempList = [];
				tempFilePaths.forEach(item => {
					let fileName = item.path.split("/").splice(-1)[0];
					let checkFile = fileName;
					if (!audioPassList.includes(checkFile.split(".").splice(-1)[0]) && this.actionType === "audioList") {
						this.$refs.uNotify.show({
							top: 10,
							type: 'warning',
							message: '只能上传pdf格式音频文件',
							duration: 1000 * 3,
							safeAreaInsetTop: true
						});
					} else {
						tempList.push({status: 'success', message: '', url: item.path, name: fileName});
					};
				});
				this[this.actionType] = [...this[this.actionType], ...tempList];
			},
			// 提交
			handleSubmit() {
				if (!this.editForm.name) return uni.showToast({
					title: '请输入作品名称',
					icon: "none",
					duration: 2000
				});
				if (this.coverImgList.length === 0) return uni.showToast({
					title: '请上传封面图',
					icon: "none",
					duration: 2000
				});
				let tempuploadList = [];
				
				let tempCoverList = this.coverImgList.filter(item => item.isold);
				this.coverImgList.filter(item => !item.isold).forEach(item => {
					tempuploadList.push(this.$tools.uploadFile({...item, istype: "coverImg"}));
				});
				let tempUserImgList = this.userImgList.filter(item => item.isold);
				this.userImgList.filter(item => !item.isold).forEach(item => {
					tempuploadList.push(this.$tools.uploadFile({...item, istype: "userImg"}));
				});
				let tempAudioList = this.audioList.filter(item => item.isold);
				this.audioList.filter(item => !item.isold).forEach(item => {
					tempuploadList.push(this.$tools.uploadFile({...item, istype: "audioList"}));
				});
				let tempVideoList = this.videoList.filter(item => item.isold);
				this.videoList.filter(item => !item.isold).forEach(item => {
					tempuploadList.push(this.$tools.uploadFile({...item, istype: "videoList"}));
				});
				
				uni.showLoading({
					title: "正在提交...",
					mask: true
				});
				Promise.all(tempuploadList).then(res => {
					let coverList = [...tempCoverList, ...res.filter(item => item.istype === "coverImg")];
					let imgList = [...tempUserImgList, ...res.filter(item => item.istype === "userImg")];
					let audioList = [...tempAudioList, ...res.filter(item => item.istype === "audioList")];
					let videoList = [...tempVideoList, ...res.filter(item => item.istype === "videoList")];
					
					let tempBeforeData = {
						...this.editForm,
						cover_name: coverList.map(item => item.s_name).toString(),
						cover_url: coverList.map(item => item.s_url).toString(),
						img_name: imgList.map(item => item.s_url).toString(),
						img_url: imgList.map(item => item.s_url).toString(),
						vectorfile: audioList.map(item => item.s_url).toString(),
						vectorfile_url: audioList.map(item => item.s_url).toString(),
						video_name: videoList.map(item => item.s_url).toString(),
						video_url: videoList.map(item => item.s_url).toString(),
					};
					let tempSubmit = Boolean(this.detailInfo.id) ? this.$tools.submitEditData(tempBeforeData) : this.$tools.submitAddData(tempBeforeData);
					// return console.log(tempSubmit);
					// 修改
					if (this.detailInfo.id) {
						tempSubmit.id = this.detailInfo.id;
						return this.apiUpdateItem(tempSubmit);
					};
					// 新增
					this.apiAddItem(tempSubmit);
				});
			},
			// 获取信息
			apiGetDetail() {
				this.$apis.news.getPlayById({
					id: this.detailId
				}).then(res => {
					let tempUserInfo = res.data || {};
					let tempInfo = {};
					Object.keys(this.editForm).forEach(key => {
						tempInfo[key] = tempUserInfo[key];
					});
					// 编辑表单
					this.editForm = tempInfo;
					// 封面
					this.coverImgList = this.handleUrls(tempUserInfo?.cover_name, tempUserInfo?.cover_url);
					// 处理图片列表
					this.userImgList = this.handleUrls(tempUserInfo?.img_name, tempUserInfo?.img_url);
					// 处理矢量列表
					this.audioList = this.handleUrls(tempUserInfo?.vectorfile, tempUserInfo?.vectorfile_url);
					// 处理视频列表
					this.videoList = this.handleUrls(tempUserInfo?.video_name, tempUserInfo?.video_url);
					// 用户信息
					this.detailInfo = tempUserInfo;
				});
			},
			// 新增
			apiAddItem(data) {
				this.$apis.news.addPlay(data).then(res => {
					uni.showToast({
						title: '新增成功',
						duration: 2000
					})
					this.initData();
				}).finally(() => {
					uni.hideLoading();
				});
			},
			// 修改
			apiUpdateItem(data) {
				this.$apis.news.updatePlay(data).then(res => {
					uni.hideLoading();
					uni.showToast({
						title: '修改成功',
						duration: 2000
					})
					setTimeout(() => {
						this.initData();
						this.$emit("callback", { model: "news", type: "save" });
					}, 2000);
				}).catch(() => {
					uni.hideLoading();
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.titleLine {
		width: 100%;
		height: 88rpx;
		.titleName {
			font-size: 30rpx;
			color: $themeColor;
			position: relative;
			padding-left: 16rpx;
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
		.titleBtn {
			font-size: 28rpx;
			color: #2E3041;
			.titleIcon {
				font-size: 28rpx;
			}
		}
	}
	.formBox {
		padding: 24rpx 32rpx 200rpx;
		.formItem {
			text-align: right;
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			::v-deep .u-upload {
				.u-upload__wrap {
					justify-content: flex-end;
				}
			}
			.audioBox {
				width: 80px;
				height: 80px;
				background-color: #f4f5f7;
				border-radius: 2px;
				margin: 0 8px 8px 0;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
			}
			.audioItem {
				height: 52rpx;
				&Text {
					display: block;
					font-size: 28rpx;
					max-width: 90%;
					padding-right: 24rpx;
				}
			}
		}
		.textareaBox {
			width: 100%;
			.formTextarea {
				width: 100%;
				min-height: 160rpx;
				border-radius: 8rpx;
				border: 1px solid #d6d7d9;
				padding: 12rpx;
				box-sizing: border-box;
			}
		}
	}
	.submitBtn {
		width: 100vw;
		height: 88rpx;
		position: fixed;
		left: 0;
		background: $themeColor;
		border-radius: 0;
		color: $uni-text-color-inverse;
		bottom: calc(constant(safe-area-inset-bottom) + 98rpx);
		bottom: calc(env(safe-area-inset-bottom) + 98rpx); 
	}
	.editSubmitBtn {
		bottom: calc(constant(safe-area-inset-bottom) + 0rpx);
		bottom: calc(env(safe-area-inset-bottom) + 0rpx); 
	}
</style>
