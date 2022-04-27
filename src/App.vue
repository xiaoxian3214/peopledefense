<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
// 稳定性监控
let wpkReporter = require("./utils/wpkReporter.js").wpkReporter;
try {
  const config = {
    bid: "WZ_RFB_zzdpro",
    sapp_id: "21548",
    sapp_name: "WZ_RFB",
  };
  const wpk = new wpkReporter(config);
  wpk.installAll();
  window._wpk = wpk;
} catch (err) {
  console.error("WpkReporterinitfail", err);
}
// 通用采集 SDK
let mdfunc = require("./utils/myMD.js").userReporting;
export default {
  provide() {
    return {
      app: this,
    };
  },
  watch: {
    $route(to, form) {
      // console.log(to.path, to.name, mdfunc);
      mdfunc(to.path, to.name);
    },
  },
  data() {
    return {
      sexList: [],
      administrativeList: [],
      majorList: [],
      getTeamallList: [],
    };
  },
  mounted() {
    this.getsexList();
    this.getAdministrativeList();
    this.getMajorList();
  },
  methods: {
    // 获取性别
    getsexList() {
      this.$api.ZD_ZZZH_XB().then((res) => {
        if (res.code == 200) {
          this.sexList = res.page.records;
        }
      });
    },
    // 获取行政区
    getAdministrativeList() {
      this.$api.ZD_XZQDM().then((res) => {
        if (res.code == 200) {
          this.administrativeList = res.page.records;
        }
      });
    },
    // 获取专业能力类型
    getMajorList() {
      this.$api.ZD_ZZZH_ZYDNLLX().then((res) => {
        if (res.code == 200) {
          this.majorList = res.page.records;
        }
      });
    },
    // // 专业队列表
    // getTeamallList() {
    //   this.$api.teamallList().then((res) => {
    //     if (res.code == 200) {
    //       this.getTeamallList = res.page.records;
    //     }
    //   });
    // },
    // 性别查找
    filterSex(myId) {
      let flagObj = this.sexList.find((item) => item.id == myId);
      if (flagObj) {
        return flagObj.name;
      }
    },
    // 行政区查找
    filterAdministrativeCode(myId) {
      let flagObj = this.administrativeList.find((item) => item.id == myId);
      console.log(myId);
      if (flagObj) {
        return flagObj.name;
      }
    },
    // 专业能力类型查找
    filterCapacityClass(myId) {
      let flagObj = this.majorList.find((item) => item.id == myId);
      if (flagObj) {
        return flagObj.name;
      }
    },
    // // 专业队伍查找 getTeamallList
    // filterTeamallList(myId) {
    //   let flagObj = this.getTeamallList.find((item) => item.id == myId);
    //   if (flagObj) {
    //     return flagObj.name;
    //   }
    // },
  },
};
</script>
<style lang="scss">
.el-message__content {
  font-size: 18px !important;
}
.optionBtnDel {
  font-size: 16px !important;
}
.optionBtn {
  font-size: 16px !important;
}
.formLable {
  font-size: 18px !important;
}
.formBox {
  font-size: 18px !important;
}
.el-input__inner {
  font-size: 18px !important;
}
.delateBtn {
  color: red !important;
}
#app {
  // .approval {
  .el-dialog__header {
    // padding: 16px 24px;
    height: 56px;
    // padding: 16px 24px 16px 27px;
    // line-height: 24px;
    // align-items: center;
    // height: 56px;
    padding-left: 24px;
    box-sizing: border-box;
    // border-bottom: 1px solid#EEEEEE;
  }
  .el-dialog__body {
    // padding: 0;
    // height: 79px;
    box-sizing: border-box;
    // padding: 24px 72px 24px 24px;
    padding: 24px 24px 24px 24px;
  }
  .el-dialog__footer {
    height: 56px;
    box-sizing: border-box;
    // padding: 12px 24px;
    // padding: 0;
    // display: flex;
    // align-items: center;
    // padding-top: 12px;
    // border-top: 1px solid#EEEEEE;
  }
  .my-dialog_title {
    font-size: 16px;
    font-weight: 550;
    color: #000000;
    text-align: left;
  }
  .formBox {
    flex-wrap: wrap;
    text-align: left !important;
    display: flex;
    align-items: center;
    // justify-content: center;
    // margin-bottom: 23px;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
    .formLable {
      // width: 84px;
      // height: 60px;
      // height: 20px;
      margin-top: 6px;
      align-self: flex-start;
      // text-align: right;
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
      width: 100%;
      min-height: 32px;
      border-radius: 2px;
      // border: 1px solid #EEEEEE;
    }
    .el-input__icon {
      // height: 112%;
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
    // border: 1px solid #1890ff;
    // border: none;
    color: #ffffff;
    margin-left: 8px;
  }
  // }
  // 表格内的输入框去边框
  .tableInp {
    .el-input__inner {
      border: none;
      text-align: center;
      padding: 0;
      color: #000000;
    }
  }
  .tableInpLeft {
    .el-input__inner,
    .el-textarea__inner {
      border: none;
      padding: 10px 40px 8px 0;
      color: #000000;
      line-height: 22px;
      margin-bottom: 4px;
    }
  }
}
.tableListBox {
  box-sizing: border-box;
  // padding-bottom: 30px;
  // margin: 0 auto 10px;
  // width: 84vw;
  min-height: calc(100vh - 260px);
  // border: 1px solid blueviolet;
  background-color: #fff;
  padding: 24px;
  // overflow: hidden;
}
.listQuery {
  // width: 85vw;
  // border: 1px solid green;
  background: #ffffff;
  border-radius: 2px;
  align-items: center;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  // flex-wrap: wrap;
  // flex-flow: wrap;
  min-height: 100px;
  margin-bottom: 8px;
  padding: 0 10px;
  // margin: 0 auto 10px;
  .queForm {
    // width: 40%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    // margin-bottom: 20px;
  }
  .titleBtnBox {
  }
  .queFormRight {
    justify-content: space-between;
  }
  .queFormItem {
    margin-bottom: 6px;
    .wid86 {
      width: 86px;
    }
    .wid129 {
      width: 129px;
    }
    .wid98 {
      width: 98px;
    }
    .wid75 {
      width: 75px;
    }
    display: flex;
    align-items: center;
    margin-right: 15px;
    .queLable {
      max-width: 90px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #666666;
      white-space: nowrap;
      // text-align: right;
      padding-right: 5px;
    }
    .queInp {
      height: 32px;
      border-radius: 2px;
      display: flex;
      align-items: center;
      .el-cascader {
        height: 100%;
      }
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
  .confirm {
    width: 65px;
    height: 32px;
    padding: 0;
    line-height: 32px;
    text-align: center;
    border-radius: 2px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    background: #1890ff;
    // border: none;
    color: #ffffff;
    margin-left: 8px;
  }
}
.qd {
  text-align: center;
  padding-bottom: 30px;
  .btn1 {
    width: 85px;
    height: 35px;
    padding: 0;
    line-height: 35px;
    text-align: center;
    background: #ffffff;
    border-radius: 2px;
    border: 1px solid #d2d2d2;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
  }
  .confirm1 {
    width: 85px;
    height: 35px;
    padding: 0;
    line-height: 35px;
    text-align: center;
    background: #1890ff;
    border: 1px solid #1890ff;
    // border: none;
    color: #ffffff;
    margin-left: 8px;
  }
}
.titleBtnBox {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .btn {
    margin-left: 8px !important;
  }
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
