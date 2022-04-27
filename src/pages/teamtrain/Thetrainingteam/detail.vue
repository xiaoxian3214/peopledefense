<template>
  <div>
    <detail-header
      title="详情"
      :breadcrumbList="breadcrumbList"
    ></detail-header>
    <div
      class="fromHeader"
      @click="$router.push('/pages/teamtrain/Thetrainingteam/list')"
    >
      <i class="el-icon-arrow-left"></i>
      <el-button type="text" style="color: black; font-size: 20px"
        >返回</el-button
      >
    </div>
    <div class="fromtableListBox detail">
      <el-row type="flex">
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <div class="formLable">参与训练的专业队:</div>
            <div class="formBox">
              {{ addform.professionalTeamId }}
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">训练开始时间:</div>
            <div class="formBox">
              {{ addform.startTime }}
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">训练地点:</div>
            <div class="formBox">
              {{ addform.address }}
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">训练科目:</div>
            <div class="formBox">
              {{ addform.trainingSubjectId }}
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="24">
          <div class="grid-content bg-purple">
            <div class="formLable">训练内容:</div>
            <div class="formBox">
              {{ addform.content }}
            </div>
          </div>
        </el-col>
        <!-- <el-col :span="12" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">训练人数:</div>
            <div class="formBox">
              {{ addform.numberPerson }}
            </div>
          </div>
        </el-col> -->
      </el-row>
      <el-row type="flex">
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <div class="formLable">授课人:</div>
            <div class="formBox">
              {{ addform.faculty }}
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">训练时间(分钟):</div>
            <div class="formBox">
              {{ addform.hours }}
            </div>
          </div>
        </el-col>
        <el-col :span="12" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">训练方式:</div>
            <div class="formBox">
              {{ addform.way }}
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <div class="formLable">训练人数:</div>
            <div class="formBox">{{ addform.numberPerson }} (人)</div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">考核方式:</div>
            <div class="formBox">
              {{ addform.accessType }}
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">训练计划:</div>
            <div class="formBox">
              {{ addform.planName }}
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2"> </el-col>
      </el-row>

      <el-row type="flex">
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <div class="formLable">创建人:</div>
            <div class="formBox">
              {{ addform.createUser }}
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">发布人:</div>
            <div class="formBox">
              {{ addform.releaseUser }}
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">队长(视频采集人员):</div>
            <div class="formBox">{{ addform.gatherPersonId }}</div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2"> </el-col>
      </el-row>

      <el-row type="flex">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <div class="formLable">队员:</div>
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
        <el-col :span="5" :offset="2">
          <!-- <div class="grid-content bg-purple">
            <div class="formLable">队长(视频采集人员):</div>
            <div class="formBox">{{ addform.gatherPersonId }}</div>
          </div> -->
        </el-col>
        <el-col :span="5" :offset="2"> </el-col>
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
      flagvalue: "",
      isloading: false,
      addform: {
        gatherPersonId: "",
        planName: "",
        id: "",
        professionalTeamId: "",
        startTime: "",
        address: "",
        trainingSubjectId: "",
        content: "",
        numberPerson: "",
        hours: "",
        faculty: "",
        createUser: "",
        way: "",
        accessType: "",
      },
      breadcrumbList: ["首页", "训练计划表", "详情"],
      id: this.$route.query.id,
    };
  },
  mounted() {
    this.trainingdetail();
  },
  methods: {
    //所有专业队
    teamallList() {
      this.$api.teamallList().then((res) => {
        res.data.forEach((item) => {
          if (item.id == this.addform.professionalTeamId) {
            this.addform.professionalTeamId = item.name;
          }
        });
      });
    },
    //所有训练科目
    trainingSubjectsallList() {
      this.$api.trainingSubjectsallList().then((res) => {
        res.data.forEach((item) => {
          if (item.id == this.addform.trainingSubjectId) {
            this.addform.trainingSubjectId = item.name;
          }
        });
      });
    },
    // 获取所有教员
    teacher() {
      this.$api.usergetAccountByRoleList().then((res) => {
        res.data.forEach((item) => {
          if (item.id == this.addform.faculty) {
            this.addform.faculty = item.name;
          }
        });
      });
    },

    // 详情
    trainingdetail() {
      this.$api.trainingdetail({ id: this.id }).then((res) => {
        if (res.code == 200) {
          this.addform = res.data;
          this.addform.professionalTeamPersonInformationList.forEach((item) => {
            if (item.id == this.addform.gatherPersonId) {
              this.addform.gatherPersonId = item.name;
            }
          });
          this.teamallList();
          this.trainingSubjectsallList();
          this.teacher();
          // this.trainingSubjectId = res.data.trainingSubjectId;
          // this.ZD_XLDJ()
        } else {
          this.$message.error(res.message);
        }
      });
    },
  },
};
</script>

<style>
</style>