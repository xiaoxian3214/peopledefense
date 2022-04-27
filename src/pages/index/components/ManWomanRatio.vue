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
          formatter: "{a} {b}:  ({d}%)",
        },
        legend: {
          itemHeight: 9,
          icon: "circle",
          itemGap: 7,
          orient: "vertical",
          // right: "0%",
        right:'10',
          // bottom: "28",
          top: "0",
          textStyle: {
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
          obj.name = item.name + " " + item.num + " 人";
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