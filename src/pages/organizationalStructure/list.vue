<template>
  <div>
    <detail-header
      title="组织架构管理"
      :breadcrumbList="breadcrumbList"
      reuseTexe="新增组织"
    ></detail-header>
    <!-- @newAddEvent="newAddEvent"
      :ifShow="true" -->
    <!-- <div class="listQuery">
      <div class="queForm">
        <div class="queFormItem">
          <div class="queLable">组织名称:</div>
          <el-input
            v-model="searchform.name"
            class="queInp"
            placeholder="请输入组织名称"
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
    <div class="fromtableListBox">
      <table-list :tableData="tableData" @delet="delet" />
      <!-- <my-pagination :paginationObj="paginationObj" @changePage="changePage" /> -->
    </div>
    <confirm-pop
      :confirmPopdata="confirmPopdata"
      :confirmVisible.sync="deleteVisible"
      @changVisible="changVisible"
      @deleteConfirm="deleteConfirm"
    >
    </confirm-pop>
  </div>
</template>

<script>
import tableList from "./components/tableList.vue";
import confirmPop from "@/components/confirmPop";
import detailHeader from "@/components/detailHeader";
import myPagination from "@/components/myPagination";
import { throttle } from "@/utils/tools.js";
export default {
  components: {
    detailHeader,
    myPagination,
    confirmPop,
    tableList,
  },
  data() {
    return {
      confirmPopdata: {
        title: "删除组织!",
        content: "您确认删除此组织吗?",
        popType: 0,
      },
      tableData: [],
      organization: "",
      paginationObj: {
        total: 10,
        page: this.$store.state.listForm.page,
        size: 10,
      },
      searchform: {
        name: "",
      },
      deleteVisible: false,
      breadcrumbList: ["首页", "系统管理", "组织架构"],
      deletId: "",
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
      this.$api
        .organizationalStructuredelete({ id: this.deletId })
        .then((res) => {
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
      this.$router.push("/pages/organizationalStructure/neworganization");
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
      this.$api.organizationalStructurelist(data).then((res) => {
        this.loading = false;
        if (res.code == 200) {
          this.tableData = res.data;
          // this.tableData[0].id = 1;
          // this.paginationObj.size = res.data.size;
          // this.paginationObj.total = res.data.total;
        } else {
          this.$message.error(res.message);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.trruetitle {
  box-sizing: border-box;
  padding: 0 30px 0 20px;
  align-items: center;
  display: flex;
  font-size: 18px;
  justify-content: space-between;
  background-color: #f5f6fa;
  height: 60px;
  width: 100%;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.block {
  border-bottom: 1px solid rgb(153, 150, 150);
}
</style>