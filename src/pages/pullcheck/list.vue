<template>
  <div>
    <!-- if只有联络员不可以新增 -->
    <detail-header title="拉动点验" :breadcrumbList="breadcrumbList" reuseTexe="新增任务" @newAddEvent="newAddEvent" :ifShow="($store.state.roleIdList.includes(4)&&$store.state.roleIdList.length == 1) ? false : true"></detail-header>
    <div class="listQuery">
      <div class="queForm">
        <div class="queFormItem">
          <div class="queLable">专业队:</div>
          <el-select clearable v-model="searchform.professionalTeamId">
            <el-option v-for="(item, index) in teamaList" :key="index" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </div>
        <div class="queFormItem">
          <div class="queLable">任务名称:</div>
          <el-input v-model="searchform.taskName" class="queInp" placeholder="请输入专业队名称" maxlength="20"></el-input>
        </div>
        <div class="queFormItem">
          <div class="queLable">事件:</div>
          <el-date-picker v-model="searchform.time" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" format="yyyy-MM-dd" value-format="yyyy-MM-dd"> </el-date-picker>
        </div>
      </div>
      <div class="titleBtnBox">
        <el-button class="confirm" @click="query" type="primary">查 询</el-button>
        <el-button class="btn" @click="reset">重 置</el-button>
      </div>
    </div>
    <div class="tableListBox">
      <table-list :tableData="tableData" @delet="delet" @inform="inform" :loading="loading" :total="paginationObj.total" :currentpage="paginationObj.page" />
      <my-pagination :paginationObj="paginationObj" @changePage="changePage" />
    </div>
    <confirm-pop :confirmPopdata="confirmPopdata" :confirmVisible.sync="deleteVisible" @changVisible="changVisible" @deleteConfirm="deleteConfirm"> </confirm-pop>
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
      loading: false,
      searchform: {
        professionalTeamId: "",
        taskName: "",
        time: [],
      },
      confirmPopdata: {
        title: "删除点验任务!",
        content: "您确认删除此点验任务吗?",
        popType: 0,
      },
      deleteVisible: false,
      paginationObj: {
        total: 10,
        page: this.$store.state.listForm.page,
        size: 10,
      },
      breadcrumbList: ["首页", "拉动点验"],
      tableData: [],
      deletId: "",
      teamaList: [],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
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
    // 
    let isCityUser =this.$store.state.roleIdList.includes(1) ? 1 : 0;
    this.$api.teamallList({ isCityUser }).then((res) => {
      if (res.code == 200) {
        this.teamaList = res.data;
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
      this.$api.pullcheckdelete({ id: this.deletId }).then((res) => {
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
      this.$router.push("/pages/pullcheck/add");
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
      this.searchform.taskName = "";
      this.searchform.time = "";
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
    inform(row) {
      this.$api.pullcheckInformTheLiaison({ id: row.id }).then((res) => {
        if (res.code == 200) {
          this.$message({
            message: "通知成功",
            type: "success",
          });
          this.getList();
        } else {
          this.$message({
            message: res.message,
            type: "error",
          });
        }
      });
    },
    getList() {
      this.loading = true;
      let data = this.$objValuefilter(this.searchform);
      data = { ...this.searchform, ...this.$store.state.listForm };
      this.$api.pullchecklist(data).then((res) => {
        this.loading = false;
        if (res.code == 200) {
          this.tableData = res.page.records;
          this.paginationObj.size = res.page.size;
          this.paginationObj.total = res.page.total;
        } else {
          this.$message.error(res.message);
        }
      });
      // this.tableData = [...new Array(8)].map((item, index) => {
      //   return (item = {
      //     taskName: "任务名称",
      //     assemblyDate: "集结时间",
      //     assemblyArea: "集结地点",
      //     professionalTeamName: "专业队伍名称",
      //     id: currentPage + "" + index,
      //   });
      // });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>