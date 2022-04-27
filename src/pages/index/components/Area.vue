<template>
  <div class="indexTatile">
    <div
      :key="index"
      v-for="(item, index) in ZD_WZ_XZQDM_LIST"
      class="DIVwarp"
      :class="{ active: item.id == id }"
      @click="tatileID(item.id)"
    >
      <div>
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ZD_WZ_XZQDM_LIST: [],
      id: "",
    };
  },
  mounted() {
    this.ZD_WZ_XZQDM();
  },
  methods: {
    tatileID(id) {
      this.id = id;
      this.$emit("getindex", id);
    },
    ZD_WZ_XZQDM() {
      this.$api.ZD_WZ_XZQDM().then((res) => {
        if (res.code == 200) {
          this.ZD_WZ_XZQDM_LIST = res.page.records;
          this.id = this.ZD_WZ_XZQDM_LIST[0].id;
        }
      });
    },
  },
};
</script>

<style  lang="scss" scoped>
.indexTatile {
  width: 100%;
  display: flex;
  padding: 0 0 15px 0;
  justify-content: space-between;
  .DIVwarp {
    cursor: pointer;
    background: rgba(244, 244, 244, 0.5);
    padding: 5px;
    border-radius: 6px;
  }
}
.active {
  color: #1492ff;
  border: 1px solid #1492ff;
}
</style>