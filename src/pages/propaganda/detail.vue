<template>
  <div>
    <detail-header
      title="项目详情"
      :breadcrumbList="breadcrumbList"
    ></detail-header>
    <div
      class="fromHeader"
      @click="
        () => {
          this.$router.back();
        }
      "
    >
      <i class="el-icon-arrow-left"></i>
      <el-button type="text" style="color: black; font-size: 20px"
        >返回</el-button
      >
    </div>
    <!-- 内容 -->
    <div class="fromtableListBox detail">
      <el-row type="flex">
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <div class="formLable">标题：</div>
            <div class="formBox">
              {{ addform.title }}
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable">类别：</div>
            <div class="formBox">
              {{ addform.typeId }}
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <div class="formLable">列表图片:</div>
            <div class="formBox">
              <el-image
                style="width: 100px; height: 100px"
                :src="addform.url"
                :preview-src-list="[addform.url]"
              >
              </el-image>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <div class="formLable">内容简介:</div>
            <div class="formBox">
              {{ addform.introduction }}
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="24">
          <div class="grid-content bg-purple">
            <div class="formLable">学习内容:</div>
            <div class="formBox">
              <div class="quill">
                <div v-html="addform.content" id="content"></div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import detailHeader from "@/components/detailHeader";
import { throttle } from "@/utils/tools.js";
import { quillEditor } from "vue-quill-editor";

import "quill/dist/quill.core.css"; // import styles
import "quill/dist/quill.snow.css"; // for snow theme
import "quill/dist/quill.bubble.css"; // for bubble theme
export default {
  components: {
    detailHeader,
    quillEditor,
  },
  data() {
    return {
      addform: {
        title: "",
        url: "",
        typeId: "",
        introduction: "",
        content: "",
      },
      breadcrumbList: ["首页", "宣传内容建设", "项目详情"],
      TypeList: [],
      // 富文本框参数设置
      id: this.$route.query.id,
    };
  },
  mounted() {
    this.propagandadetail();
  },
  methods: {
    // 拿到类别列表，查找对应id的name
    TypeOfPropagandaContentConstruction() {
      this.$api.TypeOfPropagandaContentConstruction().then((res) => {
        if (res.code == 200) {
          this.TypeList = res.page.records;
          let findData = this.TypeList.find((item) => {
            return item.id == this.addform.typeId;
          });
          this.addform.typeId = findData.name;
        }
      });
    },
    propagandadetail() {
      this.$api.propagandadetail({ id: this.id }).then((res) => {
        if (res.code == 200) {
          this.addform = res.data;
          this.TypeOfPropagandaContentConstruction();
        } else {
          this.$message.error(res.message);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.top-title {
  background-color: #ffffff;
  width: 100%;
  height: 50px;
  .top-left-title {
    float: left;
    margin-left: 15px;
    align-items: center;
    height: 50px;
    display: flex;
    .top-ttitle-font {
      font-weight: 550;
      color: #333333;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
    }
  }
}
.content {
  background-color: #ffffff;
  width: 100%;
  overflow-y: scroll;
  margin-top: 20px;
  .content-left {
    padding-left: 135px;
    margin-bottom: 30px;
  }
  .content-zd {
    color: red;
  }
  .bg-purple {
    float: left;
  }
}
.uploadBackground {
  background: #f2f2f2;
  width: 240px;
  height: 109px;
  .uploadContent {
    height: 100px;
    align-items: center;
    padding: 20px;
  }
}
.quill {
  width: 945px;
  // margin-left: 135px;
}
.qd {
  // position : absolute ;
  bottom: 100px;
  // margin-top: 25%;
  padding-bottom: 80px;
  // left : 0px ;
}
#upload {
  height: 0;
}
#content {
  width: 900px;
  max-height: 400px;
  overflow: auto;
}
</style>
<style>
.ql-toolbar.ql-snow {
  display: flex;
}
</style>