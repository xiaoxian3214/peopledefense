<template>
  <div id="detail">
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
    <div class="fromtableListBox detail">
      <el-row type="flex">
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <div class="formLable">人员姓名:</div>
            <div class="formBox">{{ detaildata.name }}</div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">专业:</div>
            <div class="formBox">{{ detaildata.professional }}</div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">性别:</div>
            <div class="formBox">{{ detaildata.sexName }}</div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">年龄:</div>
            <div class="formBox">{{ detaildata.age }}</div>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <div class="formLable">专业队伍名称:</div>
            <div class="formBox">{{ detaildata.professionalTeamName }}</div>
          </div>
        </el-col>
        <el-col :span="12" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">专业队编号:</div>
            <div class="formBox">{{ detaildata.number }}</div>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <div class="formLable">联系地址:</div>
            <div class="formBox">{{ detaildata.householdRegistration }}</div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">入队时间:</div>
            <div class="formBox">{{ detaildata.intoTeamDate }}</div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">文化程度:</div>
            <div class="formBox">{{ detaildata.levelOfEducation }}</div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2"> </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <div class="formLable">政治面貌:</div>
            <div class="formBox">{{ detaildata.politics }}</div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">联系电话:</div>
            <div class="formBox">{{ detaildata.phone }}</div>
          </div>
        </el-col>
        <el-col :span="12" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">身份证号码:</div>
            <div class="formBox">{{ detaildata.idCard }}</div>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <div class="formLable">职务:</div>
            <div class="formBox">{{ detaildata.position }}</div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">主管单位:</div>
            <div class="formBox">{{ detaildata.directorUnit }}</div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable"></div>
            <div class="formBox">
              <!-- {{ detaildata.sign == 0 ? "非拓编人员" : "拓编人员" }} -->
            </div>
          </div>
        </el-col>
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
      breadcrumbList: ["首页","系统管理", "数据共享", "详情"],
      id: this.$route.query.id,
      detaildata: {
        name: "",
        professional: "",
        sex: "",
        age: "",
        professionalTeamName: "",
        number: "",
        householdRegistration: "",
        intoTeamDate: "",
        birthday: "",
        levelOfEducation: "",
        politics: "",
        phone: "",
        position: "",
        idCard: "",
        directorUnit: "",
        address: "",
        remark: "",
      },
    };
  },
  mounted() {
    this.playersdetail(this.id);
  },
  methods: {
    // 文化等级
    ZD_XLDJ() {
      this.$api.ZD_XLDJ().then((res) => {
        if (res.code == 200) {
          res.page.records.forEach((item) => {
            if ((item.id == this.detaildata.levelOfEducation)) {
              this.detaildata.levelOfEducation = item.name;
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
            if ((item.id == this.detaildata.politics)) {
              this.detaildata.politics = item.name;
            }
          });
        } else {
          this.$message.error(res.message);
        }
      });
    },
    playersdetail(id) {
      this.$api.playersdetail({ id }).then((res) => {
        if (res.code == 200) {
          this.detaildata = res.data;
          this.ZD_XLDJ();
          this.ZD_ZZZH_ZZMM();
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