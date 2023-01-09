   let level = [{
           id: 1,
           name: '全部'
       },
       {
           id: 2,
           name: '无'
       },
       {
           id: 3,
           name: '国家级'
       },
       {
           id: 4,
           name: '省或自治区级'
       },
       {
           id: 5,
           name: '市级'
       },
       {
           id: 6,
           name: '县级'
       }
   ]

//    let type_peple = localStorage.getItem('type_peple')
   let classifyList =  ['传承人','民间艺人']
   let inputList = [{
           mkey: "classify_name",
           title: "传统艺人分类",
           inputType: 1,
           dropdownList: classifyList , //    ["传承人", "民间艺人"]
           inputText: classifyList[0]
       },
       {
           mkey: "name",
           title: "姓名",
       },
       {
           mkey: "sex",
           title: "姓别",
           inputType: 1,
           dropdownList: ["男", "女"],
           inputText: "男",
       },
       {
           mkey: "birthday",
           inputType: 6,
           title: "出生日期",
       },
       {
           mkey: "nation",
           title: "民族信息",
       },
       {
           mkey: "phone",
           title: "联系方式",
       },
    //    {
    //        mkey: "idcard",
    //        title: "身份证",
    //    },

       {
           mkey: "addr",
           title: "地址",
       },
       {
           mkey: "successor_level",
           title: "传承人级别",
           inputType: 1,
           dropdownList: ["无", "国家级", "省或自治区级", "市级", "县级"],
           inputText: "无",
       },
       {
           mkey: "honor_year",
           title: "荣获年份",
       },

       {
           mkey: "batch",
           title: "批次",
       },

       {
           mkey: "honor_names",
           title: "荣誉称号",
       },

       {
           mkey: "art_year",
           inputType: 7,
           title: "学艺年代",
       },
       {
           mkey: "art_experience",
           title: "学艺经历",
           inputType: 3,
       },
       {
           mkey: "art_speciality",
           title: "技艺特长",
           inputType: 3,
       },
       {
           mkey: "typeofwork",
           title: "代表性曲目",
           inputType: 3,
       },

       {
           mkey: "sfname",
           title: "学艺师傅姓名",
       },
       {
           mkey: "prentices",
           title: "主要徒弟姓名",
       },

       {
           mkey: "describe",
           title: "其它相关描述",
           inputType: 3,
       },

   ]


   let d_typeList =['新编曲目','传统曲目']
   let DongXiData = [{
           mkey: "d_type",
           title: "曲目分类",
           inputType: 5,
           dropdownList:d_typeList,// ["动物纹", "植物纹", "景物纹"],
           inputText: [],
       },
       {
           mkey: "name",
           title: "曲目名称",
       },
       {
           mkey: "orther_name",
           title: "其他名称",
       },
       {
           mkey: "playwright",
           title: "创编者",
       },
       {
           mkey: "fistshow",
           inputType: 7,
           title: "创编时间",
       },
       {
           mkey: "showaddr",
           title: "主要流传地区",
       },


       {
           mkey: "players",
           title: "表演者",
       },
       {
           mkey: "lyrics",
           title: "歌词（汉译 汉字记侗单）",
       },
       {
           mkey: "musicSheet",
           title: "乐谱",
       },


    //    {
    //        mkey: "preview",
    //        title: "封面",
    //        inputType: 3,
    //    },
       {
           mkey: "desc",
           title: "内容描述",
           inputType: 3,
       },
   ]

   let works = [{
           mkey: "name",
           title: "工作名称",
       },
       {
           mkey: "d_type",
           title: "工作分类",
           inputType: 1,
           dropdownList: ["侗族刺绣普查", "侗族刺绣进校园", "侗族刺绣展览", '侗族刺绣培训班', '侗族刺绣调研', '侗族刺绣推广', '其它'],
           inputText: "侗族刺绣普查",
       },
       {
           mkey: "content",
           title: "工作内容",
           inputType: 3,
       }
   ]



   let workType = [

       {
           id: 8,
           name: '全部'
       },
       {
           id: 1,
           name: '侗族刺绣普查'
       },
       {
           id: 2,
           name: '侗族刺绣进校园'
       },
       {
           id: 3,
           name: '侗族刺绣展览'
       },
       {
           id: 4,
           name: '侗族刺绣培训班'
       },
       {
           id: 5,
           name: '侗族刺绣调研'
       },
       {
           id: 6,
           name: '侗族刺绣推广'
       },
       {
           id: 7,
           name: '其它'
       },
   ]


   let workMedia = [{
           mkey: "cover_name",
           mediaUrl: "cover_url",
           title: "封面",
           desc: "请选择jpg/png/jpeg/gif/bmp等图片格式文件",
           accept: ".jpg, .jpeg, .png, .gif,.bmp",
       },
       {
           mkey: "img_name",
           mediaUrl: "img_url",
           title: "添加图片",
           desc: "请选择jpg/png/jpeg/gif/bmp等图片格式文件",
           accept: ".jpg, .jpeg, .png, .gif,.bmp",
           multiple: "multiple",
       },

       {
           mkey: "audio_name",
           mediaUrl: "audio_url",
           title: "添加音频",
           desc: "请选择mp3等格式音频文件",
           accept: ".mp3",
           multiple: "multiple",
       },

       {
           mkey: "video_name",
           mediaUrl: "video_url",
           title: "添加视频",
           desc: "请选择mp4等格式视频文件",
           accept: ".mp4",
           multiple: "multiple",
       }
   ]


   module.exports = {
       level,
       inputList,
       DongXiData,
       works,
       workMedia,
       workType
   }