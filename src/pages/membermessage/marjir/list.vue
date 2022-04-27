<template>
  <div>
    <detail-header title="专业队管理" :breadcrumbList="breadcrumbList" reuseTexe="新增专业队" @newAddEvent="newAddEvent" :ifShow="true"></detail-header>
    <div class="listQuery">
      <div class="queForm">
        <div class="queFormItem">
          <div class="queLable">专业队名称:</div>
          <el-select clearable v-model="searchform.professionalTeamId">
            <el-option v-for="(item, index) in teamaList" :key="index" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </div>
        <div class="queFormItem">
          <div class="queLable">行政区域:</div>
          <el-select clearable v-model="searchform.areaId" placeholder="请选择区域">
            <el-option v-for="item in areaList" :key="item.id" :label="item.name" :value="item.id"> </el-option>
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
      loading: true,
      breadcrumbList: ["首页", "队员信息", "专业队管理"],
      searchform: {
        professionalTeamId: "",
      },
      areaList: [],
      confirmPopdata: {
        title: "删除专业队!",
        content: "您确认删除此专业队吗?",
        popType: 0,
      },
      deleteVisible: false,
      paginationObj: {
        total: 10,
        page: this.$store.state.listForm.page,
        size: 10,
      },
      tableData: [],
      deletId: "",
      teamaList: [],
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
    this.ZD_WZ_XZQDM();
    this.$api.teamallList().then((res) => {
      if (res.code == 200) {
        this.teamaList = res.data;
      }
    });
  },
  methods: {
    //区域
    ZD_WZ_XZQDM() {
      this.$api.ZD_WZ_XZQDM().then((res) => {
        if (res.code == 200) {
          this.areaList = res.page.records;
        }
      });
    },
    delet(val) {
      this.deletId = val;
      this.deleteVisible = true;
    },
    changVisible() {
      this.deleteVisible = false;
    },
    deleteConfirm() {
      this.$api.teamdelete({ id: this.deletId }).then((res) => {
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
      this.$router.push("/pages/membermessage/marjir/add");
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
      this.searchform.professionalTeamId = "";
      this.searchform.areaId = "";
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
      this.$api.teamlist(data).then((res) => {
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