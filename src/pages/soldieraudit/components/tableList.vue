<template>
  <div class="table-box">
    <el-table
      :data="tableData"
      :row-style="{ height: '54px' }"
      :header-row-style="{ height: '54px' }"
      :header-cell-style="{ background: '#F5F6FA' }"
      :cell-style="{ padding: '0' }"
      ref="table"
      @selection-change="handleSelectionChange"
      v-loading="loading"
    >
      <el-table-column
        label-class-name="DisabledSelection"
        type="selection"
        width="60"
      ></el-table-column>
      <el-table-column
        label="人员姓名"
        prop="personName"
        :show-overflow-tooltip="true"
        align="center"
      ></el-table-column>
      <el-table-column
        label="性别"
        :show-overflow-tooltip="true"
        align="center"
        prop="sex"
      ></el-table-column>
      <el-table-column
        label="年龄"
        prop="age"
        :show-overflow-tooltip="true"
        align="center"
      ></el-table-column>
      <el-table-column
        label="专业队伍名称"
        prop="professionalTeamName"
        :show-overflow-tooltip="true"
        align="center"
      ></el-table-column>
      <el-table-column
        label="专业"
        prop="professional"
        :show-overflow-tooltip="true"
        align="center"
      ></el-table-column>
      <el-table-column
        label="是否替换"
        prop="professional"
        :show-overflow-tooltip="true"
        align="center"
        ><template slot-scope="scope">{{
          scope.row.isReplce == 1 ? "是" : "否"
        }}</template></el-table-column
      >
      <el-table-column
        label="是否通知"
        prop="professional"
        :show-overflow-tooltip="true"
        align="center"
        ><template slot-scope="scope"
          >{{ scope.row.isInform == 1 ? "是" : "否" }}
        </template></el-table-column
      >
      <el-table-column
        label="替换队员"
        prop="professional"
        :show-overflow-tooltip="true"
        v-if="$store.state.ifBut"
        align="center"
        ><template slot-scope="scope">
          <el-button
            type="text"
            class="optionBtn"
            @click="replacedetail(scope.row)"
            >{{ scope.row.isTeammember }}</el-button
          >
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        :show-overflow-tooltip="true"
        align="center"
        width="210"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            class="optionBtnDel"
            @click="delet(scope.row)"
            v-if="
              iSdelate != 4 && $store.state.ifBut &&  !($store.state.roleIdList.includes(4) &&  $store.state.roleIdList.length == 1)
            "
            >删除</el-button
          >
          <el-divider
            direction="vertical"
            v-if="
              iSdelate != 4 && $store.state.ifBut &&  !($store.state.roleIdList.includes(4) &&  $store.state.roleIdList.length == 1)
            "
          ></el-divider>
          <el-button
            type="text"
            class="optionBtn"
            @click="grant(scope.row)"
            v-if="$store.state.ifBut"
            >替换</el-button
          >
          <el-divider
            direction="vertical"
            v-if="$store.state.ifBut"
          ></el-divider>
          <el-button type="text" class="optionBtn" @click="detail(scope.row)"
            >详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹窗1 -->
    <el-dialog title="替换" :visible.sync="diaTab1" width="30%">
      <div>
        <el-row class="exportBox">
          <el-col :span="4">替换类型: </el-col>
          <!-- :offset="1" -->
          <el-col :span="20">
            <el-radio-group v-model="exportRadio">
              <el-radio :label="0">后备兵员库</el-radio>
              <el-radio :label="1">手动</el-radio>
            </el-radio-group>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="diaTab1 = false" class="popBut">取 消</el-button>
        <el-button type="primary" @click="diaCon1" class="popBut popButCol"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 弹窗2 -->
    <el-dialog
      title="人员替换"
      :visible.sync="diaTab2"
      width="75%"
      style="margin: 0 auto"
      class="tabDialog"
    >
      <div class="listQuery">
        <div class="queForm teamMember">
          <div class="queFormItem" style="width: 180px">
            <div class="queLable">姓名:</div>
            <el-input
              v-model="paginationObj.name"
              class="queInp"
              placeholder="请输入姓名"
              maxlength="20"
            ></el-input>
          </div>
          <div class="queFormItem extraordinary" style="width: 150px">
            <div class="queLable">性别:</div>
            <div class="queInp sexinput">
              <el-select v-model="paginationObj.sex" placeholder="请选择">
                <el-option
                  v-for="item in sexList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="queFormItem">
            <div class="queLable">政治面貌:</div>
            <div class="queInp" style="width: 170px">
              <el-select
                v-model="paginationObj.politicsStatus"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in politicsStatusList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="queFormItem">
            <div class="queLable">单位:</div>
            <el-input
              class="queInp"
              v-model="paginationObj.unit"
              placeholder="请输入"
              maxlength="20"
            ></el-input>
          </div>
        </div>
        <div class="titleBtnBox">
          <el-button class="btn confirm" @click="query" type="primary"
            >查 询</el-button
          >
          <el-button class="btn" @click="reset">重 置</el-button>
        </div>
      </div>
      <el-table
        :data="tableData1"
        :row-style="{ height: '54px' }"
        :header-row-style="{ height: '54px' }"
        :header-cell-style="{ background: '#F5F6FA' }"
        :cell-style="{ padding: '0' }"
        ref="table"
        row-key="id"
        v-loading="loading1"
      >
        <el-table-column
          label="人员姓名"
          prop="name"
          :show-overflow-tooltip="true"
          align="center"
        ></el-table-column>
        <el-table-column
          label="性别"
          :show-overflow-tooltip="true"
          align="center"
          prop="sexName"
        >
        </el-table-column>
        <el-table-column
          label="年龄"
          prop="age"
          :show-overflow-tooltip="true"
          align="center"
        ></el-table-column>
        <el-table-column
          label="来源"
          prop="directorUnit"
          :show-overflow-tooltip="true"
          align="center"
        ></el-table-column>
        <el-table-column
          label="专业"
          prop="professional"
          :show-overflow-tooltip="true"
          align="center"
        ></el-table-column>
        <el-table-column
          label="单位"
          prop="directorUnit"
          :show-overflow-tooltip="true"
          align="center"
        ></el-table-column>
        <el-table-column
          label="政治面貌"
          prop="politics"
          :show-overflow-tooltip="true"
          align="center"
        ></el-table-column>
        <el-table-column
          label="民兵交叉"
          :show-overflow-tooltip="true"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.repeatedVerification == 1 ? "是" : "否" }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          :show-overflow-tooltip="true"
          align="center"
        >
          <template slot-scope="scope">
            <!-- class="optionBtnDel" -->
            <el-button type="text" @click="replace(scope.row)">替换</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div>
        <my-pagination
          :paginationObj="paginationObj"
          @changePage="changePage"
        />
      </div>
    </el-dialog>
    <!-- <div slot="footer" class="dialog-footer">
        <el-button @click="diaTab2 = false" class="popBut">取 消</el-button>
        <el-button type="primary" @click="diaCon2" class="popBut popButCol"
          >确 定</el-button
        >
      </div> -->
  </div>
