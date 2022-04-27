<template>
  <div>
    <detail-header title="字典管理" :breadcrumbList="breadcrumbList" reuseTexe="新增字典" @newAddEvent="newAddEvent" :ifShow="true"></detail-header>
    <div class="listQuery">
      <div class="queForm">
        <div class="queFormItem">
          <div class="queLable">类型值:</div>
          <el-select clearable v-model="searchform.type">
            <el-option v-for="(item, index) in dictionarytypeList" :key="index" :label="item.typeName" :value="item.type"></el-option>
          </el-select>
        </div>
      </div>
      <div class="titleBtnBox">
        <el-button class="confirm" @click="query" type="primary">查 询</el-button>
        <el-button class="btn" @click="reset">重 置</el-button>
      </div>
    </div>
    <div class="tableListBox">
      <table-list :total="paginationObj.total" :currentpage="paginationObj.page" :tableData="tableData" @delet="delet" :loading="loading" />
      <my-pagination :paginationObj="paginationObj" @changePage="changePage" />
    </div>
    <confirm-pop :confirmVisible.sync="deleteVisible" :confirmPopdata="confirmPopdata" @changVisible="changVisible" @deleteConfirm="deleteConfirm"> </confirm-pop>
  </div>
</template>

<script>
import confirmPop from "@/components/confirmPop";
import detailHeader from "@/components/detailHeader";
import tableList from "./components/tableList.vue";
import myPagination from "@/components/myPagination";
import { throttle } from "@/utils/tools.js";
export default {
  components: {
    detailHeader,
    tableList,
    myPagination,
    confirmPop,
  },
  data() {
    return {
      deleteVisible: false,
      confirmPopdata: {
        title: "删除字典!",
        content: "您确认删除此字典吗?",
        popType: 0,
      },
      loading: true,
      paginationObj: {
        total: 10,
        page: this.$store.state.listForm.page,
        size: 10,
      },
      searchform: {
        type: "",
      },
      breadcrumbList: ["首页", "系统管理", "字典管理"],
      tableData: [],
      deletId: this.$route.query.id,
      dictionarytypeList: [],
    };
  },
  mounted() {
    if (sessionStorage.getItem("queryCondition")) {
      let sessData = JSON.parse(sessionStorage.getItem("queryCondition"));
      for (const key in sessData) {
        this.searchform[key] = sessData[key];
      }
    }
    this.getList();
    this.$api.dictionarytypeList().then((res) => {
      if (res.code == 200) {
        this.dictionarytypeList = res.data;
      }
    });
  },
  methods: {
    delet(val) {
      this.deleteVisible = true;
      this.deletId = val.id;
    },
    changVisible() {
      this.deleteVisible = false;
    },
    deleteConfirm() {
      this.$api.dictionarydelete({ id: this.deletId }).then((res) => {
        if (res.code == 200) {
          this.deleteVisible = false;
          this.$message({
            message: "删除成功",
            type: "success",
          });
          this.getList();
        } else {
          this.$message.error(res.message);
        }
      });
    },
    newAddEvent() {
      this.$router.push({
        path: "/pages/management/dictionary/add",
      });
    },
    query: throttle(function () {
      this.$store.commit("restListForm", 1);
      sessionStorage.setItem("queryCondition", JSON.stringify(this.searchform));
      this.paginationObj.page = 1;
      this.getList();
    }),
    reset: throttle(function () {
      this.$store.commit("restListForm", 1);
      sessionStorage.setItem("queryCondition", "");
      this.paginationObj.page = 1;
      this.searchform.type = "";
      this.getList();
    }),
    changePage(currentPage) {
      if (currentPage === this.paginationObj.page) {
        return;
      }
      this.paginationObj.page = currentPage;
      this.$store.commit("restListForm", currentPage);
      this.getList();
    },
    getList() {
      this.loading = true;
      let data = this.$objValuefilter(this.searchform);
      data = { ...this.searchform, ...this.$store.state.listForm };
      this.$api.dictionarylist(data).then((res) => {
        this.loading = false;
        if (res.code == 200) {
          this.tableData = res.page.records;
          this.paginationObj.size = res.page.size;
          this.paginationObj.total = res.page.total;
        } else {
          this.$message.error(res.message);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>