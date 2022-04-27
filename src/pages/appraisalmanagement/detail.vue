<template>
  <div>
    <detail-header
      title="详情"
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
    <div class="fromtableListBox detail">
      <el-row type="flex">
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <div class="formLable">参与训练的专业队:</div>
            <div class="formBox">
              {{ addform.professionalTeam }}
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">考核类型:</div>
            <div class="formBox">
              {{
                addform.type == 1
                  ? "训练"
                  : addform.type == 2
                  ? "拉练任务"
                  : addform.type == 3
                  ? "考试"
                  : ""
              }}
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">创建时间:</div>
            <div class="formBox">
              {{ addform.createTime }}
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">训练人数:</div>
            <div class="formBox">
              {{ addform.numberPerson }}
            </div>
          </div>
        </el-col>
      </el-row>
      <!-- ---------------------训练计划------------------------- -->
      <el-row type="flex" v-if="type == 1">
        <el-col :span="5">
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
              {{ addform.trainingSubject }}
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">训练内容:</div>
            <div class="formBox">
              {{ addform.content }}
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex" v-if="type == 1">
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <div class="formLable">训练时长(小时):</div>
            <div class="formBox">
              {{ addform.hours }}
            </div>
          </div>
        </el-col>

        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">教员:</div>
            <div class="formBox">
              {{ addform.faculty }}
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">训练计划创建人:</div>
            <div class="formBox">
              {{ addform.createUser }}
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">训练方式:</div>
            <div class="formBox">
              {{ addform.way }}
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex" v-if="type == 1">
        <el-col :span="24">
          <div class="grid-content bg-purple">
            <div class="formLable">训练人员列表:</div>
            <div class="formBox">
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
                      disabled
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
            <div class="formLable">任务名称:</div>
            <div class="formBox">
              {{ addform.taskName }}
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">集结时间:</div>
            <div class="formBox">
              {{ addform.assemblyDate }}
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">集结地点:</div>
            <div class="formBox">
              {{ addform.assemblyArea }}
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2"> </el-col>
      </el-row>
      <el-row v-if="type == 2">
        <el-col :span="24">
          <div class="grid-content bg-purple">
            <div class="formLable">人员列表:</div>
            <div class="formBox">
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
                      disabled
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
                      disabled
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
                      disabled
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
      <!-- <el-row type="flex">
        <el-col :span="5" v-for="(item, index) in fileList" :key="index">
          <div class="imgBox">
            <img :src="item.url" alt="" />
          </div>
        </el-col>
      </el-row> -->
      <el-row type="flex">
        <el-col :span="24">
          <div class="grid-content bg-purple">
            <div class="formLable">训练结果:</div>
            <div class="formBox">
              {{ addform.result }}
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="24">
          <div class="grid-content bg-purple">
            <div class="formLable">附件:</div>
            <div
              class="formBox"
              v-if="addform.urlList && addform.urlList.length > 0"
            >
              <!-- {{ addform.result }} -->
              <el-image
                style="width: 100px; height: 100px; margin-right: 10px"
                :src="item.url"
                :preview-src-list="[item.url]"
                v-for="(item, index) in addform.urlList"
                :key="index"
              >
              </el-image>
            </div>
          </div>
        </el-col>
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
        {
          name: "考试",
          type: 3,
        },
      ], //考核类型
      headers: {
        ContentType: "Multipart/form-data",
      },
      tempoptions: [
        { id: 0, name: "是" },
        { id: 1, name: "否" },
      ],
      fileList: [],
      tableData: [],
      addform: {
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
      breadcrumbList: ["首页", "考核管理", "队伍训练考核", "详情"],
      id: "",
    };
  },
  created() {
    if (this.isType == 1) {
      this.breadcrumbList[2] = "拉动点验考核";
    }
  },
  mounted() {
    this.id = this.$route.query.id;
    this.getdetail();
    this.ZD_KHCJ();
    if (this.isType == 1) {
      this.breadcrumbList[2] = "拉动点验考核";
    }
  },
  methods: {
    //成绩
    ZD_KHCJ() {
      this.$api.ZD_KHCJ().then((res) => {
        this.scoreList = res.page.records;
      });
    },
    delteImg(index) {
      this.fileList.splice(index, 1);
    },
    getdetail() {
      this.$api.inspectionRecordsdetail({ id: this.id }).then((res) => {
        if (res.code == 200) {
          this.addform = res.data;
          if (this.addform.taskPlayerList) {
            this.addform.numberPerson = this.addform.taskPlayerList.length;
          }
          res.data.urlList.forEach((element) => {
            // this.fileList.push(JSON.parse(element.url).fileList[0]);
            this.fileList.push(element);
          });
          // console.log(this.fileList);
        } else {
          this.$message.error(res.message);
        }
      });
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
  img {
    // width: 100%;
    height: 100%;
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