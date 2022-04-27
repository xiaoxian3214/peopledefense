<template>
  <div>
    <detail-header
      title="新增装备"
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
    <div class="fromtableListBox">
      <el-row type="flex">
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <div class="formLable"><span class="formBj">*</span>装备名称:</div>
            <div class="formBox">
              <el-input
                v-model="addform.name"
                placeholder="请输入装备名称"
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
            <div class="formLable"><span class="formBj">*</span>装备型号:</div>
            <div class="formBox">
              <el-input
                v-model="addform.model"
                placeholder="请输入装备型号"
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
            <div class="formLable"><span class="formBj">*</span>管理单位:</div>
            <div class="formBox">
              <el-input
                v-model="addform.unit"
                placeholder="请输入管理单位"
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
            <div class="formLable"><span class="formBj">*</span>主要功能:</div>
            <div class="formBox">
              <el-input
                v-model="addform.mainFunction"
                placeholder="请输入主要功能"
                class="formInp"
                type="text"
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
      addform: {
        name: "",
        model: "",
        unit: "",
        mainFunction: "",
      },
      breadcrumbList: ["首页", "队员信息", "装备管理", "新增装备"],
    };
  },
  mounted() {},
  methods: {
    confirm() {
      if (!this.addform.name) {
        this.$message({
          message: "装备名称不能为空",
          type: "warning",
        });
        return;
      }
      if (!this.addform.model) {
        this.$message({
          message: "装备型号不能为空",
          type: "warning",
        });
        return;
      }
      if (!this.addform.unit) {
        this.$message({
          message: "装备单位不能为空",
          type: "warning",
        });
        return;
      }
      if (!this.addform.mainFunction) {
        this.$message({
          message: "主要功能不能为空",
          type: "warning",
        });
        return;
      }
      let data = this.$objValuefilter(this.addform);
      this.isloading = true;
      this.$api.equipmentadd(data).then((res) => {
        this.isloading = false;
        if (res.code == 200) {
          this.$message({
            message: "新增成功",
            type: "success",
          });
          setTimeout(() => {
            this.$router.push("/pages/membermessage/equipmentManagement/list");
          }, 1000);
        } else {
          this.$message.error(res.message);
        }
      });
    },
    cancel() {
      this.$router.push("/pages/membermessage/equipmentManagement/list");
    },
  },
};
</script>

<style>
</style>