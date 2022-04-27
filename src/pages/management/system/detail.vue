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
            <div class="formLable">角色名称:</div>
            <div class="formBox">
              {{ addform.name }}
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">权限:</div>
            <div class="formBox">
              <el-tree
                :data="jurisdictionList"
                :props="defaultProps"
                node-key="permissionsId"
                ref="tree"
                aria-readonly
                :default-expanded-keys="defaultkes"
                :default-checked-keys="defaultkes"
                show-checkbox
              ></el-tree>
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
export default {
  components: {
    detailHeader,
  },
  data() {
    return {
      isloading: false,
      defaultProps: {
        children: "secondList",
        label: "permissionsName",
      },
      dialogVisible: false,
      addform: {
        name: "",
        permissions: "",
      },
      jurisdictionList: [],
      teamname: "",
      time: "",
      breadcrumbList: ["首页", "系统管理", "角色管理", "详情"],
      value: "",
      options: [],
      defaultkes: [],
      controLdefaultkes: [],
      id: this.$route.query.id,
    };
  },
  mounted() {
    this.addform.name = this.$route.query.name;
    this.rolegetPermissions();
  },
  methods: {
    // 获取所有角色权限
    rolegetPermissions() {
      this.$api.rolegetPermissions({ id: this.id }).then((res) => {
        if (res.code == 200) {
          this.jurisdictionList = res.data.permissionsList;
          this.jurisdictionList.forEach((item) => {
            if (item.possess) {
              this.defaultkes.push(item.permissionsId);
            }
            if (item.secondList.length) {
              item.secondList.forEach((item2) => {
                if (item2.possess == 1) {
                  this.defaultkes.push(item2.permissionsId);
                }
              });
            }
          });
          this.controLdefaultkes = this.defaultkes;
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
  margin-top: 25%;
  padding-bottom: 80px;
  // left : 0px ;
}
.disInp {
  .el-dialog {
    width: 610px;
    height: 600px;
    position: relative;
  }
  .el-dialog__header {
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #000000;
    height: 56px;
    box-sizing: border-box;
    border-bottom: 1px solid #eeeeee;
  }
  .el-dialog__body {
    padding: 0;
    margin: 0;
    height: 495px;
    overflow-y: auto;
    box-sizing: border-box;
    padding: 24px 72px 24px 24px;
  }
  .el-dialog__footer {
    z-index: 999;
    width: 100%;
    position: absolute;
    height: 56px;
    box-sizing: border-box;
    bottom: 0;
    left: 0;
    background-color: #fff;
    border-top: 1px solid#EEEEEE;
  }
}
</style>