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
        label="序号"  width="100"
        :show-overflow-tooltip="true"
        align="center"
        :index="indexMethods"
      ></el-table-column>
      <el-table-column
        label="计划名称"
        prop="name"
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
        label="通知状态"
        prop="createTime"
        :show-overflow-tooltip="true"
        align="center"
      >
        <template slot-scope="scope">
          <span
            :style="{
              'background-color':
                scope.row.status == 1
                  ? 'red'
                  : scope.row.status == 2
                  ? 'rgb(250, 173, 20)'
                  : scope.row.status == 3
                  ? '#F56C6C'
                  : scope.row.status == 4
                  ? 'rgb(82, 196, 26)'
                  : '',
            }"
            class="dot"
          ></span>
          {{
            scope.row.status == 1
              ? "未发布"
              : scope.row.status == 2
              ? "通知至联络员"
              : scope.row.status == 3
              ? "联络员反馈"
              : scope.row.status == 4
              ? "通知至队员"
              : ""
          }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        :show-overflow-tooltip="true"
        align="center"
        width="210"
        v-if="$store.state.ifBut"
      >
        <template slot-scope="scope">
          <el-button type="text" class="optionBtnDel" @click="delet(scope.row)"
            >删除</el-button
          >
          <el-divider
            direction="vertical"
            v-if="$store.state.ifBut"
          ></el-divider>
          <el-button type="text" class="optionBtn" @click="edit(scope.row)"
            >编辑</el-button
          >
          <el-divider direction="vertical"></el-divider>
          <el-button type="text" class="optionBtn" @click="myexport(scope.row)"
            >导出</el-button
          >
          <el-divider
            direction="vertical"
          ></el-divider>
            <!-- v-if="scope.row.status == 1 || scope.row.status == 3" -->
          <el-button
            type="text"
            class="optionBtn"
            @click="inform(scope.row)"
            >通知</el-button
          >
            <!-- v-if="scope.row.status == 1 || scope.row.status == 3" -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: true,
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
      this.$emit("delet", val);
    },
    edit(val) {
      this.$router.push(
        "/pages/teamtrain/area/edit?id=" + val.id + "&name=" + val.name
      );
    },
    myexport(row) {
      this.$api.trainingexportPlan({ id: row.id }).then((res) => {
        if (res.code == 200) {
          (function download(filename, url) {
            var eleLink = document.createElement("a");
            eleLink.download = filename;
            eleLink.style.display = "none";
            // 字符内容转变成blob地址
            eleLink.href = url;
            document.body.appendChild(eleLink);
            eleLink.click();
            document.body.removeChild(eleLink);
          })("温州人防训练计划表", res.data.url);
        } else {
          this.$message.error(res.message);
        }
      });
    },
    inform(row) {
      this.$emit("inform", row);
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
.dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.btn.confirm {
  background: #1890ff;
  border: 1px solid #1890ff;
  // border: none;
  color: #ffffff;
  margin-left: 8px;
}
</style>