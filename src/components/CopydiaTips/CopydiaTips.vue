<template>
  <div class="diaTips">
    <el-dialog
      :visible.sync="isShow"
      :width="width"
      :show-close="false"
      top="42vh"
      :close-on-click-modal="false"
    >
      <div slot="title" class="confirm_title">
        <img
          src="../../assets/img/tipErrror.png"
          alt=""
          class="confirm_img"
          v-if="type == 0"
        />
        <img
          src="../../assets/img/tipSuccess.png"
          alt=""
          class="confirm_img"
          v-if="type == 1"
        />
        <span>{{ title }}</span>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "diaTips",
  data() {
    return {
      title: "",
      isShow: false,
      type: 0,
      width: "168px",
    };
  },
  methods: {
    show(msg = "保存成功", type = 0, character = "250px", duration = 1000) {
      this.isShow = true;
      this.title = msg;
      this.type = type;
      this.width = width;
      setTimeout(() => {
        this.isShow = false;
        // this.title = "";
        // this.type = "success";
      }, duration);
    },
  },
};
</script>
<style lang="scss">
.diaTips {
  //   .el-dialog {
  // width: 168px;
  //   }
  .el-dialog__header {
    padding: 32px 33px;
    min-width: 168px;
    box-sizing: border-box;
    height: 88px;
    // display: flex;
    // align-items: center;
    // justify-content: center;
    // padding: 32px 24px 12px 35px ;
  }
  .el-dialog__body {
    // padding: 0 24px 24px 35px;
    padding: 0 !important;
  }
  //   .el-dialog__footer {
  // padding: 0 20px 24px 0;
  //   }
}
</style>
<style lang="scss" scoped>
.diaTips {
  .confirm_title {
    display: flex;
    align-items: center;
    justify-content: center;
    .confirm_img {
      width: 20px;
      height: 20px;
      margin-right: 16px;
    }
    span {
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #000000;
      line-height: 24px;
    }
  }
}
</style>