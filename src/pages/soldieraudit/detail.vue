<template>
  <div>
    <detail-header
      title="队员详情"
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
    <div class="fromtableListBox detail">
      <el-row type="flex">
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <div class="formLable">人员姓名:</div>
            <div class="formBox">{{ addform.name }}</div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">专业:</div>
            <div class="formBox">{{ addform.professional }}</div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">性别:</div>
            <div class="formBox">{{ addform.sex }}</div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">年龄:</div>
            <div class="formBox">{{ addform.age }}</div>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <div class="formLable">专业队伍名称:</div>
            <div class="formBox">{{ addform.professionalTeamName }}</div>
          </div>
        </el-col>
        <el-col :span="12" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">专业队编号:</div>
            <div class="formBox">{{ addform.professionalTeamNumber }}</div>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex">
        <!-- <el-col :span="5">
          <div class="grid-content bg-purple">
            <div class="formLable">装备:</div>
            <div class="formBox">{{ addform.equipmentName }}</div>
          </div>
        </el-col> -->
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <div class="formLable">户籍:</div>
            <div class="formBox">{{ addform.householdRegistration }}</div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">入队时间:</div>
            <div class="formBox">{{ addform.intoTeamDate }}</div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">文化程度:</div>
            <div class="formBox">{{ addform.levelOfEducation }}</div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2"> </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <div class="formLable">政治面貌:</div>
            <div class="formBox">{{ addform.politicsStatus }}</div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">联系电话:</div>
            <div class="formBox">{{ addform.phone }}</div>
          </div>
        </el-col>
        <el-col :span="12" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">身份证号码:</div>
            <div class="formBox">{{ addform.idCard }}</div>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <div class="formLable">职务:</div>
            <div class="formBox">{{ addform.position }}</div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">主管单位:</div>
            <div class="formBox">{{ addform.directorUnit }}</div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2"> </el-col>
        <el-col :span="5" :offset="2"></el-col>
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
      educationbackgroundList: [],
      politicsStatusList: [],
      addform: {
        name: "",
        professional: "",
        sex: "",
        age: "",
        professionalTeamName: "",
        professionalTeamNumber: "",
        equipmentName: "",
        householdRegistration: "",
        intoTeamDate: "",
        levelOfEducation: "",
        politicsStatus: "",
        phone: "",
        idCard: "",
        position: "",
        directorUnit: "",
      },
      breadcrumbList: ["首页", "整组交叉审核", "队员详情"],
      id: this.$route.query.id,
    };
  },
  mounted() {
    this.soldierauditdetail();
  },
  methods: {
    soldierauditdetail() {
      this.$api.soldierauditdetail({ id: this.id }).then((res) => {
        if (res.code == 200) {
          this.addform = res.data;
          this.ZD_XLDJ();
          this.ZD_ZZZH_ZZMM();
        } else {
          this.$message.error(res.message);
        }
      });
    },
    // 学历等级
    ZD_XLDJ() {
      this.$api.ZD_XLDJ().then((res) => {
        if (res.code == 200) {
          res.page.records.forEach((item) => {
            if ((item.id == this.addform.levelOfEducation)) {
              this.addform.levelOfEducation = item.name;
            }
          });
        } else {
          this.$message.error(res.message);
        }
      });
    },
    // 政治面貌
    ZD_ZZZH_ZZMM() {
      this.$api.ZD_ZZZH_ZZMM().then((res) => {
        if (res.code == 200) {
          res.page.records.forEach((item) => {
            if ((item.id == this.addform.politicsStatus)) {
              this.addform.politicsStatus = item.name;
            }
          });
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