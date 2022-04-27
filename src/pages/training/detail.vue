<template>
  <div>
    <detail-header
      title="详情"
      :breadcrumbList="breadcrumbList"
    ></detail-header>
    <!-- 面包屑 -->
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
        <el-col :span="6"><div class="bg-purple">科目名称：</div></el-col>
      </el-row>
      <el-row :gutter="20" class="content-left" style="padding-bottom: 20px">
        <el-col :span="6">
          <div class="bg-purple">
            {{ addform.name }}
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="content-left" style="padding-top: 10px">
        <el-col :span="6"><div class="bg-purple">科目内容：</div></el-col>
      </el-row>
      <el-row :gutter="20" class="content-left" style="padding-bottom: 20px">
        <el-col :span="6"
          ><div class="bg-purple">
            {{ addform.content }}
          </div></el-col
        >
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
      isloading: false,
      addform: {
        content: "",
        name: "",
      },
      breadcrumbList: ["首页", "系统管理","训练项目", "详情"],
      id: this.$route.query.id,
    };
  },
  mounted() {
    this.trainingSubjectsdetail();
  },
  methods: {
    back() {
      this.$router.back();
    },
    trainingSubjectsdetail() {
      this.$api.trainingSubjectsdetail({ id: this.id }).then((res) => {
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