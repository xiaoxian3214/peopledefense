<template>
  <div>
    <detail-header
      title="编辑人员"
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
        <el-col :span="5" :offset="2"> </el-col>
        <el-col :span="5" :offset="2"> </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="11">
          <div class="formLable">
            <span class="formBj" v-if="$store.state.roleIdList.includes(4)">*</span
            >选择训练人员:
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
        <el-col :span="5">
          <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple">
                <div class="formLable">
                  <span class="formBj">*</span>训练人数:
                </div>
                <div class="formBox">
                  <el-input
                    oninput="value=value.replace(/[^\d]/g,'')"
                    v-model="addform.numberPerson"
                    placeholder="请输入训练人数"
                    class="formInp"
                    type="text"
                    disabled
                  ></el-input>
                </div></div
            ></el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple">
                <div class="formLable">
                  <span class="formBj" v-if="$store.state.roleIdList.includes(4)">*</span
                  >队长(视频采集人员):
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
          </el-row>
        </el-col>
        <el-col :span="6"></el-col>
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
  data() {
    return {
      disabled: this.$store.state.roleIdList.includes(4) && this.$store.state.roleIdList.length == 1,
      requstpersonnelList: [], //备份请求人员列表数据
      personnelList: [], //专业队人员
      personnelListValue: [], //选择的人员列表id
      personnelList2Value: [], //移动的人员列表对象
      TheTrainingCourseList: [], //训练科目
      teamallallList: [], //所有的专业队
      allteacherLise: [], //所有教员
      isloading: false,
      options: [],
      trainingallPlanList: [],
      addform: {
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
      },
      sexoptions: [],
      breadcrumbList: ["首页", "考核管理", "队伍训练考核", "编辑人员"],
      id: this.$route.query.id,
    };
  },
  mounted() {
    this.trainingdetail();
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
            let ispush = null;
            this.personnelList2Value.forEach((item, index) => {
              ispush = false;
              this.personnelList.forEach((item1) => {
                if (item1.id == item.id) {
                  ispush = true;
                }
              });
              if (!ispush) {
                this.personnelList.unshift(item);
              }
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
          movedKeys.forEach((item1) => {
            if (item.id == item1) {
              if (this.personnelList2Value.indexOf(item) == -1) {
                this.personnelList2Value.push(item);
              }
            }
          });
        });
      } else if (direction == "left") {
        // 判断是否为当前选中的采集人员,如果是,则把当前选中的采集人员id清空
        let result = movedKeys.some((id) => id == this.addform.gatherPersonId);
        if (result) this.addform.gatherPersonId = "";
        // 向左移动把人员从移动的人员列表中删除
        movedKeys.forEach((data) => {
          this.personnelList2Value.forEach((item, k) => {
            if (data == item.id) {
              this.personnelList2Value.splice(k, 1);
            }
          });
        });
        // 使用备份的请求数据判断是否需要向左移动
        let isMove;
        movedKeys.forEach((item2, index2) => {
          isMove = false;
          this.requstpersonnelList.forEach((item3, index3) => {
            if (item3.id == item2) {
              isMove = true;
            }
          });
          if (!isMove) {
            this.personnelList.forEach((item4, index4) => {
              if (item4.id == item2) {
                this.personnelList.splice(index4, 1);
              }
            });
          }
        });
      }
    },
    // 详情
    trainingdetail() {
      this.$api.trainingdetail({ id: this.id }).then((res) => {
        if (res.code == 200) {
          this.addform = res.data;
          // 拿到所有选择人员的id进行回显
          this.personnelList2Value =
            this.addform.professionalTeamPersonInformationList;
          this.professionalTeamIchage();
          this.personnelListValue =
            this.addform.professionalTeamPersonInformationList.map((item) => {
              return item.id;
            });
          // 联络员做有限制没办法正常回显
          if (this.disabled) {
            this.addform.planIdCop = this.addform.planId;
            this.addform.planId = this.addform.planName;
          }
        } else {
          this.$message.error(res.message);
        }
      });
    },
    confirm() {
      // 是联络员选择的必须是和训练人数相等的，而县和市人防办必须小于指定人数
      // 联络员选择人员数必须等于训练人数
      // if (this.$store.state.roleIdList.includes(4) && this.$store.state.roleIdList.length == 1) {
      //   if (this.addform.numberPerson != this.personnelList2Value.length) {
      //     this.$message.error("参与训练人员数不等于训练人数!");
      //     return;
      //   }
      // }else if(this.$store.state.CityOrArea){
      //   // 市和区人防办可以选择大于训练人数人员数量
      //    if (this.personnelList2Value.length > this.addform.numberPerson) {
      //     this.$message.error("参与训练人员数大于训练人数!");
      //     return;
      //    }
      // }

     if (this.personnelList2Value.length > this.addform.numberPerson) {
          this.$message.error("参与训练人数不能大于指定人数!");
          return;
     }
      // 联络员做有限制没办法正常回显
      if (this.disabled) {
        this.addform.planId = this.addform.planIdCop;
      }

      let data = this.$objValuefilter(this.addform);
      data.teamId = this.addform.professionalTeamId;
      data.professionalTeamPersonInformationList = JSON.stringify(
        this.personnelList2Value
      );
      this.isloading = true;
      data.id = this.id;
      this.$api.trainingUpdatePersonList(data).then((res) => {
        this.isloading = false;
        if (res.code == 200) {
          this.$message({
            message: "编辑成功",
            type: "success",
          });
          setTimeout(() => {
            // this.$router.push("/pages/teamtrain/Thetrainingteam/list");
            this.$router.back();
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

<style>
</style>