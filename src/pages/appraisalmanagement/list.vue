<template>
  <div>
    <detail-header
      title="训练"
      :breadcrumbList="breadcrumbList"
      reuseTexe="新增项目"
    ></detail-header>
    <!-- <div class="listQuery">
      <div class="queForm">
        <div class="queFormItem">
          <div class="queLable">考核类型:</div>
          <el-select v-model="searchform.type" placeholder="请选择">
            <el-option
              v-for="item in assessType"
              :key="item.type"
              :label="item.name"
              :value="item.type"
            >
            </el-option>
          </el-select>
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
        :total="paginationObj.total"
        :currentpage="paginationObj.page"
        :tableData="tableData"
        @delet="delet"
        :loading="loading"
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
      loading: false,
      paginationObj: {
        total: 10,
        page: this.$store.state.listForm.page,
        size: 10,
      },
      assessType: [
        {
          name: "训练",
          type: 1,
        },
        {
          name: "拉练任务",
          type: 2,
        },
        // {
        //   name: "考试",
        //   type: 3,
        // },
      ],
      searchform: {
        type: 1,
      },
      breadcrumbList: ["首页", "考核管理",'队伍训练考核'],
      tableData: [],
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
    query: throttle(function () {
      this.$store.commit("restListForm", 1);
      this.paginationObj.page = 1;
      this.getList();
    }),
    reset: throttle(function () {
      this.$store.commit("restListForm", 1);
      this.paginationObj.page = 1;
      this.searchform.type = "";
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
      this.$api.inspectionRecordslist(data).then((res) => {
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