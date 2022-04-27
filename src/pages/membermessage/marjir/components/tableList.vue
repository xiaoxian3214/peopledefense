<template>
  <div class="table-box">
    <el-table
      :data="tableData"
      :row-style="{ height: '54px' }"
      :header-row-style="{ height: '54px' }"
      :header-cell-style="{ background: '#F5F6FA' }"
      :cell-style="{ padding: '0' }"
      ref="table"
      v-loading="loading"
    >
      <el-table-column
        type="index"
        label="序号"
        width="100"
        :show-overflow-tooltip="true"
        align="center"
        :index="indexMethods"
      ></el-table-column>
      <el-table-column
        label="专业队名称"
        prop="name"
        :show-overflow-tooltip="true"
        align="center"
      ></el-table-column>
      <!-- <el-table-column
        label="专业队编号"
        prop="number"
        :show-overflow-tooltip="true"
        align="center"
      ></el-table-column> -->
      <el-table-column
        label="专业队能力"
        prop="abilityTypeName"
        :show-overflow-tooltip="true"
        align="center"
      ></el-table-column>
      <el-table-column
        label="分队名称"
        prop="branchTeam"
        :show-overflow-tooltip="true"
        align="center"
      ></el-table-column>
      <el-table-column
        label="组建单位"
        prop="buildUnit"
        :show-overflow-tooltip="true"
        align="center"
      ></el-table-column>
      <el-table-column
        label="操作"
        :show-overflow-tooltip="true"
        align="center"
        width="210"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            class="optionBtnDel"
            @click="delet(scope.row)"
            v-if="$store.state.ifBut"
            >删除</el-button
          >
          <el-divider
            direction="vertical"
            v-if="$store.state.ifBut"
          ></el-divider>
          <el-button
            type="text"
            class="optionBtn"
            @click="edit(scope.row)"
            v-if="$store.state.ifBut"
            >编辑</el-button
          >
          <el-divider
            direction="vertical"
            v-if="$store.state.ifBut"
          ></el-divider>
          <el-button type="text" class="optionBtn" @click="detail(scope.row)"
            >详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: true,
    },
    tableData: {
      type: Array,
      default: () => [],
    },
    total: {
      type: Number,
      default: 0,
    },
    currentpage: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    indexMethods(index) {
      return (this.currentpage - 1) * 10 + index + 1;
    },
    delet(val) {
      this.$emit("delet", val.id);
    },
    edit(val) {
      this.$router.push("/pages/membermessage/marjir/edit?id=" + val.id);
    },
    detail(val) {
      this.$router.push("/pages/membermessage/marjir/detail?id=" + val.id);
    },
  },
};
</script>
<style lang="scss" scoped>
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