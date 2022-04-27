<template>
  <div>
    <detail-header
      title="详情"
      :breadcrumbList="breadcrumbList"
    ></detail-header>
    <div class="fromHeader" @click="$router.push('/pages/pullcheck/list')">
      <i class="el-icon-arrow-left"></i>
      <el-button type="text" style="color: black; font-size: 20px"
        >返回</el-button
      >
    </div>
    <div class="fromtableListBox detail">
      <el-row type="flex">
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <div class="formLable">任务名称:</div>
            <div class="formBox">
              {{ addform.taskName }}
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">集结时间:</div>
            <div class="formBox">
              {{ addform.assemblyDate }}
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">集结地点:</div>
            <div class="formBox">
              {{ addform.assemblyArea }}
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">专业队伍名称:</div>
            <div class="formBox">
              {{ addform.professionalTeamId }}
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <div class="formLable">训练人数:</div>
            <div class="formBox">{{ value2.length }} ( 人)</div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">采集人员 :</div>
            <div class="formBox">{{ addform.gatherPersonId }}</div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">训练人数:</div>
            <div class="formBox">
              {{ addform.numberPerson }}
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2"> </el-col>
      </el-row>

      <el-row type="flex">
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <div class="formLable">创建人:</div>
            <div class="formBox">{{ addform.createUser }}</div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">发布人 :</div>
            <div class="formBox">{{ addform.releaseUser }}</div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2"> </el-col>
        <el-col :span="5" :offset="2"> </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <div class="formLable">训练人员:</div>
            <div class="formBox">
              <div
                :key="item.id"
                v-for="item in addform.professionalTeamPersonInformationList"
                style="
                  margin-right: 10px;
                  padding: 6px;
                  border-radius: 5px;
                  background: rgba(200, 200, 200, 0.1);
                "
              >
                {{ item.name }}
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <div class="formLable">携带装备情况:</div>
            <div class="equipfromBox">
              <div
                class="equipfromItem"
                v-for="(item, index) in addform.equipmentList"
                :key="index"
              >
                {{ item.id }}
                <div
                  style="
                    display: inline-block;
                    border-bottom: 1px solid rgb(199 199 199);
                    width: 40px;
                    margin-bottom: 5px;
                  "
                ></div>
                <span style="color: #aaaaaa; font-size: 14px"> 数量</span>:{{
                  item.num
                }}
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import detailHeader from "@/components/detailHeader";
export default {
  components: {
    detailHeader,
  },
  data() {
    return {
      isloading: false,
      fileList: [],
      professionalTeamList: [],
      value: "",
      value2: [],
      options: [],
      tempoptions: [
        {
          name: "背包",
          id: 0,
        },
        {
          name: "作战铁锹",
          id: 1,
        },
      ],
      addform: {
        gatherPersonId: "",
        taskName: "",
        assemblyDate: "",
        assemblyArea: "",
        professionalTeamId: "",
        professionalTeamPersonInformationList: [],
        result: "",
        equipmentList: [
          {
            id: "",
            num: "",
          },
        ],
      },
      breadcrumbList: ["首页", "拉动点验", "详情"],
      id: this.$route.query.id,
    };
  },
  mounted() {
    this.pullcheckdetail();
  },
  methods: {
    pullcheckdetail() {
      this.$api.pullcheckdetail({ id: this.id }).then((res) => {
        if (res.code == 200) {
          this.addform = res.data;
          // 拿到所有选择人员的id进行回显
          let showListId =
            this.addform.professionalTeamPersonInformationList.map((item) => {
              return item.id;
            });
          this.value2 = showListId;
          this.playersallList();
          this.getTeamallList();
          this.equipmentlist();
        } else {
          this.$message.error(res.message);
        }
      });
    },
    // 所有队员
    playersallList() {
      this.$api.playersallList().then((res) => {
        if (res.code == 200) {
          this.options = res.data;
          this.options.forEach((item) => {
            if (item.id == this.addform.gatherPersonId) {
              this.addform.gatherPersonId = item.name;
            }
          });
          // 拿到所有选择人员在数组中的索引
          let findIndexList = this.value2.map((item, index) => {
            return this.options.findIndex((item1) => {
              return item1.id == item;
            });
          });
          findIndexList.forEach((item) => {
            this.value += this.options[item].name + ",";
          });
        } else {
          this.$message.error(res.message);
        }
      });
    },
    // 所有装备
    equipmentlist() {
      this.$api.equipmentlist().then((res) => {
        if (res.code == 200) {
          this.tempoptions = res.data;
          this.addform.equipmentList.forEach((item) => {
            this.tempoptions.forEach((item1) => {
              if (item.id == item1.id) {
                item.id = item1.name;
              }
            });
          });
        } else {
          this.$message.error(res.message);
        }
      });
    },
    // 所有专业队
    getTeamallList() {
      this.$api.teamallList().then((res) => {
        if (res.code == 200) {
          res.data.forEach((item) => {
            if (item.id == this.addform.professionalTeamId) {
              this.addform.professionalTeamId = item.name;
            }
          });
        } else {
          this.$message.error(res.message);
        }
      });
    },
  },
};
</script>

<style lang="scss">
.uploadBackground {
  background: #f2f2f2;
  width: 240px;
  height: 100px;
  margin-bottom: 15px;
  .uploadContent {
    height: 100px;
    align-items: center;
    padding: 20px;
  }
}
.equipfromBox {
  padding: 15px 0 0 50px;
  //   border: 1px solid red;
  //   width: 450px;
  position: relative;
}
.addequip {
  font-size: 25px;
  position: absolute;
  left: 10px;
  bottom: 5px;
}
.equipfromItem {
  //   border: 1px solid black;
  //   display: flex;
  //   flex-wrap: nowrap;

  width: 300px;
  //   justify-content: space-around;

  .el-select,
  .el-input {
    margin-right: 10px;
    display: inline-block;
    width: 120px !important;
  }
}
</style>