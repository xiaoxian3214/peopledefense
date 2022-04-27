<template>
  <div class="pageHeader">
    <div class="temp_detailHeader">
      <el-breadcrumb separator=">" v-if="breadcrumbList.length > 0" class="title_header">
        <el-breadcrumb-item
          v-for="(item, index) in breadcrumbList"
          :key="index"
        >
        <span > {{ item }}</span>
        <!-- {{ item }} -->
        </el-breadcrumb-item>
      </el-breadcrumb>
      <!-- <div class="title_header">
        <span class="title">{{ title }}</span>
      </div> -->
    </div>
    <div>
      <el-button
        class="but addBtn"
        @click="newAddEvent"
        v-show="ifShow"
        icon="el-icon-plus"
        type="primary"
        v-if="$store.state.ifBut"
        >{{ reuseTexe }}</el-button
      >
    </div>
  </div>
</template>
<script>
export default {
  props: {
    breadcrumbList: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: "",
    },
    reuseTexe: {
      type: String,
      default: "",
    },
    ifShow: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {},
  methods: {
    newAddEvent() {
      this.$emit("newAddEvent");
    },
  },
};
</script>
<style lang="scss" scoped>
.title {
  font-size: 30px;
}
.temp_detailHeader {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
  // line-height: 20px;
}
.title_header {
  font-size: 22px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  // line-height: 30px;
  text-align: left;
}
.pageHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 93px;
  // margin-bottom: 15px;
  // border: 1px solid pink;
  // .title_header {
  // min-height: 100%;
  .but {
    min-width: 110px;
    height: 40px;
    border-radius: 2px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    padding: 0;
    margin: 0;
    line-height: 40px;
    text-align: center;
    // float: right;
  }
  // .impor {
  //   background: #1890ff;
  //   color: #ffffff;
  //   margin-right: 10px;
  // }
  .addBtn {
    background: #1890ff;
    border: 1px solid #1890ff;
    color: #ffffff;
    padding: 0 12px;
  }
  // .templa {
  //   border: 1px solid #e9e9e9;
  //   color: #666666;
  //   margin-right: 10px;
  // }
  // .educeBtn {
  //   background: #1890ff;
  //   border: 1px solid #1890ff;
  //   color: #ffffff;
  //   margin-right: 10px;
  // }
  // .backBtn {
  //   border: 1px solid #999999;
  //   font-size: 16px;
  //   font-family: PingFangSC-Regular, PingFang SC;
  //   font-weight: 400;
  //   color: #333333;
  // }
  // .title {
  //   font-size: 20px;
  //   font-family: PingFangSC-Medium, PingFang SC;
  //   font-weight: 550;
  //   color: #333333;
  // }
  // }
}
</style>
