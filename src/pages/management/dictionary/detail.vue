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
            <div class="formLable">类型名称:</div>
            <div class="formBox">
              {{ addform.type }}
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">类型值:</div>
            <div class="formBox">
              {{ addform.typeName }}
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">字典值:</div>
            <div class="formBox">
              {{ addform.name }}
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <div class="formLable">编码:</div>
            <div class="formBox">
              {{ addform.coding }}
            </div>
          </div>
        </el-col>
        <!-- <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">创建时间:</div>
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
      addform: {
        type: "",
        typeName: "",
        name: "",
        coding: "",
      },
      id: this.$route.query.id,
      breadcrumbList: ["首页", "系统管理", "字典管理", "详情"],
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
  },
};
</script>

<style lang="scss" scoped>
</style>