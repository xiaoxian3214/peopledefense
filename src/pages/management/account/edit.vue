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
            <div class="formLable"><span class="formBj">*</span>姓名:</div>
            <div class="formBox">
              <el-input
                v-model="addform.name"
                placeholder="请输入姓名"
                class="formInp"
                type="text"
              ></el-input>
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable"><span class="formBj">*</span>账号:</div>
            <div class="formBox">
              <el-input
                v-model="addform.account"
                placeholder="请输入账号"
                class="formInp"
                type="text"
              ></el-input>
            </div>
          </div>
        </el-col>
        <!-- <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable"><span class="formBj">*</span>密码:</div>
            <div class="formBox">
              <el-input
                v-model="addform.password"
                placeholder="请输入密码"
                class="formInp"
                type="password"
              ></el-input>
            </div>
          </div>
        </el-col> -->
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable"><span class="formBj">*</span>角色:</div>
            <div class="formBox">
              <el-select v-model="addform.roleIdList" multiple placeholder="选择角色">
                <div v-for="item in characterList" :key="item.id">
               <!-- if判断当前角色只是县人防办的时候取不能选择市人防办 -->
                  <el-option
                    v-if="($store.state.roleIdList.includes(2) && $store.state.roleIdList.length == 1) ? item.id != 1 : true"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </div>
              </el-select>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <div class="formLable"><span class="formBj">*</span>单位/职务:</div>
            <div class="formBox">
              <el-input
                v-model="addform.position"
                placeholder="请输入单位/职务"
                class="formInp"
                type="text"
              ></el-input>
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable"><span class="formBj">*</span>手机号码:</div>
            <div class="formBox">
              <el-input
                v-model="addform.phone"
                maxlength="12"
                oninput="value=value.replace(/[^\d-]/g,'')"
                placeholder="请输入手机号"
                class="formInp"
                type="text"
              ></el-input>
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable"><span class="formBj">*</span>行政区域:</div>
            <div class="formBox">
              <!-- 只是县人防办不可以选择行政区域 -->
              <el-select
                v-model="addform.administrativeCode"
                placeholder="选择行政区域"
                :disabled="$store.state.roleIdList.includes(2) && $store.state.roleIdList.length == 1"
              >
                <el-option
                  v-for="item in administrativeList"
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
import { throttle } from "@/utils/tools.js";
export default {
  components: {
    detailHeader,
  },
  data() {
    return {
      isloading: false,
      addform: {
        phone: "",
        name: "",
        account: "",
        password: "",
        roleIdList: "",
        position: "",
      },
      administrativeList: [],
      characterList: [],
      breadcrumbList: ["首页", "系统管理", "账号管理", "编辑"],
      id: this.$route.query.id,
    };
  },
  mounted() {
    this.rolegetRoleList();
    this.getAdministrativeList();
    this.userdetail();
    console.log(this.$store.state);
  },
  methods: {
    // 获取行政区
    getAdministrativeList() {
      this.$api.ZD_XZQDM().then((res) => {
        if (res.code == 200) {
          this.administrativeList = res.page.records;
          this.administrativeList.forEach((item, index) => {
            if (item.id == 310) {
              this.administrativeList.splice(index, 1);
            }
          });
        }
      });
    },
    userdetail() {
      this.$api.userdetail({ id: this.id }).then((res) => {
        if (res.code == 200) {
          this.addform = res.data;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    // 所有角色
    rolegetRoleList() {
      this.$api.rolegetRoleList().then((res) => {
        if (res.code == 200) {
          this.characterList = res.data;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    confirm() {
      // console.log(this.addform);
      if (!this.addform.phone) {
        this.$message.error("请输入手机号");
        return;
      }
      this.isloading = true;
      this.addform.roleIds = this.addform.roleIdList.join(',')
      delete this.addform.roleIdList
      this.$api.userupdate(this.addform).then((res) => {
        this.isloading = false;
        if (res.code == 200) {
          this.$message({
            message: "编辑成功",
            type: "success",
          });
          // console.log(JSON.parse(sessionStorage.getItem("data")));
          // // 更新缓存
          // let flgdata = JSON.parse(sessionStorage.getItem("data"));
          // flgdata.administrativeCode = this.addform.administrativeCode;
          // sessionStorage.setItem("data", JSON.stringify(flgdata));
          // return;
          setTimeout(() => {
            this.$router.push("/pages/management/account/list");
          }, 800);
        } else {
          this.$message.error(res.message);
        }
      });
    },
    cancel() {
      this.$router.push("/pages/management/account/list");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>