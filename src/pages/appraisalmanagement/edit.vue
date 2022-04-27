<template>
  <div>
    <detail-header
      title="编辑"
      :breadcrumbList="breadcrumbList"
      ref="detailheader"
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
              <span class="formBj">*</span>参与训练的专业队:
            </div>
            <div class="formBox">
              <el-input
                v-model="addform.professionalTeam"
                placeholder="请输入训练方式"
                readonly
                class="formInp"
                type="text"
              ></el-input>
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable"><span class="formBj">*</span>考核类型:</div>
            <div class="formBox">
              <el-select
                v-model="addform.type"
                placeholder="请选择考核类型"
                :disabled="true"
              >
                <el-option
                  v-for="item in assessType"
                  :key="item.type"
                  :label="item.name"
                  :value="item.type"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable"><span class="formBj">*</span>创建时间:</div>
            <div class="formBox">
              <el-date-picker
                readonly
                value-format="yyyy-MM-dd HH:mm"
                format="yyyy-MM-dd HH:mm"
                v-model="addform.createTime"
                type="datetime"
                placeholder="选择训练创建时间"
              >
              </el-date-picker>
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable"><span class="formBj">*</span>训练人数:</div>
            <div class="formBox">
              <el-input
                v-model="addform.numberPerson"
                placeholder="请输入训练人数"
                readonly
                class="formInp"
                type="text"
              ></el-input>
            </div>
          </div>
        </el-col>
      </el-row>
      <!-- ---------------------训练计划------------------------- -->
      <el-row type="flex" v-if="type == 1">
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <div class="formLable">
              <span class="formBj">*</span>训练开始时间:
            </div>
            <div class="formBox">
              <el-date-picker
                readonly
                value-format="yyyy-MM-dd HH:mm"
                format="yyyy-MM-dd HH:mm"
                v-model="addform.startTime"
                type="datetime"
                placeholder="选择训练开始时间"
              >
              </el-date-picker>
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable"><span class="formBj">*</span>训练地点:</div>
            <div class="formBox">
              <el-input
                readonly
                v-model="addform.address"
                placeholder="请输入训练地点"
                class="formInp"
                type="text"
              ></el-input>
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable"><span class="formBj">*</span>训练科目:</div>
            <div class="formBox">
              <el-input
                readonly
                v-model="addform.trainingSubject"
                placeholder="请输入训练地点"
                class="formInp"
                type="text"
              ></el-input>
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable"><span class="formBj">*</span>训练内容:</div>
            <div class="formBox">
              <el-input
                v-model="addform.content"
                placeholder="请输入训练内容"
                readonly
                class="formInp"
                type="text"
              ></el-input>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex" v-if="type == 1">
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <div class="formLable"><span class="formBj">*</span>训练时长:</div>
            <div class="formBox">
              <el-input
                readonly
                v-model="addform.hours"
                placeholder="请输入训练时长"
                class="formInp"
                type="text"
              ></el-input>
            </div>
          </div>
        </el-col>

        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable"><span class="formBj">*</span>教员:</div>
            <div class="formBox">
              <el-input
                readonly
                v-model="addform.faculty"
                placeholder="请选择教员"
                class="formInp"
                type="text"
              ></el-input>
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">
              <span class="formBj">*</span>训练计划创建人:
            </div>
            <div class="formBox">
              <el-input
                v-model="addform.createUser"
                placeholder="请输入训练计划创建人"
                readonly
                class="formInp"
                type="text"
              ></el-input>
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable"><span class="formBj">*</span>训练方式:</div>
            <div class="formBox">
              <el-input
                v-model="addform.way"
                readonly
                placeholder="请输入训练方式"
                class="formInp"
                type="text"
              ></el-input>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex" v-if="type == 1">
        <el-col :span="24">
          <div class="grid-content bg-purple">
            <div class="formLable">
              <span class="formBj">*</span>训练人员列表:<el-button
                @click="editPeople"
                >编辑人员</el-button
              >
            </div>
            <div class="formBox">
              <!-- :row-style="{ height: '54px' }"
                :header-row-style="{ height: '54px' }"
                :header-cell-style="{ background: '#F5F6FA' }"
                :cell-style="{ padding: '0' }" -->
              <el-table
                :data="addform.trainingPlayerList"
                ref="table"
                :highlight-current-row="false"
              >
                <el-table-column
                  prop="name"
                  label="姓名"
                  width="300"
                  align="center"
                ></el-table-column>
                <el-table-column></el-table-column>
                <el-table-column
                  label="成绩"
                  prop="grade"
                  :show-overflow-tooltip="true"
                  align="center"
                  width="260"
                >
                  <template slot-scope="scope">
                    <el-select
                      v-model="scope.row.grade"
                      placeholder="请选择成绩"
                    >
                      <el-option
                        v-for="item in scoreList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      >
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-col>
      </el-row>

      <!-- ------------拉练任务内容----------------- -->
      <el-row type="flex" v-if="type == 2">
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <div class="formLable"><span class="formBj">*</span>任务名称:</div>
            <div class="formBox">
              <el-input
                v-model="addform.taskName"
                placeholder="请输入训练方式"
                readonly
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
                format="yyyy-MM-dd HH:mm"
                type="datetime"
                readonly
                placeholder="选择训练创建时间"
              >
              </el-date-picker>
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable"><span class="formBj">*</span>集结地点:</div>
            <div class="formBox">
              <el-input
                v-model="addform.assemblyArea"
                readonly
                placeholder="请输入集结地点"
                class="formInp"
                type="text"
              ></el-input>
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2"> </el-col>
      </el-row>
      <el-row v-if="type == 2">
        <el-col :span="24">
          <div class="grid-content bg-purple">
            <div class="formLable"><span class="formBj">*</span>人员列表:</div>
            <div class="formBox">
              <!-- :row-style="{ height: '54px' }"
                :header-row-style="{ height: '54px' }"
                :header-cell-style="{ background: '#F5F6FA' }"
                :cell-style="{ padding: '0' }"  :stripe="false"-->
              <el-table :data="addform.taskPlayerList" ref="table">
                <el-table-column
                  label="姓名"
                  prop="name"
                  align="center"
                ></el-table-column>
                <el-table-column
                  label="成绩"
                  prop="grade"
                  :show-overflow-tooltip="true"
                  align="center"
                >
                  <template slot-scope="scope">
                    <el-select
                      v-model="scope.row.grade"
                      placeholder="请选择成绩"
                    >
                      <el-option
                        v-for="item in scoreList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      >
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  label="人册是否相符"
                  prop="isOneBook"
                  :show-overflow-tooltip="true"
                  align="center"
                >
                  <template slot-scope="scope">
                    <el-select
                      v-model="scope.row.isOneBook"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in tempoptions"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      >
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  label="装备是否齐全"
                  prop="type"
                  :show-overflow-tooltip="true"
                  align="center"
                >
                  <template slot-scope="scope">
                    <el-select
                      v-model="scope.row.isComplete"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in tempoptions"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      >
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="5">
          <div class="bg-purple">
            <el-upload
              :show-file-list="false"
              list-type="picture"
              class="upload-demo"
              :action="$UPLOAD_URL"
              :headers="headers"
              :on-success="handleSuccess"
              :before-upload="beforeUpload"
            >
              <div class="uploadBackground">
                <div class="uploadContent">
                  <img src="../../assets/upload.jpg" alt="" />
                  <div slot="tip" class="el-upload__tip">
                    图片支持jpg/png格式
                  </div>
                </div>
              </div>
            </el-upload>
          </div>
        </el-col>
        <el-col :span="5" v-for="(item, index) in fileList" :key="index">
          <div class="imgBox">
            <el-button
              type="text"
              @click="delteImg(index)"
              v-if="$store.state.ifBut"
              >删除</el-button
            >
            <img :src="item.url" alt="" />
          </div>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="24">
          <div class="grid-content bg-purple">
            <div class="formLable"><span class="formBj">*</span>训练结果:</div>
            <div class="formBox">
              <el-input
                v-model="addform.result"
                placeholder="请输入集结地点"
                class="formInp"
                type="textarea"
                size="medium"
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
  props: ["isType"],
  data() {
    return {
      isloading: false,
      type: this.$route.query.type,
      content: "",
      scoreList: [], //成绩选项
      assessType: [
        {
          name: "训练",
          type: 1,
        },
        {
          name: "拉练任务",
          type: 2,
        },
        // {
        //   name: "考试",
        //   type: 3,
        // },
      ], //考核类型
      headers: {
        ContentType: "Multipart/form-data",
        token: JSON.parse(sessionStorage.getItem("data")).token,
      },
      tempoptions: [
        { id: 0, name: "是" },
        { id: 1, name: "否" },
      ],
      fileList: [],
      tableData: [],
      addform: {
        result: "",
        id: "",
        professionalTeamId: "",
        type: "",
        createTime: "",
        numberPerson: "",
        urlList: "",
        startTime: "",
        address: "",
        trainingSubjectId: "",
        content: "",
        hours: "",
        faculty: "",
        createUser: "",
        way: "",
        trainingPlayerList: [],
      },
      breadcrumbList: ["首页", "考核管理", "队伍训练考核", "考核"],
      id: "",
    };
  },
  created() {
    if (this.isType == 1) {
      this.breadcrumbList[2] = "拉练任务";
    }
  },
  mounted() {
    this.id = this.$route.query.id;
    this.getdetail();
    this.ZD_KHCJ();
  },
  methods: {
    editPeople() {
      this.$router.push(
        "/pages/teamtrain/appraisalmanagement/allEdit?id=" +
          this.addform.trainingPlanId
      );
    },
    ZD_KHCJ() {
      this.$api.ZD_KHCJ().then((res) => {
        this.scoreList = res.page.records;
      });
    },
    getdetail() {
      this.$api.inspectionRecordsdetail({ id: this.id }).then((res) => {
        if (res.code == 200) {
          this.addform = res.data;
          // this.addform.numberPerson = this.addform.taskPlayerList.length;
          res.data.urlList.forEach((element) => {
            // this.fileList.push(JSON.parse(element.url).fileList[0]);
            this.fileList.push(element);
          });
        } else {
          this.$message.error(res.message);
        }
      });
    },
    delteImg(index) {
      this.fileList.splice(index, 1);
    },
    beforeUpload(file) {
      if (this.fileList.length >= 3) {
        this.$message.error("最多上传三张图片");
        return false;
      }
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG或png 格式!");
      }
      return isJPG;
    },
    handleSuccess(response) {
      this.fileList.push(...response.data.fileList);
    },

    confirm() {
      this.isloading = true;
      let data = {};
      data.id = this.addform.id;
      data.type = this.addform.type;
      data.result = this.addform.result;
      data.urlList = JSON.stringify(this.fileList);
      if (this.type == 1) {
        data.trainingPlayerList = JSON.stringify(
          this.addform.trainingPlayerList
        );
      } else {
        data.taskPlayerList = JSON.stringify(this.addform.taskPlayerList);
      }
      this.$api.inspectionRecordsupdate(data).then((res) => {
        this.isloading = false;
        if (res.code == 200) {
          this.$message({
            message: "编辑成功",
            type: "success",
          });

          setTimeout(() => {
            if (this.isType == 1) {
              this.$router.push("/pages/appraisalmanagement/listTwo");
            } else {
              this.$router.push("/pages/appraisalmanagement/list");
            }
          }, 1000);
        } else {
          this.$message.error(res.message);
        }
      });
    },
    cancel() {
      this.$router.push("/pages/appraisalmanagement/list");
    },
  },
};
</script>

<style lang="scss">
.el-table tbody tr:hover > td {
  background-color: #ffffff !important;
}
.imgBox {
  border: 1px solid rgba(200, 200, 200, 0.1);
  position: relative;
  width: 240px;
  height: 100px;
  text-align: center;
  overflow: hidden;
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
    // width: 100%;
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