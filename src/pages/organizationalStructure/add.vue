<template>
  <div>
    <detail-header
      title="添加子组织"
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
        <el-col :span="10">
          <div class="grid-content bg-purple">
            <div class="formLable">
              <span class="formBj">*</span>组织名称(一级):
            </div>
            <div class="formBox">
              <el-input
                disabled
                v-model="sendrow.noename"
                placeholder="请输入组织名称"
                class="formInp input"
                type="text"
              ></el-input>
            </div>
          </div>
        </el-col>
      </el-row>
      <!-- 二级组织必显 -->
      <el-row type="flex">
        <el-col :span="10">
          <div class="grid-content bg-purple">
            <div class="formLable">
              <span class="formBj">*</span>组织名称(二级):
            </div>
            <div class="formBox">
              <!-- 组织等级大2，二级输入框只读 -->
              <el-input
                :disabled="sendrow.level > 2 ? true : false"
                v-model="sendrow.twoname"
                placeholder="请输入组织名称"
                class="formInp input"
                type="text"
              ></el-input>
            </div>
          </div>
        </el-col>
      </el-row>
      <!-- 组织等级大于2显示三级输入框 -->
      <el-row type="flex" v-if="sendrow.level > 2">
        <el-col :span="10">
          <div class="grid-content bg-purple">
            <div class="formLable">
              <span class="formBj">*</span>组织名称(三级):
            </div>
            <div class="formBox">
              <!-- 组织等级大3，三级输入框只读 -->
              <el-input
                :disabled="sendrow.level > 3 ? true : false"
                v-model="sendrow.threename"
                placeholder="请输入组织名称"
                class="formInp input"
                type="text"
              ></el-input>
            </div>
          </div>
        </el-col>
      </el-row>
      <!-- 组织等级大于3显示四级输入框 -->
      <el-row type="flex" v-if="sendrow.level > 3">
        <el-col :span="10">
          <div class="grid-content bg-purple">
            <div class="formLable">
              <span class="formBj">*</span>组织名称(四级):
            </div>
            <div class="formBox">
              <!-- 四级组织直接绑定addfrom -->
              <el-input
                v-model="addform.name"
                placeholder="请输入组织名称"
                class="formInp input"
                type="text"
              ></el-input>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="10">
          <div class="grid-content bg-purple">
            <div class="formLable">联络员:</div>
            <div class="formBox">
              <el-select v-model="addform.liaison" placeholder="请选择">
                <el-option
                  v-for="item in liaisonManList"
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
      <el-row type="flex">
        <el-col :span="10">
          <div class="grid-content bg-purple">
            <div class="formLable">电话:</div>
            <div class="formBox">
              <el-input
                v-model="addform.phone"
                oninput="value=value.replace(/[^\d-]/g,'')"
                maxlength="12"
                placeholder="请输入联系电话"
                class="formInp"
                type="text"
              ></el-input>
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
  data() {
    return {
      isloading: false,
      addform: {
        name: "",
        level: "",
        parentId: "",
        liaison: "",
        phone: "",
      },
      breadcrumbList: ["首页", "系统管理", "组织管理", "添加子组织"],
      sendrow: JSON.parse(this.$route.query.row),
      liaisonManList: [],
    };
  },
  mounted() {
    // console.log(this.sendrow);
    this.userliaison();
  },
  methods: {
    userliaison() {
      this.$api.userliaison().then((res) => {
        if (res.code == 200) {
          this.liaisonManList = res.data;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    confirm() {
      if (this.sendrow.level == 3) {
        this.addform.name = this.sendrow.threename;
      } else if (this.sendrow.level == 2) {
        this.addform.name = this.sendrow.twoname;
      }
      this.addform.level = this.sendrow.level;
      this.addform.parentId = this.sendrow.parentId;
      this.isloading = true;
      this.$api.organizationalStructureadd(this.addform).then((res) => {
        this.isloading = false;
        if (res.code == 200) {
          this.$message({
            message: "新增成功",
            type: "success",
          });
          setTimeout(() => {
            this.$router.push("/pages/organizationalStructure/list");
          }, 1000);
        } else {
          this.$message.error(res.message);
        }
      });
    },
    cancel() {
      this.$router.push("/pages/organizationalStructure/list");
    },
  },
};
</script>

<style>
</style>