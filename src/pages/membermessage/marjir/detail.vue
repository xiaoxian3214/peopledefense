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
    <div class="fromtableListBox detail">
      <el-row type="flex">
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <div class="formLable">专业队名称:</div>
            <div class="formBox">{{ addform.name }}</div>
          </div>
        </el-col>
        <el-col :span="5" :offset="3">
          <div class="grid-content bg-purple">
            <div class="formLable">专业队编号:</div>
            <div class="formBox">
              {{ addform.number }}
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="3">
          <div class="grid-content bg-purple">
            <div class="formLable">人数:</div>
            <div class="formBox">{{ addform.peopleNum }}</div>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <div class="formLable">行政区域:</div>
            <div class="formBox">{{ addform.administrativeCode }}</div>
          </div>
        </el-col>
        <el-col :span="5" :offset="3">
          <!-- <div class="grid-content bg-purple">
            <div class="formLable">主管单位:</div>
            <div class="formBox">{{ addform.directorUnit }}</div>
          </div> -->
          <div class="grid-content bg-purple">
            <div class="formLable">组建单位:</div>
            <div class="formBox">{{ addform.buildUnit }}</div>
          </div>
        </el-col>
        <el-col :span="5" :offset="3">
          <div class="grid-content bg-purple">
            <div class="formLable">联络人:</div>
            <div class="formBox">{{ addform.responsiblePerson }}</div>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <div class="formLable">联络人电话:</div>
            <div class="formBox">{{ addform.responsiblePersonPhone }}</div>
          </div>
        </el-col>
        <el-col :span="5" :offset="3">
          <div class="grid-content bg-purple">
            <div class="formLable">是否为新型专业队:</div>
            <div class="formBox">{{ addform.isNewTeam ? "是" : "否" }}</div>
          </div>
        </el-col>
        <el-col :span="5" :offset="3">
          <div class="grid-content bg-purple">
            <div class="formLable">能力类型:</div>
            <div class="formBox">{{ addform.abilityType }}</div>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex">
        <!-- <el-col :span="5">
          <div class="grid-content bg-purple">
            <div class="formLable">应急联系人电话:</div>
            <div class="formBox">{{ addform.emergencyContactPersonPhone }}</div>
          </div>
        </el-col> -->

        <el-col :span="5">
          <div class="grid-content bg-purple">
            <div class="formLable">分队名称:</div>
            <div class="formBox">{{ addform.branchTeam }}</div>
          </div>
        </el-col>
        <el-col :span="5" :offset="3">
          <div class="grid-content bg-purple">
            <div class="formLable">经度:</div>
            <div class="formBox">{{ addform.longitude }}</div>
          </div>
        </el-col>
        <el-col :span="5" :offset="3">
          <div class="grid-content bg-purple">
            <div class="formLable">纬度:</div>
            <div class="formBox">{{ addform.latitude }}</div>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <div class="formLable">队伍地址:</div>
            <div class="formBox">{{ addform.address }}</div>
          </div>
        </el-col>
        <el-col :span="5" :offset="3">
          <div class="grid-content bg-purple">
            <div class="formLable">队伍描述:</div>
            <div class="formBox">{{ addform.teamDescribe }}</div>
          </div>
        </el-col>
        <el-col :span="5" :offset="3">
          <div class="grid-content bg-purple">
            <div class="formLable">值班电话:</div>
            <div class="formBox">{{ addform.dutyCalls }}</div>
          </div>
        </el-col>
        <!-- <el-col :span="5">
          <div class="grid-content bg-purple">
            <div class="formLable">组建单位:</div>
            <div class="formBox">{{ addform.buildUnit }}</div>
          </div>
        </el-col> -->
      </el-row>
      <!-- <el-row>
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <div class="formLable">值班电话:</div>
            <div class="formBox">{{ addform.dutyCalls }}</div>
          </div>
        </el-col>
      </el-row> -->
      <!--       <div class="grid-content bg-purple">
            <div class="formLable">是否为新型专业队:</div>
            <div class="formBox">
              <el-select v-model="addform.isNewTeam" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </div>
          </div> -->
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
      addform: {
        name: "",
        directorUnit: "",
        administrativeCode: "",
        abilityType: "",
        number: "",
        dutyCalls: "",
        address: "",
        longitude: "",
        latitude: "",
        peopleNum: "",
        buildUnit: "",
        responsiblePerson: "",
        responsiblePersonPhone: "",
        emergencyContactPerson: "",
        emergencyContactPersonPhone: "",
        teamDescribe: "",
      },
      breadcrumbList: ["首页", "系统管理", "专业队管理", "详情"],
      id: this.$route.query.id,
    };
  },
  mounted() {
    this.teamdetail();
  },
  methods: {
    // 专业队能力类型
    ZD_ZZZH_ZYDNLLX() {
      this.$api.ZD_ZZZH_ZYDNLLX().then((res) => {
        if (res.code == 200) {
          res.page.records.forEach((item) => {
            if (item.id == this.addform.abilityType) {
              this.addform.abilityType = item.name;
            }
          });
        } else {
          this.$message.error(res.message);
        }
      });
    },
    // 行政区别
    ZD_XZQDM() {
      this.$api.ZD_XZQDM().then((res) => {
        if (res.code == 200) {
          var tmpObj = res.page.records.find((item) => {
            return item["id"] == this.addform.administrativeCode;
          });
          this.addform.administrativeCode = tmpObj.name;
          // res.page.records.forEach((item) => {
          //   // if ((item.id = this.addform.administrativeCode)) {
          //   //   this.addform.administrativeCode = item.name;
          //   // }
          // });
        } else {
          this.$message.error(res.message);
        }
      });
    },
    teamdetail() {
      this.$api.teamdetail({ id: this.id }).then((res) => {
        if (res.code == 200) {
          this.addform = res.data;
          this.ZD_ZZZH_ZYDNLLX();
          this.ZD_XZQDM();
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