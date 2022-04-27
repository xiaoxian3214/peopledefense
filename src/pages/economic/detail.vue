<template>
  <div>
    <detail-header
      title="详情"
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
    <div class="fromtableListBox detail aged">
      <el-row type="flex">
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <div class="formLable">名称:</div>
            <div class="formBox">
              {{ addform.name }}
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">行政区代码:</div>
            <div class="formBox">
              {{ addform.administrativeCode }}
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">联系人姓名:</div>
            <div class="formBox">
              {{ addform.contactName }}
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">联系人电话:</div>
            <div class="formBox">
              {{ addform.contactPhone }}
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <div class="formLable">重要经济目标地址:</div>
            <div class="formBox">
              {{ addform.address }}
            </div>
          </div>
        </el-col>

        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">经度地址:</div>
            <div class="formBox">
              {{ addform.longitude }}
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">纬度地址:</div>
            <div class="formBox">
              {{ addform.latitude }}
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <div class="formLable">重要经济目标等级:</div>
            <div class="formBox">
              {{ addform.importantEconomicTargetLevel }}
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">重要经济目标大类:</div>
            <div class="formBox">
              {{ addform.importantEconomicTargetBigType }}
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">重要经济目标中类:</div>
            <div class="formBox">
              {{ addform.importantEconomicTargetMinorType }}
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">重要经济目标小类:</div>
            <div class="formBox">
              {{ addform.importantEconomicTargetSmallType }}
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <div class="formLable">重要经济目标性质:</div>
            <div class="formBox">
              {{ addform.importantEconomicTargetQuality }}
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">防护方案编制情况:</div>
            <div class="formBox">
              {{ addform.protectionSchemePreparationStatus }}
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">系统是否接入人防指挥平台:</div>
            <div class="formBox">
              {{ addform.accessCommandPlatformStatus }}
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
              {{ addform.floorArea }}
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">防护力量支数:</div>
            <div class="formBox">
              {{ addform.protectiveTeamNum }}
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">防护力量人数:</div>
            <div class="formBox">
              {{ addform.protectivePersonNum }}
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">地下室数量:</div>
            <div class="formBox">
              {{ addform.basementNum }}
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <div class="formLable">地下室平时用途:</div>
            <div class="formBox">
              {{ addform.peacetimeUse }}
            </div>
          </div>
        </el-col>
        <el-col :span="12" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">地下室战时用途:</div>
            <div class="formBox">
              {{ addform.wartimeUse }}
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <div class="formLable">防护装备情况:</div>
            <div class="formBox">
              {{ addform.protectiveEquipmentSituation }}
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">防护物资储备情况:</div>
            <div class="formBox">
              {{ addform.protectiveMaterialsReservesSituation }}
            </div>
          </div>
        </el-col>
        <el-col :span="12" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">防护物资储备记录:</div>
            <div class="formBox">
              {{ addform.protectiveMaterialsReservesRecord }}
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <div class="formLable">人防机构:</div>
            <div class="formBox">
              {{ addform.organization }}
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">核心部位数量:</div>
            <div class="formBox">
              {{ addform.corePartNum }}
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">次生灾害影响范围:(单位m²)</div>
            <div class="formBox">
              {{ addform.disastersImpactScope }}
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">安装人防警报情况:</div>
            <div class="formBox">
              {{ addform.installDefenseAlarms }}
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="24">
          <div class="grid-content bg-purple">
            <div class="formLable">备注:</div>
            <div class="formBox">
              {{ addform.remark }}
            </div>
          </div>
        </el-col>
      </el-row>
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
      breadcrumbList: ["首页", "重要经济目标", "详情"],
      id: this.$route.query.id,
    };
  },
  mounted() {
    this.getdata();
  },
  methods: {
    //#region
    // economicdetail() {
    //   this.$api.economicdetail({ id: this.id }).then((res) => {
    //     if (res.code == 200) {
    //       this.addform = res.data;
    //     } else {
    //       this.$message.error(res.message);
    //     }
    //   });
    // },
    // // 行政区代码
    // ZD_XZQDM() {
    //   this.$api.ZD_XZQDM().then((res) => {
    //     if (res.code == 200) {
    //       this.codeofAdministrativeDivisionList = res.page.records;
    //     } else {
    //       this.$message.error(res.message);
    //     }
    //   });
    // },
    // // 重要经济目标等级
    // ZD_ZZZH_ZYJJMBDJ() {
    //   this.$api.ZD_ZZZH_ZYJJMBDJ().then((res) => {
    //     if (res.code == 200) {
    //       this.EconomicTargetLevelList = res.page.records;
    //     } else {
    //       this.$message.error(res.message);
    //     }
    //   });
    // },
    // // 重要经济目标大类
    // ZD_ZZZH_ZYJJMBDL() {
    //   this.$api.ZD_ZZZH_ZYJJMBDL().then((res) => {
    //     if (res.code == 200) {
    //       this.categoriesOfEconomiObjectivesList = res.page.records;
    //     } else {
    //       this.$message.error(res.message);
    //     }
    //   });
    // },
    // // 重要经济目标中类
    // ZD_ZZZH_ZYJJMBZL() {
    //   this.$api.ZD_ZZZH_ZYJJMBZL().then((res) => {
    //     if (res.code == 200) {
    //       this.ImportantEconomicGoalsList = res.page.records;
    //     } else {
    //       this.$message.error(res.message);
    //     }
    //   });
    // },
    // // 重要经济目标小类
    // ZD_ZZZH_ZYJJMBXL() {
    //   this.$api.ZD_ZZZH_ZYJJMBXL().then((res) => {
    //     if (res.code == 200) {
    //       this.SubcategoriesOfImportantEconomicObjectivesList =
    //         res.page.records;
    //     } else {
    //       this.$message.error(res.message);
    //     }
    //   });
    // },
    // // 重要经济目标性质
    // ZD_ZZZH_ZYJJMBXZ() {
    //   this.$api.ZD_ZZZH_ZYJJMBXZ().then((res) => {
    //     if (res.code == 200) {
    //       this.NatureOfImportantEconomicObjectivesList = res.page.records;
    //     } else {
    //       this.$message.error(res.message);
    //     }
    //   });
    // },
    // // 防护装备情况
    // ZD_ZZZH_FHZBQK() {
    //   this.$api.ZD_ZZZH_FHZBQK().then((res) => {
    //     if (res.code == 200) {
    //       this.ConditionOfProtectiveEquipmentList = res.page.records;
    //     } else {
    //       this.$message.error(res.message);
    //     }
    //   });
    // },
    // // 防护方案编制情况--数据类型
    // ZD_ZZZH_SJLX() {
    //   this.$api.ZD_ZZZH_SJLX().then((res) => {
    //     if (res.code == 200) {
    //       this.PreparationOfProtectionSchemesList = res.page.records;
    //     } else {
    //       this.$message.error(res.message);
    //     }
    //   });
    // },
    // // 防护物资储备情况
    // ZD_ZZZH_FHWZCBQK() {
    //   this.$api.ZD_ZZZH_FHWZCBQK().then((res) => {
    //     if (res.code == 200) {
    //       this.ReservesOfProtectiveMaterialsList = res.page.records;
    //     } else {
    //       this.$message.error(res.message);
    //     }
    //   });
    // },
    //#endregion
    getdata() {
      Promise.all([
        this.$api.ZD_WZ_XZQDM(),
        this.$api.ZD_ZZZH_ZYJJMBDJ(),
        this.$api.ZD_ZZZH_ZYJJMBDL(),
        this.$api.ZD_ZZZH_ZYJJMBZL(),
        this.$api.ZD_ZZZH_ZYJJMBXL(),
        this.$api.ZD_ZZZH_ZYJJMBXZ(),
        this.$api.ZD_ZZZH_FHZBQK(),
        this.$api.ZD_ZZZH_SJLX(),
        this.$api.ZD_ZZZH_FHWZCBQK(),
        this.$api.economicdetail({ id: this.id }),
      ]).then((result) => {
        this.codeofAdministrativeDivisionList = result[0].page.records;
        this.EconomicTargetLevelList = result[1].page.records;
        this.categoriesOfEconomiObjectivesList = result[2].page.records;
        this.ImportantEconomicGoalsList = result[3].page.records;
        this.SubcategoriesOfImportantEconomicObjectivesList =
          result[4].page.records;
        this.NatureOfImportantEconomicObjectivesList = result[5].page.records;
        this.ConditionOfProtectiveEquipmentList = result[6].page.records;
        this.PreparationOfProtectionSchemesList = result[7].page.records;
        this.ReservesOfProtectiveMaterialsList = result[8].page.records;
        this.addform = result[9].data;
        // 行政区代码
        this.addform.administrativeCode = this.findopthions(
          this.addform.administrativeCode,
          this.codeofAdministrativeDivisionList
        );
        // 重要经济目标等级
        this.addform.importantEconomicTargetLevel = this.findopthions(
          this.addform.importantEconomicTargetLevel,
          this.EconomicTargetLevelList
        );
        // 重要经济目标大类
        this.addform.importantEconomicTargetBigType = this.findopthions(
          this.addform.importantEconomicTargetBigType,
          this.categoriesOfEconomiObjectivesList
        );
        // 重要经济目标中类
        this.addform.importantEconomicTargetMinorType = this.findopthions(
          this.addform.importantEconomicTargetMinorType,
          this.ImportantEconomicGoalsList
        );
        // 重要经济目标小类
        this.addform.importantEconomicTargetSmallType = this.findopthions(
          this.addform.importantEconomicTargetSmallType,
          this.SubcategoriesOfImportantEconomicObjectivesList
        );
        // 重要经济目标性质
        this.addform.importantEconomicTargetQuality = this.findopthions(
          this.addform.importantEconomicTargetQuality,
          this.NatureOfImportantEconomicObjectivesList
        );
        // 防护方案编制情况
        this.addform.protectionSchemePreparationStatus = this.findopthions(
          this.addform.protectionSchemePreparationStatus,
          this.PreparationOfProtectionSchemesList
        );
        // 系统是否接入人防指挥平台
        this.addform.accessCommandPlatformStatus = this.findopthions(
          this.addform.accessCommandPlatformStatus,
          this.PreparationOfProtectionSchemesList
        );
        // 防护装备情况
        this.addform.protectiveEquipmentSituation = this.findopthions(
          this.addform.protectiveEquipmentSituation,
          this.ConditionOfProtectiveEquipmentList
        );
        // 防护物资储备情况
        this.addform.protectiveMaterialsReservesSituation = this.findopthions(
          this.addform.protectiveMaterialsReservesSituation,
          this.ReservesOfProtectiveMaterialsList
        );
      });
    },
    findopthions(dataId, list) {
      if (dataId) {
        let finddata = list.find((item) => {
          return dataId == item.id;
        });
        return finddata.name;
      }
    },
  },
};
</script>

<style lang="scss">
.aged {
  .formLable {
    font-size: 18px !important;
  }
  .formBox {
    font-size: 18px !important;
  }
}
.el-textarea {
  height: 70px;
}
</style>