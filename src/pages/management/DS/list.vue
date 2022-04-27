<template>
  <div>
    <detail-header
      title="数据共享"
      :breadcrumbList="breadcrumbList"
    ></detail-header>
    <!-- <div class="listQuery">
      <div class="titleBtnBox">
        <el-button class="confirm" @click="query" type="primary"
          >查 询</el-button>
        <el-button class="btn" @click="reset">重 置</el-button>
      </div>
    </div> -->
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="1">队员信息</el-menu-item>
      <el-menu-item index="2">专业队信息</el-menu-item>
      <el-menu-item index="3">重要经济目标信息</el-menu-item>
      <el-menu-item index="4">县(市)区专业专业队力量结构</el-menu-item>
    </el-menu>
    <div class="tableListBox">
      <table-list
        v-if="activeIndex == 1"
        :tableData="tableData"
        @delet="delet"
      />
      <table-list1
        v-if="activeIndex == 2"
        :tableData="tableData"
        @delet="delet"
      />
      <table-list2
        v-if="activeIndex == 3"
        :tableData="tableData"
        @delet="delet"
      />
      <table-list3
        v-if="activeIndex == 4"
        :tableData="tableData"
        @delet="delet"
      />
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
import detailHeader from "@/components/detailHeader";
import confirmPop from "@/components/confirmPop";
import tableList from "./components/tableList";
import tableList1 from "./components/tableList1";
import tableList2 from "./components/tableList2";
import tableList3 from "./components/tableList3";
import myPagination from "@/components/myPagination";
import { throttle } from "@/utils/tools.js";
export default {
  components: {
    detailHeader,
    tableList,
    tableList1,
    tableList2,
    tableList3,
    myPagination,
    confirmPop,
  },
  data() {
    return {
      activeIndex: "1",
      teamname: "",
      paginationObj: {
        total: 10,
        page: 1,
        size: 10,
      },
      confirmPopdata: {
        title: "删除数据共享!",
        content: "您确认删除此数据共享吗?",
        popType: 0,
      },
      deleteVisible: false,
      searchform: {
        page: 1,
      },
      breadcrumbList: ["首页", "系统管理", "数据目录"],
      tableData: [],
      options: [{}],
      administrativeList: [],
      majorList: [],
      sexList: [],
    };
  },
  computed: {},
  mounted() {
    this.getList(this.activeIndex);
    this.getAdministrativeList();
    this.getMajorList();
    this.getsexList();
  },
  methods: {
    // 获取行政区
    getAdministrativeList() {
      this.$api.ZD_XZQDM().then((res) => {
        if (res.code == 200) {
          this.administrativeList = res.page.records;
        }
      });
    },
    // 获取专业能力类型
    getMajorList() {
      this.$api.ZD_ZZZH_ZYDNLLX().then((res) => {
        if (res.code == 200) {
          this.majorList = res.page.records;
          console.log(this.majorList);
        }
      });
    },
    // 获取性别
    getsexList() {
      this.$api.ZD_ZZZH_XB().then((res) => {
        if (res.code == 200) {
          this.sexList = res.page.records;
        }
      });
    },
    handleSelect(key, keyPath) {
      this.activeIndex = key;
      this.searchform.page = 1;
      this.paginationObj.page = 1;
      this.getList(this.activeIndex);
    },
    importFile() {},
    exportFile() {},
    delet(val) {
      this.deleteVisible = true;
      this.deletId = val.id;
    },
    changVisible() {
      this.deleteVisible = false;
    },
    deleteConfirm() {
      this.$api.playersdelete({ id: this.deletId }).then((res) => {
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
    // query: throttle(function () {
    //   this.searchform.page = 1;
    //   this.paginationObj.page = 1;
    //   this.getList();
    // }),
    // reset: throttle(function () {
    //   this.searchform.page = 1;
    //   this.paginationObj.page = 1;
    //   this.searchform.professional = "";
    //   this.searchform.sex = "";
    //   this.getList();
    // }),
    changePage(currentPage) {
      if (currentPage === this.paginationObj.page) {
        return;
      }
      this.paginationObj.page = currentPage;
      this.searchform.page = currentPage;
      this.getList(this.activeIndex);
    },
    getList(idnex) {
      this.loading = true;
      this.$api.teamgetFourTypeData(this.searchform).then((res) => {
        if (res.code == 200) {
          switch (idnex) {
            case "1":
              let record = res.data.personInformationQueryDOS.records;
              record.forEach((item) => {
                this.administrativeList.forEach((item1) => {
                  if (item1.id == item.administrativeCode) {
                    item.administrativeCode = item1.name;
                  }
                });
                this.sexList.forEach((item1) => {
                  if (item1.id == item.sex) {
                    item.sex = item1.name;
                  }
                });
              });
              this.tableData = record;
              this.paginationObj.size = res.data.personInformationQueryDOS.size;
              this.paginationObj.total =
                res.data.personInformationQueryDOS.total;
              break;
            case "2":
              record = res.data.professionalTeamQueryDOS.records;
              record.forEach((item) => {
                this.administrativeList.forEach((item1) => {
                  if (item1.id == item.administrativeCode) {
                    item.administrativeCode = item1.name;
                  }
                });
                this.majorList.forEach((item1) => {
                  if (item1.id == item.abilityType) {
                    item.abilityType = item1.name;
                  }
                });
              });
              this.tableData = record;
              this.paginationObj.size = res.data.professionalTeamQueryDOS.size;
              this.paginationObj.total =
                res.data.professionalTeamQueryDOS.total;
              break;
            case "3":
              record = res.data.importantEconomicTargetQueryDOS.records;
              record.forEach((item) => {
                this.administrativeList.forEach((item1) => {
                  if (item1.id == item.administrativeCode) {
                    item.administrativeCode = item1.name;
                  }
                });
              });
              this.tableData = record;
              this.paginationObj.size =
                res.data.importantEconomicTargetQueryDOS.size;
              this.paginationObj.total =
                res.data.importantEconomicTargetQueryDOS.total;
              break;
            case "4":
              record = res.data.professionalTeamStrengthQueryDOS.records;
              record.forEach((item) => {
                this.administrativeList.forEach((item1) => {
                  if (item1.id == item.administrativeCode) {
                    item.administrativeCode = item1.name;
                  }
                });
              });
              this.tableData = record;
              this.paginationObj.size = res.data.professionalTeamStrengthQueryDOS.size;
              this.paginationObj.total =  res.data.professionalTeamStrengthQueryDOS.total;
              break;
          }
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