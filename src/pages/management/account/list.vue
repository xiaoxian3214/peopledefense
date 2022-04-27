<template>
  <div>
    <detail-header title="账号管理" :breadcrumbList="breadcrumbList" reuseTexe="新增账号" @newAddEvent="newAddEvent" :ifShow="true"></detail-header>
    <div class="listQuery">
      <div class="queForm">
        <div class="queFormItem">
          <div class="queLable">姓名:</div>
          <el-input v-model="searchform.name" class="queInp" placeholder="请输入姓名" maxlength="20"></el-input>
        </div>
        <div class="queFormItem">
          <div class="queLable">角色名称:</div>
          <el-select clearable v-model="searchform.roleId" placeholder="请选择">
            <el-option v-for="item in characterList" :key="item.id" :label="item.name" :value="item.id"> </el-option>
          </el-select>
        </div>
        <div class="queFormItem">
          <div class="queLable">账号:</div>
          <el-input v-model="searchform.account" class="queInp" placeholder="请输入账号" maxlength="20"></el-input>
        </div>
      </div>
      <div class="titleBtnBox">
        <el-button class="confirm" @click="query" type="primary">查 询</el-button>
        <el-button class="btn" @click="reset">重 置</el-button>
      </div>
    </div>
    <div class="tableListBox">
      <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
        <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
      </el-tabs> -->
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
      characterList: [],
      deleteVisible: false,
      confirmPopdata: {
        title: "删除账号!",
        content: "您确认删除此账号吗?",
        popType: 0,
      },
      loading: true,
      paginationObj: {
        total: 10,
        page: this.$store.state.listForm.page,
        size: 10,
      },
      searchform: {
        roleId: "",
        name: "",
        account: "",
      },
      breadcrumbList: ["首页", "系统管理", "账号管理"],
      tableData: [],
      deletId: this.$route.query.id,
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
    this.rolegetRoleList();
  },
  methods: {
    // 所有角色
    rolegetRoleList() {
      this.$api.rolegetRoleList().then((res) => {
        if (res.code == 200) {
          this.characterList = res.data;
        } else {
          this.$message.error(res.message);
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
      this.$api.userdelete({ id: this.deletId }).then((res) => {
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
        path: "/pages/management/account/add",
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
      this.searchform.roleId = "";
      this.searchform.account = "";
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
      this.$api.userlist(data).then((res) => {
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