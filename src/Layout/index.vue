<template>
  <div class="page">
    <el-container>
      <!--侧边栏 -->
      <el-aside class="page_aside">
        <el-menu
          background-color="#3396FA"
          text-color="#fff"
          class="page_menu"
          :unique-opened="true"
          :router="true"
          :default-active="asideActiveMenu"
          @select="handleSelect"
        >
          <div class="logo">浙里防</div>
          <div
            v-for="item in permissionsList"
            :key="item.permissionsId"
            :class="asideActiveMenu == item.url ? 'activebackgrount' : ''"
          >
            <el-submenu :index="item.url" v-if="item.secondList">
              <template slot="title">
                <img class="icon" :src="bindIcon(item.src)" alt="" />
                <span>{{ item.permissionsName }}</span>
              </template>
              <el-menu-item
                v-for="seconditem in item.secondList"
                :key="seconditem.permissionsId"
                :index="seconditem.url"
              >
                <div
                  class="touchline"
                  :class="asideActiveMenu == seconditem.url ? 'vishidden' : ''"
                ></div>
                {{ seconditem.permissionsName }}
              </el-menu-item>
            </el-submenu>
            <el-menu-item v-else :index="item.url">
              <div
                class="touchline"
                :class="asideActiveMenu == item.url ? 'vishidden' : ''"
              ></div>
              <img class="icon" :src="bindIcon(item.src)" alt="" />
              {{ item.permissionsName }}
            </el-menu-item>
          </div>
        </el-menu>
        <!-- </div> -->
      </el-aside>
      <el-container>
        <!-- 头部 -->
        <el-header>
          <div class="index_header">
            <div class="heaSignout">
              {{ name }} ({{roleName}}), 您好!
              <el-divider direction="vertical"></el-divider>
              <div class="heaSigBox" @click="goLogin">
                <span>退出登录</span>
              </div>
            </div>
          </div>
        </el-header>
        <!-- 内容区 -->
        <el-main>
          <div class="main_content">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
    <el-dialog title="退出登录" :visible.sync="dialogVisible" width="30%">
      <span>是否退出登录？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmOutLogin">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import confirmPop from "@/components/confirmPop";
