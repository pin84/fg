<template>
  <download-excel :data="dataList" :fields="json_fields" class="btn">
    <el-button class="btn" type="info">导出</el-button>
  </download-excel>
</template>

<script>
import JsonExcel from "vue-json-excel";
export default {
  props: {
    dataList: {
      type: Array,
      default: () => [],
    },
    dataType: {
      type: String,
      default: () => "2",
    },
    tableLineList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      json_fields: {
        "Complete name": "name",
        City: "city",
        Telephone: "phone.mobile",
        "Telephone 2": {
          field: "phone.landline",
          callback: (value) => {
            return `Landline Phone - ${value}`;
          },
        },
      },

      json_data: [
        {
          name: "Tony Peña",
          city: "New York",
          country: "United States",
          birthdate: "1978-03-15",
          phone: {
            mobile: "1-541-754-3010",
            landline: "(541) 754-3010",
          },
        },
        {
          name: "Thessaloniki",
          city: "Athens",
          country: "Greece",
          birthdate: "1987-11-23",
          phone: {
            mobile: "+1 855 275 5071",
            landline: "(2741) 2621-244",
          },
        },
      ],
      person: [
        {
          prop: "classify_name",
          label: "传承人分类",
          width: "50",
        },
        {
          prop: "name",
          label: "姓名",
          width: "150",
        },
        {
          prop: "sex",
          label: "性别",
          width: "50",
        },
        {
          prop: "birthday",
          label: "出生日期",
          width: "",
        },
        {
          prop: "nation",
          label: "民族",
          width: "50",
        },
        {
          prop: "phone",
          label: "联系方式",
          width: "180",
        },
        {
          prop: "addr",
          label: "地址",
          width: "360",
        },
        {
          prop: "successor_level",
          label: "传承人级别",
          width: "",
        },

        {
          prop: "honor_year",
          label: "荣获年份",
          width: "",
        },
        {
          prop: "batch",
          label: "批次",
          width: "",
        },

        {
          prop: "honor_year",
          label: "荣获年份",
          width: "",
        },
        {
          prop: "honor_names",
          label: "荣誉称号",
          width: "",
        },
        {
          prop: "art_year",
          label: "学艺年代",
          width: "",
        },
        {
          prop: "art_experience",
          label: "学艺经历",
          width: "",
        },
        {
          prop: "art_speciality",
          label: "技艺特长",
          width: "",
        },
        {
          prop: "typeofwork",
          label: "代表性作品",
          width: "",
        },
        {
          prop: "sfname",
          label: "学艺师傅姓名",
          width: "",
        },
        {
          prop: "prentices",
          label: "主要徒弟姓名",
          width: "",
        },
        {
          prop: "describe",
          label: "其它相关描述",
          width: "",
        },
      ],
      play: [
        {
          prop: "d_type",
          label: "作品分类",
          width: "50",
        },
        {
          prop: "name",
          label: "作品名称",
          width: "50",
        },
        {
          prop: "orther_name",
          label: "其他名称",
          width: "50",
        },
        {
          prop: "playwright",
          label: "作者",
          width: "50",
        },
        {
          prop: "fistshow",
          label: "制作时间",
          width: "50",
        },
        {
          prop: "showaddr",
          label: "地区",
          width: "50",
        },
        {
          prop: "desc",
          label: "内容描述",
          width: "50",
        },
      ],
      work: [
        {
          prop: "name",
          label: "工作名称",
          width: "50",
        },
        {
          prop: "d_type",
          label: "工作分类",
          width: "50",
        },
        {
          prop: "content",
          label: "工作内容",
          width: "50",
        },
      ],
    };
  },
  components: {
    downloadExcel: JsonExcel,
  },

  created() {
    this.initData();
  },

  methods: {
    initData() {
      let json_fields = {};
      let curList = [];
      switch (this.dataType) {
        case "2":
          curList = this.play;
          break;
        case "3":
          curList = this.work;
          break;
        default:
             curList = this.person;
          break;
      }
      for (let obj of curList) {
        json_fields[obj.label] = obj.prop;
      }
      console.log(json_fields);
      this.json_fields = json_fields;
    },
  },
};
</script>

<style lang="scss" scoped>
.btn {
  border-radius: 3px;
  padding: 8px 20px;
}
</style>