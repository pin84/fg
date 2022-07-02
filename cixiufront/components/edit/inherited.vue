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
			<u-form-item label="传承人分类" prop="classify_name" borderBottom @click="actionType = 'classify_name'">
				<view class="formItem">{{editForm.classify_name || "请选择传承人分类"}}</view>
				<u-icon slot="right" name="arrow-right"></u-icon>
			</u-form-item>
			<u-form-item label="姓名" prop="name" borderBottom>
				<view class="formItem">
					<u--input v-model="editForm.name" type="text" inputAlign="right" border="none" placeholder="请输入姓名"></u--input>
				</view>
			</u-form-item>
			<u-form-item label="性别" prop="sex" borderBottom @click="actionType = 'sex'">
				<view class="formItem">{{editForm.sex || "请选择性别"}}</view>
				<u-icon slot="right" name="arrow-right"></u-icon>
			</u-form-item>
			<u-form-item label="出生日期" prop="sex" borderBottom @click="actionType = 'birthday'">
				<view class="formItem">{{editForm.birthday || "请选择生日"}}</view>
				<u-icon slot="right" name="arrow-right"></u-icon>
			</u-form-item>
			<u-form-item label="民族" prop="nation" borderBottom>
				<view class="formItem">
					<u--input v-model="editForm.nation" type="text" inputAlign="right" border="none" placeholder="请输入民族"></u--input>
				</view>
			</u-form-item>
			<u-form-item label="联系电话" prop="phone" borderBottom>
				<view class="formItem">
					<u--input v-model="editForm.phone" type="number" inputAlign="right" border="none" placeholder="请输入联系电话"></u--input>
				</view>
			</u-form-item>
			<u-form-item label="身份证" prop="idcard" borderBottom>
				<view class="formItem">
					<u--input v-model="editForm.idcard" type="text" inputAlign="right" border="none" placeholder="请输入身份证"></u--input>
				</view>
			</u-form-item>
			
			<view class="titleLine flex f_a_center f_j_between">
				<view class="titleName">详细信息</view>
			</view>
			<!-- <u-form-item label="地址" prop="address" borderBottom>
				<view class="formItem" @click="actionType = 'address'">{{editForm.address || "请选择地址"}}</view>
				<u-icon slot="right" name="arrow-right"></u-icon>
			</u-form-item> -->
			<u-form-item label="详细地址" prop="addr" borderBottom>
				<view class="formItem">
					<u--input v-model="editForm.addr" type="text" inputAlign="right" border="none" placeholder="请输入详细地址"></u--input>
				</view>
			</u-form-item>
			<u-form-item label="传承人级别" prop="successor_level" borderBottom @click="actionType = 'honourClass'">
				<view class="formItem">{{editForm.successor_level || "请选择级别"}}</view>
				<u-icon slot="right" name="arrow-right"></u-icon>
			</u-form-item>
			<u-form-item label="荣获年份" prop="honor_year" borderBottom>
				<view class="formItem">
					<u--input v-model="editForm.honor_year" type="text" inputAlign="right" border="none" placeholder="请输入称号获得年份"></u--input>
				</view>
			</u-form-item>
			<u-form-item label="批次" prop="batch" borderBottom>
				<view class="formItem">
					<u--input v-model="editForm.batch" type="number" inputAlign="right" border="none" placeholder="请输入批次"></u--input>
				</view>
			</u-form-item>
			<u-form-item label="荣誉称号" prop="honor_names" borderBottom>
				<view class="formItem">
					<u--input v-model="editForm.honor_names" type="text" inputAlign="right" border="none" placeholder="请输入荣誉称号"></u--input>
				</view>
			</u-form-item>
			<u-form-item label="学艺年代" prop="art_year" borderBottom @click="actionType = 'artYearTime'">
				<view class="formItem">{{editForm.art_year || "请选择学艺年代"}}</view>
				<u-icon slot="right" name="arrow-right"></u-icon>
			</u-form-item>
			<u-form-item label="学艺经历" prop="art_experience" borderBottom>
				<view class="formItem">
					<u--input v-model="editForm.art_experience" type="text" inputAlign="right" border="none" placeholder="请输入学艺经历"></u--input>
				</view>
			</u-form-item>
			<u-form-item label="技艺特长" prop="art_speciality" borderBottom>
				<view class="formItem">
					<u--input v-model="editForm.art_speciality" type="text" inputAlign="right" border="none" placeholder="请输入技艺特长"></u--input>
				</view>
			</u-form-item>
			<u-form-item label="作品类型" prop="typeofwork" borderBottom>
				<view class="formItem">
					<u--input v-model="editForm.typeofwork" type="text" inputAlign="right" border="none" placeholder="请输入作品类型"></u--input>
				</view>
			</u-form-item>
			<u-form-item label="学艺师傅姓名" prop="sfname" borderBottom>
				<view class="formItem">
					<u--input v-model="editForm.sfname" type="text" inputAlign="right" border="none" placeholder="请输入姓名"></u--input>
				</view>
			</u-form-item>
			<u-form-item label="主要徒弟姓名" prop="prentices" borderBottom>
				<view class="formItem">
					<u--input v-model="editForm.prentices" type="text" inputAlign="right" border="none" placeholder="请输入姓名"></u--input>
				</view>
			</u-form-item>
			<u-form-item label="其他描述" prop="describe"></u-form-item>
			<view class="textareaBox">
				<textarea class="formTextarea" auto-height placeholder="请输入内容" v-model="editForm.describe"/>
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
			<u-form-item label="添加音频" borderBottom>
				<view class="formItem">
					<view @tap="$refs.uploads.select()" class="audioBox" v-show="audioList.length < 9">
						<u-icon name="volume-fill" color="#D3D4D6" size="26"></u-icon>
					</view>
					<view v-for="(item, index) in audioList" :key="index" class="audioItem flex f_a_center f_j_end">
						<text class="audioItemText ellipsis">{{item.name}}</text>
						<u-icon name="close-circle-fill" color="#D3D4D6" size="18" @click="handleDelete({name: 'audioList', index: index})"></u-icon>
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
		
		<!-- 艺人类型 -->
		<u-action-sheet
			:show="actionType === 'classify_name'"
			:actions="typelist"
			title="请选择艺人类型"
			@close="actionType = ''"
			@select="(e) => handleSelect('classify_name', e)"
		>
		</u-action-sheet>
		<!-- 性别 -->
		<u-action-sheet
			:show="actionType === 'sex'"
			:actions="sexlist"
			title="请选择性别"
			@close="actionType = ''"
			@select="(e) => handleSelect('sex', e)"
		>
		</u-action-sheet>
		<!-- 生日 -->
		<u-datetime-picker
			ref="datePicker"
			:show="actionType === 'birthday'"
			v-model="tempData.birthday"
			mode="date"
			:minDate="tempData.birthdayStart"
			:maxDate="tempData.birthdayEnd"
			@cancel="actionType = ''"
			@confirm="(e) => handleSelect('birthday', e)"
		></u-datetime-picker>
		<!-- 音频 -->
		<yt-uploads ref="uploads" :options="uploadOptions" @selected="handleSelected"></yt-uploads>
		<!-- 地址 -->
		<u-picker 
			:show="actionType === 'address'" 
			ref="uPicker" 
			:columns="addressColumns" 
			keyName="fullname" 
			@cancel="actionType = ''"
			@confirm="handleConfirm" 
			@change="changeHandler">
		</u-picker>
		<!-- 称号级别 -->
		<u-action-sheet
			:show="actionType === 'honourClass'"
			:actions="honourClassList"
			title="请选择称号级别"
			@close="actionType = ''"
			@select="(e) => handleSelect('successor_level', e)"
		>
		</u-action-sheet>
		<!-- 学艺年代 -->
		<u-datetime-picker
			ref="artYearTimePicker"
			:show="actionType === 'artYearTime'"
			v-model="tempData.artYearTime"
			mode="date"
			:minDate="tempData.artYearTimeStart"
			:maxDate="tempData.artYearTimeEnd"
			@cancel="actionType = ''"
			@confirm="(e) => handleSelect('art_year', e)"
		></u-datetime-picker>
		<!-- 信息提示 -->
		<u-notify ref="uNotify"></u-notify>
		
		<u-button text="提交" class="submitBtn" :class="{'editSubmitBtn' : Boolean(detailId)}" @click="handleSubmit"></u-button>
	</view>
