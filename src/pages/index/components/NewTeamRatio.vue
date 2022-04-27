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
    newTeamRatio: {
      type: [Number, String],
      default: "",
    },
    newTeamNum: {
      type: [Number, String],
      default: "",
    },
  },
  data() {
    return {};
  },
  computed: {
    option: function () {
      let _this = this;
      return {
        series: [
          {
            type: "pie",
            labelLine: {
              smooth: 1,
              length2: 5,
              show: true,
            },
            // name: "第一个圆环",
            clockWise: false,
            radius: ["80%", "90%"],
            itemStyle: {
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
            },
            hoverAnimation: false,
            center: ["50%", "50%"],
            data: [
              {
                value: _this.newTeamRatio ? _this.newTeamRatio : 0,
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
                      // if (_this.newTeamRatio == null) {
                      //   return "{b|" + 0 + "%}\n\n" + "{a|" + 0 + "支}";
                      // } else if (_this.newTeamRatio == null) {
                      //   return "{b|" + o + "%}\n\n" + "{a|" + 0 + "支}";
                      // } else {
                      if (!_this.newTeamNum) {
                        return "{b|" + 0 + "%}\n\n" + "{a|" + 0 + "支}";
                      } else {
                        return (
                          "{b|" +
                          _this.newTeamRatio +
                          "%}\n\n" +
                          "{a|" +
                          _this.newTeamNum +
                          "支}"
                        );
                      }

                      // }
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
                value: _this.newTeamRatio ? 100 - _this.newTeamRatio : 100,
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
    },
  },
  mounted() {},
  methods: {},
};
</script>

<style>
</style>