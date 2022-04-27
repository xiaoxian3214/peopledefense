<template>
  <div>
    <div class="lineList tableListBox">
      <div class="lineBox">
        <div class="top">
          <span class="tips"></span>
          <span class="title">性别统计</span>
        </div>
        <div class="leftBox">
          <div id="brokenLine3" class="brokenLine"></div>
        </div>
      </div>
      <div class="lineBox" style="margin-right: 20px">
        <div class="top">
          <span class="tips"></span>
          <span class="title">学历统计</span>
        </div>
        <div class="leftBox">
          <div id="bar2" class="brokenLine"></div>
        </div>
      </div>
      <div class="lineBox">
        <div class="top">
          <span class="tips"></span>
          <span class="title">专业统计</span>
        </div>
        <div class="leftBox">
          <div id="brokenLine5" class="brokenLine"></div>
        </div>
      </div>
      <div class="lineBox" style="margin-right: 20px">
        <div class="top">
          <span class="tips"></span>
          <span class="title">年龄统计</span>
        </div>
        <div class="leftBox">
          <div id="brokenLine6" class="brokenLine"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //   brokenLine1: null,
      list1: [
        { label: "2016", value: 47 },
        { label: "2017", value: 49 },
        { label: "2018", value: 56 },
        { label: "2019", value: 59 },
        { label: "2020", value: 62 },
      ],
      list2: [
        { value: 1048, name: "男" },
        { value: 735, name: "女" },
      ],
      list3: [
        { label: "2016", value: 45 },
        { label: "2017", value: 46 },
        { label: "2018", value: 47 },
        { label: "2019", value: 48 },
        { label: "2020", value: 53 },
      ],
      list4: [
        { label: "2016", value: 1.36 },
        { label: "2017", value: 0.9 },
        { label: "2018", value: 0.7 },
        { label: "2019", value: 0.8 },
        { label: "2020", value: 0.61 },
      ],
      pielist1: [
        { label: "新区", value: 3.5 },
        { label: "椒江", value: 2.6 },
        { label: "黄岩", value: 2.57 },
        { label: "路桥", value: 1.69 },
        { label: "临海", value: 2.9 },
        { label: "温岭", value: 3.3 },
        { label: "玉环", value: 2.6 },
        { label: "天台", value: 3.4 },
        { label: "仙居", value: 3.4 },
        { label: "三门", value: 1.9 },
      ],
      barList1: [
        { label: "2016", value: 46000 },
        { label: "2017", value: 120000 },
        { label: "2018", value: 140000 },
        { label: "2019", value: 160000 },
        { label: "2020", value: 210000 },
      ],
      //   barList2: [
      //     { label: "Matcha Latte", 2015: 43.3, 2016: 85.8, 2017: 93.7 },
      //     { label: "2016", value: 5 },
      //     { label: "2017", value: 25 },
      //     { label: "2018", value: 80 },
      //     { label: "2019", value: 110 },
      //     { label: "2020", value: 155 },
      //   ],
    };
  },
  mounted() {
    // this.initLineFunc(this.list1, "brokenLine1");
    // this.initPieFunc(this.pielist1, "pie1");
    // this.initBarFunc(this.barList1, "bar1");
    // this.initPieFunc(this.pielist1, "pie2");
    this.initLineFunc(this.list2, "brokenLine3");
    this.initBarFunc(this.barList2, "bar2", {
      interval: 50,
      max: 200,
    });
    this.initBarFunc1(this.barList2, "brokenLine5", {
      interval: 50,
      max: 200,
    });
    this.initBarFunc2(this.barList2, "brokenLine6", {
      interval: 50,
      max: 200,
    });
  },
  methods: {
    initLineFunc(data, id, _option = {}) {
      let mychert = this.$echarts.init(document.getElementById(id));
      let option = {
        grid: {
          right: 0,
          bottom: 20,
        },
        legend: {
          orient: "vertical",
          //   left: "left",
          right: 10,
          top: 50,
          bottom: 20,
        },
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            name: "性别统计",
            type: "pie",
            radius: "50%",
            // data: [
            //   { value: 1048, name: "男" },
            //   { value: 735, name: "女" },
            // ],
            data: data.map((item) => {
              return { name: item.label, ...item };
            }),
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
      mychert.setOption(option);
    },
    initBarFunc(data, id, _option = {}) {
      let mychert = this.$echarts.init(document.getElementById(id));
      let option = {
        legend: {
          right: 40,
          top: 10,
          bottom: 20,
        },
        tooltip: {},
        dataset: {
          // dimensions: ["product", "男生", "女生"],
          source: [
            { product: "高中", 男生: 43.3, 女生: 85.8 },
            { product: "专科", 男生: 89.3, 女生: 22.8 },
            { product: "本科", 男生: 23.3, 女生: 95.8 },
            { product: "研究生", 男生: 53.3, 女生: 45.8 },
          ],
        },
        xAxis: { type: "category" },
        yAxis: {
          name: "数量/人",
        },
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [
          { type: "bar", barWidth: 20, color: "#1492ff" },
          { type: "bar", barWidth: 20, color: "#B75AD8" },
        ],
      };
      mychert.setOption(option);
    },
    initBarFunc1(data, id, _option = {}) {
      let mychert = this.$echarts.init(document.getElementById(id));
      let option = {
        legend: {
          right: 40,
          top: 10,
          bottom: 20,
        },
        tooltip: {},
        dataset: {
          dimensions: ["product", "男生", "女生"],
          source: [
            { product: "土木工程", 男生: 43.3, 女生: 85.8 },
            { product: "计算机工程", 男生: 89.3, 女生: 22.8 },
            { product: "工业设计", 男生: 23.3, 女生: 95.8 },
            { product: "电子信息工程", 男生: 53.3, 女生: 45.8 },
            { product: "机械设计", 男生: 53.3, 女生: 45.8 },
            { product: "数字媒体技术", 男生: 53.3, 女生: 45.8 },
          ],
        },
        xAxis: { type: "category" },
        yAxis: {
          name: "数量/人",
        },
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [
          { type: "bar", barWidth: 20, color: "#1492ff" },
          { type: "bar", barWidth: 20, color: "#FF832A" },
        ],
      };
      mychert.setOption(option);
    },
    initBarFunc2(data, id, _option = {}) {
      let mychert = this.$echarts.init(document.getElementById(id));
      let option = {
        legend: {
          right: 40,
          top: 10,
          bottom: 20,
        },
        tooltip: {},
        dataset: {
          dimensions: ["product", "男生", "女生"],
          source: [
            { product: "15岁", 男生: 43.3, 女生: 85.8 },
            { product: "20岁", 男生: 89.3, 女生: 22.8 },
            { product: "25岁", 男生: 23.3, 女生: 95.8 },
            { product: "30岁", 男生: 53.3, 女生: 45.8 },
            { product: "35岁", 男生: 53.3, 女生: 45.8 },
            { product: "40岁", 男生: 53.3, 女生: 45.8 },
            { product: "45岁", 男生: 53.3, 女生: 45.8 },
          ],
        },
        xAxis: { type: "category" },
        yAxis: {
          name: "数量/人",
        },
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [
          { type: "bar", barWidth: 20, color: "#1492ff" },
          { type: "bar", barWidth: 20, color: "#5AD8A6" },
        ],
      };
      mychert.setOption(option);
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  background: #ffffff;
  //   height: 100vh;
  //   overflow-y: scroll;
  // margin: 20px;
  margin-top: 20px;
  margin-right: 20px;
  position: fixed;
  width: 90% !important;
}
.top {
  display: flex;
  align-items: center;
  height: 57px;
  line-height: 57px;
  margin-left: 20px;
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
.echartTitle {
  text-align: center;
  .dot {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #1492ff;
    margin-right: 5px;
  }
  ._title {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
    line-height: 20px;
  }
}
.chert {
  margin-bottom: 20px;
  background: #fff;
  .mianContain {
    width: 100%;
    padding-bottom: 20px;
    display: flex;
    .leftBox {
      width: 50%;
      border-top: solid 1px #eeeeee;
      .brokenLine {
        height: 350px;
        width: 650px;
      }
    }
    .rightBox {
      width: 50%;
      .pie {
        height: 350px;
        width: 650px;
      }
    }
  }
}
.lineList {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 10px;
  // margin-right: 20px;
  margin-bottom: 20px;
  .lineBox {
    width: 48%;
    background: #ffffff;
    padding-bottom: 10px;
    margin-bottom: 20px;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    margin-left: 20px;
    margin-top: 20px;
    .leftBox {
      width: 100%;
      .brokenLine {
        height: 280px;
        width: 600px;
      }
    }
  }
}
</style>
