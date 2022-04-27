<template>
  <div>
    <detail-header title="新增训练" :breadcrumbList="breadcrumbList"></detail-header>
    <div class="fromHeader" @click="$router.back()">
      <i class="el-icon-arrow-left"></i>
      <el-button type="text" style="color: black; font-size: 20px">返回</el-button>
    </div>
    <div class="fromtableListBox">
      <el-row type="flex">
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <div class="formLable"><span class="formBj">*</span>训练计划:</div>
            <div class="formBox">
              <el-select @change="getNum" v-model="addform.planId" placeholder="请选择训练计划">
                <el-option v-for="item in trainingallPlanList" :key="item.id" :label="item.name" :value="item.id"> </el-option>
              </el-select>
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable"><span class="formBj">*</span>参与训练的专业队:</div>
            <div class="formBox">
              <el-select @change="participation" v-model="addform.professionalTeamId" placeholder="请选择专业队">
                <el-option v-for="item in teamallallList" :key="item.id" :label="item.name" :value="item.id"> </el-option>
              </el-select>
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable"><span class="formBj">*</span>训练开始时间:</div>
            <div class="formBox">
              <el-date-picker value-format="yyyy-MM-dd HH:mm" v-model="addform.startTime" type="datetime" placeholder="选择训练开始时间" :picker-options="$store.state.option" @change="handle" format="yyyy-MM-dd HH:mm"> </el-date-picker>
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable"><span class="formBj">*</span>训练地点:</div>
            <div class="formBox">
              <el-input v-model="addform.address" placeholder="请输入训练地点" class="formInp" type="text"></el-input>
            </div>
          </div>
        </el-col>
      </el-row>

      <el-row type="flex">
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <div class="formLable"><span class="formBj">*</span>授课人:</div>
            <div class="formBox">
              <el-select v-model="addform.faculty" placeholder="请选择教员姓名">
                <el-option v-for="item in allteacherLise" :key="item.id" :label="item.name" :value="item.id"> </el-option>
              </el-select>
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable"><span class="formBj">*</span>训练科目:</div>
            <div class="formBox">
              <el-select v-model="addform.trainingSubjectId" placeholder="请输入训练科目" @change="SubjectChange">
                <el-option v-for="item in TheTrainingCourseList" :key="item.id" :label="item.name" :value="item.id"> </el-option>
              </el-select>
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable"><span class="formBj">*</span>训练时间(分钟):</div>
            <div class="formBox">
              <el-input oninput="value=value.replace(/[^\d]/g,'')" v-model="addform.hours" placeholder="请输入训练时长" class="formInp" type="text"></el-input>
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable"><span class="formBj">*</span>训练人数:</div>
            <div class="formBox">
              <el-input oninput="value=value.replace(/[^\d]/g,'')" v-model="addform.numberPerson" placeholder="请输入训练人数" class="formInp" type="text"></el-input>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="24">
          <div class="grid-content bg-purple">
            <div class="formLable"><span class="formBj">*</span>训练内容:</div>
            <div class="formBox">
              <el-input v-model="addform.content" placeholder="请输入训练内容" type="textarea" :autosize="{ minRows: 4, maxRows: 4 }"></el-input>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <div class="">考核方式:</div>
            <div class="formBox">
              <el-input v-model="addform.accessType" placeholder="请输入考核方式" class="formInp" type="text"></el-input>
            </div>
          </div>
        </el-col>
        <el-col :span="12" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">训练方式:</div>
            <div class="formBox">
              <el-input v-model="addform.way" placeholder="请输入训练方式" class="formInp" type="text"></el-input>
            </div>
          </div>
        </el-col>
        <!-- <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable"><span class="formBj">*</span>训练计划:</div>
            <div class="formBox">
              <el-select v-model="addform.planId" placeholder="请选择训练计划">
                <el-option
                  v-for="item in trainingallPlanList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </el-col> -->
      </el-row>
      <!-- <el-row type="flex">
        <el-col :span="12">
          <div class="formLable">
            选择训练人员:
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
              队长(视频采集人员):
            </div>
            <div class="formBox">
              <el-select
                v-model="addform.gatherPersonId"
                placeholder="请选择采集人员"
              >
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
        <el-col :span="5" :offset="2"> </el-col>
      </el-row> -->
      <div class="qd">
        <el-button class="confirm1" @click="confirm" :loading="isloading">确认</el-button>
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
  data() {
    return {
      requstpersonnelList: [], //备份请求人员列表数据
      personnelList: [], //专业队人员
      personnelListValue: [], //选择的人员列表id
      personnelList2Value: [], //移动的人员列表对象
      TheTrainingCourseList: [], //训练科目
      teamallallList: [], //所有的专业队
      allteacherLise: [], //所有教员
      isloading: false,
      sexvalue: "",
      sexoptions: "",
      ageoptions: "",
      trainingallPlanList: [],
      addform: {
        gatherPersonId: "",
        planId: "",
        trainingSubjectId: "",
        professionalTeamId: "",
        startTime: "",
        address: "",
        content: "",
        hours: "",
        faculty: "",
        way: "",
        numberPerson: "",
        accessType: "",
        // professionalTeamPersonInformationList: [{}],
      },
      sexoptions: [],
      breadcrumbList: ["首页", "训练计划表", "新增训练"],
    };
  },
  mounted() {
    this.trainingSubjectsallList();
    this.teamallList();
    this.teacher();
    this.trainingallPlan();
  },
  watch: {
    allteacherLise(newVal, oldVal) {
      this.addform.faculty = "";
    },
  },
  methods: {
    participation(id) {
      let item = this.teamallallList.find((item) => item.id == id);
      this.$api.usergetAccountByRoleList({ administrativeCode: item.administrativeCode }).then((res) => {
        this.allteacherLise = res.data;
      });
    },
    getNum() {
      this.$api
        .trainingTrainingPersonNum({
          teamId: this.addform.professionalTeamId,
          planId: this.addform.planId,
        })
        .then((res) => {
          if (res.code == 200) {
            this.addform.numberPerson = res.data.numberPerson;
          } else {
            this.addform.numberPerson = "";
          }
        });
    },
    handle: function () {
      var startAt = (new Date(this.date) * 1000) / 1000;
      if (startAt < Date.now()) {
        this.date = new Date();
      }
    },
    SubjectChange(item1) {
      let findData = this.TheTrainingCourseList.find((item) => item.id == item1);
      this.addform.content = findData.content;
    },
    //#region
    // // 专业队改变
    // professionalTeamIchage() {
    //   this.$api
    //     .playersallList({ professionalTeamId: this.addform.professionalTeamId })
    //     .then((res) => {
    //       if (res.code == 200) {
    //         this.requstpersonnelList = JSON.parse(JSON.stringify(res.data));
    //         this.personnelList = res.data;
    //         let ispush;
    //         this.personnelList2Value.forEach((item, index) => {
    //           ispush = false;
    //           this.personnelList.forEach((item1) => {
    //             if (item1.id == item.id) {
    //               ispush = true;
    //             }
    //           });
    //           if (!ispush) {
    //             this.personnelList.unshift(item);
    //           }
    //         });
    //       } else {
    //         this.$message.error(res.message);
    //       }
    //     });
    // },
    // // 人员发生改变
    // handleChange(value, direction, movedKeys) {
    //   // 向右移动把人员对象,添加到移动的人员列表为更换源数据时进行回显
    //   if (direction == "right") {
    //     this.personnelList.forEach((item) => {
    //       movedKeys.forEach((item1) => {
    //         if (item.id == item1) {
    //           if (this.personnelList2Value.indexOf(item) == -1) {
    //             this.personnelList2Value.push(item);
    //           }
    //         }
    //       });
    //     });
    //   } else if (direction == "left") {
    //     // 判断是否为当前选中的采集人员,如果是,则把当前选中的采集人员id清空
    //     let result = movedKeys.some((id) => id == this.addform.gatherPersonId);
    //     if (result) this.addform.gatherPersonId = "";
    //     // 向左移动把人员从移动的人员列表中删除
    //     movedKeys.forEach((data) => {
    //       this.personnelList2Value.forEach((item, k) => {
    //         if (data == item.id) {
    //           this.personnelList2Value.splice(k, 1);
    //         }
    //       });
    //     });
    //     // 使用备份的请求数据判断是否需要向左移动
    //     let isMove;
    //     movedKeys.forEach((item2, index2) => {
    //       isMove = false;
    //       this.requstpersonnelList.forEach((item3, index3) => {
    //         if (item3.id == item2) {
    //           isMove = true;
    //         }
    //       });
    //       if (!isMove) {
    //         this.personnelList.forEach((item4, index4) => {
    //           if (item4.id == item2) {
    //             this.personnelList.splice(index4, 1);
    //           }
    //         });
    //       }
    //     });
    //   }
    // },
    //#endregion
    // 获取所有计划
    trainingallPlan() {
      this.$api.trainingallPlan().then((res) => {
        if (res.code == 200) {
          this.trainingallPlanList = res.data;
        }
      });
    },
    // 获取所有教员
    teacher() {
      this.$api.usergetAccountByRoleList().then((res) => {
        this.allteacherLise = res.data;
      });
    },
    // 所有训练科目
    trainingSubjectsallList() {
      this.$api.trainingSubjectsallList().then((res) => {
        if (res.code == 200) {
          this.TheTrainingCourseList = res.data;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    // 所有专业队
    teamallList() {
      this.$api.teamallList().then((res) => {
        if (res.code == 200) {
          this.teamallallList = res.data;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    confirm() {
      // // // 限制市区人防办选择人员
      // console.log(this.$store.state.CityOrArea);
      // if (this.$store.state.CityOrArea) {
      //   // 当前帐号为市区人防办
      //   if (this.personnelList2Value.length > this.addform.numberPerson) {
      //     this.$message.error("选择训练人员数量大于训练人数!");
      //     return;
      //   }
      // } else if ( this.$store.state.roleIdList.includes(4)) {
      //   if (this.addform.numberPerson != this.personnelList2Value.length) {
      //     this.$message.error("选择训练人员数量不等于训练人数!");
      //     return;
      //   }
      // }
      // if (this.$store.state.roleIdList.includes(4) && this.$store.state.roleIdList.length == 1) {
      //   // 此人是联络员
      //    if (this.addform.numberPerson != this.personnelList2Value.length) {
      //     this.$message.error("参与训练人员数不等于训练人数!");
      //     return;
      //   }
      // }else if (this.$store.state.CityOrArea) {
      //   // 此人是市区人防办
      //    if (this.personnelList2Value.length > this.addform.numberPerson) {
      //     this.$message.error("参与训练人员数大于训练人数!");
      //     return;
      //   }
      // }
      if (this.personnelList2Value.length > this.addform.numberPerson) {
          this.$message.error("参与训练人数大于指定人数!");
          return;
      }
      let data = this.$objValuefilter(this.addform);
      // data.professionalTeamPersonInformationList = JSON.stringify(
      //   this.personnelList2Value
      // );
      this.isloading = true;
      this.$api.trainingadd(data).then((res) => {
        this.isloading = false;
        if (res.code == 200) {
          this.$message({
            message: "新增成功",
            type: "success",
          });
          setTimeout(() => {
            this.$router.push("/pages/teamtrain/Thetrainingteam/list");
          }, 1000);
        } else {
          this.$message.error(res.message);
        }
      });
    },
    cancel() {
      this.$router.push("/pages/teamtrain/Thetrainingteam/list");
    },
  },
};
</script>

<style lang="scss" >
.fromtableListBox {
  // ::v-deep {
  //   .el-picker-panel__icon-btn.el-date-picker__prev-btn.el-icon-d-arrow-left {
  //     font-size: 20px !important;
  //   }
  // }
}
</style>