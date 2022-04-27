<template>
  <div>
    <detail-header title="重要经济目标" :breadcrumbList="breadcrumbList" reuseTexe="新增项目" @newAddEvent="newAddEvent" :ifShow="true"></detail-header>
    <div class="listQuery aged">
      <div class="queForm">
        <div class="queFormItem">
          <div class="queLable">名称:</div>
          <el-input v-model="searchform.name" class="queInp" placeholder="请输入经济目标名称" maxlength="20"></el-input>
        </div>
        <div class="queFormItem">
          <div class="queLable">大类:</div>
          <el-select clearable v-model="searchform.importantEconomicTargetBigType" placeholder="请选择">
            <el-option v-for="item in categoriesOfEconomiObjectivesList" :key="item.id" :label="item.name" :value="item.id"> </el-option>
          </el-select>
        </div>
        <div class="queFormItem">
          <div class="queLable">中类:</div>
          <el-select clearable v-model="searchform.importantEconomicTargetMinorType" placeholder="请选择">
            <el-option v-for="item in ImportantEconomicGoalsList" :key="item.id" :label="item.name" :value="item.id"> </el-option>
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
        <!-- <el-button
          class="btn"
          @click="downloadTemplate"
          v-if="$store.state.ifBut"
          >导入模板下载</el-button
        >
        <el-button
          class="btn"
          @click="imporVisible = true"
          v-if="$store.state.ifBut"
          >导入</el-button
        > -->
      </div>
    </div>
    <div class="tableListBox">
      <table-list :total="paginationObj.total" :currentpage="paginationObj.page" :tableData="tableData" @delet="delet" :loading="loading" />
      <my-pagination :paginationObj="paginationObj" @changePage="changePage" />
    </div>
    <confirm-pop :confirmVisible.sync="deleteVisible" :confirmPopdata="confirmPopdata" @changVisible="changVisible" @deleteConfirm="deleteConfirm"> </confirm-pop>
    <!-- 导入弹窗 -->
    <el-dialog title="导入" :visible.sync="imporVisible" width="640px" top="30vh" @close="beforeCloseFun">
      <div>
        <div class="uploBox">
          <el-upload class="upload-demo" drag :action="action" :on-success="uploSuc" :limit="1" :file-list="fileList" :headers="headers">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <!-- <div class="el-upload__tip" slot="tip">
            只能上传jpg/png文件，且不超过500kb
          </div> -->
          </el-upload>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="imporVisible = false" class="btn">取 消</el-button>
        <el-button type="primary" @click="importChang" class="btn confirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import detailHeader from "@/components/detailHeader";
import tableList from "./components/tableList";
import myPagination from "@/components/myPagination";
import { throttle } from "@/utils/tools.js";
import confirmPop from "@/components/confirmPop";
export default {
  components: {
    detailHeader,
    tableList,
    myPagination,
    confirmPop,
  },
  data() {
    const dataJson = JSON.parse(sessionStorage.getItem("data"));
    return {
      headers: {
        token: dataJson.token,
      },
      fileList: [],
      areaList: [],
      impUrl: "",
      imporVisible: false,
      action: this.$UPLOAD_URL,
      loading: true,
      deleteVisible: false,
      confirmPopdata: {
        title: "删除经济目标!",
        content: "您确认删除此经济目标吗?",
        popType: 0,
      },
      searchform: {
        name: "",
        administrative: "",
        importantEconomicTargetBigType: "",
        importantEconomicTargetMinorType: "",
      },
      paginationObj: {
        total: 10,
        page: this.$store.state.listForm.page,
        size: 10,
      },
      breadcrumbList: ["首页", "重要经济目标"],
      tableData: [],
      categoriesOfEconomiObjectivesList: [], //重要经济目标大类
      ImportantEconomicGoalsList: [], // 重要经济目标中类
      classList: [
        { name: "全部", id: 0 },
        { name: "大类", id: 1 },
        { name: "中类", id: 2 },
        { name: "小类", id: 3 },
      ],
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
    this.ZD_ZZZH_ZYJJMBDL();
    this.ZD_ZZZH_ZYJJMBZL();
    this.ZD_WZ_XZQDM();
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
    downloadTemplate() {
      window.open(this.$api.urlEco)
      // window.location.href =
      //   "https://rfb-zlf.wenzhou.gov.cn:8003/mode/%E4%B8%93%E4%B8%9A%E9%98%9F%E9%98%9F%E5%91%98%E4%BF%A1%E6%81%AF%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xls";
    },
    // 导入
    beforeCloseFun() {
      this.teamImport = "";
      this.fileList = [];
    },
    uploSuc(res, file, fileList) {
      // console.log(res, file, fileList);
      if (res.code == 200) {
        this.impUrl = res.data.fileList[0].url;
      }
    },
    importChang() {
      let params = {
        url: this.impUrl,
      };
      this.$api.economicImport(params).then((res) => {
        if (res.code == 200) {
          // this.areaList = res.page.records;
          this.getList();
          this.imporVisible = false;
          this.$message({
            message: "导入成功",
            type: "success",
          });
        } else {
          this.$message.error(res.message);
        }
      });
    },
    // 重要经济目标大类
    ZD_ZZZH_ZYJJMBDL() {
      this.$api.ZD_ZZZH_ZYJJMBDL().then((res) => {
        if (res.code == 200) {
          this.categoriesOfEconomiObjectivesList = res.page.records;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    // 重要经济目标中类
    ZD_ZZZH_ZYJJMBZL() {
      this.$api.ZD_ZZZH_ZYJJMBZL().then((res) => {
        if (res.code == 200) {
          this.ImportantEconomicGoalsList = res.page.records;
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
      this.$api.economicdelete({ id: this.deletId }).then((res) => {
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
      this.$router.push("/pages/economic/add");
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
      this.searchform.areaId = "";
      this.searchform.importantEconomicTargetBigType = "";
      this.searchform.importantEconomicTargetMinorType = "";
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
      this.$api.economiclist(data).then((res) => {
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
.uploBox {
  margin: 20px auto 0;
  text-align: center;
}
.exportBox {
  display: flex;
}
.aged {
  .queLable {
    font-size: 16px !important;
  }
  .el-input {
    font-size: 16px !important;
  }
}
</style>