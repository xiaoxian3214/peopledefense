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
            <div class="formLable">装备名称:</div>
            <div class="formBox">
              {{ addform.name }}
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <div class="formLable">装备型号:</div>
            <div class="formBox">
              {{ addform.model }}
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <div class="formLable">管理单位:</div>
            <div class="formBox">
              {{ addform.unit }}
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <div class="formLable">主要功能:</div>
            <div class="formBox">
              {{ addform.mainFunction }}
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
      addform: {
        name: "",
        model: "",
        unit: "",
        mainFunction: "",
      },
      breadcrumbList: ["首页", "队员信息", "装备管理", "详情"],
      id: this.$route.query.id,
    };
  },
  mounted() {
    this.equipmentdetail();
  },
  methods: {
    equipmentdetail() {
      this.$api.equipmentdetail({ id: this.id }).then((res) => {
        if (res.code == 200) {
          this.addform = res.data;
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