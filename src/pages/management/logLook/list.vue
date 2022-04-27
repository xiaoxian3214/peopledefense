<template>
  <div>
    <detail-header
      title="日志查看"
      :breadcrumbList="breadcrumbList"
    ></detail-header>
    <!-- <div class="listQuery">
      <div class="queForm">
        <div class="queFormItem">
          <div class="queLable">类型名称:</div>
          <el-input
            v-model="searchform.name"
            class="queInp"
            placeholder="请输入类型名称"
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
    </div> -->
    <div class="tableListBox">
      <table-list
        :tableData="tableData"
        :loading="loading"
        :total="paginationObj.total"
        :currentpage="paginationObj.page"
      />
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
      loading: true,
      paginationObj: {
        total: 10,
        page: this.$store.state.listForm.page,
        size: 10,
      },
      deleteVisible: false,
      breadcrumbList: ["首页", "系统管理", "日志查看"],
      tableData: [],
      searchform: {},
    };
  },
  mounted() {
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
    // deleteConfirm() {
    //   this.$api.roledelete({ id: this.deletId }).then((res) => {
    //     if (res.code == 200) {
    //       this.deleteVisible = false;
    //       this.$message({
    //         message: "删除成功",
    //         type: "success",
    //       });
    //       this.getList();
    //     } else {
    //       this.$message.error(res.message);
    //     }
    //   });
    // },
    query: throttle(function () {
      this.$store.commit("restListForm", 1);
      this.paginationObj.page = 1;
      this.getList();
    }),
    reset: throttle(function () {
      this.$store.commit("restListForm", 1);
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
      let data = this.$store.state.listForm;
      this.$api.loglist(data).then((res) => {
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