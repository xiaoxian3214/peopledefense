<template>
  <div>
    <detail-header
      title="编辑"
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
            <div class="formLable"><span class="formBj">*</span>人员姓名:</div>
            <div class="formBox">
              <el-input
                v-model="addform.name"
                maxlength="50"
                placeholder="请输入姓名"
                class="formInp"
                type="text"
              ></el-input>
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">专业:</div>
            <div class="formBox">
              <el-input
                v-model="addform.professional"
                maxlength="50"
                placeholder="请输入专业"
                class="formInp"
                type="text"
              ></el-input>
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable"><span class="formBj">*</span>性别:</div>
            <div class="formBox">
              <el-select v-model="addform.sex" placeholder="请选择">
                <el-option
                  v-for="item in sexList"
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
            <div class="formLable">年龄:</div>
            <div class="formBox">
              <el-input
                oninput="value=value.replace(/[^\d]/g,'')"
                maxlength="3"
                v-model="addform.age"
                placeholder="请输入年龄"
                class="formInp"
                type="text"
              ></el-input>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <div class="formLable">
              <span class="formBj">*</span>专业队伍名称:
            </div>
            <div class="formBox">
              <el-select
                v-model="addform.professionalTeamName"
                placeholder="请选择所属专业队"
                @change="Teamchage"
              >
                <el-option
                  v-for="item in professionalTeamList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </el-col>
        <el-col :span="12" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">
              <span class="formBj">*</span>专业队编号:
            </div>
            <div class="formBox">
              <el-input
                readonly
                v-model="addform.number"
                placeholder="请选择所属专业队"
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
            <div class="formLable">联系地址:</div>
            <div class="formBox">
              <el-input
                v-model="addform.householdRegistration"
                placeholder="请输入居住地址"
                class="formInp"
                type="text"
              ></el-input>
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">入队时间:</div>
            <div class="formBox">
              <el-date-picker
                v-model="addform.intoTeamDate"
                type="date"
                placeholder="选择入队时间"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                :picker-options="$store.state.timeChange"
              >
              </el-date-picker>
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">
              <span class="formBjd">*</span>文化程度:
            </div>
            <div class="formBox">
              <el-select
                v-model="addform.levelOfEducation"
                placeholder="请选择文化程度"
              >
                <el-option
                  v-for="item in educationbackgroundList"
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
      </el-row>
      <el-row type="flex">
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <div class="formLable">
              <span class="formBjd">*</span>政治面貌:
            </div>
            <div class="formBox">
              <el-select
                v-model="addform.politics"
                placeholder="请选择政治面貌"
              >
                <el-option
                  v-for="item in politicsStatusList"
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
            <div class="formLable"><span class="formBj">*</span>联系电话:</div>
            <div class="formBox">
              <el-input
                oninput="value=value.replace(/[^\d-]/g,'')"
                maxlength="12"
                v-model="addform.phone"
                placeholder="请输入联系电话"
                class="formInp"
                type="text"
              ></el-input>
            </div>
          </div>
        </el-col>
        <el-col :span="12" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">
              <span class="formBj">*</span>身份证号码:
            </div>
            <div class="formBox">
              <el-input
                v-model="addform.idCard"
                placeholder="请输入身份证号码"
                class="formInp"
                maxlength="18"
                oninput="value=value.replace(/[^A-Za-z0-9]+$/g,'')"
                type="text"
              ></el-input>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <div class="formLable">职务:</div>
            <div class="formBox">
              <el-input
                v-model="addform.position"
                placeholder="请选择职务"
                class="formInp"
                type="text"
              ></el-input>
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">
              <span class="formBjd">*</span>主管单位:
            </div>
            <div class="formBox">
              <el-input
                v-model="addform.directorUnit"
                placeholder="请选择主管单位"
                class="formInp"
                type="text"
              ></el-input>
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2"> </el-col>
        <el-col :span="5" :offset="2"> </el-col>
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
      isloading: false,
      addform: {
        id: this.$route.query.id,
        name: "",
        professional: "",
        sex: "",
        age: "",
        professionalTeamName: "",
        number: "",
        householdRegistration: "",
        intoTeamDate: "",
        birthday: "",
        levelOfEducation: "",
        politics: "",
        phone: "",
        position: "",
        idCard: "",
        directorUnit: "",
        address: "",
        remark: "",
      },
      sexList: [],
      politicsStatusList: [],
      educationbackgroundList: [],
      professionalTeamList: [],
      breadcrumbList: ["首页", "系统管理", "数据共享", "编辑"],
      id: this.$route.query.id,
    };
  },
  mounted() {
    this.ZD_ZZZH_XB();
    this.getTeamallList();
    this.ZD_XLDJ();
    this.ZD_ZZZH_ZZMM();
    this.playersdetail(this.id);
  },
  methods: {
    Teamchage(item1) {
      let data = this.professionalTeamList.find((item) => item.name === item1);
      this.addform.number = data.number;
    },
    // 性别
    ZD_ZZZH_XB() {
      this.$api.ZD_ZZZH_XB().then((res) => {
        if (res.code == 200) {
          this.sexList = res.page.records;
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
    // 文化等级
    ZD_XLDJ() {
      this.$api.ZD_XLDJ().then((res) => {
        if (res.code == 200) {
          this.educationbackgroundList = res.page.records;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    // 政治面貌
    ZD_ZZZH_ZZMM() {
      this.$api.ZD_ZZZH_ZZMM().then((res) => {
        if (res.code == 200) {
          this.politicsStatusList = res.page.records;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    playersdetail(id) {
      this.$api.playersdetail({ id }).then((res) => {
        if (res.code == 200) {
          this.addform = res.data;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    confirm() {
      if (!this.addform.name) {
        this.$message.error("请输入名称");
        return;
      } else if (!this.addform.sex) {
        this.$message.error("请选择性别");
        return;
      }
      let data = this.$objValuefilter(this.addform);
      this.isloading = true;
      this.$api.playersupdate(data).then((res) => {
        this.isloading = false;
        if (res.code == 200) {
          this.$message({
            message: "编辑成功",
            type: "success",
          });
          setTimeout(() => {
            this.$router.push("/pages/management/DS/list");
          }, 1000);
        } else {
          this.$message.error(res.message);
        }
      });
    },
    cancel() {
      this.$router.push("/pages/management/DS/list");
    },
  },
};
</script>

<style>
</style>