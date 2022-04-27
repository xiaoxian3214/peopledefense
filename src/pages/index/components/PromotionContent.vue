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
    propagandaNum: {
      type: [String, Number],
      default: "",
    },
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
    return {};
  },

  computed: {
    option: function () {
      let _this = this;
      return {
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
                  _this.propagandaNum +
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
            data: [],
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
    },
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
          obj.name = item.type;
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