<template>
  <div class="login">
    <!-- <div
      style="
        background: #ffff;
        position: absolute;
        z-index: 9999;
        top: 0;
        left: 0;
        width: 100vw;
        height: 15vh;
        overflow-y: auto;
      "
    >
      获取登录授权码：{{ result || "---" }}
      <br />
      使用免登授权码换取用户信息：{{ responseData || "---" }}
      <br />
      使用手机号获取用户信息：{{ logindata || "---" }}
    </div> -->
    <div class="projectorLamp">
      <div class="wrap"></div>
      <div class="leftwrap">
        <img src="@/assets/login.png" alt="" />
      </div>
      <div class="formworp">
        <div class="title">浙里防登录</div>
        <!-- <div v-if="false"> -->
        <div class="tabClass">
          <!-- @tab-click="handleClick" -->
          <el-tabs v-model="activeName">
            <el-tab-pane label="浙政钉扫码" name="0">
              <!-- 浙里办的 -->
              <iframe
                src="https://login-pro.ding.zj.gov.cn/oauth2/auth.htm?response_type=code&client_id=WZ_RFB_dingoa_dingoa&redirect_uri=https://rfb-zlf.wenzhou.gov.cn:8003/&scope=get_user_info&authType=QRCODE&embedMode=true"
                class="codeImg"
              ></iframe>
              <!-- 浙政钉的 -->
              <!-- <iframe
                src="https://login.dg-work.cn/oauth2/auth.htm?response_type=code&client_id=RFB_WEB_dingoa&redirect_uri=http://192.168.1.126:8085/&scope=get_user_info&authType=QRCODE&embedMode=true"
                class="codeImg"
              ></iframe>
                  @keyup.enter.native="submitForm" -->
            </el-tab-pane>
            <el-tab-pane label="手机号" name="1">
              <div class="loginlebel">手机号</div>
              <div class="inputwrap">
                <el-input
                  v-model="phoneNumber"
                  type="text"
                  placeholder="请输入手机号"
                  maxlength="11"
                >
                </el-input>
              </div>
              <div class="loginlebel">验证码</div>
              <div class="inputwrap">
                <el-input v-model="code" type="text" placeholder="请输入验证码">
                </el-input>
                <el-button
                  type="primary"
                  @click="submit"
                  :class="butTitle == '获取验证码' ? 'logBut1' : 'logBut2'"
                  :disabled="butTitle != '获取验证码' ? true : false"
                  >{{ butTitle }}</el-button
                >
              </div>
              <div class="bunwrap">
                <el-button type="primary" class="loginBtn" @click="submitForm"
                  >登录</el-button
                >
              </div></el-tab-pane
            >
          </el-tabs>
        </div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
