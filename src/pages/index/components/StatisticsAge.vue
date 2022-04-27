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
          left: "30",
          right: "80",
          bottom: "11",
          top: "30",
          containLabel: true,
        },
        dataset: {
          // dimensions: ["product", "男生", "女生"],
          source: [],
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
      },
    };
  },
  watch: {
    proData: {
      deep: true,
      immediate: true,
      handler: function (newVal, oldVal) {
        let list = [];
        newVal.forEach((item) => {
          let obj = {};
          obj.product = item.age;
          obj["人数"] = item.num;
          list.push(obj);
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