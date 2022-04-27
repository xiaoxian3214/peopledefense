<template>
  <div>
    <detail-header title="队伍后备兵源" :breadcrumbList="breadcrumbList" reuseTexe="新增队伍后备兵源" @newAddEvent="newAddEvent"></detail-header>
    <div class="listQuery">
      <div class="queForm teamMember">
        <div class="queFormItem">
          <div class="queLable">姓名:</div>
          <el-input v-model="searchform.name" class="queInp" placeholder="请输入姓名" maxlength="20"></el-input>
        </div>
        <div class="queFormItem extraordinary">
          <div class="queLable">性别:</div>
          <div class="queInp sexinput">
            <el-select clearable v-model="searchform.sex" placeholder="请选择">
              <el-option v-for="item in sexList" :key="item.id" :label="item.name" :value="item.id"> </el-option>
            </el-select>
          </div>
        </div>
              <div class="queFormItem">
          <div class="queLable">政治面貌:</div>
          <div class="queInp">
            <el-select clearable   v-model="searchform.politicsStatus" placeholder="请选择">
              <el-option v-for="item in politicsStatusList" :key="item.id" :label="item.name" :value="item.id"> </el-option>
            </el-select>
          </div>
        </div>
       <div class="queFormItem">
          <div class="queLable">区域:</div>
          <div class="queInp">
            <el-select clearable @change="getAreaBuildUnit" v-model="searchform.areaId" placeholder="请选择区域">
              <el-option v-for="item in areaList" :key="item.id" :label="item.name" :value="item.id"> </el-option>
            </el-select>
          </div>
        </div>

            <div class="queFormItem">
          <div class="queLable">组建单位:</div>
            <el-select clearable v-model="searchform.unit" placeholder="请选择区域">
              <el-option v-for="(item,index) in areaBuildUnitList" :key="index" :label="item.name" :value="item.name"> </el-option>
            </el-select>
          <!-- <el-input class="queInp" v-model="searchform.unit" placeholder="请输入" maxlength="20"></el-input> -->
        </div>
        <div class="queFormItem">
          <div class="queLable">专业队:</div>
          <div class="queInp">
            <el-select clearable v-model="searchform.professionalTeamId">
              <el-option v-for="(item, index) in teamaList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </div>
        </div>
        <div class="queFormItem">
          <div class="queLable">联系电话:</div>
          <div class="queInp">
            <el-input oninput="value=value.replace(/[^\d-]/g,'')" maxlength="12" v-model="searchform.phone" placeholder="请输入联系电话" class="formInp" type="text"></el-input>
          </div>
        </div>
        <!-- <div class="queFormItem">
          <div class="queLable">专业队:</div>
          <el-select v-model="searchform.professionalTeamId">
            <el-option
              v-for="(item, index) in teamaList"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div> -->
  

    
        <!-- <div class="queFormItem">
          <div class="queLable">区域:</div>
          <el-select v-model="searchform.areaId" placeholder="请选择区域">
            <el-option
              v-for="item in areaList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div> -->

      </div>
      <div class="titleBtnBox">
        <el-button class="btn confirm" @click="query" type="primary">查 询</el-button>
        <el-button class="btn" @click="reset">重 置</el-button>
        <el-button class="btn" @click="imporVisiExp = true">扩 编</el-button>
        <!-- <myimport-btn class="btn">导入</myimport-btn> -->
        <el-button style="min-width: 96px" class="btn" @click="downloadTemplate" v-if="$store.state.ifBut &&  !($store.state.roleIdList.includes(4) &&  $store.state.roleIdList.length == 1)">导入模板下载</el-button>

        <el-button class="btn" @click="imporVisible = true" v-if="$store.state.ifBut">导入</el-button>
        <!-- <myimport-btn
          class="btn"
          @importSuccess="importSuccess"
          v-if="$store.state.ifBut"
          >导入</myimport-btn
        > -->
      </div>
    </div>
    <div class="tableListBox">
      <table-list :loading="loading" :tableData="tableData" @delet="delet" ref="outTable" />
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
    <!-- 扩编弹窗 -->
    <el-dialog title="扩编" :visible.sync="imporVisiExp" width="640px" top="30vh" @close="beforeCloseExp">
      <div>
        <el-row>
          <el-col :span="4" class="popLabel">行政区域: </el-col>
          <el-col :span="18" :offset="1">
            <el-select clearable v-model="expForm.areaId" @change="onAreaChange"> <el-option v-for="(item, index) in areaList" :key="item.id" :label="item.name" :value="item.id"></el-option> </el-select>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="popLabel">专业队名称: </el-col>
          <el-col :span="18" :offset="1">
            <el-select clearable v-model="expForm.teamId" @change="onTeamChange"> <el-option v-for="(item, index) in teamaList1" :key="item.id" :label="item.name" :value="item.id"></el-option> </el-select
          ></el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="popLabel">组建单位: </el-col>
          <el-col :span="18" :offset="1"> <el-input class="queInp" v-model="expForm.directorUnit" placeholder="请输入" maxlength="20"></el-input></el-col>
        </el-row>
        <!-- <el-row>
          <el-col :span="4" class="popLabel">专业: </el-col>
          <el-col :span="18" :offset="1">
            <el-input
              class="queInp"
              v-model="expForm.professional"
              placeholder="请输入"
              maxlength="20"
            ></el-input
          ></el-col>
        </el-row> -->
        <el-row>
          <el-col :span="4" class="popLabel">倍数: </el-col>
          <el-col :span="18" :offset="1"> <el-input class="queInp" v-model="expForm.multiple" placeholder="请输入" maxlength="20" oninput="value=value.replace(/[^\d]/g,'')"></el-input></el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="imporVisiExp = false" class="btn">取 消</el-button>
        <el-button type="primary" @click="playersSourceexpansion" class="btn confirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import myimportBtn from "@/components/importBtnBY.vue";
