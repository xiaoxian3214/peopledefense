<template>
  <div>
    <el-dialog title="人员替换" :visible.sync="handVasible" @close="dialogClose" width="75%" style="margin: 0 auto" class="tabDialog">
      <div class="listQuery">
        <div class="queForm teamMember">
          <div class="queFormItem" style="width: 180px">
            <div class="queLable">姓名:</div>
            <el-input v-model="paginationObj.name" class="queInp" placeholder="请输入姓名" maxlength="20"></el-input>
          </div>
          <div class="queFormItem extraordinary" style="width: 150px">
            <div class="queLable">性别:</div>
            <div class="queInp sexinput">
              <el-select v-model="paginationObj.sex" placeholder="请选择">
                <el-option v-for="item in sexList" :key="item.id" :label="item.name" :value="item.id"> </el-option>
              </el-select>
            </div>
          </div>
          <div class="queFormItem">
            <div class="queLable">政治面貌:</div>
            <div class="queInp" style="width: 170px">
              <el-select v-model="paginationObj.politicsStatus" placeholder="请选择">
                <el-option v-for="item in politicsStatusList" :key="item.id" :label="item.name" :value="item.id"> </el-option>
              </el-select>
            </div>
          </div>
          <div class="queFormItem">
            <div class="queLable">单位:</div>
            <el-input class="queInp" v-model="paginationObj.unit" placeholder="请输入" maxlength="20"></el-input>
          </div>
        </div>
        <div class="titleBtnBox">
          <el-button class="btn confirm" @click="query" type="primary">查 询</el-button>
          <el-button class="btn" @click="reset">重 置</el-button>
        </div>
      </div>
      <el-table :data="tableData" :row-style="{ height: '54px' }" :header-row-style="{ height: '54px' }" :header-cell-style="{ background: '#F5F6FA' }" :cell-style="{ padding: '0' }" ref="table" row-key="id">
        <el-table-column label="人员姓名" prop="name" :show-overflow-tooltip="true" align="center"></el-table-column>
        <el-table-column label="性别" :show-overflow-tooltip="true" align="center" prop="sexName"> </el-table-column>
        <el-table-column label="年龄" prop="age" :show-overflow-tooltip="true" align="center"></el-table-column>
        <el-table-column label="来源" prop="directorUnit" :show-overflow-tooltip="true" align="center"></el-table-column>
        <el-table-column label="专业" prop="professional" :show-overflow-tooltip="true" align="center"></el-table-column>
        <el-table-column label="单位" prop="directorUnit" :show-overflow-tooltip="true" align="center"></el-table-column>
        <el-table-column label="政治面貌" prop="politics" :show-overflow-tooltip="true" align="center"></el-table-column>
        <el-table-column label="民兵交叉" :show-overflow-tooltip="true" align="center">
          <template slot-scope="scope">
            {{ scope.row.repeatedVerification == 1 ? "是" : "否" }}
          </template>
        </el-table-column>
        <el-table-column label="操作" :show-overflow-tooltip="true" align="center">
          <template slot-scope="scope">
            <!-- class="optionBtnDel" -->
            <el-button type="text" @click="add(scope.row)">添加</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div>
        <my-pagination :paginationObj="paginationObj" @changePage="changePage" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import myPagination from "@/components/myPagination";
import { throttle, exportToExcel } from "@/utils/tools.js";
export default {
  components: {
    myPagination,
  },
  neme: "TableBox",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      politicsStatusList: [],
      sexList: [],
      tableData: [],
      paginationObj: {
        total: 10,
        page: 1,
        size: 10,
        name: "",
        sex: "",
        politicsStatus: "",
        unit: "",
      },
      handVasible: false,
    };
  },
  watch: {
    visible(newVal, oldVal) {
      this.handVasible = newVal;
      console.log(this.handVasible);
    },
  },
  mounted() {
    this.$api.ZD_ZZZH_XB().then((res) => {
      if (res.code == 200) {
        this.sexList = res.page.records;
      } else {
        this.$message.error(res.message);
      }
    });
    this.$api.ZD_ZZZH_ZZMM().then((res) => {
      if (res.code == 200) {
        this.politicsStatusList = res.page.records;
      } else {
        this.$message.error(res.message);
      }
    });
    this.handVasible = this.visible;
    this.getList();
  },
  methods: {
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
    add(data) {
      this.$router.push("/pages/membermessage/peoplemessage/add?data=" + JSON.stringify(data));
    },
    changePage(currentPage) {
      if (currentPage === this.paginationObj.page) {
        return;
      }
      this.paginationObj.page = currentPage;
      this.getList();
    },
    dialogClose() {
      this.$emit("hiden", false);
    },
    getList() {
      this.$api.playersSourceList(this.paginationObj).then((res) => {
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

<style>
</style>