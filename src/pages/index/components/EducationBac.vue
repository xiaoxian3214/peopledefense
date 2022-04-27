<template>
  <e-chart :id="id" :proOption="option"></e-chart>
</template>

<script>
import EChart from "./EChart.vue";
export default {
  components: {
    EChart,
  },
  props: {
    id: {
      type: String,
      default: "",
    },
    proData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      lebelList: [
        "初中",
        "高中（含中专、职高中、技校）",
        "大专（高职）",
        "本科以上",
      ],
      option: {
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
          source: [],
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
      },
    };
  },
  watch: {
    proData: {
      deep: true,
      immediate: true,
      handler: function (newVal, oldVal) {
        let list = [];
        this.lebelList.forEach((element) => {
          newVal.forEach((item, index) => {
            let obj = {};
            if (element == item.educationBackground) {
              obj.product = item.educationBackground;
              obj["人数"] = item.num;
              list.push(obj);
            }
          });
        });
        this.option.dataset.source = list;
      },
    },
  },
  mounted() {},
  methods: {},
};
</script>

<style>
</style>