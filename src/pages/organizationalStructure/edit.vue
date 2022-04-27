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
        <el-col :span="10">
          <div class="grid-content bg-purple">
            <div class="formLable">
              <span class="formBj">*</span>组织名称(一级):
            </div>
            <div class="formBox">
              <el-input
                :disabled="sendrow.level == 1 ? false : true"
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
      <el-row type="flex" v-if="sendrow.level > 1">
        <el-col :span="10">
          <div class="grid-content bg-purple">
            <div class="formLable">
              <span class="formBj">*</span>组织名称(二级):
            </div>
            <div class="formBox">
              <!-- 组织等级大2，二级输入框只读 -->
              <el-input
                :disabled="sendrow.level == 2 ? false : true"
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
                :disabled="sendrow.level == 3 ? false : true"
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
                v-model="sendrow.fourname"
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
                placeholder="请输入联系电话"
                oninput="value=value.replace(/[^\d-]/g,'')"
                maxlength="12"
                class="formInp"
                type="text"
              ></el-input>
            </div>
          </div>
        </el-col>
      </el-row>
      <div class="qd">
        <el-button class="confirm1" @click="confirm" :loading="isloading">
          确认
        </el-button>
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
        id: "",
        name: "",
        level: "",
        parentId: "",
        liaison: "",
        phone: "",
      },
      breadcrumbList: ["首页", "系统管理", "组织管理", "编辑"],
      sendrow: JSON.parse(this.$route.query.row),
      liaisonManList: [],
      id: this.$route.query.id,
    };
  },
  mounted() {
    this.organizationalStructuredetail();
    this.userliaison();
  },
  methods: {
    organizationalStructuredetail() {
      this.$api
        .organizationalStructuredetail({ id: this.sendrow.id })
        .then((res) => {
          if (res.code == 200) {
            this.addform = res.data;
          } else {
            this.$message.error(res.message);
          }
        });
    },
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
      if (this.sendrow.level == 1) {
        this.addform.name = this.sendrow.noename;
      } else if (this.sendrow.level == 2) {
        this.addform.name = this.sendrow.twoname;
      } else if (this.sendrow.level == 3) {
        this.addform.name = this.sendrow.threename;
      } else if (this.sendrow.level == 4) {
        this.addform.name = this.sendrow.fourname;
      }
      this.isloading = true;
      this.$api.organizationalStructureupdate(this.addform).then((res) => {
        this.isloading = false;
        if (res.code == 200) {
          this.$message({
            message: "编辑成功",
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