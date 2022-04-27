<template>
  <div>
    <detail-header title="首页" :breadcrumbList="breadcrumbList">
    </detail-header>
    <div class="tableListBox index" v-loading="loading">
      <!-- 县人防办、联络员只能看到所在行政区域的数据展示 -->
      <div
        class="indexTatile"
        v-if="!$store.state.roleIdList.includes(2) && !$store.state.roleIdList.includes(4)"
      >
        <div
          :key="index"
          v-for="(item, index) in ZD_WZ_XZQDM_LIST"
          class="DIVwarp"
          :class="{ active: item.id == id }"
          @click="tatileID(item.id)"
        >
          <div>
            {{ item.name }}
          </div>
        </div>
      </div>

      <div class="BREAD">队员信息</div>
      <div>
        <div class="col">
          <div
            class="childCLO-5 shadow"
            style="display: flex; justify-content: space-between"
          >
            <!-- 男女比例 -->
            <div class="childCLO-5 shadow">
              <div class="top">
                <span class="tips"></span>
                <span class="title">男女比例</span>
              </div>
              <div id="sexOptions" class="chart"></div>
            </div>
            <!-- 政治面貌 -->
            <div class="childCLO-5 shadow">
              <div class="top">
                <span class="tips"></span>
                <span class="title">政治面貌</span>
              </div>
              <div id="politicsStatusListOptions" class="chart"></div>
            </div>
          </div>
          <div class="childCLO-5 flxe">
            <div class="grandsonCLO-3">
              <div class="top">
                <span class="tips"></span>
                <span class="title">队伍数量</span>
                <i
                  style="margin-left: auto; margin-right: 11px"
                  class="el-icon-question"
                ></i>
              </div>
              <div class="user2icon">
                <img src="../../../src/assets/img/teamstatistics.png" alt="" />
              </div>
              <div class="usernumber">{{ addform.teamNum }}</div>
              <div class="unit">单位：支</div>
            </div>
            <div id="peoplestatistics" class="grandsonCLO-3">
              <div class="top">
                <span class="tips"></span>
                <span class="title">专业队人数</span>
                <i
                  style="margin-left: auto; margin-right: 11px"
                  class="el-icon-question"
                ></i>
              </div>
              <div class="user2icon">
                <img src="../../../src/assets/img/user2.png" alt="" />
              </div>
              <div class="usernumber">{{ addform.playersNum }}</div>
              <div class="unit">单位：人</div>
            </div>
            <div id="troopstatistics" class="grandsonCLO-3">
              <div class="top">
                <span class="tips"></span>
                <span class="title"> 新型专业队占比</span>
                <i
                  style="margin-left: auto; margin-right: 11px"
                  class="el-icon-question"
                ></i>
              </div>
              <div
                id="newTypeProfessionalTeam"
                style="width: 100%; height: 150px"
              ></div>
              <div class="unit" style="padding-top: 0">单位：支</div>
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="childCLO-5 shadow">
          <div class="top">
            <span class="tips"></span>
            <span class="title">年龄统计</span>

            <!-- {{ ageList.length }} -->
          </div>
          <div
            :class="{
              isShow: addform.ageList && !addform.ageList.length,
            }"
            id="agestatistics"
            class="chart"
          ></div>
          <el-empty
            description="暂无数据"
            v-if="addform.ageList && !addform.ageList.length"
            :image-size="60"
          ></el-empty>
          <!--  -->
        </div>
        <div class="childCLO-5 shadow">
          <div class="top">
            <span class="tips"></span>
            <span class="title">学历统计</span>
          </div>
          <div id="economicsstatistics" class="chart"></div>
        </div>
      </div>
      <div class="col">
        <div class="colbootom" style="height: 270px">
          <div class="top">
            <span class="tips"></span>
            <span class="title">专业统计</span>
          </div>
          <div
            :class="{
              isShow:
                addform.professionalList && !addform.professionalList.length,
            }"
            id="majorclass"
            class="chart"
          ></div>
          <el-empty
            v-if="addform.professionalList && !addform.professionalList.length"
            description="暂无数据"
            :image-size="60"
          ></el-empty>
        </div>
      </div>
      <div class="BREAD">训练</div>
      <div class="col">
        <div class="childCLO-5 flxe">
          <div class="grandsonCLO-5">
            <div class="top">
              <span class="tips"></span>
              <span class="title">参与训练队伍数量</span>
            </div>
            <div class="user2icon">
              <img src="../../../src/assets/img/teamstatistics.png" alt="" />
            </div>
            <div class="usernumber">{{ addform.trainTeamNum }}</div>
            <div class="unit">单位：支</div>
          </div>
          <div class="grandsonCLO-5">
            <div class="top">
              <span class="tips"></span>
              <span class="title">参与训练队员数量</span>
            </div>
            <div class="user2icon">
              <img src="../../../src/assets/img/user2.png" alt="" />
            </div>
            <div class="usernumber">{{ addform.trainPlayersNum }}</div>
            <div class="unit">单位：人</div>
          </div>
        </div>
        <div class="childCLO-5 flxe">
          <div class="grandsonCLO-5">
            <div class="top">
              <span class="tips"></span>
              <span class="title">训练次数</span>
            </div>
            <div class="user2icon">
              <img src="../../../src/assets/img/xunlian.png" alt="" />
            </div>
            <div class="usernumber">{{ addform.traubNum }}</div>
            <div class="unit">单位：次</div>
          </div>
          <div class="grandsonCLO-5">
            <div class="top">
              <span class="tips"></span>
              <span class="title">训练科目数量</span>
              <i
                style="margin-left: auto; margin-right: 11px"
                class="el-icon-question"
              ></i>
            </div>
            <div class="user2icon">
              <img src="../../../src/assets/img/subject.png" alt="" />
            </div>
            <div class="usernumber">{{ addform.trainingCourseNum }}</div>
            <div class="unit">单位：门</div>
          </div>
        </div>
      </div>
      <div class="BREAD">拉动点验</div>
      <div class="col">
        <div class="childCLO-5 flxe">
          <div id="peoplestatistics" class="grandsonCLO-5">
            <div class="top">
              <span class="tips"></span>
              <span class="title">拉动点验队伍数</span>
              <i
                style="margin-left: auto; margin-right: 11px"
                class="el-icon-question"
              ></i>
            </div>
            <div class="user2icon">
              <img
                src="../../../src/assets/img/pullcheckteamNumber.png"
                alt=""
              />
            </div>
            <div class="usernumber">{{ addform.pullCheckTeamNum }}</div>
            <div class="unit">单位：支</div>
          </div>
          <div id="troopstatistics" class="grandsonCLO-5">
            <div class="top">
              <span class="tips"></span>
              <span class="title">拉动点验队员数</span>
              <i
                style="margin-left: auto; margin-right: 11px"
                class="el-icon-question"
              ></i>
            </div>
            <div class="user2icon">
              <img
                src="../../../src/assets/img/pullcheckteamMemberNumber.png"
                alt=""
              />
            </div>
            <div class="usernumber">{{ addform.pullCheckPlayerNum }}</div>
            <div class="unit">单位：人</div>
          </div>
        </div>
        <div class="childCLO-5 flxe">
          <div id="peoplestatistics" class="grandsonCLO-5">
            <div class="top">
              <span class="tips"></span>
              <span class="title">拉动点验次数</span>
              <i
                style="margin-left: auto; margin-right: 11px"
                class="el-icon-question"
              ></i>
            </div>
            <div class="user2icon">
              <img src="../../../src/assets/img/pullckeckNumber.png" alt="" />
            </div>
            <div class="usernumber">{{ addform.pullCheckNum }}</div>
            <div class="unit">单位：次</div>
          </div>
        </div>
      </div>
      <div class="BREAD">宣传内容</div>
      <div class="col">
        <div class="colbootom" style="height: 270px; width: calc(50% - 20px)">
          <div class="top">
            <span class="tips"></span>
            <span class="title">宣传内容</span>
          </div>
          <div id="promotionContent" class="chart"></div>
        </div>
      </div>
      <div class="BREAD">整组交叉审核</div>
      <div class="col">
        <div class="childCLO-5 flxe">
          <div class="grandsonCLO-3">
            <div class="top">
              <span class="tips"></span>
              <span class="title">重复人数</span>
            </div>
            <div class="user2icon">
              <img src="../../../src/assets/img/repetition.png" alt="" />
            </div>
            <div class="usernumber">{{ addform.auditRepeatPlayerNum }}</div>
            <div class="unit">单位：人</div>
          </div>
          <div class="grandsonCLO-3">
            <div class="top">
              <span class="tips"></span>
              <span class="title">审核人数</span>
            </div>
            <div class="user2icon">
              <img src="../../../src/assets/img/checkPeopleNumber.png" alt="" />
            </div>
            <div class="usernumber">{{ addform.auditPlayerNum }}</div>
            <div class="unit">单位：人</div>
          </div>
          <div class="grandsonCLO-3">
            <div class="top">
              <span class="tips"></span>
              <span class="title">替换人数</span>
            </div>
            <div class="user2icon">
              <img
                src="../../../src/assets/img/replacePeopleNumber.png"
                alt=""
              />
            </div>
            <div class="usernumber">{{ addform.replaceNum }}</div>
            <div class="unit">单位：人</div>
          </div>
        </div>
      </div>
      <div class="BREAD">重要经济目标</div>
      <div class="colbootom">
        <div class="top">
          <span class="tips"></span>
          <span class="title">重要经济目标</span>
        </div>
        <div class="bootom">
          <div class="classbox">
            <div class="title">重要经济目标大类</div>
            <div id="broadtype" class="conter"></div>
          </div>
          <div class="classbox">
            <div class="title">重要经济目标中类</div>
            <div id="centretype" class="conter"></div>
          </div>
        </div>
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
      ageStatisticsEcharts: {}, //年龄统计
      sexProportion: {}, //男女比例
      letDOMobj: [],
      id: "",
      // percentage: 0, //专业队进度条
      breadcrumbList: ["首页"],
      list2: [
        { value: 1048, name: "男" },
        { value: 735, name: "女" },
      ],
      addform: {},
      loading: true,
      ZD_WZ_XZQDM_LIST: [],
      ageShow: [],
    };
  },
  mounted() {
    this.ZD_WZ_XZQDM();
    this.getindex("");
    this.$nextTick(() => {
      this.resize();
    });
    // console.log(null === null);
  },
  methods: {
    resize() {
      window.addEventListener("resize", () => {
        this.$nextTick((_) => {
          document.getElementById("agestatistics") &&
            this.$echarts
              .init(document.getElementById("agestatistics"))
              .resize();
          document.getElementById("majorclass") &&
            this.$echarts.init(document.getElementById("majorclass")).resize();
          document.getElementById("economicsstatistics") &&
            this.$echarts
              .init(document.getElementById("economicsstatistics"))
              .resize();
          document.getElementById("promotionContent") &&
            this.$echarts
              .init(document.getElementById("promotionContent"))
              .resize();
          document.getElementById("broadtype") &&
            this.$echarts.init(document.getElementById("broadtype")).resize();
          document.getElementById("centretype") &&
            this.$echarts.init(document.getElementById("centretype")).resize();
          document.getElementById("sexOptions") &&
            this.$echarts.init(document.getElementById("sexOptions")).resize();
          document.getElementById("politicsStatusListOptions") &&
            this.$echarts
              .init(document.getElementById("politicsStatusListOptions"))
              .resize();
          document.getElementById("newTypeProfessionalTeam") &&
            this.$echarts
              .init(document.getElementById("newTypeProfessionalTeam"))
              .resize();
        });
      });
    },
    tatileID(id) {
      this.getindex(id);
    },
    ZD_WZ_XZQDM() {
      this.$api.ZD_WZ_XZQDM().then((res) => {
        if (res.code == 200) {
          this.ZD_WZ_XZQDM_LIST = res.page.records;
          this.id == this.ZD_WZ_XZQDM_LIST[0].id;
        }
      });
    },
    // 获取首页数据
    getindex(id) {
      this.id = id;
      this.loading = true;
      let adminId = "";
      if (!this.$store.state.roleIdList.includes(2) && !this.$store.state.roleIdList.includes(4)) {
        adminId = id;
      } else {
        adminId = this.$store.state.administrativeCode;
      }
      this.$api.apiIndex({ id: adminId }).then((res) => {
        this.loading = false;
        if (res.code === 200) {
          this.addform = res.data;
          this.percentage =
            res.data.newTeamRatio != null ? res.data.newTeamRatio : 0;
          this.agestatistics("agestatistics");
          console.log(this.addform.professionalList);
          if (this.addform.professionalList.length) {
            this.majorclass("majorclass");
          }
          this.economicsstatistics("economicsstatistics");
          this.promotionContent("promotionContent");
          this.broadtype("broadtype");
          this.centretype("centretype");
          // 男女比例
          this.getSex("sexOptions");
          this.getpoliticsStatusListOptions("politicsStatusListOptions");
          this.newTypeProfessionalTeamChang("newTypeProfessionalTeam");
        } else {
          this.$message.error(res.message);
        }
      });
    },
    // 新型专业队占比
    newTypeProfessionalTeamChang(id) {
      let _this = this;
      let myChart = this.$echarts.init(document.getElementById(id));
      let option;
      var dataStyle = {
        normal: {
          label: {
            show: false,
          },
          labelLine: {
            show: false,
          },
          shadowBlur: 0,
          shadowColor: "#203665",
        },
      };
      option = {
        // backgroundColor: "#20263f",
        series: [
          {
            labelLine: {
              smooth: 1,
              length2: 5,
              show: true,
            },
            // name: "第一个圆环",
            type: "pie",
            clockWise: false,
            radius: ["80%", "90%"],
            itemStyle: dataStyle,
            hoverAnimation: false,
            center: ["50%", "50%"],
            data: [
              {
                value: _this.addform.newTeamRatio,
                label: {
                  normal: {
                    rich: {
                      a: {
                        color: "#000000",
                        align: "center",
                        fontSize: 20,
                        fontWeight: "bold",
                      },
                      b: {
                        color: "#000000",
                        align: "center",
                        fontSize: 16,
                      },
                    },
                    formatter: function (params) {
                      return (
                        // "{b|总专业队}\n\n" + "{a|" + _this.percentage + "支}"
                        "{b|" +
                        _this.addform.newTeamRatio +
                        "%}\n\n" +
                        "{a|" +
                        _this.addform.newTeamNum +
                        "支}"
                        //  + "\n\n{b|增长2%}"
                      );
                    },
                    position: "center",
                    show: true,
                    textStyle: {
                      fontSize: "14",
                      fontWeight: "normal",
                      color: "#fff",
                    },
                  },
                },
                itemStyle: {
                  normal: {
                    color: "#2c6cc4",
                    shadowColor: "#2c6cc4",
                    shadowBlur: 0,
                  },
                },
              },
              {
                value: 100 - _this.addform.newTeamRatio,
                name: "invisible",
                itemStyle: {
                  normal: {
                    color: "#E5E9F2",
                  },
                  emphasis: {
                    color: "#20A0FF",
                  },
                },
              },
            ],
          },
        ],
      };
      option && myChart.setOption(option);
      // this.resize();
    },
    // 年龄统计
    agestatistics(id) {
      let myChart = this.$echarts.init(document.getElementById(id));
      let option;
      let ageList = [];
      // let lebelarr = ["20-30", "31-40", "41-50", "50岁以上"];
      // let keys = ["20-", "20-30", "50+", "未知"];
      // keys.forEach((item, index) => {
      this.addform.ageList.forEach((element) => {
        let obj = {};
        // if (element.age == item) {
        obj.product = element.age;
        obj["人数"] = element.num;
        ageList.push(obj);
        // }
      });
      // });
      option = {
        // legend: {
        //   right: 20,
        //   top: 0,
        //   bottom: 0,
        //   itemWidth: 10, //icon尺寸控制
        //   itemHeight: 11,
        //   icon: "roundRect",
        // },
        // tooltip: {},
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "30",
          right: "80",
          bottom: "11",
          top: "30",
          containLabel: true,
        },
        dataset: {
          // dimensions: ["product", "男生", "女生"],
          source: ageList,
          // [
          //   { product: "0-18岁", 人数: 43.3 },
          //   { product: "19-30岁", 人数: 89.3 },
          //   { product: "31-40岁", 人数: 23.3 },
          //   { product: "41-50岁", 人数: 53.3 },
          //   { product: "60岁以上", 人数: 53.3 },
          // ],
        },
        xAxis: {
          axisLabel: {
            interval: 0,
          },
          // type: "category",
          axisTick: {
            show: false,
          },
          name: "数量/人",
        },
        yAxis: {
          type: "category", //增加这一行代码，即可柱状图横置
          // type: "value",
          axisLine: {
            //显示坐标轴
            show: false,
          },
          axisTick: {
            //显示坐标轴刻度线
            show: false,
          },
          splitLine: {
            //显示网格线
            show: false,
          },
        },
        series: [{ type: "bar", barWidth: 15, color: "#1492FF" }],
      };
      option && myChart.setOption(option);
      // this.resize();
      // this.letDOMobj.push(chartDom);
    },
    // 男女比列
    getSex(id) {
      let sexList = [];
      this.addform.sexList.forEach((item) => {
        let obj = {};
        obj.value = item.accounted;
        obj.name = item.name + " " + item.num + " 人";
        sexList.push(obj);
      });
      let myChart = this.$echarts.init(document.getElementById(id));
      let option;
      option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} {b}:  ({d}%)",
        },
        legend: {
          itemHeight: 9,
          icon: "circle",
          // padding: "",
          itemGap: 7,
          orient: "vertical",
          // height: "17",
          // orient: "vertical",
          right: "50",
          bottom: "28",
          top: "0",
          textStyle: {
            //图例文字的样式
            // color: '#fff',
            fontSize: 16,
          },
        },
        color: ["#FBD438", "#13C2C2", "#F57C90 ", "#1890FF"],
        series: [
          {
            // label: {
            //   show: false,
            // },
            name: "男女比例",
            type: "pie",
            radius: "55%",
            center: ["30%", "41%"],
            labelLine: {
              smooth: 1,
              length2: 6,
              show: true,
            },
            label: {
              show: false,
              position: "center",
            },
            data: sexList,
            left: 10,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      option && myChart.setOption(option);
      // this.resize();
    },
    // 政治面貌
    getpoliticsStatusListOptions(id) {
      let politicsStatusList = [];
      this.addform.politicsStatusList.forEach((item) => {
        let obj = {};
        obj.value = item.accounted;
        obj.name = item.name + " " + item.num + " 人";
        politicsStatusList.push(obj);
      });
      let chartDom = document.getElementById(id);
      let myChart = this.$echarts.init(chartDom);
      let option;
      option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} {b} :  ({d}%)",
        },
        legend: {
          itemHeight: 9,
          icon: "circle",
          // padding: "",
          itemGap: 7,
          orient: "vertical",
          // height: "17",
          // orient: "vertical",
          right: "25",
          bottom: "28",
          top: "0",
          textStyle: {
            //图例文字的样式
            // color: '#fff',
            fontSize: 16,
          },
        },
        color: [
          "#FBD438",
          "#13C2C2",
          "#F57C90 ",
          "#1890FF",
          "#9C3D97",
          "#948B00",
          "#FFF467",
          "#FF6933",
          "#020202",
        ],
        series: [
          {
            // label: {
            //   show: false,
            // },
            name: "政治面貌",
            type: "pie",
            radius: "55%",
            center: ["30%", "41%"],
            labelLine: {
              smooth: 1,
              length2: 5,
              show: true,
            },
            label: {
              show: false,
              position: "center",
            },
            data: politicsStatusList,
            left: 10,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      option && myChart.setOption(option);
      // this.resize();
    },
    // 专业统计
    majorclass(id) {
      let ageList = [];
      this.addform.professionalList.forEach((item) => {
        let obj = {};
        obj.product = item.professional;
        obj["人数"] = item.num;
        ageList.push(obj);
      });
      var chartDom = document.getElementById(id);
      var myChart = this.$echarts.init(chartDom);
      let option;
      option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "40",
          right: "40",
          bottom: "58",
          top: "30",
        },
        dataset: {
          source: ageList,
        },
        xAxis: {
          axisLabel: {
            interval: 0,
            // fontSize: 17,
            rotate: 60,
          },
          type: "category",
        },
        yAxis: {
          minInterval: 1,
          type: "value",
          axisLine: {
            //显示显示坐标轴
            show: false,
          },
          axisTick: {
            //显示坐标轴刻度线
            show: false,
          },
          splitLine: {
            //显示网格线
            show: false,
          },
          name: "数量/人",
        },
        series: [{ type: "bar", barWidth: 25, color: "#5AD8A6" }],
      };
      option && myChart.setOption(option);
    },
    // 学历统计
    economicsstatistics(id) {
      let lebelList = [
        "初中",
        "高中（含中专、职高中、技校）",
        "大专（高职）",
        "本科以上",
      ];
      let educationBackground = [];
      lebelList.forEach((element) => {
        this.addform.educationBackgroundList.forEach((item, index) => {
          let obj = {};
          // obj.product = item.educationBackground;
          // obj.num = item.num
          if (element == item.educationBackground) {
            obj.product = item.educationBackground;
            obj["人数"] = item.num;
            educationBackground.push(obj);
          }
        });
      });
      var chartDom = document.getElementById(id);
      var myChart = this.$echarts.init(chartDom);
      let option;
      option = {
        // legend: {
        //   right: 20,
        //   top: 0,
        //   bottom: 0,
        //   itemWidth: 10, //icon尺寸控制
        //   itemHeight: 11,
        //   icon: "roundRect",
        // },
        // tooltip: {},
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "34",
          right: "20",
          bottom: "11",
          top: "30",
          containLabel: true,
        },
        dataset: {
          // dimensions: ["product", "男生", "女生"],

          source: educationBackground,
        },
        xAxis: {
          axisLabel: {
            interval: 0,
          },
          type: "category",
          axisTick: {
            show: false,
          },
        },
        yAxis: {
          type: "value",
          axisLine: {
            //显示显示坐标轴
            show: false,
          },
          axisTick: {
            //显示坐标轴刻度线
            show: false,
          },
          splitLine: {
            //显示网格线
            show: false,
          },
          name: "数量/人",
        },
        series: [
          {
            type: "line",
            barWidth: 31,
            color: "#C2E2FE",
            // areaStyle: {},
            // smooth: true,
          },
        ],
      };
      option && myChart.setOption(option);
      // this.resize();
    },
    // 宣传内容
    promotionContent(id) {
      var chartDom = document.getElementById(id);
      var myChart = this.$echarts.init(chartDom);
      let propagandaList = [];
      this.addform.propagandaList.forEach((item) => {
        let obj = {};
        obj.value = item.accounted;
        obj.name = item.type;
        propagandaList.push(obj);
      });
      let option;
      option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} {b} :  ({d}%)",
        },
        legend: {
          itemHeight: 9,
          icon: "circle",
          itemGap: 20,
          orient: "vertical",
          right: "108",
          top: "0",
        },
        color: [
          "#1890FF",
          "#13C2C2",
          "#2FC25B",
          " #FACC14",
          "#F04864",
          "#948B00",
          "#FFF467",
          "#FF6933",
          "#020202",
        ],
        series: [
          {
            name: "宣传内容",
            type: "pie",
            radius: ["45%", "75%"],
            avoidLabelOverlap: false,
            center: ["30%", "45%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: true,
                position: "center",
                color: "#4c4a4a",
                formatter:
                  "{total|宣传内容总数}" +
                  "\n\r" +
                  "{active|" +
                  this.addform.propagandaNum +
                  "}",
                rich: {
                  total: {
                    fontSize: 12,
                    fontFamily: "微软雅黑",
                    color: "rgba(0, 0, 0, 0.45)",
                    lineHeight: 20,
                  },
                  active: {
                    fontFamily: "HelveticaNeue",
                    fontSize: 18,
                    color: "rgba(0, 0, 0, 0.85)",
                    lineHeight: 18,
                  },
                },
              },
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "16",
                fontWeight: "bold",
              },
            },
            labelLine: {
              smooth: 1,
              length2: 5,
              show: true,
            },
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  formatter: "{b} : {c} ({d}%)",
                },
                labelLine: { show: true },
              },
            },
            data: propagandaList,
            // data: [
            //   { value: 1048, name: "搜索引擎" },
            //   { value: 735, name: "直接访问" },
            //   { value: 580, name: "邮件营销" },
            //   { value: 484, name: "联盟广告" },
            //   { value: 300, name: "视频广告" },
            // ],
          },
        ],
      };
      option && myChart.setOption(option);
      // this.resize();
    },
    // 重要经济目标大类
    broadtype(id) {
      let importantEconomicBigClass = [];
      this.addform.importantEconomicBigClass.forEach((item) => {
        let obj = {};
        obj.value = item.accounted;
        obj.name = item.name;
        importantEconomicBigClass.push(obj);
      });
      var chartDom = document.getElementById(id);
      var myChart = this.$echarts.init(chartDom);
      let option;
      option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} {b} :  ({d}%)",
        },
        legend: {
          itemHeight: 9,
          icon: "circle",
          // padding: "",
          itemGap: 7,
          orient: "vertical",
          // height: "17",
          // orient: "vertical",
          right: "0",
          bottom: "28",
          top: "0",
        },
        color: ["#FBD438", "#13C2C2", "#F57C90 ", "#1890FF"],
        series: [
          {
            // label: {
            //   show: false,
            // },
            name: "重要经济目标大类",
            type: "pie",
            radius: "55%",
            center: ["40%", "41%"],
            labelLine: {
              smooth: 1,
              length2: 5,
              show: true,
            },
            data: importantEconomicBigClass,
            left: 10,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      option && myChart.setOption(option);
      // this.resize();
    },
    // 重要经济目标中类
    centretype(id) {
      let importantEconomicMiddleClass = [];
      if (this.addform.importantEconomicMiddleClass.length) {
        this.addform.importantEconomicMiddleClass.forEach((item) => {
          let obj = {};
          obj.value = item.accounted;
          obj.name = item.name;
          importantEconomicMiddleClass.push(obj);
        });
      }
      var chartDom = document.getElementById(id);
      var myChart = this.$echarts.init(chartDom);
      let option;
      option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} {b} :  ({d}%)",
        },
        legend: {
          itemHeight: 9,
          // padding: "",
          icon: "circle",
          itemGap: 7,
          orient: "vertical",
          // height: "17",
          // orient: "vertical",
          right: "0",
          top: "0",
        },
        color: [
          "#0B9494",
          "#4ECC74",
          "#FBD438",
          "#9860E5",
          "#5354D0",
          "#1890FF",
          "#37CCCC",
          "#435188",
          "#5354D0",
          "#435188",
          "#DD919F",
        ],
        series: [
          {
            // label: {
            //   show: false,
            // },
            name: "重要经济目标中类",
            type: "pie",
            radius: "55%",
            center: ["40%", "41%"],
            labelLine: {
              smooth: 1,
              length2: 5,
              show: true,
            },
            data: importantEconomicMiddleClass,
            left: 10,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      option && myChart.setOption(option);
      // this.resize();
    },
  },
};
</script>
<style >
#troopstatistics {
  position: relative;
}
#troopstatistics .el-progress__text {
  /* position: absolute;
  top: 38%;
  left: 6%;
  transform: translate(20px, 0) !important;
  padding-right: 10px !important; */
  /* font-size: 34px; */
}
#troopstatistics .el-progress__text::after {
  /* content: "总专业队 "; */
  /* display: block;
  position: absolute;
  width: 70px;
  height: 50px;
  left: -20px;
  top: 1px;
  font-size: 12px;
  color: #333333; */
}
</style>
<style lang="scss" scoped>
.active {
  color: #1492ff;
  border: 1px solid #1492ff;
}
.indexTatile {
  width: 100%;
  display: flex;
  padding: 0 0 15px 0;
  justify-content: space-between;
  .DIVwarp {
    cursor: pointer;
    background: rgba(244, 244, 244, 0.5);
    padding: 5px;
    border-radius: 6px;
  }
}
.tableListBox.index {
  .isShow {
    display: none;
  }
  .BREAD {
    // text-align: center;
    // width: calc(50% - 20px);
    margin-bottom: 8px;
    // text-decoration: underline;
    border-bottom: 1px solid rgb(0, 0, 0);
    // background-color: rgb(121, 180, 248);
    height: 33px;
    font-size: 23px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 800;
    color: #000000;
    line-height: 33px;
  }
  .user2icon {
    height: 35px;
    padding: 11px 0 15px 0;
    text-align: center;
    position: relative;
    img {
      height: 100%;
      width: 37px;
    }
    .userText {
      // width: 70px;
      // height: 50px;
      width: 100%;
      position: absolute;
      bottom: -45px;
      // left: 36%;
      text-align: center;
      margin: 0 auto;
      font-size: 14px;
    }
  }
  .usernumber {
    text-align: center;
    height: 70px;
    font-size: 50px;
    font-family: PingFangSC-Bold, PingFang SC;
    font-weight: bold;
    color: #3396fa;
    line-height: 70px;
    letter-spacing: 2px;
  }
  .unit {
    padding: 20px 17px 0 0;
    text-align: right;
    height: 17px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
    line-height: 17px;
  }

  padding: 30px;
  .colbootom {
    width: 100%;
    height: 339px;
    box-shadow: 0px 0px 22px 0px rgba(0, 0, 0, 0.1);
    .bootom {
      height: 295px;
      display: flex;
      justify-content: space-around;
      .classbox {
        width: calc(100% / 3);
        // border: 1px solid red;
        .title {
          text-align: center;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #666666;
          line-height: 17px;
        }
        .conter {
          width: 100%;
          height: calc(100% - 17px);
        }
      }
    }
  }
  .top {
    display: flex;
    align-items: center;
    height: 49px;
    line-height: 57px;
    margin-left: 20px;
    color: #c0c0c0;
    .tips {
      display: inline-block;
      width: 4px;
      height: 25px;
      background: #1492ff;
      border-radius: 2px;
      margin-right: 12px;
    }
    .title {
      font-size: 18px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #333333;
      line-height: 25px;
    }
  }
  .col {
    height: 250px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
    .childCLO-5.shadow {
      box-shadow: 0px 0px 22px 0px rgba(0, 0, 0, 0.1);
    }
    .chart {
      // height: 190px;
      height: 210px;
      width: 100%;
    }

    .childCLO-5.flxe {
      display: flex;
      justify-content: space-between;
    }
    .childCLO-5 {
      // width: calc(50%);
      width: calc(50% - 20px);
      height: 250px;
      .grandsonCLO-5 {
        box-shadow: 0px 0px 22px 0px rgba(0, 0, 0, 0.1);
        // width: calc(33% - 20px);
        width: calc(50% - 20px);
        height: 250px;
      }
      .grandsonCLO-3 {
        box-shadow: 0px 0px 22px 0px rgba(0, 0, 0, 0.1);
        width: calc(33% - 10px);
        height: 250px;
      }
    }
  }
}
</style>