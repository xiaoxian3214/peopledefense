<template>
  <div>
    <detail-header
      title="新增组织"
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
        <el-col :span="10">
          <div class="grid-content bg-purple">
            <div class="formLable"><span class="formBj">*</span>组织名称:</div>
            <div class="formBox">
              <el-input
                v-model="addform.name"
                placeholder="请输入组织名称"
                class="formInp"
                type="text"
              ></el-input>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="10">
          <div class="grid-content bg-purple">
            <div class="formLable">联络员:</div>
            <div class="formBox">
              <el-select v-model="addform.liaison" placeholder="请选择">
                <el-option
                  v-for="item in liaisonManList"
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
        <el-col :span="10">
          <div class="grid-content bg-purple">
            <div class="formLable">电话:</div>
            <div class="formBox">
              <el-input
                v-model="addform.phone"
                oninput="value=value.replace(/[^\d-]/g,'')"
                maxlength="12"
                placeholder="请输入联系电话"
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
        level: 1,
        liaison: "",
        phone: "",
      },
      breadcrumbList: ["首页", "系统管理", "组织架构", "新增组织"],
      liaisonManList: [],
    };
  },
  mounted() {
    this.userliaison();
  },
  methods: {
    userliaison() {
      this.$api.userliaison().then((res) => {
        if (res.code == 200) {
          this.liaisonManList = res.data;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    confirm() {
      let data = this.$objValuefilter(this.addform);
      this.isloading = true;
      this.$api.organizationalStructureadd(data).then((res) => {
        this.isloading = false;
        if (res.code == 200) {
          this.$message({
            message: "新增成功",
            type: "success",
          });
          setTimeout(() => {
            this.$router.push("/pages/organizationalStructure/list");
          }, 1000);
        } else {
          this.$message.error(res.message);
        }
      });
    },
    cancel() {
      this.$router.push("/pages/organizationalStructure/list");
    },
  },
};
</script>

<style>
</style>