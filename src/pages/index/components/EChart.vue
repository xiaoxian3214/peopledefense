<template>
  <div class="chart" :id="id"></div>
</template>
<script>
export default {
  props: {
    id: {
      type: [String, Number],
      default: "",
    },
    proOption: {
      //图表配置
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      chart: null, //图表实例
    };
  },
  watch: {
    proOption: {
      deep: true,
      handler: function (newVal, oldVal) {
        this.chart.setOption(newVal);
      },
    },
  },
  mounted() {
    // 初始化图表
    this.chart = this.$echarts.init(document.getElementById(this.id));
    this.chart.setOption(this.proOption);
    window.addEventListener("resize", () => {
      this.$nextTick((_) => { 
        document.getElementById("agestatistics") && this.$echarts.init(document.getElementById("agestatistics")).resize();
        document.getElementById("majorclass") && this.$echarts.init(document.getElementById("majorclass")).resize();
        document.getElementById("economicsstatistics") && this.$echarts.init(document.getElementById("economicsstatistics")).resize();
        document.getElementById("promotionContent") && this.$echarts.init(document.getElementById("promotionContent")).resize();
        document.getElementById("broadtype") && this.$echarts.init(document.getElementById("broadtype")).resize();
        document.getElementById("centretype") && this.$echarts.init(document.getElementById("centretype")).resize();
        document.getElementById("sexOptions") && this.$echarts.init(document.getElementById("sexOptions")).resize();
        document.getElementById("politicsStatusListOptions") && this.$echarts.init(document.getElementById("politicsStatusListOptions")).resize();
        document.getElementById("newTypeProfessionalTeam") && this.$echarts.init(document.getElementById("newTypeProfessionalTeam")).resize();
      });
    });
  },
  methods: {},
};
</script>
<style scoped>
.chart-container {
  width: 100%;
  height: 100%;
  position: relative;
}
.chart {
  width: 100%;
  height: 100%;
}
</style>
