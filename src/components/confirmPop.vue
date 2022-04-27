<template>
  <div class="confirm-pop">
    <el-dialog
      :visible.sync="confirmVisible"
      :width="width"
      :close-on-click-modal="false"
      :show-close="false"
      :before-close="cancel"
      top="34vh"
    >
      <div slot="title" class="confirm_title">
        <i class="el-icon-warning" v-if="confirmPopdata.popType == 0"></i>
        <!-- <img src="../assets/img/popErrror.png" alt="" v-if="type==1" class="confirm_img"> -->
        <img
          src="../assets/img/tipErrror.png"
          alt=""
          v-if="confirmPopdata.popType == 2"
          class="confirm_img"
        />
        <span>{{ confirmPopdata.title }}</span>
      </div>
      <span
        class="confirm_content"
        v-if="
          isContent && (confirmPopdata.content || confirmPopdata.content === 0)
        "
        >{{ confirmPopdata.content }}</span
      >
      <div slot="footer" class="dialog-footer">
        <el-button class="btn" @click="cancel">取消</el-button>
        <el-button class="btn confirm" @click="confirm">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// import { throttle } from "@/utils/tools.js";
export default {
  props: {
    confirmPopdata: {
      type: Object,
      default: function () {
        return { type: 0, title: "确认弹窗", content: "提示内容" };
      },
    },
    // type: {
    //   type: Number,
    //   default: 0,
    // },
    // title: {
    //   type: String,
    //   default: "提示",
    // },
    isContent: {
      type: Boolean,
      default: true,
    },
    // content: {
    //   type: String,
    //   default: "",
    // },
    width: {
      type: String,
      default: "480px",
    },
    confirmVisible: {
      type: Boolean,
      default: false,
    },
    // cancelText: {
    //   type: String,
    //   default: "取 消",
    // },
    // confirmText: {
    //   type: String,
    //   default: "确 定",
    // },
  },
  mountend() {},
  methods: {
    // 确定
    confirm() {
      this.$emit("deleteConfirm");
    },
    // 取消
    cancel() {
      this.$emit("changVisible");
    },
  },
};
</script>
<style lang="scss">
.confirm-pop {
  .el-dialog__header {
    padding: 32px 24px 12px 35px;
  }
  .el-dialog__body {
    padding: 0 24px 24px 35px;
  }
  .el-dialog__footer {
    padding: 0 20px 24px 0;
  }
}
</style>
<style lang="scss" scoped>
.confirm-pop {
  .confirm_title {
    display: flex;
    align-items: center;
    i {
      display: inline-block;
      color: #faad14;
      font-size: 20px;
      margin-right: 16px;
      width: 24px;
      // height: 24px;
    }
    .confirm_img {
      width: 24px;
      height: 24px;
      margin-right: 16px;
    }
    span {
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 540;
      color: #000000;
    }
  }
  .confirm_content {
    display: inline-block;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
    margin-left: 36px;
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
    border: none;
    color: #ffffff;
  }
  // .dialog-footer{
  // display: flex;
  // align-items: center;
  // justify-content: flex-end;
  // }
}
</style>
>>>>>>> .r11
