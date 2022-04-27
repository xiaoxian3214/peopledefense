<template>
  <div>
    <detail-header
      title="新增"
      :breadcrumbList="breadcrumbList"
    ></detail-header>
    <div
      class="fromHeader"
      @click="
        () => {
          this.$router.back();
        }
      "
    >
      <i class="el-icon-arrow-left"></i>
      <el-button type="text" style="color: black; font-size: 20px"
        >返回</el-button
      >
    </div>
    <div class="fromtableListBox">
      <el-row type="flex">
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <div class="formLable">
              <span class="formBj">*</span>专业队伍名称:
            </div>
            <div class="formBox">
              <el-select
                v-model="addform.professionalTeamId"
                placeholder="请选择专业队伍"
                @change="professionalTeamIchage"
              >
                <el-option
                  v-for="item in professionalTeamList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable"><span class="formBj">*</span>任务名称:</div>
            <div class="formBox">
              <el-input
                v-model="addform.taskName"
                placeholder="请输入任务名称"
                class="formInp"
                type="text"
              ></el-input>
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable"><span class="formBj">*</span>集结时间:</div>
            <div class="formBox">
              <el-date-picker
                value-format="yyyy-MM-dd HH:mm"
                v-model="addform.assemblyDate"
                type="datetime"
                placeholder="选择日期时间"
                format="yyyy-MM-dd HH:mm"
              >
              </el-date-picker>
              <!-- {{ addform.assemblyDate }} -->
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable"><span class="formBj">*</span>集结地点:</div>
            <div class="formBox">
              <el-input
                v-model="addform.assemblyArea"
                placeholder="请输入集结地点"
                class="formInp"
                type="text"
              ></el-input>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="12">
          <div class="formLable">
            <span class="formBj">*</span>选择训练人员:
          </div>
          <div class="formBox">
            <el-transfer
              target-order="unshift"
              :props="{
                key: 'id',
                label: 'name',
              }"
              @change="handleChange"
              filter-placeholder="请输入人员名称"
              :titles="['全部人员', '参与训练人员']"
              filterable
              v-model="personnelListValue"
              :data="personnelList"
            >
            </el-transfer>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">
              <span class="formBj">*</span>队长(视频采集人员):
            </div>
            <div class="formBox">
              <el-select
                v-model="addform.gatherPersonId"
                placeholder="请选择采集人员"
              >
                <!-- @change="gatherPersonIdchage" -->
                <el-option
                  v-for="item in personnelList2Value"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable"><span class="formBj">*</span>训练人数:</div>
            <div class="formBox">
              <el-input
                oninput="value=value.replace(/[^\d]/g,'')"
                v-model="addform.numberPerson"
                placeholder="请输入训练人数"
                class="formInp"
                type="text"
              ></el-input>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <div class="formLable">
              <span class="formBj">*</span>携带装备情况:
            </div>
            <div class="equipfromBox">
              <i
                class="el-icon-circle-plus-outline addequip"
                @click="addequip"
              ></i>
              <div
                class="equipfromItem"
                v-for="(item, index) in addform.equipmentList"
                :key="index"
              >
                <el-select v-model="item.id" placeholder="请选择装备">
                  <el-option
                    v-for="item in tempoptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
                <el-input
                  v-model="item.num"
                  placeholder="请输入数量"
                  class="formInp"
                  type="text"
                  oninput="value=value.replace(/[^\d]/g,'')"
                ></el-input>
                <el-button
                  class="delateBtn"
                  v-if="addform.equipmentList.length > 1 && $store.state.ifBut"
                  type="text"
                  @click="deltequip(index)"
                  >删除</el-button
                >
              </div>
            </div>
          </div>
        </el-col>
      </el-row>

      <div class="qd">
        <el-button class="confirm1" @click="confirm" :loading="isloading"
          >确认</el-button
        >
        <el-button class="btn1" @click="cancel">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import detailHeader from "@/components/detailHeader";