import confirmPop from "@/components/confirmPop";
import detailHeader from "@/components/detailHeader";
import myPagination from "@/components/myPagination";
import tableList from "./components/tableList.vue";
// import myimportBtn from "@/components/importBtn.vue";
import { throttle, exportToExcel } from "@/utils/tools.js";
export default {
  components: {
    detailHeader,
    tableList,
    myPagination,
    confirmPop,
    myimportBtn,
  },
  data() {
    const dataJson = JSON.parse(sessionStorage.getItem("data"));
    return {
      headers: {
        token: dataJson.token,
      },
      loading: true,
      confirmPopdata: {
        title: "删除队员!",
        content: "您确认删除此队员吗?",
        popType: 0,
      },
      paginationObj: {
        total: 0,
        page: this.$store.state.listForm.page,
        size: 10,
      },
      deleteVisible: false,
      searchform: {
        areaId: "",
        name: "",
        sex: "",
        professionalTeamId: "",
        politicsStatus: "",
        unit: "",
        phone: "",
      },
      areaList: [],
      breadcrumbList: ["首页", "队伍后备兵源"],
      politicsStatusList: [],
      sexList: [],
      tableData: [],
      exportselectedList: [],
      deletId: "",
      teamaList: [],
      teamaList1: [],
      // 导入弹窗
      imporVisible: false,
      teamImport: "",
      action: this.$UPLOAD_URL,
      impUrl: "",
      fileList: [],
      // 扩编弹窗
      imporVisiExp: false,
      expForm: {
        teamId: "",
        directorUnit: "",
        professional: "",
        multiple: "",
      },
      areaBuildUnitList:[]
    };
  },
  mounted() {
    if (sessionStorage.getItem("queryCondition")) {
      let sessData = JSON.parse(sessionStorage.getItem("queryCondition"));
      for (const key in sessData) {
        this.searchform[key] = sessData[key];
      }
    }
    this.ZD_ZZZH_ZZMM();
    this.ZD_ZZZH_XB();
    this.getList();
    this.getTeamaList()
    this.ZD_WZ_XZQDM();
    this.getAreaBuildUnit()
  },
  methods: {
   getAreaBuildUnit(id=''){
      this.$api.getAreaBuildUnit({id}).then(res=>{
        if (res.data.map((item1)=>item1.name).indexOf(this.searchform.unit) == -1) {
          this.searchform.unit =""
        }
          this.areaBuildUnitList =  res.data
      })
       this.searchform.professionalTeamId =  ""
       this.getTeamaList(id)
    },
    onTeamChange(val) {
      let data = this.teamaList1.find((item) => (item.id == val));
      this.expForm.directorUnit = data.directorUnit;
    },
    onAreaChange(val) {
      this.teamAllTeamList(val);
      this.expForm.teamId = "";
      this.expForm.directorUnit = "";
    },
    teamAllTeamList(areaId ='') {
      this.$api.teamAllTeamList({ areaId }).then((res) => {
        if (res.code == 200) {
          this.teamaList1 = res.data;
        }
      });
    },
    getTeamaList(areaId ='') {
      this.$api.teamAllTeamList({ areaId }).then((res) => {
        if (res.code == 200) {
          this.teamaList = res.data;
        }
      });
    },
    downloadTemplate() {
      window.open(this.$api.urlSold)
      // window.location.href = this.$api.urlSol;
      // var eleLink = document.createElement("a");
      // eleLink.download = "整组交叉审核导入模板";
      // eleLink.style.display = "none";
      // // 字符内容转变成blob地址
      // eleLink.href = BASE_URL + "mode/bbsh.xlsx";
      // document.body.appendChild(eleLink);
      // eleLink.click();
      // document.body.removeChild(eleLink);
    },
    // 扩编
    beforeCloseExp() {
      this.expForm = {
        teamId: "",
        directorUnit: "",
        professional: "",
        multiple: "",
      };
    },
    playersSourceexpansion() {
      let params = {
        ...this.expForm,
      };
      this.$api.playersSourceexpansion(params).then((res) => {
        if (res.code == 200) {
          // this.areaList = res.page.records;
          this.getList();
          this.imporVisiExp = false;
          this.$message({
            message: "扩编成功",
            type: "success",
          });
        } else {
          this.$message.error(res.message);
        }
      });
    },
    // 导入
    beforeCloseFun() {
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
      this.$api.playersSourceImp(params).then((res) => {
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
    //区域
    ZD_WZ_XZQDM() {
      this.$api.ZD_WZ_XZQDM().then((res) => {
        if (res.code == 200) {
          this.areaList = res.page.records;
        }
      });
    },
    // 政治面貌
    ZD_ZZZH_ZZMM() {
      this.$api.ZD_ZZZH_ZZMM().then((res) => {
        if (res.code == 200) {
          this.politicsStatusList = res.page.records;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    // 性别
    ZD_ZZZH_XB() {
      this.$api.ZD_ZZZH_XB().then((res) => {
        if (res.code == 200) {
          this.sexList = res.page.records;
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
      this.$api.playersSourcedelete({ id: this.deletId }).then((res) => {
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
      this.$router.push("/pages/soldiers/add");
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
      this.searchform.phone = "";
      this.searchform.sex = "";
      this.searchform.areaId = "";
      this.searchform.professionalTeamId = "";
      this.searchform.politicsStatus = "";
      this.searchform.unit = "";
      this.getList();
    }),
    importSuccess(res) {
      console.log(2222);
      if (res.code == 200) {
        this.$message({
          message: "导入成功",
          type: "success",
        });
        this.getList();
      } else {
        this.$message.error("导入失败");
      }
    },

    // exportFile(row) {
    //   this.exportselectedList = this.$refs.outTable.exportselectedList;
    //   if (!this.exportselectedList.length) {
    //     return this.$message.error({
    //       message: "请选择需要导出的数据",
    //     });
    //   }
    //   // 表头数据
    //   let list = [
    //     "人员姓名",
    //     "性别",
    //     "年龄",
    //     "专业队伍名称",
    //     "专业",
    //     "单位",
    //     "政治面貌",
    //     "民兵交叉",
    //   ];
    //   let selectedList = this.exportselectedList.map((item) => {
    //     let flag = {};
    //     flag.name = item.name;
    //     flag.sex = item.sex == 160 ? "男" : "女";
    //     flag.age = item.age + "";
    //     flag.professionalTeamId = item.professionalTeamId;
    //     flag.professional = item.professional;
    //     flag.directorUnit = item.directorUnit;
    //     flag.politics = item.politics;
    //     flag.repeatedVerification =
    //       item.repeatedVerification == 0 ? "否" : "是";

    //     return flag;
    //   });
    //   exportToExcel(list, selectedList, "队员信息");
    //   this.exportselectedList = [];
    //   this.$refs.outTable.$refs.table.clearSelection();
    // },
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
      this.$api.playersSourceList(data).then((res) => {
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
.teamMember {
  width: 82%;

  // .queFormItem {
  //   width: 17%;
  //   .sexinput {
  //     width: 90px;
  //   }
  // }
  // .extraordinary {
  //   width: 13% !important;
  // }
}
.uploBox {
  margin: 20px auto 0;
  text-align: center;
}
.popLabel {
  line-height: 32px;
  margin-bottom: 20px;
  text-align: right;
}
</style>