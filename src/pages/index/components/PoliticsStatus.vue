<template>
  <e-chart id="politicsStatusListOptions" :proOption="option"></e-chart>
</template>

<script>
import EChart from "./EChart.vue";
export default {
  components: {
    EChart,
  },
  props: {
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
        let politicsStatusList = [];
        newVal.forEach((item) => {
          let obj = {};
          obj.value = item.accounted;
          obj.name = item.name + " " + item.num + " 人";
          politicsStatusList.push(obj);
        });
        this.option.series[0].data = politicsStatusList;
      },
    },
  },
  mounted() {},
  methods: {},
};
</script>

<style>
</style>