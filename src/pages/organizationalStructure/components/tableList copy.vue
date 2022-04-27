<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{
        children: 'organizationListVOList',
        hasChildren: 'hasChildren',
      }"
    >
      <el-table-column prop="name" align="left" label="组织名称" width="300">
      </el-table-column>
      <el-table-column align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.liaison">
            联络员姓名:{{ scope.row.liaisonName }}
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span v-if="scope.row.phone"> 手机号码:{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column
        label="操作"
        align="center"
        width="200"
        v-if="$store.state.ifBut"
      >
        <template slot-scope="scope"> -->
          <!-- <el-button
            type="text"
            style="color: red"
            class="optionBtnDel"
            @click="delet(scope.row)"
            >删除</el-button
          > -->
          <!-- <el-divider direction="vertical"></el-divider>
          <el-button type="text" class="optionBtn" @click="edit(scope.row)"
            >编辑</el-button
          >
          <el-divider
            direction="vertical"
            v-if="scope.row.level != 4"
          ></el-divider>
          <el-button
            type="text"
            class="optionBtn"
            @click="add(scope.row)"
            v-if="scope.row.level != 4"
            >添加</el-button
          > -->
        <!-- </template>
      </el-table-column> -->
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
    return {};
  },
  methods: {
    delet(row) {
      this.$emit("delet", row);
    },
    edit(row) {
      let sendrow = {};
      // 编辑组织等级为当前
      console.log(row.level);
      sendrow.level = row.level;
      sendrow.id = row.id;
      // 拿到点击元素的父元素
      this.tableData.forEach((item) => {
        // 一级 点击元素为一级直接返回一级
        if (item.id == row.id) {
          // sendrow.id = item.id;
          sendrow.noename = item.name;
        }
        item.organizationListVOList.forEach((item2) => {
          // 二级 点击对象为二级=,二级权限查找内点击的对象
          if (item2.id == row.id) {
            // sendrow.id = item.id;
            sendrow.noename = item.name;
            sendrow.twoname = item2.name;
          }
          // 三级
          if (
            item2.organizationListVOList &&
            item2.organizationListVOList.length
          ) {
            item2.organizationListVOList.forEach((item3) => {
              if (item3.id == row.id) {
                // sendrow.id = item2.id;
                sendrow.noename = item.name;
                sendrow.twoname = item2.name;
                sendrow.threename = item3.name;
              }
              // // 四级
              // if (item3.organizationListVOList.length) {
              //   item3.organizationListVOList.forEach((item4) => {
              //     if (item4.id == row.id) {
              //       sendrow.noename = item.name;
              //       sendrow.twoname = item2.name;
              //       sendrow.threename = item3.name;
              //       sendrow.fourname = item4.name;
              //     }
              //   });
              // }
            });
          }
        });
      });
      this.$router.push(
        "/pages/organizationalStructure/edit?row=" + JSON.stringify(sendrow)
      );
    },
    add(row, column, event) {
      let sendrow = {};
      // 添加组织等级为当前等级加1
      sendrow.level = row.level + 1;
      sendrow.parentId = row.id;
      // 拿到点击元素的父元素
      this.tableData.forEach((item) => {
        // 一级 点击元素为一级直接返回一级
        if (item.id == row.id) {
          // sendrow.id = item.id;
          sendrow.noename = item.name;
        }
        item.organizationListVOList.forEach((item2) => {
          // 二级 点击对象为二级找到二级内点击的对象
          if (item2.id == row.id) {
            // sendrow.id = item.id;
            sendrow.noename = item.name;
            sendrow.twoname = item2.name;
          }
          // 三级
          if (item2.organizationListVOList.length) {
            item2.organizationListVOList.forEach((item3) => {
              if (item3.id == row.id) {
                // sendrow.id = item2.id;
                sendrow.noename = item.name;
                sendrow.twoname = item2.name;
                sendrow.threename = item3.name;
              }
              // 四级
              // if (item3.organizationListVOList.length) {
              //   item3.organizationListVOList.forEach((item4) => {
              //     if (item4.id == row.id) {
              //       // sendrow.id = item3.id;
              //     }
              //   });
              // }
            });
          }
        });
      });
      this.$router.push(
        "/pages/organizationalStructure/add?row=" + JSON.stringify(sendrow)
      );
    },
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
</style>