export default {
  components: {
    detailHeader,
  },
  // watch: {
  //   personnelList2Value(newval, oldval) {
  //     this.gatherList = personnelList2Value;
  //   },
  // },
  data() {
    return {
      requstpersonnelList: [], //备份请求人员列表数据
      personnelList: [], //专业队人员
      personnelListValue: [], //选择的人员列表id
      personnelList2Value: [], //移动的人员列表对象
      isloading: false,
      fileList: [],
      professionalTeamList: [],
      value: "",
      value2: [],
      options: [],
      tempoptions: [],
      addform: {
        numberPerson: "",
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
      breadcrumbList: ["首页", "拉动点验", "新增"],
    };
  },
  mounted() {
    this.getTeamallList();
    this.equipmentlist();
    this.getPlayersallList();
  },
  methods: {
    // 专业队改变
    professionalTeamIchage() {
      this.$api
        .playersallList({ professionalTeamId: this.addform.professionalTeamId })
        .then((res) => {
          if (res.code == 200) {
            this.requstpersonnelList = JSON.parse(JSON.stringify(res.data));
            this.personnelList = res.data;
            this.personnelList2Value.forEach((item, index) => {
              let ispush = this.personnelList.some(
                (item1) => item1.id == item.id
              );
              if (!ispush) this.personnelList.push(item);
            });
          } else {
            this.$message.error(res.message);
          }
        });
    },
    // 人员发生改变
    handleChange(value, direction, movedKeys) {
      // 向右移动把人员对象,添加到移动的人员列表为更换源数据时进行回显
      if (direction == "right") {
        this.personnelList.forEach((item) => {
          let result = movedKeys.some((itemId) => item.id == itemId);
          if (result) this.personnelList2Value.push(item);
        });
      } else if (direction == "left") {
        // 判断是否为当前选中的采集人员,如果是,则把当前选中的采集人员id清空
        let result = movedKeys.some((id) => id == this.addform.gatherPersonId);
        if (result) this.addform.gatherPersonId = "";
        // 向左移动把人员从移动的人员列表中删除
        movedKeys.forEach((data) => {
          this.personnelList2Value.forEach((item, k) => {
            if (data == item.id) this.personnelList2Value.splice(k, 1);
          });
        });
        movedKeys.forEach((itemId, index2) => {
          let result = this.requstpersonnelList.some(
            (item) => itemId == item.id
          );
          // 源数据本身不存在此人员,使用splice删除
          if (!result) {
            this.personnelList.forEach((item, index) => {
              if (item.id == itemId) this.personnelList.splice(index, 1);
            });
          }
        });
      }
    },
    // 所有装备
    equipmentlist() {
      this.$api.equipmentlist().then((res) => {
        if (res.code == 200) {
          this.tempoptions = res.data;
        }
      });
    },
    // 所有队员
    getPlayersallList() {
      this.$api.playersallList().then((res) => {
        if (res.code == 200) {
          this.personnelList = res.data;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    // 专业队
    getTeamallList() {
      this.$api.teamallList().then((res) => {
        if (res.code == 200) {
          this.professionalTeamList = res.data;
        } else {
          this.$message.error(res.message);
        }
      });
    },

    confirm() {
      // 限制市区人防办选择人员
      if (this.$store.state.CityOrArea) {
        // 当前帐号为市区人防办
        if (this.personnelList2Value.length > this.addform.numberPerson) {
          this.$message.error("选择训练人员数量大于训练人数!");
          return;
        }
      } else {
        if (this.addform.numberPerson != this.personnelList2Value.length) {
          this.$message.error("选择训练人员数量不等于训练人数!");
          return;
        }
      }
      let data = this.$objValuefilter(this.addform);
      data.professionalTeamPersonInformationList = JSON.stringify(
        this.personnelList2Value
      );
      data.equipmentList = JSON.stringify(data.equipmentList);
      this.isloading = true;
      this.$api.pullcheckadd(data).then((res) => {
        this.isloading = false;
        if (res.code == 200) {
          this.$message({
            message: "新增成功",
            type: "success",
          });
          setTimeout(() => {
            this.$router.push("/pages/pullcheck/list");
          }, 1000);
        } else {
          this.$message.error({
            message: res.message,
          });
        }
      });
    },
    cancel() {
      this.$router.push("/pages/pullcheck/list");
    },
    handleError() {},
    deltequip(index) {
      this.addform.equipmentList.splice(index, 1);
    },
    addequip() {
      this.addform.equipmentList.push({});
    },
  },
};
</script>

<style lang="scss">
.imgBox {
  position: relative;
  width: 240px;
  height: 100px;
  .el-button {
    left: calc(50% - 20px);
    top: calc(50% - 20px);
    display: none;
    width: 50px;
    height: 40px;
    color: red;
    background: rgba(20, 20, 1, 0.3);
    position: absolute;
    z-index: 99;
  }
  img {
    width: 100%;
    height: 100%;
  }
}
.imgBox:hover {
  .el-button {
    display: block;
  }
}
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