import { log } from "pili-rtc-web";
export default {
  name: "index",
  components: {
    confirmPop,
  },
  data() {
    return {
      dialogVisible: false,
      confirmPopdata: {
        title: "退出登录!",
        content: "您确认登陆吗?",
        popType: 0,
      },
      deleteVisible: false,
      name: "",
      permissionsList: [
        //   {
        //     permissionsId: "1",
        //     permissionsName: "首页",
        //     url: "/pages/index/index",
        //     iconSelected: null,
        //     src: "@/assets/img/indexicon.png",
        //     secondList: [],
        //   },
        //   {
        //     permissionsId: "2",
        //     permissionsName: "队员信息",
        //     url: "/pages/membermessage",
        //     src: "@/assets/img/teamMember.png",
        //     secondList: [
        //       {
        //         url: "/pages/membermessage/peoplemessage/list",
        //         permissionsId: " 2 - 1",
        //         permissionsName: "队员信息",
        //       },
        //       {
        //         url: "/pages/membermessage/marjir/list",
        //         permissionsId: " 2 - 2",
        //         permissionsName: "专业队管理",
        //       },
        //       {
        //         url: "/pages/membermessage/equipmentManagement/list",
        //         permissionsId: " 2 - 3",
        //         permissionsName: "装备管理",
        //       },
        //     ],
        //   },
        //   {
        //     url: "/pages/soldieraudit/list",
        //     permissionsId: "3",
        //     permissionsName: "整组交叉审核",
        //     secondList: [],
        //     src: "@/assets/img/EdsoldierCheck.png",
        //   },
        //   {
        //     url: "/pages/teamtrain",
        //     permissionsId: "4",
        //     permissionsName: "队伍训练管理",
        //     src: "@/assets/img/teamdrill.png",
        //     secondList: [
        //       {
        //         url: "/pages/teamtrain/area/list",
        //         permissionsId: " 4 - 2",
        //         permissionsName: "训练计划",
        //       },
        //       {
        //         url: "/pages/teamtrain/Thetrainingteam/list",
        //         permissionsId: " 4 - 1",
        //         permissionsName: "队伍训练计划",
        //       },
        //     ],
        //   },
        //   {
        //     url: "/pages/pullcheck/list",
        //     permissionsId: "5",
        //     permissionsName: "拉动点验",
        //     secondList: [],
        //     src: "@/assets/img/pullcheck.png",
        //   },
        //   {
        //     url: "/pages/organizationalStructure/list",
        //     permissionsId: "6",
        //     permissionsName: "组织架构管理",
        //     secondList: [],
        //     src: "@/assets/img/organizationalStructure.png",
        //   },
        //   {
        //     url: "/pages/appraisalmanagement/list",
        //     permissionsId: "7",
        //     permissionsName: "考核管理",
        //     secondList: [],
        //     src: "@/assets/img/appraisalmanagement.png",
        //   },
        //   {
        //     url: "/pages/soldiers/list",
        //     permissionsId: "8",
        //     permissionsName: "队伍后备兵源",
        //     secondList: [],
        //     src: "@/assets/img/soldiers.png",
        //   },
        //   {
        //     url: "/pages/economic/list",
        //     permissionsId: "10",
        //     permissionsName: "重要经济目标",
        //     secondList: [],
        //     src: "@/assets/img/economic.png",
        //   },
        //   {
        //     url: "/pages/training/list",
        //     permissionsId: "12",
        //     permissionsName: "训练科目",
        //     secondList: [],
        //     src: "@/assets/img/training.png",
        //   },
        //   {
        //     url: "/pages/propaganda/list",
        //     permissionsId: "13",
        //     permissionsName: "宣传内容建设",
        //     secondList: [],
        //     src: "@/assets/img/propaganda.png",
        //   },
        //   {
        //     url: "/pages/management",
        //     permissionsId: "14",
        //     permissionsName: "系统管理",
        //     src: "@/assets/img/seticon.png",
        //     secondList: [
        //       {
        //         url: "/pages/management/DS/list",
        //         permissionsId: "9",
        //         permissionsName: "数据共享",
        //       },
        //       {
        //         url: "/pages/management/system/list",
        //         permissionsId: "15",
        //         permissionsName: "角色管理",
        //       },
        //       {
        //         url: "/pages/management/account/list",
        //         permissionsId: "16",
        //         permissionsName: "账号管理",
        //       },
        //       {
        //         url: "/pages/management/dictionary/list",
        //         permissionsId: "17",
        //         permissionsName: "字典管理",
        //       },
        //       {
        //         url: "/pages/management/logLook/list",
        //         permissionsId: "18",
        //         permissionsName: "日志查看",
        //       },
        //     ],
        //   },
      ],
    };
  },
  computed: {
    asideActiveMenu(val) {
      const route = this.$route;
      const { meta, path } = route;
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    roleName(){
      return this.$store.state.roleName;
    }

  },

  mounted() {
    let userData = JSON.parse(sessionStorage.getItem("data"));
    this.name = userData.name;
    
    // this.$router.push({
    //   path: "/pages/index/index",
    // });
    this.permissionsList = userData.permissionsList;
    // let add_In = this.permissionsList[0];
    // if (!add_In.secondList) {
    //   this.$router.push({
    //     path: add_In.url,
    //   });
    // } else if (add_In.secondList) {
    //   let url = add_In[0].url;
    //   this.$router.push({
    //     path: url,
    //   });
    // }
  },
  methods: {
    goLogin() {
      this.dialogVisible = true;
    },
    confirmOutLogin() {
      sessionStorage.clear();
      this.$router.push("/");
    },
    handleSelect() {
      this.$store.commit("restListForm", 1);
      sessionStorage.setItem("queryCondition", "");
      // console.log("点击了");
    },
    changVisible() {
      this.deleteVisible = false;
    },
    bindIcon(icon) {
      let url1 = icon.split("/");
      // console.log(url1);
      let url2 = url1[url1.length - 1];
      let url3 = url2.split(".")[0];
      return require("@/assets/img/" + url3 + ".png");
      // let url1 = icon.split("/")[url1.length - 1].split(".")[0];
      // return require("@/assets/img/" + url1 + ".png");
    },
  },
};
</script>
<style lang="scss" scoped>
.icon {
  width: 22px;
  height: 22px;
  margin: 0 10px 0 0;
}
::v-deep {
  .el-aside {
    .el-menu-item {
      padding-left: 0 !important;
    }
  }
  .el-header {
    padding: 0;
  }
  .el-menu.page_menu {
    .el-submenu__icon-arrow,
    .el-icon-arrow-down {
      color: #ffffff;
    }
    // background-color: #3396fa !important;
    width: 200px;
    box-sizing: border-box;
    border: none !important;
  }
  .page_menu {
    overflow-x: hidden;
    // .el-submenu .is-active .el-submenu__title {
    //   border-bottom-color: #ffffff;
    //   color: #ffffff !important;
    // }

    .el-menu-item.is-active {
      background-color: #4ba2fa !important;
      color: #ffffff !important;
      width: 400px;
    }
    .el-submenu {
      .el-menu-item {
        height: 60px;
        // width: 100%;
        width: 400px;

        line-height: 60px;
        box-sizing: border-box;
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #666666;
      }
    }
    .el-menu-item-group__title {
      display: none;
    }
    .el-submenu__title,
    .el-menu-item {
      height: 60px;
      line-height: 60px;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
      display: flex;
      align-items: center;
      // padding: 0 48px 0 0 !important;
    }
    .el-submenu__title {
      padding-left: 17px !important;
    }
    .el-submenu {
      .touchline {
        margin-right: 10px !important;
      }
      .el-menu-item {
        padding: 0 16px 0 36px !important;
      }
    }
  }

  .layInp {
    .el-dialog__header {
      height: 56px;
      padding-left: 24px;
      box-sizing: border-box;
      border-bottom: 1px solid#EEEEEE;
    }
    .el-dialog__body {
      box-sizing: border-box;
      padding: 24px 72px 24px 24px;
    }
    .el-dialog__footer {
      height: 56px;
      box-sizing: border-box;
      border-top: 1px solid#EEEEEE;
    }
  }
  .layInps {
    .el-dialog__header {
      height: 56px;
      padding-left: 24px;
      box-sizing: border-box;
      border-bottom: 1px solid#EEEEEE;
    }
    .el-dialog__title {
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #000000;
    }
    .el-form {
      padding-right: 40px;
    }
  }
  // tableListBox {
  //   padding: 0 16px 13px !important;
  //   background-color: #f3f6fa;
  // }
}
.page {
  .logo {
    font-size: 24px;
    font-family: Helvetica;
    color: #ffffff;
    height: 60px;
    line-height: 60px;
    text-align: left;
    padding-left: 20px;
  }
  .vishidden {
    opacity: 1 !important;
  }
  //   .activebackgrount {
  // background-color: #4ba2fa !important;
  //   }
  //   .activebackgrount {
  // li {
  //   background-color: #4ba2fa !important;
  // }
  //   }

  .touchline {
    opacity: 0;
    box-sizing: border-box;
    width: 4px;
    height: 27px;
    background-color: #fff;
    border-radius: 0 5px 5px 0;
    margin-right: 16px;
  }
  width: 100vw;
  height: 100vh;
  .elbadge {
    width: 8px;
    height: 8px;
    display: inline-block;
    background: #e51400;
    border-radius: 4px;
    margin-left: 2px;
  }

  .index_header {
    width: 100%;
    height: 100%;
    background: #ffffff;
    color: #666666;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 24px;
    box-sizing: border-box;
    .heaTile {
      font-size: 18px;
      font-family: RuixianTopHeiHeavyGB10;
    }
    .heaSignout {
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      display: flex;
      align-items: center;
      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 20px;
      }
      .heaSigBox {
        display: flex;
        align-items: center;
        cursor: pointer;
        img {
          width: 18px;
          height: 14px;
          padding-right: 2px;
        }
        span {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
        }
      }
    }
  }
  .index_header1 {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    display: flex;
    // justify-content: space-between;
    align-items: center;
    height: 60px;
    background: #ffffff;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
    margin-bottom: 2px;
    padding-left: 21px;
    box-sizing: border-box;
    .headLiActive {
      color: #1890ff;
    }
    .headLi {
      margin-right: 52px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      img {
        width: 16px;
        height: 16px;
        margin-right: 5px;
      }
    }
  }
  .page_aside {
    width: 200px !important;
    box-sizing: border-box;
    height: calc(100vh);
    box-shadow: 2px 0px 10px 0px #e5e5e5;
    // margin-right: 2px;
    // margin-right: 2px;
    // overflow: hidden;
  }
  .page_menu {
    // div {
    //   background-color: #3396fa;
    // }
    // background-color: #3396fa;
    // width: 100%;
    height: 100%;
    text-align: left;
    .imgActive {
      width: 24px;
      height: 24px;
      margin-right: 8px;
    }
    .leftmenu {
      padding-right: 40px;
      width: 180px;
      white-space: normal;
      line-height: 20px;
    }
  }
  .el-icon-message {
    width: 18px;
    height: 18px;
    margin-right: 10px;
  }

  .main {
    min-height: calc(100vh - 112px);
    width: calc(100vw - 202px);
    // height: calc(100vh - 56px);
    .main_content {
      height: calc(100vh - 112px);
      width: calc(100vw - 202px);
      // width: 1398px;
      overflow: auto;
    }
  }
  .layInp {
    .my-dialog_title {
      font-size: 16px;
      font-weight: 550;
      color: #000000;
      text-align: left;
    }
    .formBox {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 23px;
      .formLable {
        width: 68px;
        height: 20px;
        text-align: right;
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #333333;
        line-height: 20px;
        margin-right: 30px;
      }
      .formBj {
        color: #ff4b4b;
        line-height: 20px;
      }
      .formInp {
        width: 420px;
        height: 32px;
        border-radius: 2px;
        // border: 1px solid #EEEEEE;
      }
    }

    .btn {
      width: 65px;
      height: 32px;
      padding: 0;
      line-height: 32px;
      text-align: center;
      background: #ffffff;
      border-radius: 2px;
      border: 1px solid #d2d2d2;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #666666;
    }
    .btn.confirm {
      background: #1890ff;
      border: 1px solid #1890ff;
      // border: none;
      color: #ffffff;
      margin-left: 8px;
    }
  }
}
</style>
<style scoped>
.el-header {
  box-shadow: 1px 2px 3px #666666 !important;
}
</style>