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
          source: [],
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
          obj.product = item.professional;
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