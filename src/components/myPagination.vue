<template>
  <div class="pagibation_part" @click.stop>
    <el-pagination
      class="pageTion"
      layout="prev, pager, next,slot,jumper"
      :total="paginationObj.total"
      :page-size="paginationObj.size"
      background
      @size-change="sizeChange"
      @current-change="changePage"
      :current-page="paginationObj.page"
    >
      <div class="data_size">{{ paginationObj.size }}条/页</div>
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    paginationObj: {
      type: Object,
      default: () => {
        {
        }
      },
    },
  },
  computed: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {
    changePage(page) {
      this.$emit("changePage", page);
    },
    sizeChange(size) {
      this.$emit("sizeChange", size);
    },
  },
};
</script>

<style lang="scss">
.pagibation_part {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  background: #ffffff;
  // padding: 24px 20px 24px;
  padding: 24px 0 0;
  box-sizing: border-box;
  align-items: center;
  .el-input__inner {
    height: 28px;
  }
  .el-select {
    border: none;
  }
  .el-pager {
    .number.active {
      background-color: #1890ff !important;
    }
  }
  .data_size {
    width: 82px;
    height: 28px;
    background: #ffffff;
    border-radius: 2px;
    border: 1px solid #d9d9d9;
    text-align: center;
    line-height: 28px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.65);
    display: inline-block;
    margin: 0 8px 0 16px;
  }

  .data_total {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
  }
  .el-pagination__jump {
    margin: 0;
  }
  .el-pagination__sizes {
    .el-input__inner {
      padding: 0 8px !important;
    }
    .el-input__suffix {
      display: none;
    }
  }
}
</style>
<style>
.pageTion >>> .el-pagination.is-background .btn-next,
.el-pagination.is-background .btn-prev,
.el-pagination.is-background .el-pager li {
  background-color: red;
}
</style>
