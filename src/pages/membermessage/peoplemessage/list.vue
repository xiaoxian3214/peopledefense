<template>
  <div v-loading="loding">
    <detail-header title="队员信息" :breadcrumbList="breadcrumbList" reuseTexe="新增队员" @newAddEvent="newAddEvent" :ifShow="true"></detail-header>
    <div class="listQuery aged">
      <div class="queForm teamMember">
        <div class="queFormItem">
          <div class="queLable">姓名:</div>
          <!-- wid75 -->
          <el-input v-model="searchform.name" class="queInp" placeholder="请输入姓名" maxlength="20"></el-input>
        </div>
        <!-- wid86 -->
        <div class="queFormItem extraordinary">
          <div class="queLable">性别:</div>
          <div class="queInp">
            <el-select clearable v-model="searchform.sex" placeholder="请选择">
              <el-option v-for="item in sexList" :key="item.id" :label="item.name" :value="item.id"> </el-option>
            </el-select>
          </div>
        </div>
        <!-- wid129 -->
        <div class="queFormItem">
          <div class="queLable">政治面貌:</div>
          <div class="queInp">
            <el-select clearable v-model="searchform.politicsStatus" placeholder="请选择">
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
          <el-select clearable v-model="searchform.unit" placeholder="请选择组件单位">
              <el-option v-for="(item,index) in areaBuildUnitList" :key="index" :label="item.name" :value="item.name"> </el-option>
            </el-select>
          <!-- <el-input class="queInp" v-model="searchform.unit" placeholder="请输入" maxlength="20"></el-input> -->
        </div>

                <!-- wid129 -->
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

      </div>
      <div class="titleBtnBox">
        <el-button class="btn confirm" @click="query" type="primary">查 询</el-button>
        <el-button class="btn" @click="reset">重 置</el-button>
        <el-button class="btn" @click="passKB" type="primary">取消扩编</el-button>
        <!-- <myimport-btn class="btn">导入</myimport-btn>  -->
        <el-button style="min-width: 96px" class="btn" @click="downloadTemplate" v-if="$store.state.ifBut">导入模板下载</el-button>
        <el-button class="btn" @click="imporVisible = true" v-if="$store.state.ifBut">导入</el-button>
        <!-- <el-button class="btn" @click="exportFile">导 出</el-button> -->
        <el-button class="btn" @click="exportVisible = true" v-if="$store.state.ifBut">导 出</el-button>
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
        <el-row style="margin-bottom: 10px">
          <el-col :span="4" class="popLabel">行政区域: </el-col>
          <el-col :span="18">
            <el-select clearable v-model="areaId" @change="onAreaChange"> <el-option v-for="(item, index) in areaList" :key="index" :label="item.name" :value="item.id"></el-option> </el-select>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="popLabel">专业队名称: </el-col>
          <el-col :span="19">
            <el-select clearable v-model="teamImport" placeholder="请选择导入的专业队名称">
              <el-option v-for="(item, index) in teamaList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-col>
        </el-row>
        <div class="uploBox">
          <el-upload class="upload-demo" drag :action="action" :on-success="uploSuc" :limit="1" :file-list="fileList" :headers="headers" :on-remove="removeFile">
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
    <!-- 导出弹窗 -->
    <el-dialog title="导出" :visible.sync="exportVisible" width="500px" top="30vh">
      <div>
        <el-row class="exportBox">
          <el-col :span="4">导出类型: </el-col>
          <!-- :offset="1" -->
          <el-col :span="20">
            <el-radio-group v-model="exportRadio">
              <el-radio :label="0">全部导出</el-radio>
              <el-radio :label="1">部分导出</el-radio>
            </el-radio-group></el-col
          >
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="exportVisible = false" class="btn">取 消</el-button>
        <el-button type="primary" @click="exportChang" class="btn confirm">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 扩编 -->
    <el-dialog title="取消扩编" :visible.sync="KBexportVisible" width="1000px" top="30vh">
      <div>
        <el-table :data="KBTableData" style="width: 100%">
          <el-table-column prop="name" label="扩编人员名称" width="180"> </el-table-column>
          <el-table-column prop="codeName" label=" 行政区域 " width="180"> </el-table-column>
          <el-table-column prop="number" label="扩编人数"> </el-table-column>
          <el-table-column prop="address" label=" 操作">
            <template slot-scope="scope">
              <el-button type="text" class="optionBtnDel" @click="Kb(scope.row)">取消扩编</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- <div slot="footer" class="dialog-footer">
        <el-button @click="KBexportVisible = false" class="btn">取 消</el-button>
        <el-button type="primary" @click="KBexportVisible" class="btn confirm"
          >确 定</el-button
        >
      </div> -->
    </el-dialog>

    <!-- 新增弹窗 -->
    <el-dialog title="新增" :visible.sync="addVisible" width="30%">
      <div>
        <el-row class="exportBox">
          <el-col :span="4">新增类型: </el-col>
          <!-- :offset="1" -->
          <el-col :span="20">
            <el-radio-group v-model="addClass">
              <el-radio :label="0">后备兵员库</el-radio>
              <el-radio :label="1">手动</el-radio>
            </el-radio-group>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false" class="popBut">取 消</el-button>
        <el-button type="primary" @click="diaCon1" class="popBut popButCol">确 定</el-button>
      </div>
    </el-dialog>
    <TableBox @hiden="onHiden" :visible="boxVisible"></TableBox>
  </div>
