<template>
  <div>
    <detail-header title="整组交叉审核" :breadcrumbList="breadcrumbList"> </detail-header>
    <div class="listQuery">
      <div class="queForm">
        <div class="queFormItem">
          <div class="queLable">人员姓名:</div>
          <el-input v-model="searchform.personName" class="queInp" placeholder="请输入姓名" maxlength="20"></el-input>
        </div>
        <div class="queFormItem">
          <div class="queLable">专业:</div>
          <el-input v-model="searchform.professional" class="queInp" placeholder="请输入专业名称" maxlength="20"></el-input>
        </div>
        <div class="queFormItem">
          <div class="queLable">专业队:</div>
          <el-select clearable v-model="searchform.professionalTeamId">
            <el-option v-for="(item, index) in teamaList" :key="index" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </div>
      </div>
      <div class="titleBtnBox">
        <el-button class="confirm" @click="query" type="primary">查 询</el-button>
        <el-button class="confirm" @click="soldierauditInform" type="primary" v-if="$store.state.ifBut &&  !($store.state.roleIdList.includes(4) &&  $store.state.roleIdList.length == 1)">发送通知</el-button>
        <el-button class="btn" @click="reset">重 置</el-button>
        <el-button
          class="btn"
          style="width:120px"
          @click="downloadTemplate"
          v-if="$store.state.ifBut && $store.state.roleId != 4"
          >导入模板下载</el-button
        >
       <!-- 联络员无导入权限，无通知权限，无删除权限 -->
        <myimport-btn class="btn" @importSuccess="importSuccess" v-if="$store.state.ifBut &&  !($store.state.roleIdList.includes(4) &&  $store.state.roleIdList.length == 1)">导入</myimport-btn>
        <el-button class="btn" @click="exportFile" v-if="$store.state.ifBut">导 出</el-button>
      </div>
    </div>
    <div class="tableListBox">
      <table-list ref="outTable" :tableData="tableData" @delet="delet" :loading="loading" @update="getList" />
      <my-pagination :paginationObj="paginationObj" @changePage="changePage" />
    </div>
    <confirm-pop :confirmVisible.sync="deleteVisible" :confirmPopdata="confirmPopdata" @changVisible="changVisible" @deleteConfirm="deleteConfirm"> </confirm-pop>
  </div>
</template>

<script>
import { BASE_URL } from "@/request/http.js";
import myimportBtn from "@/components/importBtn.vue";
import confirmPop from "@/components/confirmPop";
import detailHeader from "@/components/detailHeader";
import myPagination from "@/components/myPagination";
import tableList from "./components/tableList.vue";
import { throttle, exportToExcel } from "@/utils/tools.js";
export default {
  components: {
    detailHeader,
    myPagination,
    tableList,
    confirmPop,
    myimportBtn,
  },
  data() {
    return {
      loading: true,
      deleteVisible: false,
      paginationObj: {
        total: 10,
        page: this.$store.state.listForm.page,
        size: 10,
      },
      searchform: {
        page: "",
        personName: "",
        professional: "",
        professionalTeamId: "",
      },
      confirmPopdata: {
        title: "删除队员!",
        content: "您确认删除此队员吗?",
        popType: 0,
      },
      breadcrumbList: ["首页", "整组交叉审核"],
      tableData: [],
      deletId: "",
      selectedList: [],
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
    this.$api.teamallList().then((res) => {
      if (res.code == 200) {
        this.teamaList = res.data;
      }
    });
  },
  methods: {
    delet(id) {
      this.deleteVisible = true;
      this.deletId = id;
    },
    changVisible() {
      this.deleteVisible = false;
    },
    downloadTemplate() {
      // window.location.href = this.$api.urlSold;
      window.open(this.$api.urlSold)
      // var eleLink = document.createElement("a");
      // eleLink.download = "整组交叉审核导入模板";
      // eleLink.style.display = "none";
      // // 字符内容转变成blob地址
      // eleLink.href = BASE_URL + "mode/bbsh.xlsx";
      // document.body.appendChild(eleLink);
      // eleLink.click();
      // document.body.removeChild(eleLink);
    },
    importSuccess(res) {
      if (res.code == 200) {
        this.$message({
          message: "导入成功",
          type: "success",
        });
        this.getList();
      } else {
        this.$message.error(res.message);
      }
    },
    deleteConfirm() {
      this.$api.soldierauditdelete({ id: this.deletId }).then((res) => {
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
      this.searchform.personName = "";
      this.searchform.professional = "";
      this.searchform.professionalTeamId = "";
      this.getList();
    }),
    // 通知
    soldierauditInform() {
      // 获取table组件的选中
      this.selectedList = this.$refs.outTable.exportselectedList;
      if (!this.selectedList.length) {
        return this.$message.error({
          message: "请选择通知队员",
        });
      }
      let idlist = this.selectedList.map((item) => item.id);
      this.$api.soldierauditinform({ idList: idlist }).then((res) => {
        if (res.code == 200) {
          this.$refs.outTable.$refs.table.clearSelection();
          return this.$message({
            message: "已通知",
            type: "success",
          });
        } else {
          this.$message.error(res.message);
        }
      });
    },
    exportFile() {
      this.selectedList = this.$refs.outTable.exportselectedList;
      if (!this.selectedList.length) {
        return this.$message.error({
          message: "请选择需要导出的数据",
        });
      }
      // 表头数据
      let list = ["姓名", "性别", "年龄", "专业队伍名称", "专业", "是否替换", "是否通知", "替换队员"];
      let selectedList = this.selectedList.map((item) => {
        let flag = {};
        flag.personName = item.personName;
        flag.sex = item.sex;
        flag.age = item.age + "";
        flag.professionalTeamName = item.professionalTeamName;
        flag.professional = item.professional;
        flag.isReplce = item.isReplce == 1 ? "是" : "否";
        flag.isInform = item.isInform == 1 ? "是" : "否";
        flag.isTeammember = item.isTeammember;
        return flag;
      });
      exportToExcel(list, selectedList, "整组交叉审核列表");
      this.selectedList = [];
      this.$refs.outTable.$refs.table.clearSelection();
    },
    changePage(currentPage) {
      if (currentPage === this.paginationObj.page) {
        return;
      }
      this.paginationObj.page = currentPage;
      this.$store.commit("restListForm", currentPage);
      this.getList();
    },
    getList() {
      console.log(this.searchform);
      let data = this.$objValuefilter(this.searchform);
      data = { ...this.searchform, ...this.$store.state.listForm };

      this.loading = true;
      this.$api.soldierauditlist(data).then((res) => {
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