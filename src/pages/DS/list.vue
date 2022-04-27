<template>
  <div>
    <detail-header title="重要经济目标" :breadcrumbList="breadcrumbList"></detail-header>
    <div class="listQuery">
      <div class="queForm">
        <div class="queFormItem">
          <div class="queLable">性别:</div>
          <el-select clearable v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </div>
        <div class="queFormItem">
          <div class="queLable">专业:</div>
          <el-input v-model="teamname" class="queInp" placeholder="请输入专业名称" maxlength="20"></el-input>
        </div>
      </div>
      <div class="titleBtnBox">
        <el-button class="confirm" @click="query" type="primary">查 询</el-button>
        <el-button class="btn" @click="reset">重 置</el-button>
        <el-button class="btn" @click="importFile">导 入</el-button>
        <el-button class="btn" @click="exportFile">导 出</el-button>
      </div>
    </div>
    <div class="tableListBox">
      <table-list :tableData="tableData" @delet="delet" @edit="edit" @detail="detail" />
      <my-pagination :paginationObj="paginationObj" @changePage="changePage" />
    </div>
  </div>
</template>

<script>
import detailHeader from "@/components/detailHeader";
import tableList from "./components/tableList";
import myPagination from "@/components/myPagination";
import { throttle } from "@/utils/tools.js";
export default {
  components: {
    detailHeader,
    tableList,
    myPagination,
  },
  data() {
    return {
      teamname: "",
      paginationObj: {
        total: 10,
        page: 10,
        size: 10,
      },
      breadcrumbList: ["首页", "系统管理", "重要经济目标"],
      tableData: [{ name: "小刘" }],
      options: [{}],
      value: "",
    };
  },
  mounted() {},
  methods: {
    query: throttle(function () {}),
    reset: throttle(function () {}),
    changePage() {},
    // 删除
    delet() {},
    // 编辑
    edit() {
      this.$router.push({
        path: "/pages/DS/edit",
      });
    },
    detail() {
      this.$router.push({
        path: "/pages/DS/detail",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>