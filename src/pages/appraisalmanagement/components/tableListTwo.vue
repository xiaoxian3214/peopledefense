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
        align="center"
        :index="indexMethods"
      ></el-table-column>
      <!-- <el-table-column
        label="考核类型"
        prop="type"
        :show-overflow-tooltip="true"
        align="center"
      >
        <template slot-scope="scope">
          {{
            scope.row.type == 1
              ? "训练"
              : scope.row.type == 2
              ? "拉练任务"
              : scope.row.type == 3
              ? "考试"
              : ""
          }}
        </template>
      </el-table-column> -->
      <el-table-column
        label="任务名称"
        prop="taskName"
        :show-overflow-tooltip="true"
        align="center"
      ></el-table-column>
      <el-table-column
        label="集结时间"
        prop="assemblyDate"
        :show-overflow-tooltip="true"
        align="center"
      ></el-table-column>
      <el-table-column
        label="集结地点"
        prop="assemblyArea"
        :show-overflow-tooltip="true"
        align="center"
      ></el-table-column>
      <el-table-column
        label="创建时间"
        prop="createTime"
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
            class="optionBtn"
            @click="exportData(scope.row)"
            >导出</el-button
          >
          <el-divider direction="vertical"></el-divider>
          <el-button
            type="text"
            class="optionBtn"
            @click="edit(scope.row)"
            v-if="$store.state.ifBut"
            >考核</el-button
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
    exportData(e) {
      this.$api.assessExport({ id: e.id }).then((res) => {
        // console.log(e);
        // // return
        var eleLink = document.createElement("a");
        eleLink.download = "拉练任务";
        eleLink.style.display = "none";
        // 字符内容转变成blob地址
        eleLink.href = res.data.url;
        document.body.appendChild(eleLink);
        eleLink.click();
        document.body.removeChild(eleLink);
      });
    },
    indexMethods(index) {
      return (this.currentpage - 1) * 10 + index + 1;
    },
    edit(val) {
      this.$router.push(
        "/pages/appraisalmanagement/editTwo?id=" + val.id + "&type=" + val.type
      );
    },
    detail(val) {
      this.$router.push(
        "/pages/appraisalmanagement/detailTwo?id=" +
          val.id +
          "&type=" +
          val.type
      );
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