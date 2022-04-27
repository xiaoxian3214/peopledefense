<template>
  <div>
    <detail-header
      title="编辑"
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
            <div class="formLable"><span class="formBj">*</span>类型名称:</div>
            <div class="formBox">
              <el-input
                v-model="addform.type"
                placeholder="请输入类型名称"
                class="formInp"
                type="text"
              ></el-input>
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable"><span class="formBj">*</span>类型值:</div>
            <div class="formBox">
              <el-input
                v-model="addform.typeName"
                placeholder="请输入类型值"
                class="formInp"
                type="text"
              ></el-input>
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable"><span class="formBj">*</span>字典值:</div>
            <div class="formBox">
              <el-input
                v-model="addform.name"
                placeholder="请输入字典值"
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
            <div class="formLable"><span class="formBj">*</span>编码:</div>
            <div class="formBox">
              <el-input
                v-model="addform.coding"
                placeholder="请输入编码"
                class="formInp"
                type="text"
              ></el-input>
            </div>
          </div>
        </el-col>
        <!-- <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable"><span class="formBj">*</span>创建时间:</div>
            <div class="formBox">
              <el-input
                v-model="addform.position"
                placeholder="请输入重要经济目标名称"
                class="formInp"
                type="text"
              ></el-input>
            </div>
          </div>
        </el-col> -->
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
import { throttle } from "@/utils/tools.js";
export default {
  components: {
    detailHeader,
  },
  data() {
    return {
      isloading: false,
      addform: {
        type: "",
        typeName: "",
        name: "",
        coding: "",
      },
      id: this.$route.query.id,
      breadcrumbList: ["首页", "系统管理", "字典管理","编辑"],
    };
  },
  mounted() {
    this.dictionarydetail();
  },
  methods: {
    dictionarydetail() {
      this.$api.dictionarydetail({ id: this.id }).then((res) => {
        if (res.code == 200) {
          this.addform = res.data;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    confirm() {
      this.isloading = true;
      this.$api.dictionaryupdate(this.addform).then((res) => {
        this.isloading = false;
        if (res.code == 200) {
          this.$message({
            message: "编辑成功",
            type: "success",
          });
          setTimeout(() => {
            this.$router.push("/pages/management/dictionary/list");
          }, 1000);
        } else {
          this.$message.error(res.message);
        }
      });
    },
    cancel() {
      this.$router.push("/pages/management/dictionary/list");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>