import dd from "gdt-jsapi";
import { GetRequestParameters } from "../../utils/tools";
export default {
  data() {
    return {
      token: "",
      phoneNumber: "",
      code: "",
      butTitle: "获取验证码",
      responseData: {},
      result: "",
      logindata: "",
      form: {},
      accessToken: "",
      activeName: "0",
    };
  },
  computed: {},
  mounted() {
    let code = "";
    var that = this;
    window.addEventListener("message", function (event) {
      // 这里的event.data 就是登录成功的信息
      // 数据格式：{ "code": "aaaa", "state": "bbbb" }
      console.log(event.data.code, 0);
      code = event.data.code;
      if (code) {
        that.getQRUserInformation(code);
      }
    });
    dd.ready(() => {
      // 测试环境id 50196445
      // 正式环境id 196729
      // 获取登录授权码
      dd.getAuthCode({ corpId: "196729" }).then((result) => {
        this.result = JSON.stringify(result);
        let flagauthCode = result.auth_code;
        // 使用免登授权码换取用户信息
        this.$api.getUserInformation({ authCode: flagauthCode }).then((res) => {
          if (res.code == 200) {
            this.responseData = res.data;
            if (res.data.isFirstLogin == 1) {
              // 第一次登录
              this.goUrl();
            } else {
              sessionStorage.setItem("data", JSON.stringify(this.responseData));
              // 非第一次登录
              let type = this.GetRequestParameters("type");
              let add_In;
              if (type) {
                // 是卡片跳转
                this.goUrl();
              } else {
                // 不是卡片跳转
                add_In = res.data.permissionsList[0];
                // 保证跳转至权限列表第一个
                if (!add_In.secondList) {
                  this.$router.push({ path: add_In.url });
                } else if (add_In.secondList) {
                  let url = add_In[0].url;
                  this.$router.push({ path: url });
                }
              }
              // 用户信息埋点
              // this.buryDot(this.responseData.name, this.responseData.id);
            }
          }
        });
      });
    });
  },
  methods: {
    GetRequestParameters(label) {
      let url = window.location.href;
      let theRequest = new Object();
      if (url.indexOf("?") != -1) {
        let str = url.split("?");
        let strs = str[1].split("&");
        strs.forEach((item) => {
          theRequest[item.split("=")[0]] = item.split("=")[1];
        });
      }
      return theRequest[label];
    },
    goUrl() {
      let type = this.GetRequestParameters("type");
      let id = this.GetRequestParameters("id");
      console.log(id);
      let url = "";
      if (type == 1) {
        //训练详情
        url = "/pages/teamtrain/Thetrainingteam/detail?id=" + id;
      } else if (type == 2) {
        //训练编辑人员
        url = "/pages/teamtrain/Thetrainingteam/allEdit?id=" + id;
      } else if (type == 3) {
        //点验详情
        url = "/pages/pullcheck/detail?id=" + id;
      } else if (type == 4) {
        //点验编辑人员
        url = "/pages/pullcheck/edit?id=" + id;
      } else {
        url = "/";
      }
      this.$router.push(url);
    },
    submit() {
      if (!this.phoneNumber) {
        this.$message.error("请输入手机号");
        return;
      }
      if ((this.butTitle = "获取验证码")) {
        this.sendCode();
      }
    },
    // 获取验证码
    sendCode() {
      this.$api.sendCode({ phone: this.phoneNumber }).then((res) => {
        if (res.code == 200) {
          let index = 60;
          this.butTitle = index + "s";
          let setTime = setInterval(() => {
            index = --index;
            if (index >= 0) {
              this.butTitle = index + "s";
            } else {
              this.butTitle = "获取验证码";
              clearTimeout(setTime);
            }
          }, 1000);
        } else {
          this.$message.error(res.message);
        }
      });
    },
    // // 用户信息埋点
    // buryDot(username, userId, yourDeviceId) {
    //   // 如采集用户信息是异步行为需要先执行这个BLOCK埋点
    //   aplus_queue.push({
    //     action: "aplus.setMetaInfo",
    //     arguments: ["_hold", "BLOCK"],
    //   });

    //   // 设置会员昵称
    //   aplus_queue.push({
    //     action: "aplus.setMetaInfo",
    //     arguments: ["_user_nick", username],
    //   });
    //   // 设置会员ID
    //   aplus_queue.push({
    //     action: "aplus.setMetaInfo",
    //     arguments: ["_user_id", userId],
    //   });
    //   aplus_queue.push({
    //     action: "aplus.setMetaInfo",
    //     arguments: ["_dev_id", "yourDeviceId"],
    //   });
    //   // 如采集用户信息是异步行为，需要先设置完用户信息后再执行这个START埋点
    //   // 此时被block住的日志会携带上用户信息逐条发出
    //   aplus_queue.push({
    //     action: "aplus.setMetaInfo",
    //     arguments: ["_hold", "START"],
    //   });
    // },
    // 扫码登陆
    getQRUserInformation(code) {
      this.$api.getQRUserInformation({ code }).then((res) => {
        if (res.code == 200) {
          if (res.data.isFirstLogin == 1) {
            this.responseData = res.data;
            this.$message.error("用户首次登陆需要绑定手机号");
          } else if (res.data.isFirstLogin == 0) {
            this.loginData(res);
          }
        }
      });
    },
    // 手机号登陆
    submitForm() {
      if (!this.phoneNumber) {
        this.$message.error("请输入手机号");
        return;
      }
      if (!this.code) {
        this.$message.error("请输入验证码");
        return;
      }
      let data = {};
      data.phone = this.phoneNumber;
      data.code = this.code;
      data.openId = this.responseData.openId;
      data.accountId = this.responseData.accountId;
      this.$api.login(data).then((res) => {
        if (res.code == 200) {
          this.loginData(res);
          // 用户信息埋点
          // this.buryDot(this.responseData.name, this.responseData.id);
        } else if (res.code == 1004) {
          this.$message.error(res.message);
        }
      });
    },
    loginData(res) {
      if (!res.data.permissionsList.length) {
        this.$message.error("此账号没有权限!");
        return;
      }
      this.responseData = res.data;
      // console.log(this.responseData,123);
      // 判断用户权限列表第一个有没有二级权限，分别跳转
      sessionStorage.setItem("data", JSON.stringify(this.responseData));
      // sessionStorage.setItem("roleName", this.responseData.roleName);
      // sessionStorage.setItem("administrativeCode", this.responseData.administrativeCode);
      this.$store.commit("longData", this.responseData);
      this.$store.commit('CHANGE_ROLENAME',this.responseData.roleName)
      // this.$store.commit('administrativeCode',this.responseData.administrativeCode)
      let add_In = res.data.permissionsList[0];
      // setTimeout(()=>{
      let type = this.GetRequestParameters("type");
      console.log(type);
      // return;
      if (type) {
        this.goUrl();
      } else {
        if (add_In.secondList == null) {
          this.$router.push({
            path: add_In.url,
          });
        } else {
          let url = add_In.secondList[0].url;
          this.$router.push({
            path: url,
          });
        }
      }
      // },200)
    },
  },
};
</script>