</template>
<script>
import myPagination from "@/components/myPagination";
import { throttle, exportToExcel } from "@/utils/tools.js";
export default {
  components: {
    myPagination,
  },
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      tableData1: [],
      politicsStatusList: [],
      sexList: [],
      exportRadio: "",
      paginationObj: {
        total: 10,
        page: 1,
        size: 10,
        name: "",
        sex: "",
        politicsStatus: "",
        unit: "",
      },
      input: "",
      listPop: [],
      diaTab1: false,
      diaTab2: false,
      iSdelate: false,
      exportselectedList: [],
      valData: {},
      loading1: false,
    };
  },
  mounted() {
    this.iSdelate = JSON.parse(sessionStorage.getItem("data")).id;
    this.ZD_ZZZH_ZZMM();
    this.ZD_ZZZH_XB();
  },
  methods: {
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
    query: throttle(function () {
      this.paginationObj.page = 1;
      this.getList();
    }),
    reset: throttle(function () {
      this.paginationObj.name = "";
      this.paginationObj.sex = "";
      this.paginationObj.politicsStatus = "";
      this.paginationObj.unit = "";
      this.paginationObj.page = 1;
      this.getList();
    }),
    replace(e) {
      this.loading1 = true;
      this.$api
        .soldierauditreplace({ teamMenId: e.id, type: 1, id: this.valData.id })
        .then((res) => {
          this.loading1 = false;
          if (res.code == 200) {
            this.$message({
              message: "替换成功",
              type: "success",
            });
            this.diaTab1 = false;
            this.diaTab2 = false;
            this.$emit("update");
          } else {
            this.$message.error(res.message);
          }
        });
    },
    handleSelectionChange(value) {
      this.exportselectedList = value;
    },
    delet(val) {
      this.$emit("delet", val.id);
    },
    grant(val) {
      this.diaTab1 = true;
      this.valData = val;
    },
    diaCon1() {
      if (this.exportRadio === "") {
        this.$message.error("请选择替换方式！");
        return;
      }
      if (this.exportRadio == 0) {
        this.diaTab2 = true;
        this.getList();
      } else if (this.exportRadio == 1) {
        this.$router.push("/pages/soldieraudit/edit?id=" + this.valData.id);
      }
    },
    detail(val) {
      this.$router.push("/pages/soldieraudit/detail?id=" + val.id);
    },
    changePage(currentPage) {
      if (currentPage === this.paginationObj.page) {
        return;
      }
      this.paginationObj.page = currentPage;
      this.getList();
    },
    getList() {
      this.$api.playersSourceList(this.paginationObj).then((res) => {
        if (res.code == 200) {
          this.tableData1 = res.page.records;
          this.paginationObj.size = res.page.size;
          this.paginationObj.total = res.page.total;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    replacedetail(val) {
      this.$router.push(
        "/pages/membermessage/peoplemessage/detail?id=" + val.isTeammemberId
      );
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep {
  .tabDialog {
    .el-dialog {
      margin-top: 2vh !important;
    }
  }
  .el-table .DisabledSelection .cell .el-checkbox__inner {
    margin-left: 25px;
    position: relative;
  }
  .el-table .DisabledSelection .cell:after {
    content: "全选";
    position: absolute;
    left: 0px;
  }
}
.exportBox {
  display: flex;
  align-items: center;
}
.table-box {
  .el-tooltip {
    width: 202px;
  }
  background: #fff;
  box-sizing: border-box;
  .img {
    width: 28px;
    height: 28px;
    border-radius: 14px;
    object-fit: cover;
  }
  .optionBtn {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    color: #1890ff;
  }
  .optionBtnDel {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    color: #f53131;
  }
}
.btn {
  width: 65px;
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
.btn.confirm {
  background: #1890ff;
  border: 1px solid #1890ff;
  // border: none;
  color: #ffffff;
  margin-left: 8px;
}
</style>