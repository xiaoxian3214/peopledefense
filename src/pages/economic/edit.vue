<template>
  <div>
    <detail-header
      title="编辑经济目标"
      :breadcrumbList="breadcrumbList"
    ></detail-header>
    <div
      class="fromHeader"
      @click="
        () => {
          this.$router.back();
        }
      "
    >
      <i class="el-icon-arrow-left"></i>
      <el-button type="text" style="color: black; font-size: 20px"
        >返回</el-button
      >
    </div>
    <div class="fromtableListBox aged">
      <el-row type="flex">
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <div class="formLable"><span class="formBj">*</span>名称:</div>
            <div class="formBox">
              <el-input
                v-model="addform.name"
                placeholder="请输入经济目标名称"
                class="formInp"
                type="text"
              ></el-input>
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">行政区代码:</div>
            <div class="formBox">
              <el-select
                v-model="addform.administrativeCode"
                placeholder="请选择行政区"
                :disabled="$store.state.roleIdList.includes(2) && $store.state.roleIdList.length == 1"
              >
                <el-option
                  v-for="item in codeofAdministrativeDivisionList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">联系人姓名:</div>
            <div class="formBox">
              <el-input
                v-model="addform.contactName"
                placeholder="请输入联系人姓名"
                class="formInp"
                type="text"
              ></el-input>
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">联系人电话:</div>
            <div class="formBox">
              <el-input
                v-model="addform.contactPhone"
                oninput="value=value.replace(/[^\d-]/g,'')"
                placeholder="请输入联系人电话"
                class="formInp"
                type="text"
              ></el-input>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <div class="formLable">请输入经济目标地址:</div>
            <div class="formBox">
              <el-input
                v-model="addform.address"
                placeholder="请输入经济目标地址"
                class="formInp"
                type="text"
              ></el-input>
            </div>
          </div>
        </el-col>

        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">经度地址:</div>
            <div class="formBox">
              <el-input
               oninput="value=value.replace(/[^\d\.]/g,'')"
                v-model="addform.longitude"
                placeholder="请输入经度地址"
                class="formInp"
                type="text"
              ></el-input>
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">纬度地址:</div>
            <div class="formBox">
              <el-input
                oninput="value=value.replace(/[^\d\.]/g,'')"
                v-model="addform.latitude"
                placeholder="请输入纬度地址"
                class="formInp"
                type="text"
              ></el-input>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <div class="formLable">重要经济目标等级:</div>
            <div class="formBox">
              <el-select
                v-model="addform.importantEconomicTargetLevel"
                placeholder="选择经济目标等级"
              >
                <el-option
                  v-for="item in EconomicTargetLevelList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">重要经济目标大类:</div>
            <div class="formBox">
              <el-select
                v-model="addform.importantEconomicTargetBigType"
                placeholder="请选择大类"
              >
                <el-option
                  v-for="item in categoriesOfEconomiObjectivesList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">重要经济目标中类:</div>
            <div class="formBox">
              <el-select
                v-model="addform.importantEconomicTargetMinorType"
                placeholder="请选择大类"
              >
                <el-option
                  v-for="item in ImportantEconomicGoalsList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">重要经济目标小类:</div>
            <div class="formBox">
              <el-select
                v-model="addform.importantEconomicTargetSmallType"
                placeholder="请选择小类"
              >
                <el-option
                  v-for="item in SubcategoriesOfImportantEconomicObjectivesList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <div class="formLable">重要经济目标性质:</div>
            <div class="formBox">
              <el-select
                v-model="addform.importantEconomicTargetQuality"
                placeholder="请选择性质"
              >
                <el-option
                  v-for="item in NatureOfImportantEconomicObjectivesList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">防护方案编制情况:</div>
            <div class="formBox">
              <el-select
                v-model.number="addform.protectionSchemePreparationStatus"
                placeholder="请选择情况"
              >
                <el-option
                  v-for="item in PreparationOfProtectionSchemesList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">系统是否接入人防指挥平台:</div>
            <div class="formBox">
              <el-select
                v-model="addform.accessCommandPlatformStatus"
                placeholder="请选择平台"
              >
                <el-option
                  v-for="item in PreparationOfProtectionSchemesList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2"> </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <div class="formLable">占地面积:(单位m²)</div>
            <div class="formBox">
              <el-input
                v-model="addform.floorArea"
                placeholder="请输入占地面积"
                class="formInp"
                type="text"
              ></el-input>
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">防护力量支数:</div>
            <div class="formBox">
              <el-input
                oninput="value=value.replace(/[^\d]/g,'')"
                v-model="addform.protectiveTeamNum"
                placeholder="请输入支数"
                class="formInp"
                type="text"
              ></el-input>
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">防护力量人数:</div>
            <div class="formBox">
              <el-input
                oninput="value=value.replace(/[^\d]/g,'')"
                v-model="addform.protectivePersonNum"
                placeholder="请输入人数"
                class="formInp"
                type="text"
              ></el-input>
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">地下室数量:</div>
            <div class="formBox">
              <el-input
                v-model="addform.basementNum"
                oninput="value=value.replace(/[^\d]/g,'')"
                placeholder="请输入地下室数量"
                class="formInp"
                type="text"
              ></el-input>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <div class="formLable">地下室平时用途:</div>
            <div class="formBox">
              <el-input
                v-model="addform.peacetimeUse"
                placeholder="请输入内容"
                class="formInp"
                type="text"
              ></el-input>
            </div>
          </div>
        </el-col>
        <el-col :span="12" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">地下室战时用途:</div>
            <div class="formBox">
              <el-input
                v-model="addform.wartimeUse"
                placeholder="请输入内容"
                class="formInp"
                type="text"
              ></el-input>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <div class="formLable">防护装备情况:</div>
            <div class="formBox">
              <el-select
                v-model="addform.protectiveEquipmentSituation"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in ConditionOfProtectiveEquipmentList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">防护物资储备情况:</div>
            <div class="formBox">
              <el-select
                v-model="addform.protectiveMaterialsReservesSituation"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in ReservesOfProtectiveMaterialsList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </el-col>
        <el-col :span="12" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">防护物资储备记录:</div>
            <div class="formBox">
              <el-input
                v-model="addform.protectiveMaterialsReservesRecord"
                placeholder="请输入内容"
                class="formInp"
                type="text"
              ></el-input>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <div class="formLable">人防机构:</div>
            <div class="formBox">
              <el-input
                v-model="addform.organization"
                placeholder="请输入内容"
                class="formInp"
                type="text"
              ></el-input>
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">核心部位数量:</div>
            <div class="formBox">
              <el-input
                v-model="addform.corePartNum"
                oninput="value=value.replace(/[^\d]/g,'')"
                placeholder="请输入内容"
                class="formInp"
                type="text"
              ></el-input>
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">次生灾害影响范围:(单位m²)</div>
            <div class="formBox">
              <el-input
                oninput="value=value.replace(/[^\d-.]/g,'')"
                v-model="addform.disastersImpactScope"
                placeholder="请输入内容"
                class="formInp"
                type="text"
              ></el-input>
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">安装人防警报情况:</div>
            <div class="formBox">
              <el-input
                v-model="addform.installDefenseAlarms"
                placeholder="请输入内容"
                class="formInp"
                type="text"
              ></el-input>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="24">
          <div class="grid-content bg-purple">
            <div class="formLable">备注:</div>
            <div class="formBox">
              <el-input
                v-model="addform.remark"
                placeholder="请输入内容"
                class="formInp"
                type="textarea"
                maxlength="300"
                show-word-limit
              ></el-input>
            </div>
          </div>
        </el-col>
      </el-row>
      <div class="qd">
        <el-button class="confirm1" @click="confirm" :loading="isloading"
          >确认</el-button
        >
        <el-button class="btn1" @click="cancel">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import detailHeader from "@/components/detailHeader";
