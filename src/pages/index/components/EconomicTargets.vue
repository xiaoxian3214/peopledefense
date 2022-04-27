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
            data: [],
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
          obj.value = item.accounted;
          obj.name = item.name;
          list.push(obj);
        });
        this.option.series[0].data = list;
      },
    },
  },
  mounted() {},
  methods: {},
};
</script>

<style>
</style>