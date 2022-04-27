<template>
  <div>
    <detail-header
      title="新增科目"
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
    <!-- 内容 -->
    <div class="content">
      <el-row :gutter="20" class="content-left" style="padding-top: 50px">
        <el-col :span="6">
          <div class="bg-purple">
            <span class="formBj" style="color: red">*</span>科目名称：
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="content-left" style="padding-bottom: 20px">
        <el-col :span="6"
          ><div class="bg-purple">
            <el-input
              v-model="addform.name"
              style="width: 240px"
              placeholder="请输入科目名称"
              maxlength="20"
            ></el-input></div
        ></el-col>
      </el-row>
      <el-row :gutter="20" class="content-left" style="padding-top: 10px">
        <el-col :span="6"
          ><div class="bg-purple">
            <span class="formBj" style="color: red">*</span>科目内容：
          </div></el-col
        >
      </el-row>
      <el-row :gutter="20" class="content-left" style="padding-bottom: 20px">
        <el-col :span="18">
          <el-input
            type="textarea"
            v-model="addform.content"
            placeholder="请输入科目内容"
            style="width: 100%; font-size: 18px; height: 200px"
          ></el-input>
        </el-col>
        <!-- maxlength="200" -->
      </el-row>
      <div class="qd">
        <el-button
          type="primary"
          class="confirm1"
          @click="confirm"
          :loading="isloading"
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
        content: "",
        name: "",
      },
      breadcrumbList: ["首页", "系统管理", "训练科目", "新增科目"],
    };
  },
  mounted() {},
  methods: {
    back() {
      this.$router.back();
    },
    confirm() {
      let data = this.$objValuefilter(this.addform);
      this.isloading = true;
      this.$api.trainingSubjectsadd(data).then((res) => {
        this.isloading = false;
        if (res.code == 200) {
          this.$message({
            message: "新增成功",
            type: "success",
          });
          setTimeout(() => {
            this.$router.push("/pages/training/list");
          }, 1000);
        } else {
          this.$message.error(res.message);
        }
      });
    },
    cancel() {
      this.$router.push("/pages/training/list");
    },
  },
};
</script>

<style lang="scss" scoped>
.top-title {
  background-color: #ffffff;
  width: 100%;
  height: 50px;
  .top-left-title {
    float: left;
    margin-left: 15px;
    align-items: center;
    height: 50px;
    display: flex;
    .top-ttitle-font {
      font-weight: 550;
      color: #333333;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
    }
  }
}
.content {
  background-color: #ffffff;
  width: 100%;
  margin-top: 20px;
  .content-left {
    padding-left: 135px;
    margin-bottom: 30px;
  }
  .content-zd {
    color: red;
  }
  .bg-purple {
    float: left;
  }
}
.qd {
  // position : absolute ;
  bottom: 80px;
  margin-top: 10%;
  padding-bottom: 80px;
  // left : 0px ;
}
</style>