</template>

<script>
	import ytUploads from "@/components/yt-uploads/yt-uploads.vue";
	import addressData from "@/static/json/address.json";
	export default {
		name: "CompInherited",
		props: {
			detailId: {
				default: "",
				type: String
			}
		},
		components: {
			ytUploads
		},
		data() {
			return {
				// 弹出框类型
				actionType: "",
				// 缓存数据
				tempData: {
					birthday: Number(new Date()),
					birthdayStart: Number(new Date("1900/01/01")),
					birthdayEnd: Number(new Date()),
					artYearTime: Number(new Date()),
					artYearTimeStart: Number(new Date("1900/01/01")),
					artYearTimeEnd: Number(new Date()),
				},
				// 表单数据
				editForm: {
					classify_name: "", // 艺人类型
					name: "", // 姓名
					sex: "男", // 性别
					birthday: "", // 出生日期
					nation: "", // 民族
					phone: "", // 联系电话
					idcard: "", // 身份证
					addr: "", // 详细地址
					successor_level: "无", // 称号级别
					honor_names: "", // 荣誉称号
					honor_year: "", // 称号获取年份
					batch: "", // 批次
					art_year: "", // 学艺年代
					art_experience: "", // 学艺经历
					art_speciality: "", // 技艺特长
					typeofwork: "", // 作品类型
					sfname: "", // 学艺师傅姓名
					prentices: "", // 主要徒弟姓名
					describe: "", // 其他
				},
				// 艺人类型选项
				typelist: [
					{ name: '传承人' },
					{ name: '民间艺人' },
				],
				// 性别选项
				sexlist: [
					{ name: '男' },
					{ name: '女' },
				],
				// 封面图
				coverImgList: [],
				// 照片
				userImgList: [], 
				// 音频
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
				// 地址选项
				addressColumns: [addressData, addressData[0].children],
				// 称号级别
				honourClassList: [
					{ name: '国家级' },
					{ name: '省或自治区级' },
					{ name: '市级' },
					{ name: '县级' },
					{ name: '无' },
				],
				// 用户信息
				detailInfo: {}
			}
		},
		computed: {
			// 静态URL
			staticUrl() {
				return this.$CONFIG.STATICURL
			},
			inheritedClassification() {
				return this.$store.getters.inheritedClassification || [];
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
			inheritedClassification: {
				immediate: true,
				deep: true,
				handler(n, o) {
					if (n.length) {
						this.editForm.classify_name = n[0].name
						this.typelist = n
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
					classify_name: this.inheritedClassification[0].name, // 艺人类型
					name: "", // 姓名
					sex: "男", // 性别
					birthday: "", // 出生日期
					nation: "", // 民族
					phone: "", // 联系电话
					idcard: "", // 身份证
					addr: "", // 详细地址
					successor_level: "无", // 称号级别
					honor_names: "", // 荣誉称号
					honor_year: "", // 称号获取年份
					batch: "", // 批次
					art_year: "", // 学艺年代
					art_experience: "", // 学艺经历
					art_speciality: "", // 技艺特长
					typeofwork: "", // 作品类型
					sfname: "", // 学艺师傅姓名
					prentices: "", // 主要徒弟姓名
					describe: "", // 其他
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
				if (["birthday", "art_year"].includes(type)) {
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
			// 音频选择
			handleSelected(tempFilePaths) {
				console.log("handleSelected", tempFilePaths);
				let passList = ["m4a", "wav", "mp3", "aac"]; // 允许上传的类型
				let tempList = [];
				tempFilePaths.forEach(item => {
					let fileName = item.path.split("/").splice(-1)[0];
					let checkFile = fileName;
					if (!passList.includes(checkFile.split(".").splice(-1)[0])) {
						this.$refs.uNotify.show({
							top: 10,
							type: 'warning',
							message: '只能上传m4a、wav、mp3、aac格式音频文件',
							duration: 1000 * 3,
							safeAreaInsetTop: true
						});
					} else {
						tempList.push({status: 'success', message: '', url: item.path, name: fileName});
					};
				});
				this.audioList = [...this.audioList, ...tempList];
			},
			changeHandler(e) {
				const {
					columnIndex,
					index,
					picker = this.$refs.uPicker
				} = e;
				if (columnIndex === 0) {
					picker.setColumnValues(1, addressData[index].children)
				}
			},
			handleConfirm(e) {
				const {
					value
				} = e;
				console.log(value);
				this.editForm.address = value.reduce((t, i) => `${t}${i.fullname}`, "");
				this.actionType = '';
			},
			// 提交
			handleSubmit() {
				if (!this.editForm.name) return uni.showToast({
					title: '请输入姓名',
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
						audio_name: audioList.map(item => item.s_url).toString(),
						audio_url: audioList.map(item => item.s_url).toString(),
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
			// 获取用户信息
			apiGetDetail() {
				this.$apis.inherited.getUserById({
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
					// 处理音频列表
					this.audioList = this.handleUrls(tempUserInfo?.audio_name, tempUserInfo?.audio_url);
					// 处理视频列表
					this.videoList = this.handleUrls(tempUserInfo?.video_name, tempUserInfo?.video_url);
					// 用户信息
					this.detailInfo = tempUserInfo;
				});
			},
			// 新增用户
			apiAddItem(data) {
				this.$apis.inherited.addUser(data).then(res => {
					uni.showToast({
						title: '新增成功',
						duration: 2000
					})
					this.initData();
				}).finally(() => {
					uni.hideLoading();
				});
			},
			// 修改用户
			apiUpdateItem(data) {
				this.$apis.inherited.updateUser(data).then(res => {
					uni.hideLoading();
					uni.showToast({
						title: '修改成功',
						duration: 2000
					})
					setTimeout(() => {
						this.initData();
						this.$emit("callback", { model: "inherited", type: "save" });
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
