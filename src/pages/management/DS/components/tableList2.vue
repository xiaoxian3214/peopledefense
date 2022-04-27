<template>
  <div class="table-box">
    <el-table
      :data="tableData"
      :row-style="{ height: '54px' }"
      :header-row-style="{ height: '54px' }"
      :header-cell-style="{ background: '#F5F6FA' }"
      :cell-style="{ padding: '0' }"
      ref="table"
    >
      <el-table-column
        label="ID"
        prop="id"
        :show-overflow-tooltip="true"
        align="center"
      ></el-table-column>
      <el-table-column
        label="行政区代码"
        prop="administrativeCode"
        :show-overflow-tooltip="true"
        align="center"
      ></el-table-column>
      <el-table-column
        label="重要经济目标名称"
        prop="name"
        :show-overflow-tooltip="true"
        align="center"
      ></el-table-column>
      <el-table-column
        label="占地面积"
        prop="floorArea"
        :show-overflow-tooltip="true"
        align="center"
      ></el-table-column>
      <el-table-column
        label="平时用途"
        prop="peacetimeUse"
        :show-overflow-tooltip="true"
        align="center"
      ></el-table-column>
      <el-table-column
        label="所在地址"
        prop="address"
        :show-overflow-tooltip="true"
        align="center"
      ></el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  inject: ["app"],
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    delet(val) {
      // console.log(val,111);
      this.$emit("delet", val);
    },
    edit(val) {
      this.$router.push("/pages/management/DS/edit?id=" + val.id);
    },
    detail(val) {
      this.$router.push("/pages/management/DS/detail?id=" + val.id);
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep {
  .el-table .DisabledSelection .cell .el-checkbox__inner {
    margin-left: 25px;
    position: relative;
  }
  .el-table .DisabledSelection .cell:after {
    content: "全选";
    position: absolute;
    left: 0px;
  }
}
.table-box {
  .el-tooltip {
    width: 202px;
  }
  background: #fff;
  box-sizing: border-box;
  .img {
    width: 28px;
    height: 28px;
    border-radius: 14px;
    object-fit: cover;
  }
  .optionBtn {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    color: #1890ff;
  }
  .optionBtnDel {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    color: #f53131;
  }
}
.btn {
  width: 65px;
  height: 32px;
  padding: 0;
  line-height: 32px;
  text-align: center;
  background: #ffffff;
  border-radius: 2px;
  border: 1px solid #d2d2d2;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
}
.btn.confirm {
  background: #1890ff;
  border: 1px solid #1890ff;
  // border: none;
  color: #ffffff;
  margin-left: 8px;
}
</style>