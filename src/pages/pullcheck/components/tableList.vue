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
        :index="indexMethods"
        align="center"
      ></el-table-column>
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
        label="专业队伍名称"
        prop="professionalTeamName"
        :show-overflow-tooltip="true"
        align="center"
      ></el-table-column>
      <el-table-column
        label="通知状态"
        prop="informStatus"
        :show-overflow-tooltip="true"
        align="center"
      >
        <template slot-scope="scope">
          <!-- &&($store.state.roleId == 1 ? scope.row.isCity == 1 : true) -->
          <span
            :style="{
              'background-color':
                scope.row.informStatus == 1
                  ? 'red'
                  : scope.row.informStatus == 2
                  ? 'rgb(250, 173, 20)'
                  : scope.row.informStatus == 3
                  ? '#F56C6C'
                  : scope.row.informStatus == 4
                  ? 'rgb(82, 196, 26)'
                  : '',
            }"
            class="dot"
          ></span>
          {{
            scope.row.informStatus == 1
              ? "未发布"
              : scope.row.informStatus == 2
              ? "通知至联络员"
              : scope.row.informStatus == 3
              ? "联络员反馈"
              : scope.row.informStatus == 4
              ? "通知至队员"
              : ""
          }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            class="optionBtnDel"
            @click="delet(scope.row)"
            v-if="
              $store.state.ifBut &&
              !($store.state.roleIdList.includes(4) &&  $store.state.roleIdList.length == 1)
            "
            >删除</el-button
          >
          <el-divider
            direction="vertical"
            v-if="
              $store.state.ifBut &&
             !($store.state.roleIdList.includes(4) &&  $store.state.roleIdList.length == 1)
            "
          ></el-divider>
          <el-button
            type="text"
            class="optionBtn"
            @click="edit(scope.row)"
            v-if="
              $store.state.ifBut  &&
              (scope.row.informStatus == 1 || scope.row.informStatus == 2)
            "
            >编辑</el-button
          >
          <el-divider
            direction="vertical"
            v-if="
              $store.state.ifBut  &&
              (scope.row.informStatus == 1 || scope.row.informStatus == 2)
            "
          ></el-divider>
          <el-button
            type="text"
            class="optionBtn"
            @click="watchVideo(scope.row)"
            v-if="
              $store.state.ifBut &&
              !($store.state.roleIdList.includes(4) &&  $store.state.roleIdList.length == 1)
            "
            >直播</el-button
          >
          <!-- 不是联络员就返回true -->
          <el-divider direction="vertical"
            v-if="
              $store.state.ifBut &&
               !($store.state.roleIdList.includes(4) &&  $store.state.roleIdList.length == 1)
            "></el-divider>
          <el-button type="text" class="optionBtn" @click="detail(scope.row)"
            >详情</el-button
          >
          <el-divider
            direction="vertical"
             v-if="$store.state.roleIdList.includes(1) || $store.state.roleIdList.includes(2)"
          ></el-divider>
            <!-- v-if="scope.row.informStatus == 1 || (scope.row.informStatus == 3 && ($store.state.roleId == 1 || $store.state.roleId == 2)) -->
          <el-button
            type="text"
            class="optionBtn"
            @click="inform(scope.row)"
            v-if="$store.state.roleIdList.includes(1) || $store.state.roleIdList.includes(2)"
            >通知</el-button
          >
          <el-divider direction="vertical"></el-divider>
          <el-button
            type="text"
            class="optionBtn"
            @click="exportChange(scope.row)"
            >导出</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { BASE_URL } from "@/request/http.js";
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
    exportChange(e) {
      var eleLink = document.createElement("a");
      eleLink.download = "拉动点验导出";
      eleLink.style.display = "none";
      // 字符内容转变成blob地址
      eleLink.href =
        BASE_URL + "api/web/defense/pullcheck/exportPull?id=" + e.id;
      document.body.appendChild(eleLink);
      eleLink.click();
      document.body.removeChild(eleLink);
    },
    indexMethods(index) {
      return (this.currentpage - 1) * 10 + index + 1;
    },
    delet(val) {
      this.$emit("delet", val);
    },
    watchVideo(val) {
      this.$router.push(
        "/pages/pullcheck/satchTv?roomName=" + val.roomName + "&team=0"
      );
    },
    edit(val) {
      this.$router.push("/pages/pullcheck/edit?id=" + val.id);
    },
    detail(val) {
      this.$router.push("/pages/pullcheck/detail?id=" + val.id);
    },
    inform(row) {
      this.$emit("inform", row);
    },
  },
};
</script>
<style lang="scss" scoped>
.table-box {
  .dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }
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