</template>

<script>
import TableBox from "./components/TableBox.vue";
import confirmPop from "@/components/confirmPop";
import detailHeader from "@/components/detailHeader";
import myPagination from "@/components/myPagination";
import tableList from "./components/tableList.vue";
// import myimportBtn from "@/components/importBtn.vue";
import { throttle, exportToExcel } from "@/utils/tools.js";
import axios from "axios";
export default {
  components: {
    detailHeader,
    tableList,
    myPagination,
    confirmPop,
    TableBox,
    // myimportBtn,
  },
  data() {
    const dataJson = JSON.parse(sessionStorage.getItem("data"));
    return {
      boxVisible: false,
      addClass: -1,
      addVisible: false,
      headers: {
        token: dataJson.token,
      },
      loading: true,
      KBexportVisible: false,
      KBTableData: [],
      fileList: [],
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
      areaId: "",
      searchform: {
        areaId: "",
        name: "",
        sex: "",
        professionalTeamId: "",
        politicsStatus: "",
        unit: "",
      },
      areaList: [],
      breadcrumbList: ["首页", "队员信息"],
      politicsStatusList: [],
      sexList: [],
      tableData: [],
      exportselectedList: [],
      deletId: "",
      teamaList: [],
      // 导入弹窗
      imporVisible: false,
      teamImport: "",
      action: this.$UPLOAD_URL,
      impUrl: "",
      // 导出弹窗
      exportVisible: false,
      exportRadio: "",
      loding: false,
      areaBuildUnitList:[]
    };
  },
  mounted() {
    // console.log(this.$store.state.ifBut);
    // console.log();
    if (sessionStorage.getItem("queryCondition")) {
      let sessData = JSON.parse(sessionStorage.getItem("queryCondition"));
      for (const key in sessData) {
        this.searchform[key] = sessData[key];
      }
    }
    this.ZD_ZZZH_ZZMM();
    this.ZD_ZZZH_XB();
    this.getList();
    this.ZD_WZ_XZQDM();
    this.$api.teamallList().then((res) => {
      if (res.code == 200) {
        this.teamaList = res.data;
      }
    });
 this.getAreaBuildUnit()
    //     window.onhashchange = function () {
    //     console.log('URL发生变化了');
    // };
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
       this.teamAllTeamList(id)
    },

    onHiden() {
      this.boxVisible = false;
    },
    diaCon1() {
      if (this.addClass == 0) {
        this.boxVisible = true;
      } else {
        this.$router.push("/pages/membermessage/peoplemessage/add");
      }
    },
    newAddEvent() {
      this.addVisible = true;
    },
    onAreaChange(val) {
      this.teamAllTeamList(val);
      this.teamImport = "";
    },
    teamAllTeamList(areaId) {
      this.$api.teamAllTeamList({ areaId }).then((res) => {
        if (res.code == 200) {
          this.teamaList = res.data;
        }
      });
    },
    downloadTemplate() {
      // window.location.href =
      //   "https://rfb-zlf.wenzhou.gov.cn:8003/mode/%E4%B8%93%E4%B8%9A%E9%98%9F%E9%98%9F%E5%91%98%E4%BF%A1%E6%81%AF%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xls";
      // console.log(this.$api.urlMem);
      // window.location.href = ;
      window.open(this.$api.urlMem)
    },
    beforeCloseFun() {
      this.teamImport = "";
      this.fileList = [];
      this.impUrl = "";
    },
    removeFile() {
      this.impUrl = "";
    },
    // 导入
    uploSuc(res, file, fileList) {
      // console.log(res, file, fileList);
      if (res.code == 200) {
        this.impUrl = res.data.fileList[0].url;
      }
    },
    importChang() {
      // console.log(this.teamImport);
      if (!this.teamImport) {
        this.$message.error("请选择专业队名称");
        return;
      }
      if (!this.impUrl) {
        this.$message.error("请选择文件");
        return;
      }
      let params = {
        teamId: this.teamImport,
        url: this.impUrl,
      };
      this.$api.playersImp(params).then((res) => {
        if (res.code == 200) {
          // this.areaList = res.page.records;
          this.getList();
          this.imporVisible = false;
          this.$message({
            type: "success",
            message: "导入成功",
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
      this.searchform.phone = "";
      this.searchform.name = "";
      this.searchform.sex = "";
      this.searchform.areaId = "";
      this.searchform.professionalTeamId = "";
      this.searchform.politicsStatus = "";
      this.searchform.unit = "";
      this.getList();
    }),
    //  取消扩编
    passKB() {
      this.KBexportVisible = true;
      this.$api.cancelTheIncreaseList().then((res) => {
        this.KBTableData = res.data;
      });
    },
    Kb(e) {
      console.log(e.id, "id");
      this.$api.cancelTheIncrease({ id: e.id }).then((res) => {
        if (res.code === 200) {
          this.$message.success("取消扩编成功");
          this.KBexportVisible = false;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    // 导出
    exportChang() {
      switch (this.exportRadio) {
        case 0:
          let params = this.$objValuefilter(this.searchform);
          this.loding = true;
          this.$api.exportPlayerlist(params).then((res) => {
            if (res.code == 200) {
              let download = res.data.url;
              axios({
                url: download,
              }).then(() => {
                window.location.href = download;
                this.loding = false;
              });
            }
          });
          break;
        case 1:
          this.exportFile();
          break;
        default:
          return this.$message.error({
            message: "请选择需要导出类型",
          });
      }
    },
    exportFile(row) {
      // 导出列表数据
      this.exportselectedList = this.$refs.outTable.exportselectedList;
      if (!this.exportselectedList.length) {
        return this.$message.error({
          message: "请选择需要导出的数据",
        });
      }
      // 表头数据
      let list = ["专业队编号", "主管单位", "专业队伍名称", "姓名", "职务", "出生日期", "入队日期", "年龄", "性别", "政治面貌", "文化程度", "户籍信息", "专业", "现居住地", "本人联系电话", "身份证号", "备注", "来源标识（扩编）"];
      // 拿到所有导出的professionalTeamNameId根据专业队id进行排序
      let professionalTeamNameIdList = [];
      this.exportselectedList.forEach((item) => {
        if (professionalTeamNameIdList.indexOf(item.professionalTeamNameId) == -1) {
          professionalTeamNameIdList.push(item.professionalTeamNameId);
        }
      });
      let sortList = [];
      professionalTeamNameIdList.forEach((item1) => {
        this.exportselectedList.forEach((item) => {
          if (item1 == item.professionalTeamNameId) {
            sortList.push(item);
          }
        });
      });
      let selectedList = sortList.map((item) => {
        let flag = {};
        flag.number = item.number;
        flag.directorUnit = item.directorUnit;
        flag.professionalTeamName = item.professionalTeamName;
        flag.name = item.name;
        flag.position = item.position;
        flag.birthday = item.birthday;
        flag.intoTeamDate = item.intoTeamDate;
        flag.age = item.age;
        flag.sexName = item.sexName;
        flag.politics = item.politics;
        flag.levelOfEducation = item.levelOfEducation;
        flag.householdRegistration = item.householdRegistration;
        flag.professional = item.professional;
        flag.address = item.address;
        flag.phone = item.phone;
        flag.idCard = item.idCard;
        flag.remark = item.remark;
        flag.repeatedVerification = item.repeatedVerification == 1 ? "是" : "否";
        return flag;
      });
      this.exportVisible = false;

      exportToExcel(list, selectedList, "队员信息");
      this.exportselectedList = [];
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
      this.loading = true;
      let data = this.$objValuefilter(this.searchform);
      data = { ...this.searchform, ...this.$store.state.listForm };
      this.$api.playerslist(data).then((res) => {
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
.popLabel {
  line-height: 32px;
}
.btn {
  min-width: 65px;
  height: 32px;
  padding: 0;
  line-height: 32px;
  text-align: center;
  background: #ffffff;
  border-radius: 2px;
  border: 1px solid #d2d2d2;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
}
.confirm {
  background: #1890ff;
  border: none;
  color: #ffffff;
}
.uploBox {
  margin: 20px auto 0;
  text-align: center;
}
.exportBox {
  display: flex;
  align-items: center;
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