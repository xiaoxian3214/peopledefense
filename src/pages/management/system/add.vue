<template>
  <div>
    <detail-header
      title="新增角色"
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
            <div class="formLable"><span class="formBj">*</span>角色名称:</div>
            <div class="formBox">
              <el-input
                v-model="addform.name"
                placeholder="请输入角色名称"
                class="formInp"
                type="text"
              ></el-input>
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable"><span class="formBj">*</span>权限:</div>
            <div class="formBox">
              <el-button type="text" @click="opendialog">选择权限</el-button>
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
    <el-dialog
      class="disInp"
      title="修改系统权限"
      :visible.sync="dialogVisible"
      :before-close="dialoGcancel"
    >
      <el-tree
        :data="jurisdictionList"
        :props="defaultProps"
        node-key="permissionsId"
        ref="tree"
        :default-expanded-keys="defaultkes"
        :default-checked-keys="defaultkes"
        show-checkbox
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button class="btn" @click="dialoGcancel">取 消</el-button>
        <el-button class="btn confirm" type="primary" @click="getCheckedKeys"
          >确 定</el-button
        >
      </span>
    </el-dialog>
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
      breadcrumbList: ["首页", "系统管理", "角色管理", "新增角色"],
      value: "",
      options: [],
      defaultkes: [],
      controLdefaultkes: [],
    };
  },
  mounted() {
    this.rolegetPermissions();
  },
  methods: {
    dialoGcancel() {
      this.dialogVisible = false;
      this.$refs.tree.setCheckedKeys(this.controLdefaultkes);
    },
    opendialog() {
      this.dialogVisible = true;
    },
    // 获取所有角色权限
    rolegetPermissions() {
      this.$api.rolegetPermissions({ id: "" }).then((res) => {
        if (res.code == 200) {
          this.jurisdictionList = res.data.permissionsList;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    getCheckedKeys() {
      let handList = [];
      let checkedIdList = this.$refs.tree
        .getCheckedKeys()
        .concat(this.$refs.tree.getHalfCheckedKeys());

      this.jurisdictionList.forEach((item) => {
        // 存在一级权限
        if (checkedIdList.indexOf(item.permissionsId) != -1) {
          handList.unshift({ firstId: item.permissionsId, second: [] });
          // 存在二级权限
          item.secondList.forEach((item2) => {
            if (checkedIdList.indexOf(item2.permissionsId) != -1) {
              handList[0].second.unshift({ secondId: item2.permissionsId });
            }
          });
        }
      });
      this.addform.permissions = JSON.stringify(handList);
      // 获取全选节点，确认使用空桶进行赋值
      this.controLdefaultkes = this.$refs.tree.getCheckedKeys();
      this.$refs.tree.setCheckedKeys(this.controLdefaultkes);
      this.dialogVisible = false;
    },

    confirm() {
      if (!this.addform.permissions || this.addform.permissions == "[]") {
        this.$message.error("请选择权限");
        return;
      }
      this.isloading = true;
      this.$api.roleadd(this.addform).then((res) => {
        this.isloading = false;
        if (res.code == 200) {
          this.$message({
            message: "新增成功",
            type: "success",
          });
          setTimeout(() => {
            this.$router.push("/pages/management/system/list");
          }, 1000);
        } else {
          this.$message.error(res.message);
        }
      });
    },
    cancel() {
      this.$router.push("/pages/management/system/list");
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