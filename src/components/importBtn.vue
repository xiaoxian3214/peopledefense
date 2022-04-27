<template>
  <div class="importcomponents">
    <el-upload
      class="el-button btn el-button--default"
      style="float: left"
      :action="$UPLOAD_URL"
      :show-file-list="false"
      :headers="headers"
      :on-success="handleSuccess"
      :on-error="handleError"
    >
      <el-button class="but">导入</el-button>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: "importBtn",
  data() {
      const dataJson = JSON.parse(sessionStorage.getItem("data"))
    return {
      action: this.$UPLOAD_URL,
      headers: {
        ContentType: "Multipart/form-data",
        token:dataJson.token
      },
    };
  },
  methods: {
    handleSuccess(response, file, fileList) {
      this.$api
        .soldierauditimport({ url: response.data.fileList[0].url })
        .then((res) => {
          this.$emit("importSuccess", res);
        });
    },
    handleError(err, file, fileList) {
      this.$message.error("导入失败");
    },
  },
};
</script>

<style lang="scss">
.importcomponents {
  width: 65px;
  height: 30px;
  margin-left: 10px;
  border: none !important;
  .el-button.btn.el-button--default {
    margin: 0 !important;
    padding: 0 !important;
    width: 65px !important;
    height: 30px !important;
    border: none !important;
  }
  .but {
    width: 65px;
    height: 32px;
    padding: 0 !important;
    margin: 0 !important;
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
  .button {
    width: 100% !important;
  }
}
</style>