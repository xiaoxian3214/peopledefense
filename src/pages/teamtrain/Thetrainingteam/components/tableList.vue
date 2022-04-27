<template>
  <div class="table-box">
    <el-table :data="list" :header-row-style="{ height: '54px' }" :cell-style="{ padding: '0' }" ref="table" v-loading="loading" :row-style="{ height: '54px' }" :header-cell-style="rowClass" :span-method="objectSpanMethod">
      <el-table-column label="参与训练的专业队" prop="professionalTeamName" :show-overflow-tooltip="true" align="center"> </el-table-column>
      <el-table-column label="行政区域" prop="administrativeName" :show-overflow-tooltip="true" align="center"> </el-table-column>
      <el-table-column label="训练时间" prop="time" :show-overflow-tooltip="true" align="center">
        <template slot-scope="scope">
          {{ scope.row.time }}
        </template>
      </el-table-column>
      <el-table-column label="训练地点" prop="address" :show-overflow-tooltip="true" align="center">
        <template slot-scope="scope">
          {{ scope.row.address }}
        </template>
      </el-table-column>
      <el-table-column label="训练科目" prop="subjec" :show-overflow-tooltip="true" align="center">
        <template slot-scope="scope">
          {{ scope.row.subjec }}
        </template>
      </el-table-column>
      <el-table-column label="训练内容" prop="content" :show-overflow-tooltip="true" align="center">
        <template slot-scope="scope">
          {{ scope.row.subjec }}
        </template>
      </el-table-column>
      <el-table-column label="训练人数" prop="num" :show-overflow-tooltip="true" align="center"
        ><template slot-scope="scope"> {{ scope.row.num }} 人 </template>
      </el-table-column>
      <el-table-column label="操作" :show-overflow-tooltip="true" align="center" width="370">
        <el-table-column prop="name" align="center" width="300">
          <template slot-scope="scope">
            <el-button type="text" class="optionBtnDel" @click="delet(scope.row)" v-if="$store.state.ifBut && !($store.state.roleIdList.includes(4) && $store.state.roleIdList.length == 1)">删除</el-button>
            <el-divider direction="vertical" v-if="$store.state.ifBut && !($store.state.roleIdList.includes(4) && $store.state.roleIdList.length == 1)"></el-divider>
            <el-button type="text" class="optionBtn" @click="edit(scope.row)" v-if="$store.state.ifBut">编辑</el-button>
            <el-divider direction="vertical" v-if="$store.state.ifBut"></el-divider>
            <el-button type="text" class="optionBtn" @click="detail(scope.row)">详情</el-button>
            <el-divider direction="vertical" v-if="$store.state.ifBut && !($store.state.roleIdList.includes(4) && $store.state.roleIdList.length == 1)"></el-divider>
            <el-button type="text" class="optionBtn" @click="watchVideo(scope.row)" v-if="$store.state.ifBut && !($store.state.roleIdList.includes(4) && $store.state.roleIdList.length == 1)">直播</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="name" width="90">
          <template slot-scope="scope">
            <el-button type="text" class="optionBtn" @click="allEdit(scope.row)" v-if="$store.state.ifBut">编辑人员 </el-button>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>

export default {
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      list: [],
    };
  },
  watch: {
    tableData(newVal, oldVal) {
      let arr = [];
      newVal.forEach((item) => {
        item.trainingList.forEach((item1) => {
          arr.push(item1);
        });
      });
      this.list = arr;
    },
  },
  mounted() {},
  methods: {
    rowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 1) {
        return { display: "none" };
      }
    },
    //
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      // console.log({ rowIndex, columnIndex });
      let cmputRowindexList = []; // 存放开始合并行
      let cmputRowEntList = []; // 存放结束合并行
      let rownum = 0; // 定义合并开始行
      this.tableData.forEach((element, index) => {
        if (element.trainingList.length) {
          cmputRowEntList.push(element.trainingList.length);
          cmputRowindexList.push(rownum);
          rownum = rownum + element.trainingList.length;
        }
      });
      if (columnIndex === 0) {
        // 当前列
        if (cmputRowindexList.indexOf(rowIndex) != -1) {
          // 第几列开始合并，从第一列开始数为0
          return {
            rowspan: cmputRowEntList[cmputRowindexList.indexOf(rowIndex)], //当前列需要合并多少行
            colspan: 1, //当前行需要合并多少列
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
      }
      if (columnIndex == 1) {
        // 当前列
        if (cmputRowindexList.indexOf(rowIndex) != -1) {
          // 第几列开始合并，从第一列开始数为0
          return {
            rowspan: cmputRowEntList[cmputRowindexList.indexOf(rowIndex)],
            colspan: 1,
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
      }
      if (columnIndex == 6) {
        // 当前列
        if (cmputRowindexList.indexOf(rowIndex) != -1) {
          // 第几列开始合并，从第一列开始数为0
          return {
            rowspan: cmputRowEntList[cmputRowindexList.indexOf(rowIndex)],
            colspan: 1,
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
      }
      if (columnIndex == 8) {
        if (cmputRowindexList.indexOf(rowIndex) != -1) {
          return {
            rowspan: cmputRowEntList[cmputRowindexList.indexOf(rowIndex)],
            colspan: 1,
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
      }
    },

    // indexMethods(index) {
    //   return (this.currentpage - 1) * 10 + index + 1;
    // },
    delet(val) {
      this.$emit("delet", val);
    },
    edit(val) {
      this.$router.push("/pages/teamtrain/Thetrainingteam/edit?id=" + val.id);
    },
    detail(val) {
      this.$router.push("/pages/teamtrain/Thetrainingteam/detail?id=" + val.id);
    },
    allEdit(val) {
      this.$router.push("/pages/teamtrain/Thetrainingteam/allEdit?id=" + val.id);
    },
    watchVideo(val) {
      this.$router.push("/pages/teamtrain/Thetrainingteam/satchTv?roomName=" + val.roomName + "&team=1");
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep {
  .is-group.has-gutter tr:last-child {
    display: none;
  }
}
.grid-content {
  // border-radius: 4px;
  min-height: 36px;
  text-align: center;
  line-height: 36px;
  background-color: #f5f6fa;
  border: 1px solid rgb(199, 199, 199);
}
.table-box {
  .el-tooltip {
    width: 202px;
  }
  background: #fff;
  box-sizing: border-box;
  .img {
    width: 28px;
    height: 28px;
    border-radius: 14px;
    object-fit: cover;
  }
  .optionBtn {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    color: #1890ff;
  }
  .optionBtnDel {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    color: #f53131;
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
</style>