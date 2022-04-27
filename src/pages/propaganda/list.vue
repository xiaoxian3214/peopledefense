<template>
  <div>
    <detail-header title="宣传内容建设" :breadcrumbList="breadcrumbList" reuseTexe="新增项目" @newAddEvent="newAddEvent" :ifShow="true"></detail-header>
    <div class="listQuery">
      <div class="queForm">
        <div class="queFormItem">
          <div class="queLable">标题:</div>
          <el-input v-model="searchform.title" class="queInp" placeholder="请输入标题" maxlength="20"></el-input>
        </div>
        <div class="queFormItem">
          <div class="queLable">类型:</div>
          <el-select clearable v-model="searchform.typeId" placeholder="请选择类型">
            <el-option v-for="item in TypeList" :key="item.id" :label="item.name" :value="item.id"> </el-option>
          </el-select>
        </div>
      </div>
      <div class="titleBtnBox">
        <el-button class="confirm" @click="query" type="primary">查 询</el-button>
        <el-button class="btn" @click="reset">重 置</el-button>
      </div>
    </div>
    <div class="tableListBox">
      <table-list :tableData="tableData" @delet="delet" :loading="loading" :total="paginationObj.total" :currentpage="paginationObj.page" />
      <my-pagination :paginationObj="paginationObj" @changePage="changePage" />
    </div>
    <confirm-pop :confirmVisible.sync="deleteVisible" :confirmPopdata="confirmPopdata" @changVisible="changVisible" @deleteConfirm="deleteConfirm"> </confirm-pop>
  </div>
</template>

<script>
import detailHeader from "@/components/detailHeader";
import tableList from "./components/tableList.vue";
import myPagination from "@/components/myPagination";
import { throttle } from "@/utils/tools.js";
import confirmPop from "@/components/confirmPop";
export default {
  components: {
    detailHeader,
    tableList,
    confirmPop,
    myPagination,
  },
  data() {
    return {
      deleteVisible: false,
      loading: true,
      searchform: {
        title: "",
        typeId: "",
      },
      confirmPopdata: {
        title: "删除宣传内容!",
        content: "您确认删除此宣传内容吗?",
        popType: 0,
      },
      TypeList: [{}],
      paginationObj: {
        total: 10,
        page: this.$store.state.listForm.page,
        size: 10,
      },
      breadcrumbList: ["首页", "宣传内容建设"],
      tableData: [],
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
    this.TypeOfPropagandaContentConstruction();
  },
  methods: {
    TypeOfPropagandaContentConstruction() {
      this.$api.TypeOfPropagandaContentConstruction().then((res) => {
        if (res.code == 200) {
          this.TypeList = res.page.records;
        }
      });
    },
    delet(val) {
      this.deleteVisible = true;
      this.deletId = val.id;
    },
    changVisible() {
      this.deleteVisible = false;
    },
    deleteConfirm() {
      this.$api.propagandadelete({ id: this.deletId }).then((res) => {
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
      sessionStorage.setItem("queryCondition", "");
      this.$store.commit("restListForm", 1);
      this.paginationObj.page = 1;
      this.searchform.title = "";
      this.searchform.typeId = "";
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
      this.$api.propagandalist(data).then((res) => {
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
      this.$router.push("/pages/propaganda/add");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>