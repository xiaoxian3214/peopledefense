<template>
  <div>
    <detail-header
      title="编辑项目"
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
    <div class="fromtableListBox">
      <el-row type="flex">
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <div class="formLable"><span class="formBj">*</span>标题：</div>
            <div class="formBox">
              <el-input
                v-model="addform.title"
                style="width: 240px"
                placeholder="请输入标题"
                maxlength="20"
              ></el-input>
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="grid-content bg-purple">
            <div class="formLable"><span class="formBj">*</span>类别：</div>
            <div class="formBox">
              <el-select v-model="addform.typeId" placeholder="选择类别">
                <el-option
                  v-for="item in TypeList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <div class="formLable"><span class="formBj">*</span>列表图片:</div>
            <div class="formBox">
              <el-upload
                class="upload-demo"
                style="float: left"
                :action="$UPLOAD_URL"
                :show-file-list="true"
                :headers="headers"
                :file-list="fileList"
                :multiple="false"
                list-type="picture"
                :on-success="handleSuccess"
                :on-error="handleError"
              >
                <!-- :before-upload="beforeAvatarUpload" -->
                <div class="uploadBackground">
                  <div class="uploadContent">
                    <img src="../../assets/upload.jpg" alt="" />
                    <div slot="tip" class="el-upload__tip">
                      图片支持jpg/png格式
                    </div>
                  </div>
                </div>
              </el-upload>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <div class="formLable">内容简介:</div>
            <div class="formBox">
              <el-input
                v-model="addform.introduction"
                style="width: 240px"
                placeholder="请输入内容"
                maxlength="20"
              ></el-input>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="24">
          <div class="grid-content bg-purple">
            <div class="formLable"><span class="formBj">*</span>学习内容:</div>
            <div class="formBox">
              <div class="quill">
                <el-upload
                  class="upload-demo"
                  id="upload"
                  name="file"
                  :action="$UPLOAD_URL"
                  :headers="headers"
                  :show-file-list="false"
                  :on-success="handleSuccess1"
                ></el-upload>
                <!-- :before-upload="beforeAvatarUpload" -->
                <quill-editor
                  v-model="addform.content"
                  ref="quill"
                  :options="editorOption"
                  @change="onEditorChange($event)"
                />
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <div class="qd">
        <el-button class="confirm1" @click="confirm" :loading="isloading"
          >确认</el-button
        >
        <el-button class="btn1" @click="cancel">取消</el-button>
      </div>
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
    const dataJson = JSON.parse(sessionStorage.getItem("data"));
    return {
      isloading: false,
      addform: {
        title: "",
        url: "",
        typeId: "",
        introduction: "",
        content: "",
      },
      breadcrumbList: ["首页", "宣传内容建设", "编辑项目"],
      headers: {
        ContentType: "Multipart/form-data",
        token: dataJson.token,
      },
      fileList: [],
      TypeList: [],
      // 富文本框参数设置
      editorOption: {
        modules: {
          // ImageExtend: {
          //   loading: true, // 可选参数 是否显示上传进度和提示语
          //   name: "file", // 图片参数名
          //   size: 3, // 可选参数 图片大小，单位为M，1M = 1024kb
          //   // action: BaseAPI + "/uploadImage", // 服务器地址, 如果action为空，则采用base64插入图片
          //   action: "",
          //   // data:{type:10},
          //   // response 为一个函数用来获取服务器返回的具体图片地址
          //   // 例如服务器返回{code: 200; data:{ url: 'xxx.com'}}
          //   // 则 return res.data.url
          //   response: (res) => {
          //     return res.data;
          //   },
          //   headers: (xhr) => {
          //     //   Authorization: this.$store.getters.token
          //     xhr.setRequestHeader("Authorization", this.$store.getters.token);
          //   }, // 可选参数 设置请求头部
          //   start: () => {
          //     // this.form.prevcontent = ''
          //   }, // 可选参数 自定义开始上传触发事件
          //   end: () => {
          //     // this.form.prevcontent = ''
          //   }, // 可选参数 自定义上传结束触发的事件，无论成功或者失败
          //   error: () => {
          //     this.form.prevcontent = "";
          //   }, // 可选参数 自定义网络错误触发的事件
          //   change: (xhr, formData) => {}, // 可选参数 选择图片触发，也可用来设置头部，但比headers多了一个参数，可设置formData
          // },
          toolbar: {
            container: [
              ["bold", "italic", "underline", "strike"],
              [{ align: [] }],
              ["link", "image"],
            ],
            handlers: {
              image: function (value) {
                document.querySelector("#upload input").click();
                //   // QuillWatch.emit(this.quill.id);
                if (value) {
                  document.querySelector("#upload").click(); // 劫持原来的图片点击按钮事件
                } else {
                  this.quill.format("image", false);
                }
              },
              // video: function (value) {
              //   if (value) {
              //     // 这是是为了获取您当前点击的那个富文本框
              //     // this.videoOrimg = false
              //     document.querySelectorAll(".upload-demo input")[0].click();
              //   } else {
              //     this.quill.format("image", false);
              //   }
              // },
              link: function (value) {
                console.log(value);
                if (value) {
                  var href = prompt("超链接");
                  this.quill.format("link", href);
                  let length = this.quill.selection.savedRange.index;
                  if (href) {
                    this.quill.clipboard.dangerouslyPasteHTML(
                      length,
                      `<a href="${href}">${href}</a>`
                    );
                  }
                } else {
                  this.quill.format("link", false);
                }
              },
            },
          },
        },
      },
      id: this.$route.query.id,
    };
  },
  mounted() {
    this.propagandadetail();
    this.TypeOfPropagandaContentConstruction();
  },
  methods: {
    TypeOfPropagandaContentConstruction() {
      this.$api.TypeOfPropagandaContentConstruction().then((res) => {
        if (res.code == 200) {
          this.TypeList = res.page.records;
        }
      });
    },
    propagandadetail() {
      this.$api.propagandadetail({ id: this.id }).then((res) => {
        if (res.code == 200) {
          this.addform = res.data;
          this.fileList = [{ url: this.addform.url }];
        } else {
          this.$message.error(res.message);
        }
      });
    },
    onEditorChange(e) {
      console.log(e);
    },
    handleError() {},
    handleSuccess(response) {
      this.fileList = response.data.fileList;
      this.addform.url = response.data.fileList[0].url;
    },
    handleSuccess1(response, file, fileList) {
      let quill = this.$refs.quill.quill;
      // 如果上传成功
      if (response.data.fileList[0].url) {
        // 获取光标所在位置
        let length = quill.getSelection().index;
        // 插入图片，res为服务器返回的图片链接地址
        quill.insertEmbed(length, "image", response.data.fileList[0].url);
        // 调整光标到最后
        quill.setSelection(length + 1);
      } else {
        // 提示信息，需引入Message
        Message.error("图片插入失败");
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    confirm() {
      let data = this.$objValuefilter(this.addform);
      data.id = this.id;
      this.isloading = true;
      this.$api.propagandaupdate(data).then((res) => {
        this.isloading = false;
        if (res.code == 200) {
          this.$message({
            message: "编辑成功",
            type: "success",
          });
          setTimeout(() => {
            this.$router.push("/pages/propaganda/list");
          }, 1000);
        } else {
          this.$message.error(res.message);
        }
      });
    },
    cancel() {
      this.$router.push("/pages/propaganda/list");
    },
    // handleExceed(files, fileList) {
    //   this.$message.warning(
    //     `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
    //       files.length + fileList.length
    //     } 个文件`
    //   );
    // },
    // beforeRemove(file, fileList) {
    //   return this.$confirm(`确定移除 ${file.name}？`);
    // },
    // beforeAvatarUpload() {},
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
  // height: 300px;
  overflow: auto;
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
</style>
<style>
.ql-toolbar.ql-snow {
  display: flex;
}
</style>