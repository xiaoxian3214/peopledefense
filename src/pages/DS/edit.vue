<template>
  <div>
    <detail-header
      title="数据共享"
      :breadcrumbList="breadcrumbList"
    ></detail-header>
    <!-- 面包屑 -->
    <div class="top-title">
      <div class="top-left-title">
        <i class="el-icon-arrow-left" @click="back" style="cursor: pointer"></i>
        <span class="top-ttitle-font">返回</span>
      </div>
    </div>
    <!-- 内容 -->
    <div class="content">
      <el-row :gutter="20" class="content-left" style="padding-top: 20px">
        <el-col :span="6"
          ><div class="bg-purple">
            <span class="content-zd">*</span>人员姓名：
          </div></el-col
        >
        <el-col :span="6"
          ><div class="bg-purple">
            <span class="content-zd">*</span>专业：
          </div></el-col
        >
        <el-col :span="6"
          ><div class="bg-purple">
            <span class="content-zd">*</span>性别：
          </div></el-col
        >
        <el-col :span="6"
          ><div class="bg-purple">
            <span class="content-zd">*</span>年龄：
          </div></el-col
        >
      </el-row>
      <el-row :gutter="20" class="content-left">
        <el-col :span="6"
          ><div class="bg-purple">
            <el-input
              v-model="teamname"
              style="width: 240px"
              placeholder="请输入人员姓名"
              maxlength="20"
            ></el-input></div
        ></el-col>
        <el-col :span="6"
          ><div class="bg-purple">
            <el-input
              v-model="time"
              style="width: 240px"
              placeholder="请输入专业"
            ></el-input></div
        ></el-col>
        <el-col :span="6"
          ><div class="bg-purple">
            <el-input
              v-model="time"
              style="width: 240px"
              placeholder="请选择性别"
            ></el-input></div
        ></el-col>
        <el-col :span="6"
          ><div class="bg-purple">
            <el-input
              v-model="time"
              style="width: 240px"
              placeholder="请输入年龄"
            ></el-input></div
        ></el-col>
      </el-row>
      <el-row :gutter="20" class="content-left" style="padding-top: 10px">
        <el-col :span="6"><div class="bg-purple"> <span class="content-zd">*</span>专业队伍名称：</div>
        </el-col>
        <el-col :span="6"><div class="bg-purple"> <span class="content-zd">*</span>专业队编号：</div>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="content-left">
        <el-col :span="6"
          ><div class="bg-purple">
            <el-input
              v-model="teamname"
              style="width: 240px"
              placeholder="请输入专业队伍名称"
              maxlength="20"
            ></el-input></div
        ></el-col>
        <el-col :span="8"
          ><div class="bg-purple">
            <el-input
              v-model="teamname"
              style="width: 240px"
              placeholder="请输入专业队编号"
              maxlength="20"
            ></el-input></div
        ></el-col>
      </el-row>
      <el-row :gutter="20" class="content-left" style="padding-top: 10px">
        <el-col :span="6"><div class="bg-purple"> <span class="content-zd">*</span>装备：</div>
        </el-col>
        <el-col :span="6"><div class="bg-purple"> <span class="content-zd">*</span>户籍：</div>
        </el-col>
        <el-col :span="6"><div class="bg-purple"> <span class="content-zd">*</span>入队时间：</div>
        </el-col>
        <el-col :span="6"><div class="bg-purple"> <span class="content-zd">*</span>文化程度：</div>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="content-left" style="padding-bottom: 10px">
        <el-col :span="6"
          ><div class="bg-purple">
            <el-input
              v-model="teamname"
              style="width: 240px"
              placeholder="请输入装备"
              maxlength="20"
            ></el-input></div
        ></el-col>
        <el-col :span="6"
          ><div class="bg-purple">
            <el-input
              v-model="teamname"
              style="width: 240px"
              placeholder="请输入户籍"
              maxlength="20"
            ></el-input></div
        ></el-col>
        <el-col :span="6"
          ><div class="bg-purple">
            <el-input
              v-model="teamname"
              style="width: 240px"
              placeholder="请输入入队时间"
              maxlength="20"
            ></el-input></div
        ></el-col>
        <el-col :span="6"
          ><div class="bg-purple">
            <el-input
              v-model="teamname"
              style="width: 240px"
              placeholder="请输入文化程度"
              maxlength="20"
            ></el-input></div
        ></el-col>
      </el-row>
      <el-row :gutter="20" class="content-left" style="padding-top: 10px">
        <el-col :span="6"><div class="bg-purple"> <span class="content-zd">*</span>政治面貌：</div>
        </el-col>
        <el-col :span="6"><div class="bg-purple"> <span class="content-zd">*</span>联系电话：</div>
        </el-col>
        <el-col :span="6"><div class="bg-purple"> <span class="content-zd">*</span>身份证号码：</div>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="content-left" style="padding-bottom: 10px">
        <el-col :span="6"
          ><div class="bg-purple">
            <el-input
              v-model="teamname"
              style="width: 240px"
              placeholder="请输入政治面貌"
              maxlength="20"
            ></el-input></div
        ></el-col>
        <el-col :span="6"
          ><div class="bg-purple">
            <el-input
              v-model="teamname"
              style="width: 240px"
              placeholder="请输入联系电话"
              maxlength="20"
            ></el-input></div
        ></el-col>
        <el-col :span="6"
          ><div class="bg-purple">
            <el-input
              v-model="teamname"
              style="width: 240px"
              placeholder="请输入身份号码"
              maxlength="20"
            ></el-input></div
        ></el-col>
      </el-row>
      <el-row :gutter="20" class="content-left" style="padding-top: 10px">
        <el-col :span="6"><div class="bg-purple"> <span class="content-zd">*</span>职务：</div>
        </el-col>
        <el-col :span="6"><div class="bg-purple"> <span class="content-zd">*</span>主管单位：</div>
        </el-col>
        <el-col :span="6"><div class="bg-purple"> <span class="content-zd">*</span>数据来源：</div>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="content-left" style="padding-bottom: 10px">
        <el-col :span="6"
          ><div class="bg-purple">
            <el-input
              v-model="teamname"
              style="width: 240px"
              placeholder="请输入职务"
              maxlength="20"
            ></el-input></div
        ></el-col>
        <el-col :span="6"
          ><div class="bg-purple">
            <el-input
              v-model="teamname"
              style="width: 240px"
              placeholder="请输入主管单位"
              maxlength="20"
            ></el-input></div
        ></el-col>
        <el-col :span="6"
          ><div class="bg-purple">
            <el-input
              v-model="teamname"
              style="width: 240px"
              placeholder="请输入数据来源"
              maxlength="20"
            ></el-input></div
        ></el-col>
      </el-row>
      <div class="qd">
        <el-button type="primary" class="confirm1">确认</el-button>
        <el-button class="btn1">取消</el-button>
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
      teamname: "",
      time: "",
      breadcrumbList: ["首页", "数据共享"],
      value: "",
      options: [],
    };
  },
  mounted() {},
  methods: {
    back() {
      this.$router.back();
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
//   margin-top: 25%;
  padding-bottom: 80px;
  // left : 0px ;
}
</style>