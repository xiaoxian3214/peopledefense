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
    <div class="fromtableListBox">
      <el-row type="flex">
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <div class="formLable">姓名:</div>
            <div class="formBox">
              {{ addform.name }}
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">账号:</div>
            <div class="formBox">
              {{ addform.account }}
            </div>
          </div>
        </el-col>
        <!-- <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">密码:</div>
            <div class="formBox">
              {{ addform.password }}
            </div>
          </div>
        </el-col> -->
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">角色:</div>
            <div class="formBox">
              {{ addform.roleList.map(item=>item.name).join(',')}}
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <div class="formLable">单位/职务:</div>
            <div class="formBox">
              {{ addform.position }}
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">手机号码:</div>
            <div class="formBox">
              {{ addform.phone }}
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">行政区域:</div>
            <div class="formBox">
              {{ this.addform.administrativeCode }}
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import detailHeader from "@/components/detailHeader";
import { throttle } from "@/utils/tools.js";
import { log } from "pili-rtc-web";
export default {
  components: {
    detailHeader,
  },
  inject: ["app"],
  data() {
    return {
      isloading: false,
      addform: {
        name: "",
        account: "",
        password: "",
        position: "",
        roleList:[]
      },
      administrativeList: [],
      breadcrumbList: ["首页", "系统管理", "账号管理", "详情"],
      id: this.$route.query.id,
    };
  },
  mounted() {
    this.userdetail();
  },
  methods: {
    userdetail() {
      this.$api.userdetail({ id: this.id }).then((res) => {
        if (res.code == 200) {
          this.addform = res.data;
          // this.rolegetRoleList();
          this.getAdministrativeList();
        } else {
          this.$message.error(res.message);
        }
      });
    },
    // 获取行政区
    getAdministrativeList() {
      this.$api.ZD_XZQDM().then((res) => {
        if (res.code == 200) {
          this.administrativeList = res.page.records;
          let result = this.administrativeList.find(
            (item) => item.id == this.addform.administrativeCode
          );
          this.addform.administrativeCode = result.name;
          this.$forceUpdate();
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>