<style>
.loginlebel {
  /* margin-top: 31px; */
  /* margin-top: 11px; */
  /* margin-bottom: 10px; */
  min-width: 40px;
  height: 28px;
  font-size: 20px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #474747;
  line-height: 28px;
  /* margin-left: 47px; */
}
.bunwrap {
  /* margin-left: 47px; */
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 332px;
  height: 40px;
}
.codeSrc {
  text-align: center;
  margin-top: 20px;
}
.codeImg {
  width: 100%;
  height: 300px;
  /* background: #ffffff; */
  border: none;
  /* margin: 0 auto; */
  /* overflow: hidden; */
}
.bunwrap .loginBtn {
  padding: 0 !important;
  width: 161px !important;
  height: 40px !important;
}
.bunwrap .forget {
  width: 82px;
  font-size: 15px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #3396fa;
  letter-spacing: 1px;
}
.pwd-input {
  width: 250px;
}
.inputwrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* width: 332px; */
  height: 38px;
  /* margin-left: 47px; */
  border-bottom: 1px solid #d8d8d8;
  margin-bottom: 20px;
}
.inputwrap .el-input__inner {
  padding: 0 !important;
  margin: 0 !important;
}
.inputwrap input {
  border: none !important;
  width: 80% !important;
  height: 100%;
}
.inputwrap .iconeye {
  width: 32px;
  height: 19px;
}
.logBut1 {
  min-width: 90px;
  flex-shrink: 0;
  height: 90%;
  margin-left: 10px;
  padding: 0 10px;
  /* background-color: #00d7ff; */
}
.logBut2 {
  min-width: 90px;
  padding: 0 10px;
  flex-shrink: 0;
  height: 90%;
  margin-left: 10px;
  background-color: #a0cfff;
}
.login {
  background-image: url(../../assets/bg.png);
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login .projectorLamp {
  width: 1200px;
  height: 700px;
  background: rgba(225, 238, 255, 0.5);
  /* display: flex;
  justify-content: center;
  align-items: center; */
  position: relative;
}
.login .projectorLamp .wrap {
  width: 929px;
  height: 542px;
  background: #e1eeff;
  position: absolute;
  top: calc(50% - 271px);
  left: calc(50% - 464px);
  filter: blur(50px);
}
.login .projectorLamp .leftwrap {
  position: absolute;
  z-index: 99;
  width: 660px;
  height: 466px;
  left: 8px;
  top: 79px;
}
.login .projectorLamp .leftwrap img {
  width: 100%;
  height: 100%;
}
.login .projectorLamp .formworp {
  position: absolute;
  right: 82px;
  top: 102px;
  width: 417px;
  height: 460px;
  background: #ffffff;
  box-shadow: 0px 4px 6px 1px rgba(153, 153, 153, 0.24);
  border-radius: 10px;
  z-index: 99;
  padding: 44px 47px;
  box-sizing: border-box;
}
.login .projectorLamp .formworp .title {
  width: 180px;
  height: 42px;
  font-size: 30px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #3396fa;
  line-height: 42px;
}
.tabClass {
  /* padding: 0 47px; */
}
/* // display: flex;
// justify-content: center;
// align-items: center;
// .content {
//   display: inline-block;
//   width: 1200px;
//   height: 700px;
//   background: #ffffff;
//   opacity: 0.5;
//   position: relative;
//   // .left {
//   //   position: relative;
//   //   width: 660px;
//   //   height: 466px;
//   //   z-index: 9;
//   //   margin-top: 79px;
//   //   margin-left: 8px;
//   //   border: 1px solid red;
//   //   img {
//   //     width: 100%;
//   //     height: 100%;
//   //   }
//   // }
// }
// .projectorLamp {
//   width: 929px;
//   height: 542px;
//   background: #ffffff;
//   filter: blur(50px);
//   // position: absolute;
//   top: 79px;
//   left: 136px;
//   // z-index: 2;
// } */
</style>