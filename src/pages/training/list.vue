<template>
  <div>
    <detail-header
      title="训练科目"
      :breadcrumbList="breadcrumbList"
      reuseTexe="新增科目"
      @newAddEvent="newAddEvent"
      :ifShow="true"
    ></detail-header>
    <div class="listQuery">
      <div class="queForm">
        <div class="queFormItem">
          <div class="queLable">科目名称:</div>
          <el-input
            v-model="searchform.name"
            class="queInp"
            placeholder="请输入科目名称"
            maxlength="20"
          ></el-input>
        </div>
      </div>
      <div class="titleBtnBox">
        <el-button class="confirm" @click="query" type="primary"
          >查 询</el-button
        >
        <el-button class="btn" @click="reset">重 置</el-button>
      </div>
    </div>
    <div class="tableListBox">
      <table-list :tableData="tableData" @delet="delet" :loading="loading" />
      <my-pagination :paginationObj="paginationObj" @changePage="changePage" />
    </div>
    <confirm-pop
      :confirmVisible.sync="deleteVisible"
      :confirmPopdata="confirmPopdata"
      @changVisible="changVisible"
      @deleteConfirm="deleteConfirm"
    >
    </confirm-pop>
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
      loading: true,
      searchform: {
        name: "",
      },
      confirmPopdata: {
        title: "删除训练科目!",
        content: "您确认删除此训练科目吗?",
        popType: 0,
      },
      deleteVisible: false,
      paginationObj: {
        total: 10,
        page: this.$store.state.listForm.page,
        size: 10,
      },
      breadcrumbList: ["首页", "系统管理", "训练科目"],
      tableData: [],
      id: "",
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
      this.$api.trainingSubjectsdelete({ id: this.deletId }).then((res) => {
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
      this.searchform.name = "";
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
      this.$api.trainingSubjectslist(data).then((res) => {
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
    newAddEvent() {
      this.$router.push("/pages/training/add");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>