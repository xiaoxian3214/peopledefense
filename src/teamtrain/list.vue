<template>
  <div>
    <detail-header
      title="专业队管理"
      :breadcrumbList="breadcrumbList"
      :isAddmajorTeamBtn="true"
    ></detail-header>
    <div class="listQuery">
      <div class="queForm">
        <div class="queFormItem">
          <div class="queLable">专业队名称:</div>
          <el-input
            v-model="teamname"
            class="queInp"
            placeholder="请输入专业队名称"
            maxlength="20"
          ></el-input>
        </div>
      </div>
      <div class="titleBtnBox">
        <el-button class="confirm" @click="query" type="primary">查 询</el-button>
        <el-button class="btn" @click="reset">重 置</el-button>
      </div>
    </div>
    <div class="tableListBox">
      <table-list :tableData="tableData" />
      <my-pagination :paginationObj="paginationObj" @changePage="changePage" />
    </div>
  </div>
</template>

<script>
import detailHeader from "@/components/detailHeader";
import tableList from "./components/tableList.vue";
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
      breadcrumbList: ["首页", "队员信息", "专业队员管理"],
      tableData: [
        { teamname: "前进队", teamnumber: "wer3324" },
        { teamname: "前进队", teamnumber: "wer3324" },
        { teamname: "前进队", teamnumber: "wer3324" },
      ],
    };
  },
  mounted() {},
  methods: {
    query: throttle(function () {}),
    reset: throttle(function () {}),
    changePage() {},
  },
};
</script>

<style lang="scss" scoped>
</style>