export default {
  components: {
    detailHeader,
  },
  data() {
    return {
      isloading: false,
      codeofAdministrativeDivisionList: [], //行政区代码
      EconomicTargetLevelList: [], //重要经济目标等级
      categoriesOfEconomiObjectivesList: [], //重要经济目标大类
      ImportantEconomicGoalsList: [], // 重要经济目标中类
      SubcategoriesOfImportantEconomicObjectivesList: [], //重要经济目标小类
      NatureOfImportantEconomicObjectivesList: [], //重要经济目标性质
      ConditionOfProtectiveEquipmentList: [], //防护装备情况
      ReservesOfProtectiveMaterialsList: [], //防护物资储备情况
      PreparationOfProtectionSchemesList: [], //防护方案编制情况
      addform: {
        id: "",
        name: "",
        administrativeCode: "",
        contactName: "",
        contactPhone: "",
        address: "",
        longitude: "",
        latitude: "",
        importantEconomicTargetLevel: "",
        importantEconomicTargetBigType: "",
        importantEconomicTargetMinorType: "",
        importantEconomicTargetSmallType: "",
        importantEconomicTargetQuality: "",
        protectionSchemePreparationStatus: "",
        accessCommandPlatformStatus: "",
        protectiveTeamNum: "",
        protectivePersonNum: "",
        basementNum: "",
        floorArea: "",
        peacetimeUse: "",
        wartimeUse: "",
        protectiveEquipmentSituation: "",
        protectiveMaterialsReservesSituation: "",
        protectiveMaterialsReservesRecord: "",
        installDefenseAlarms: "",
        disastersImpactScope: "",
        remark: "",
      },
      breadcrumbList: ["首页", "重要经济目标", "编辑"],
      id: this.$route.query.id,
    };
  },
  mounted() {
    this.economicdetail();
    this.ZD_WZ_XZQDM();
    this.ZD_ZZZH_ZYJJMBDJ();
    this.ZD_ZZZH_ZYJJMBDL();
    this.ZD_ZZZH_ZYJJMBZL();
    this.ZD_ZZZH_ZYJJMBXL();
    this.ZD_ZZZH_ZYJJMBXZ();
    this.ZD_ZZZH_FHZBQK();
    this.ZD_ZZZH_SJLX();
    this.ZD_ZZZH_FHWZCBQK();
  },
  methods: {
    economicdetail() {
      this.$api.economicdetail({ id: this.id }).then((res) => {
        if (res.code == 200) {
          this.addform = res.data;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    // 行政区代码
    ZD_WZ_XZQDM() {
      this.$api.ZD_WZ_XZQDM().then((res) => {
        if (res.code == 200) {
          this.codeofAdministrativeDivisionList = res.page.records;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    // 重要经济目标等级
    ZD_ZZZH_ZYJJMBDJ() {
      this.$api.ZD_ZZZH_ZYJJMBDJ().then((res) => {
        if (res.code == 200) {
          this.EconomicTargetLevelList = res.page.records;
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
    // 重要经济目标小类
    ZD_ZZZH_ZYJJMBXL() {
      this.$api.ZD_ZZZH_ZYJJMBXL().then((res) => {
        if (res.code == 200) {
          this.SubcategoriesOfImportantEconomicObjectivesList =
            res.page.records;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    // 重要经济目标性质
    ZD_ZZZH_ZYJJMBXZ() {
      this.$api.ZD_ZZZH_ZYJJMBXZ().then((res) => {
        if (res.code == 200) {
          this.NatureOfImportantEconomicObjectivesList = res.page.records;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    // 防护装备情况
    ZD_ZZZH_FHZBQK() {
      this.$api.ZD_ZZZH_FHZBQK().then((res) => {
        if (res.code == 200) {
          this.ConditionOfProtectiveEquipmentList = res.page.records;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    // 防护方案编制情况--数据类型
    ZD_ZZZH_SJLX() {
      this.$api.ZD_ZZZH_SJLX().then((res) => {
        if (res.code == 200) {
          this.PreparationOfProtectionSchemesList = res.page.records;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    // 防护物资储备情况
    ZD_ZZZH_FHWZCBQK() {
      this.$api.ZD_ZZZH_FHWZCBQK().then((res) => {
        if (res.code == 200) {
          this.ReservesOfProtectiveMaterialsList = res.page.records;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    confirm() {
      let data = this.$objValuefilter(this.addform);
      data.id = this.id;
      this.isloading = true;
      this.$api.economicupdate(data).then((res) => {
        this.isloading = false;
        if (res.code == 200) {
          this.$message({
            message: "编辑成功",
            type: "success",
          });
          // // 更新缓存
          // let flgdata = JSON.parse(sessionStorage.getItem("data"));
          // flgdata.administrativeCode = this.addform.administrativeCode;
          // sessionStorage.setItem("data", flgdata);
          setTimeout(() => {
            this.$router.push("/pages/economic/list");
          }, 1000);
        } else {
          this.$message.error(res.message);
        }
      });
    },
    cancel() {
      this.$router.push("/pages/economic/list");
    },
  },
};
</script>

<style lang="scss">
.el-textarea {
  height: 70px;
}
.aged {
  .formLable {
    font-size: 18px !important;
  }
  .el-input {
    font-size: 18px !important;
  }
}
</style>