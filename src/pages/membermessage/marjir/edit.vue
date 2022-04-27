<template>
  <div>
    <detail-header title="编辑专业队" :breadcrumbList="breadcrumbList"></detail-header>
    <div
      class="fromHeader"
      @click="
        () => {
          this.$router.back();
        }
      "
    >
      <i class="el-icon-arrow-left"></i>
      <el-button type="text" style="color: black; font-size: 20px">返回</el-button>
    </div>
    <div class="fromtableListBox extra deit">
      <el-row type="flex">
        <el-col :span="6" style="margin-right: 40px">
          <div class="grid-content bg-purple">
            <div class="formLable"><span class="formBj">*</span>专业队名称:</div>
            <div class="formBox">
              <el-input v-model="addform.name" placeholder="请输入专业队名称" class="formInp" type="text"></el-input>
            </div>
          </div>
        </el-col>
        <el-col :span="6" style="margin-right: 40px">
          <div class="grid-content bg-purple">
            <div class="formLable"><span class="formBj">*</span>行政区域:</div>
            <div class="formBox">
              <el-select v-model="addform.administrativeCode" placeholder="请选择行政区域" :disabled="$store.state.roleIdList.includes(2) && $store.state.roleIdList.length == 1" @change="getliaisonMan">
                <el-option v-for="item in administrativeregionList" :key="item.id" :label="item.name" :value="item.id"> </el-option>
              </el-select>
            </div>
          </div>
        </el-col>
        <el-col :span="6" style="margin-right: 40px">
          <div class="grid-content bg-purple">
            <div class="formLable"><span class="formBj">*</span>组建单位:</div>
            <div class="formBox">
              <el-input v-model="addform.buildUnit" placeholder="请输入组建单位" class="formInp" type="text"></el-input>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="6" style="margin-right: 40px">
          <div class="grid-content bg-purple">
            <div class="formLable"><span class="formBj">*</span>联络员:</div>
            <div class="formBox">
              <el-select v-model="responsiblePersonId" multiple placeholder="请选择联络员">
                <el-option v-for="item in userliaisonLisr" :key="item.id" :label="item.name" :value="item.id"> </el-option>
              </el-select>
            </div>
          </div>
        </el-col>
        <el-col :span="6" style="margin-right: 40px">
          <div class="grid-content bg-purple">
            <div class="formLable">是否为新型专业队:</div>
            <div class="formBox">
              <el-select v-model="addform.isNewTeam" placeholder="请选择">
                <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"> </el-option>
              </el-select>
            </div>
          </div>
        </el-col>
        <!-- <el-col :span="6" style="margin-right:40px">
          <div class="grid-content bg-purple">
            <div class="formLable">
              <span class="formBj">*</span>专业队编号:
            </div>
            <div class="formBox">
              <el-input
                maxlength="20"
                v-model="addform.number"
                placeholder="请输入专业队编号"
                class="formInp"
                type="text"
              ></el-input>
            </div>
          </div>
        </el-col> -->
        <el-col :span="6" style="margin-right: 40px">
          <div class="grid-content bg-purple">
            <div class="formLable"><span class="formBj">*</span>能力类型:</div>
            <div class="formBox">
              <el-select v-model="addform.abilityType" placeholder="请选择能力类型">
                <el-option v-for="item in skillclassList" :key="item.id" :label="item.name" :value="item.id"> </el-option>
              </el-select>
            </div>
          </div>
        </el-col>
        <!-- <el-col :span="6" style="margin-right:40px" :offset="3">
          <div class="grid-content bg-purple">
            <div class="formLable">分队名称:</div>
            <div class="formBox">
              <el-input
                v-model="addform.branchTeam"
                placeholder="请输入分队名称"
                class="formInp"
                type="text"
              ></el-input>
            </div>
          </div>
        </el-col> -->
        <!-- <el-col :span="6" style="margin-right:40px" :offset="3">
          <div class="grid-content bg-purple">
            <div class="formLable">值班电话:</div>
            <div class="formBox">
              <el-input
                oninput="value=value.replace(/[^\d-]/g,'')"
                maxlength="12"
                v-model="addform.dutyCalls"
                placeholder="请输入值班电话"
                class="formInp"
                type="text"
              ></el-input>
            </div>
          </div>
        </el-col> -->
        <!-- <el-col :span="6" style="margin-right:40px" :offset="3">
          <div class="grid-content bg-purple">
            <div class="formLable">人数:</div>
            <div class="formBox">
              <el-input
                v-model="addform.peopleNum"
                oninput="value=value.replace(/[^\d]/g,'')"
                placeholder="请输入人数"
                class="formInp"
                type="text"
              ></el-input>
            </div>
          </div>
        </el-col> -->
      </el-row>
      <el-row type="flex">
        <el-col :span="6" style="margin-right: 40px">
          <div class="grid-content bg-purple">
            <div class="formLable">分队名称:</div>
            <div class="formBox">
              <el-input v-model="addform.branchTeam" placeholder="请输入分队名称" class="formInp" type="text"></el-input>
            </div>
          </div>
        </el-col>
        <el-col :span="6" style="margin-right: 40px">
          <div class="grid-content bg-purple">
            <div class="formLable">经度:</div>
            <div class="formBox">
              <el-input v-model="addform.longitude" oninput="value=value.replace(/[^\d\.]/g,'')" placeholder="请输入经度" class="formInp" type="text"></el-input>
            </div>
          </div>
        </el-col>
        <el-col :span="6" style="margin-right: 40px">
          <div class="grid-content bg-purple">
            <div class="formLable">纬度:</div>
            <div class="formBox">
              <el-input v-model="addform.latitude" oninput="value=value.replace(/[^\d\.]/g,'')" placeholder="请输入纬度" class="formInp" type="text"></el-input>
            </div>
          </div>
        </el-col>
        <!-- <el-col :span="6" style="margin-right:40px" :offset="3">
          <div class="grid-content bg-purple">
            <div class="formLable"><span class="formBj">*</span>联络员:</div>
            <div class="formBox">
              <el-select
                v-model="addform.responsiblePersonId"
                placeholder="请选择联络员"
              >
                <el-option
                  v-for="item in userliaisonLisr"
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
        <el-col :span="6" style="margin-right:40px">
          <div class="grid-content bg-purple">
            <div class="formLable">
              应急联系人电话:
            </div>
            <div class="formBox">
              <el-input
                oninput="value=value.replace(/[^\d-]/g,'')"
                maxlength="12"
                v-model="addform.emergencyContactPersonPhone"
                placeholder="请输入应急联系人电话"
                class="formInp"
                type="text"
              ></el-input>
            </div>
          </div>
        </el-col>
        <el-col :span="6" style="margin-right:40px" :offset="3">
          <div class="grid-content bg-purple">
            <div class="formLable">联络人:</div>
            <div class="formBox">
              <el-input
                v-model="addform.responsiblePerson"
                placeholder="请输联络人姓名"
                class="formInp"
                type="text"
              ></el-input>
            </div>
          </div>
        </el-col>
        <el-col :span="6" style="margin-right:40px" :offset="3">
          <div class="grid-content bg-purple">
            <div class="formLable">
              联络人电话:
            </div>
            <div class="formBox">
              <el-input
                oninput="value=value.replace(/[^\d-]/g,'')"
                maxlength="12"
                v-model="addform.responsiblePersonPhone"
                placeholder="请输入联络人电话"
                class="formInp"
                type="text"
              ></el-input>
            </div>
          </div>
        </el-col>
      </el-row> -->
      <el-row type="flex">
        <!-- <el-col :span="6" style="margin-right:40px">
          <div class="grid-content bg-purple">
            <div class="formLable">能力类型:</div>
            <div class="formBox">
              <el-select
                v-model="addform.abilityType"
                placeholder="请选择能力类型"
              >
                <el-option
                  v-for="item in skillclassList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </el-col>
        <el-col :span="6" style="margin-right:40px" :offset="3">
          <div class="grid-content bg-purple">
            <div class="formLable">分队名称:</div>
            <div class="formBox">
              <el-input
                v-model="addform.branchTeam"
                placeholder="请输入分队名称"
                class="formInp"
                type="text"
              ></el-input>
            </div>
          </div>
        </el-col> -->
        <!-- <el-col :span="6" style="margin-right:40px" :offset="3">
          <div class="grid-content bg-purple">
            <div class="formLable">组建单位:</div>
            <div class="formBox">
              <el-input
                v-model="addform.buildUnit"
                placeholder="请输入组建单位"
                class="formInp"
                type="text"
              ></el-input>
            </div>
          </div>
        </el-col> -->
      </el-row>
      <!-- <el-row type="flex">
        <el-col :span="21">
          <div class="grid-content bg-purple">
            <div class="formLable">是否为新型专业队:</div>
            <div class="formBox">
              <el-select v-model="addform.isNewTeam" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </el-col>
      </el-row> -->
      <el-row type="flex">
        <el-col :span="6" style="margin-right: 40px">
          <div class="grid-content bg-purple">
            <div class="formLable">队伍地址:</div>
            <div class="formBox">
              <el-input v-model="addform.address" placeholder="请输入内容" class="formInp" type="text"></el-input>
            </div>
          </div>
        </el-col>
        <el-col :span="6" style="margin-right: 40px">
          <div class="grid-content bg-purple">
            <div class="formLable">队伍描述:</div>
            <div class="formBox">
              <el-input v-model="addform.teamDescribe" placeholder="请输入内容" class="formInp" type="text"></el-input>
            </div>
          </div>
        </el-col>
        <el-col :span="6" style="margin-right: 40px">
          <!-- <div class="grid-content bg-purple">
            <div class="formLable">组建单位:</div>
            <div class="formBox">
              <el-input
                v-model="addform.buildUnit"
                placeholder="请输入组建单位"
                class="formInp"
                type="text"
              ></el-input>
            </div>
          </div> -->
        </el-col>
      </el-row>
      <!-- <el-row type="flex">
        <el-col :span="21">
          <div class="grid-content bg-purple">
            <div class="formLable">队伍描述:</div>
            <div class="formBox">
              <el-input
                v-model="addform.teamDescribe"
                placeholder="请输入内容"
                class="formInp"
                type="text"
              ></el-input>
            </div>
          </div>
        </el-col>
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
      isloading: false,
      administrativeregionList: [],
      skillclassList: [],
        responsiblePersonId: [],
      addform: {
        id: this.$route.query.id,
        name: "",
        directorUnit: "",
        administrativeCode: "",
        abilityType: "",
        number: "",
        dutyCalls: "",
        branchTeam: "",
        address: "",
        longitude: "",
        latitude: "",
        peopleNum: "",
        buildUnit: "",
        liaisonUserIdStr:"",
        responsiblePerson: "",
        responsiblePersonPhone: "",
        emergencyContactPerson: "",
        emergencyContactPersonPhone: "",
        teamDescribe: "",
        isNewTeam: "",
      },
      breadcrumbList: ["首页", "系统管理", "专业队管理", "编辑"],
      id: this.$route.query.id,
      userliaisonLisr: [],
      options: [
        {
          id: 1,
          name: "是",
        },
        {
          id: 0,
          name: "否",
        },
      ],
    };
  },
  mounted() {
    this.ZD_ZZZH_ZYDNLLX();
    this.ZD_WZ_XZQDM();
    this.teamdetail();
    this.getUserliaison();
  },
  methods: {
    getliaisonMan(Id) {
      this.responsiblePersonId = [];
      this.$api.userliaison({ id: Id }).then((res) => {
        if (res.code == 200) {
          this.userliaisonLisr = res.data;
        }
      });
    },
    // 所有联络员
    getUserliaison() {
      this.$api.userliaison().then((res) => {
        if (res.code == 200) {
          this.userliaisonLisr = res.data;
        }
      });
    },
   async teamdetail() {
     await this.getUserliaison()
      this.$api.teamdetail({ id: this.id }).then((res) => {
        if (res.code == 200) {
          this.responsiblePersonId = res.data.liaisonList?.map(item=>item.liaisonUserId)
          this.addform = res.data;
          this.addform.abilityType = this.addform.abilityType;
          this.addform.administrativeCode = this.addform.administrativeCode;
          this.addform.isNewTeam = this.addform.isNewTeam;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    // 专业队能力类型
    ZD_ZZZH_ZYDNLLX() {
      this.$api.ZD_ZZZH_ZYDNLLX().then((res) => {
        if (res.code == 200) {
          this.skillclassList = res.page.records;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    // 行政区别
    ZD_WZ_XZQDM() {
      this.$api.ZD_WZ_XZQDM().then((res) => {
        if (res.code == 200) {
          this.administrativeregionList = res.page.records;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    confirm() {
      this.addform.liaisonUserIdStr = this.responsiblePersonId.join(',');
      // delete this.addform.liaisonList
      let data = this.$objValuefilter(this.addform);
      delete data.liaisonList
      this.isloading = true;
      this.$api.teamupdate(data).then((res) => {
        this.isloading = false;
        if (res.code == 200) {
          this.$message({
            message: "编辑成功",
            type: "success",
          });
          // // 更新缓存
          // let flgdata = JSON.parse(sessionStorage.getItem("data"));
          // flgdata.administrativeCode = this.addform.administrativeCode;
          // sessionStorage.setItem("data", flgdata);
          setTimeout(() => {
            this.$router.push("/pages/membermessage/marjir/list");
          }, 1000);
        } else {
          this.$message.error(res.message);
        }
      });
    },
    cancel() {
      this.$router.push("/pages/membermessage/marjir/list");
    },
  },
};
</script>

<style>
.extra .el-col-5 .grid-content.bg-purple {
  width: 198px !important;
}
.extra .el-col-21 {
  width: 780px;
}
</style>