<template>
  <div>
    <detail-header title="训练计划表" :breadcrumbList="breadcrumbList" reuseTexe="新增训练" @newAddEvent="newAddEvent" :ifShow="$store.state.roleIdList.includes(4)&&$store.state.roleIdList.length ==1 ? false : true"></detail-header>
    <div class="listQuery">
      <div class="queForm">
        <div class="queFormItem">
          <div class="queLable">训练计划:</div>
          <el-select clearable v-model="searchform.planId" filterable placeholder="请选择">
            <el-option v-for="item in trainingallPlanList" :key="item.id" :label="item.name" :value="item.id"> </el-option>
          </el-select>
        </div>
        <div class="queFormItem">
          <div class="queLable">专业队:</div>
          <el-select clearable filterable v-model="searchform.professionalTeamId">
            <el-option v-for="(item, index) in tableData" :key="index" :label="item.name" :value="item.teamId"></el-option>
          </el-select>
        </div>
        <div class="queFormItem">
          <div class="queLable">训练科目:</div>
          <el-input v-model="searchform.subject" class="queInp" placeholder="请输入训练科目" maxlength="20"></el-input>
        </div>
      </div>
      <div class="titleBtnBox">
        <el-button class="confirm" @click="query" type="primary">查 询</el-button>
        <el-button class="btn" @click="reset">重 置</el-button>
      </div>
    </div>
    <div class="tableListBox">
      <!-- :total="paginationObj.total"
        :currentpage="paginationObj.page" -->
      <table-list :tableData="tableData" @delet="delet" :loading="loading" />
      <!-- <my-pagination :paginationObj="paginationObj" @changePage="changePage" /> -->
    </div>
    <confirm-pop :confirmVisible.sync="deleteVisible" :confirmPopdata="confirmPopdata" @changVisible="changVisible" @deleteConfirm="deleteConfirm"> </confirm-pop>
  </div>
</template>

<script>
import confirmPop from "@/components/confirmPop";
import detailHeader from "@/components/detailHeader";
import myPagination from "@/components/myPagination";
import tableList from "./components/tableList.vue";
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
      loading: false,
      deleteVisible: false,
      confirmPopdata: {
        title: "删除训练队伍!",
        content: "您确认删除此训练队伍吗?",
        popType: 0,
      },
      state1: "",
      // paginationObj: {
      //   total: 1,
      //   page: this.$store.state.listForm.page,
      //   size: 10,
      // },
      searchform: {
        professionalTeamId: "",
        subject: "",
        planId: "",
      },
      breadcrumbList: ["首页", "训练计划表"],
      tableData: [],
      id: "",
      teamaList: [],
      trainingallPlanList: [],
    };
  },
  mounted() {
    this.trainingSelectAllPlan();
    let isCityUser = this.$store.state.roleIdList.includes(1) ? 1 : 0;
    this.$api.teamallList({ isCityUser }).then((res) => {
      if (res.code == 200) {
        this.teamaList = res.data;
      }
    });
  },
  methods: {
    handleSelect(item) {
      console.log(item);
    },
    // 获取所有计划
    trainingSelectAllPlan() {
      this.$api.trainingSelectAllPlan().then((res) => {
        if (res.code == 200) {
          if (res.data.length) {
            this.trainingallPlanList = res.data;
            if (sessionStorage.getItem("queryCondition")) {
              let sessData = JSON.parse(sessionStorage.getItem("queryCondition"));
              for (const key in sessData) {
                this.searchform[key] = sessData[key];
              }
            } else {
              this.searchform.planId = this.trainingallPlanList[0].id;
            }
            this.getList();
          } else {
            this.$message({
              type: "warning",
              message: "当前训练计划,请新新增年度训练计划！",
            });
          }
        }
      });
    },
    delet(val) {
      this.deleteVisible = true;
      this.id = val.id;
    },
    changVisible() {
      this.deleteVisible = false;
    },
    deleteConfirm() {
      this.$api.trainingdelete({ id: this.id }).then((res) => {
        if (res.code == 200) {
          this.deleteVisible = false;
          this.getList();
          this.$message({
            message: "删除成功",
            type: "success",
          });
        } else {
          this.$message.error(res.message);
        }
      });
    },
    newAddEvent() {
      this.$router.push("/pages/teamtrain/Thetrainingteam/add");
    },
    query: throttle(function () {
      this.$store.commit("restListForm", 1);
      sessionStorage.setItem("queryCondition", JSON.stringify(this.searchform));
      // this.paginationObj.page = 1;
      this.getList();
    }),
    reset: throttle(function () {
      this.$store.commit("restListForm", 1);
      sessionStorage.setItem("queryCondition", "");
      // this.paginationObj.page = 1;
      this.searchform.professionalTeamId = "";
      this.searchform.subject = "";
      this.getList();
    }),
    // changePage(currentPage) {
    //   if (currentPage === this.paginationObj.page) {
    //     return;
    //   }
    //   this.paginationObj.page = currentPage;
    //   this.$store.commit("restListForm", currentPage);
    //   this.getList();
    // },
    getList() {
      this.loading = true;
      let data = this.$objValuefilter(this.searchform);
      data = { ...this.searchform, ...this.$store.state.listForm };
      this.$api.traininglist(data).then((res) => {
        this.loading = false;
        if (res.code == 200) {
          this.tableData = res.data;
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