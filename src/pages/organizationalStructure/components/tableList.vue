<template>
  <div>
    <el-table
      v-if="tableData.length"
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      :tree-props="{
        children: 'organizationListVOList',
        hasChildren: 'hasChildren',
      }"
      border
      ref="theTable"
      :expand-row-keys="[tableData[0].id + '']"
      @row-click="getOpenDetail"
    >
      <!-- :expand-row-keys="expands" -->
      <!-- default-expand-all -->
      <el-table-column prop="name" label="组织名称" width="300"> </el-table-column>
      <el-table-column align="center" label="专业队联络人">
        <template slot-scope="scope">
          <!-- <span v-if="scope.row.liaison">
            联络员姓名:{{ scope.row.liaisonName }}
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span v-if="scope.row.phone"> 手机号:{{ scope.row.phone }}</span> -->
          <div class="flex">
            <div v-if="scope.row.liaison">联络员姓名：{{ scope.row.liaisonName }}</div>
            <div v-if="scope.row.phone">手机号：{{ scope.row.phone }}</div>
            <div v-if="scope.row.directorUnit">组建单位：{{ scope.row.directorUnit }}</div>
          </div>
        </template>
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
  },
  data() {
    return {
      // getRowKeys(row) {
      //   // console.log(row.id);
      //   return row.id;
      // },
      expands: [3],
      // tableData1: [
      //   {
      //     id: 3,
      //     date: "2016-05-01",
      //     name: "王小虎",
      //     address: "上海市普陀区金沙江路 1519 弄",
      //     organizationListVOList: [
      //       {
      //         id: 33,
      //         date: "2016-05-01",
      //         name: "王小虎",
      //         address: "上海市普陀区金沙江路 1519 弄",
      //         organizationListVOList: [
      //           {
      //             id: 31,
      //             date: "2016-05-01",
      //             name: "王小虎",
      //             address: "上海市普陀区金沙江路 1519 弄",
      //           },
      //           {
      //             id: 32,
      //             date: "2016-05-01",
      //             name: "王小虎",
      //             address: "上海市普陀区金沙江路 1519 弄",
      //             organizationListVOList: [
      //               {
      //                 id: 34,
      //                 date: "2016-05-01",
      //                 name: "王小虎",
      //                 address: "上海市普陀区金沙江路 1519 弄",
      //               },
      //               {
      //                 id: 35,
      //                 date: "2016-05-01",
      //                 name: "王小虎",
      //                 address: "上海市普陀区金沙江路 1519 弄",
      //               },
      //             ],
      //           },
      //         ],
      //       },
      //       {
      //         id: 38,
      //         date: "2016-05-01",
      //         name: "王小虎",
      //         address: "上海市普陀区金沙江路 1519 弄",
      //       },
      //     ],
      //   },
      // ],
    };
  },
  mounted() {
    // this.expands.push(this.tableData[0].id);
  },
  methods: {
    getOpenDetail(row) {
      this.$refs.theTable.toggleRowExpansion(row);
    },
    delet(row) {
      this.$emit("delet", row);
    },
    // edit(row) {
    //   let sendrow = {};
    //   // 编辑组织等级为当前
    //   console.log(row.level);
    //   sendrow.level = row.level;
    //   sendrow.id = row.id;
    //   // 拿到点击元素的父元素
    //   this.tableData.forEach((item) => {
    //     // 一级 点击元素为一级直接返回一级
    //     if (item.id == row.id) {
    //       // sendrow.id = item.id;
    //       sendrow.noename = item.name;
    //     }
    //     item.organizationListVOList.forEach((item2) => {
    //       // 二级 点击对象为二级=,二级权限查找内点击的对象
    //       if (item2.id == row.id) {
    //         // sendrow.id = item.id;
    //         sendrow.noename = item.name;
    //         sendrow.twoname = item2.name;
    //       }
    //       // 三级
    //       if (item2.organizationListVOList && item2.organizationListVOList.length) {
    //         item2.organizationListVOList.forEach((item3) => {
    //           if (item3.id == row.id) {
    //             // sendrow.id = item2.id;
    //             sendrow.noename = item.name;
    //             sendrow.twoname = item2.name;
    //             sendrow.threename = item3.name;
    //           }
    //           // // 四级
    //           // if (item3.organizationListVOList.length) {
    //           //   item3.organizationListVOList.forEach((item4) => {
    //           //     if (item4.id == row.id) {
    //           //       sendrow.noename = item.name;
    //           //       sendrow.twoname = item2.name;
    //           //       sendrow.threename = item3.name;
    //           //       sendrow.fourname = item4.name;
    //           //     }
    //           //   });
    //           // }
    //         });
    //       }
    //     });
    //   });
    //   this.$router.push("/pages/organizationalStructure/edit?row=" + JSON.stringify(sendrow));
    // },
    // add(row, column, event) {
    //   let sendrow = {};
    //   // 添加组织等级为当前等级加1
    //   sendrow.level = row.level + 1;
    //   sendrow.parentId = row.id;
    //   // 拿到点击元素的父元素
    //   this.tableData.forEach((item) => {
    //     // 一级 点击元素为一级直接返回一级
    //     if (item.id == row.id) {
    //       // sendrow.id = item.id;
    //       sendrow.noename = item.name;
    //     }
    //     item.organizationListVOList.forEach((item2) => {
    //       // 二级 点击对象为二级找到二级内点击的对象
    //       if (item2.id == row.id) {
    //         // sendrow.id = item.id;
    //         sendrow.noename = item.name;
    //         sendrow.twoname = item2.name;
    //       }
    //       // 三级
    //       if (item2.organizationListVOList.length) {
    //         item2.organizationListVOList.forEach((item3) => {
    //           if (item3.id == row.id) {
    //             // sendrow.id = item2.id;
    //             sendrow.noename = item.name;
    //             sendrow.twoname = item2.name;
    //             sendrow.threename = item3.name;
    //           }
    //           // 四级
    //           // if (item3.organizationListVOList.length) {
    //           //   item3.organizationListVOList.forEach((item4) => {
    //           //     if (item4.id == row.id) {
    //           //       // sendrow.id = item3.id;
    //           //     }
    //           //   });
    //           // }
    //         });
    //       }
    //     });
    //   });
    //   // this.$router.push(
    //   //   "/pages/organizationalStructure/add?row=" + JSON.stringify(sendrow)
    //   // );
    // },
  },
};
</script>
<style lang="scss" scoped>
.optionBtnDel {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #777777;
}
.flex {
  display: flex;
  align-items: center;
  div {
    min-width: 30%;
    margin: 0 20px;
    text-align: left;
  }
}
</style>