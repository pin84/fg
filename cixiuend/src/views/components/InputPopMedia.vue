<template>
  <ul class="list list-upload">
    <li class="item item-upload" v-for="(obj, idx1) in list" :key="idx1 + 'a'">
      <span class="title">{{ obj.title }}</span>
      <div class="input-box">
        <input
          class="upload"
          type="file"
          :accept="obj.accept"
          :placeholder="'请输入' + obj.title"
          :multiple='obj.multiple'
          @change="change($event, obj, idx1)"
        />
        <span class="desc">{{ obj.desc }}</span>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },

  methods:{
    change(e, item, index){
      this.$emit('inputChange',e, item, index)
    }
  }
};
</script>

<style lang="scss" scoped>
.list {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 100px;
  // flex-wrap: wrap;
  .item {
    width: 45%;
    display: flex;
    align-items: center;
    height: 45px;
    padding: 5px 0;
    box-sizing: border-box;
    font-size: 14px;
    .title {
      flex: 0 0 100px;
      text-align: right;
      margin-right: 30px;
    }
    .select-list {
      width: 100%;
      height: 100%;
      outline: none;
      border-radius: 5px;
      padding: 0 10px;
      border: 1px solid #f1f1f1;
    }
  }
}

.list-upload {
  .item-upload {
    padding: 25px 0;
    .input-box {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
  }
  .desc {
    font-size: 10px;
  }
}
// Large devices (desktops, less than 1200px)
@media (max-width: 1199.98px) {
  .people-input {
    // flex-direction: column;
    padding: 10px;
    .item {
      width: 50;
      .title {
        flex: 0 0 90px;
      }
    }
  }
}
// Medium devices (tablets, less than 992px)
@media (max-width: 991.98px) {
}

// Small devices (landscape phones, less than 768px)
@media (max-width: 767.98px) {
  .people-input {
    padding: 10px;
    .list {
      flex-direction: column;
      .item {
        width: 100%;
        .title {
          flex: 0 0 90px;
        }
      }
    }
    .list-upload {
      .item-upload {
        .input-box {
        }
      }
      .desc {
      }
    }
  }
}
// Extra small devices (portrait phones, less than 576px)
@media (max-width: 575.98px) {
}
</style>