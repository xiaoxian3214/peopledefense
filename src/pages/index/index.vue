<template>
  <div class="indexBox">
    <detail-header title="首页" :breadcrumbList="['首页']"> </detail-header>
    <div class="tableListBox index" v-loading="loading">
      <!-- 县人防办、联络员只能看到所在行政区域的数据展示 -->
      <!-- 只是县人防办 $store.state.roleIdList.includes(2) &&  $store.state.roleIdList.length == 1
      只是联络员   $store.state.roleIdList.includes(4) &&  $store.state.roleIdList.length == 1
      是县人防办且是联络员 $store.state.roleIdList.includes(4) && $store.state.roleIdList.includes(2) && $store.state.roleIdList.length == 2 -->
      <Area @getindex="getindex" v-if="isLook()" />
      <div class="BREAD">队员信息</div>


      
      <div>
        <div class="col">
          <div class="childCLO-5" style="display: flex; justify-content: space-between">
            <!-- 男女比例 -->
            <div class="childCLO-5 shadow">
              <div class="top">
                <span class="tips"></span>
                <span class="title">男女比例</span>
              </div>
              <ManWomanRatio id="sexOptions" :proData="addform.sexList" />
            </div>
            <!-- 政治面貌 -->
            <div class="childCLO-5 shadow">
              <div class="top">
                <span class="tips"></span>
                <span class="title">政治面貌</span>
              </div>
              <ManWomanRatio id="politicsStatusListOptions" :proData="addform.politicsStatusList" />
            </div>
          </div>
          <div class="childCLO-5 flxe">
            <div class="grandsonCLO-3">
              <div class="top">
                <span class="tips"></span>
                <span class="title">队伍数量</span>
                <i style="margin-left: auto; margin-right: 11px" class="el-icon-question"></i>
              </div>
              <div class="user2icon">
                <img src="../../../src/assets/img/teamstatistics.png" alt="" />
              </div>
              <div class="usernumber">{{ addform.teamNum }}</div>
              <div class="unit">单位：支</div>
            </div>
            <div id="peoplestatistics" class="grandsonCLO-3">
              <div class="top">
                <span class="tips"></span>
                <span class="title">专业队人数</span>
                <i style="margin-left: auto; margin-right: 11px" class="el-icon-question"></i>
              </div>
              <div class="user2icon">
                <img src="../../../src/assets/img/user2.png" alt="" />
              </div>
              <div class="usernumber">{{ addform.playersNum }}</div>
              <div class="unit">单位：人</div>
            </div>
            <div id="troopstatistics" class="grandsonCLO-3">
              <div class="top">
                <span class="tips"></span>
                <span class="title"> 新型专业队占比</span>
                <i style="margin-left: auto; margin-right: 11px" class="el-icon-question"></i>
              </div>
              <NewTeamRatio id="newTypeProfessionalTeam" style="width: 100%; height: 150px" :newTeamRatio="addform.newTeamRatio" :newTeamNum="addform.newTeamNum" />
              <div class="unit" style="padding-top: 0">单位：支</div>
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="childCLO-5 shadow">
          <div class="top">
            <span class="tips"></span>
            <span class="title">年龄统计</span>
          </div>
          <StatisticsAge :class="{ isShow: addform.ageList && !addform.ageList.length }" id="agestatistics" :proData="addform.ageList" />
          <el-empty description="暂无数据" v-if="addform.ageList && !addform.ageList.length" :image-size="60"></el-empty>
        </div>
        <div class="childCLO-5 shadow">
          <div class="top">
            <span class="tips"></span>
            <span class="title">学历统计</span>
          </div>
          <EducationBac id="economicsstatistics" :proData="addform.educationBackgroundList" />
        </div>
      </div>
      <div class="col">
        <div class="colbootom" style="height: 270px">
          <div class="top">
            <span class="tips"></span>
            <span class="title">专业统计</span>
          </div>
          <Specialty
            :class="{
              isShow: addform.professionalList && !addform.professionalList.length,
            }"
            :proData="addform.professionalList"
            id="majorclass"
            class="chart"
          />
          <el-empty v-if="addform.professionalList && !addform.professionalList.length" description="暂无数据" :image-size="60"></el-empty>
        </div>
      </div>
      <div class="BREAD">训练</div>
      <div class="col">
        <div class="childCLO-5 flxe">
          <div class="grandsonCLO-5">
            <div class="top">
              <span class="tips"></span>
              <span class="title">参与训练队伍数量</span>
            </div>
            <div class="user2icon">
              <img src="../../../src/assets/img/teamstatistics.png" alt="" />
            </div>
            <div class="usernumber">{{ addform.trainTeamNum }}</div>
            <div class="unit">单位：支</div>
          </div>
          <div class="grandsonCLO-5">
            <div class="top">
              <span class="tips"></span>
              <span class="title">参与训练队员数量</span>
            </div>
            <div class="user2icon">
              <img src="../../../src/assets/img/user2.png" alt="" />
            </div>
            <div class="usernumber">{{ addform.trainPlayersNum }}</div>
            <div class="unit">单位：人</div>
          </div>
        </div>
        <div class="childCLO-5 flxe">
          <div class="grandsonCLO-5">
            <div class="top">
              <span class="tips"></span>
              <span class="title">训练次数</span>
            </div>
            <div class="user2icon">
              <img src="../../../src/assets/img/xunlian.png" alt="" />
            </div>
            <div class="usernumber">{{ addform.traubNum }}</div>
            <div class="unit">单位：次</div>
          </div>
          <div class="grandsonCLO-5">
            <div class="top">
              <span class="tips"></span>
              <span class="title">训练科目数量</span>
              <i style="margin-left: auto; margin-right: 11px" class="el-icon-question"></i>
            </div>
            <div class="user2icon">
              <img src="../../../src/assets/img/subject.png" alt="" />
            </div>
            <div class="usernumber">{{ addform.trainingCourseNum }}</div>
            <div class="unit">单位：门</div>
          </div>
        </div>
      </div>
      <div class="BREAD">拉动点验<span style="margin-left: calc(50% - 70px)">整组交叉审核</span></div>
      <div class="col">
        <div class="childCLO-5 flxe">
          <div id="peoplestatistics" class="grandsonCLO-3">
            <div class="top">
              <span class="tips"></span>
              <span class="title">拉动点验队伍数</span>
              <i style="margin-left: auto; margin-right: 11px" class="el-icon-question"></i>
            </div>
            <div class="user2icon">
              <img src="../../../src/assets/img/pullcheckteamNumber.png" alt="" />
            </div>
            <div class="usernumber">{{ addform.pullCheckTeamNum }}</div>
            <div class="unit">单位：支</div>
          </div>
          <div id="troopstatistics" class="grandsonCLO-3">
            <div class="top">
              <span class="tips"></span>
              <span class="title">拉动点验队员数</span>
              <i style="margin-left: auto; margin-right: 11px" class="el-icon-question"></i>
            </div>
            <div class="user2icon">
              <img src="../../../src/assets/img/pullcheckteamMemberNumber.png" alt="" />
            </div>
            <div class="usernumber">{{ addform.pullCheckPlayerNum }}</div>
            <div class="unit">单位：人</div>
          </div>
          <div id="peoplestatistics" class="grandsonCLO-3">
            <div class="top">
              <span class="tips"></span>
              <span class="title">拉动点验次数</span>
              <i style="margin-left: auto; margin-right: 11px" class="el-icon-question"></i>
            </div>
            <div class="user2icon">
              <img src="../../../src/assets/img/pullckeckNumber.png" alt="" />
            </div>
            <div class="usernumber">{{ addform.pullCheckNum }}</div>
            <div class="unit">单位：次</div>
          </div>
        </div>
        <div class="childCLO-5 flxe">
          <div class="grandsonCLO-3">
            <div class="top">
              <span class="tips"></span>
              <span class="title">重复人数</span>
            </div>
            <div class="user2icon">
              <img src="../../../src/assets/img/repetition.png" alt="" />
            </div>
            <div class="usernumber">{{ addform.auditRepeatPlayerNum }}</div>
            <div class="unit">单位：人</div>
          </div>
          <div class="grandsonCLO-3">
            <div class="top">
              <span class="tips"></span>
              <span class="title">审核人数</span>
            </div>
            <div class="user2icon">
              <img src="../../../src/assets/img/checkPeopleNumber.png" alt="" />
            </div>
            <div class="usernumber">{{ addform.auditPlayerNum }}</div>
            <div class="unit">单位：人</div>
          </div>
          <div class="grandsonCLO-3">
            <div class="top">
              <span class="tips"></span>
              <span class="title">替换人数</span>
            </div>
            <div class="user2icon">
              <img src="../../../src/assets/img/replacePeopleNumber.png" alt="" />
            </div>
            <div class="usernumber">{{ addform.replaceNum }}</div>
            <div class="unit">单位：人</div>
          </div>
        </div>
      </div>
      <div class="BREAD">宣传内容</div>
      <div class="col">
        <div class="colbootom" style="height: 270px; width: calc(50% - 20px)">
          <div class="top">
            <span class="tips"></span>
            <span class="title">宣传内容</span>
          </div>
          <PromotionContent id="promotionContent" :proData="addform.propagandaList" :propagandaNum="addform.propagandaNum" />
        </div>
      </div>
      <!-- <div class="BREAD">整组交叉审核</div> -->
      <!-- <div class="col">
        <div class="childCLO-5 flxe">
          <div class="grandsonCLO-3">
            <div class="top">
              <span class="tips"></span>
              <span class="title">重复人数</span>
            </div>
            <div class="user2icon">
              <img src="../../../src/assets/img/repetition.png" alt="" />
            </div>
            <div class="usernumber">{{ addform.auditRepeatPlayerNum }}</div>
            <div class="unit">单位：人</div>
          </div>
          <div class="grandsonCLO-3">
            <div class="top">
              <span class="tips"></span>
              <span class="title">审核人数</span>
            </div>
            <div class="user2icon">
              <img src="../../../src/assets/img/checkPeopleNumber.png" alt="" />
            </div>
            <div class="usernumber">{{ addform.auditPlayerNum }}</div>
            <div class="unit">单位：人</div>
          </div>
          <div class="grandsonCLO-3">
            <div class="top">
              <span class="tips"></span>
              <span class="title">替换人数</span>
            </div>
            <div class="user2icon">
              <img src="../../../src/assets/img/replacePeopleNumber.png" alt="" />
            </div>
            <div class="usernumber">{{ addform.replaceNum }}</div>
            <div class="unit">单位：人</div>
          </div>
        </div>
      </div> -->
      <!-- <div class="BREAD">重要经济目标</div>
      <div class="colbootom">
        <div class="top">
          <span class="tips"></span>
          <span class="title">重要经济目标</span>
        </div>
        <div class="bootom">
          <div class="classbox">
            <div class="title">重要经济目标大类</div>
            <EconomicTargets
              id="broadtype"
              :proData="addform.importantEconomicBigClass"
            />
          </div>
          <div class="classbox">
            <div class="title">重要经济目标中类</div>
            <EconomicTargets
              id="centretype"
              :proData="addform.importantEconomicMiddleClass"
            />
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import detailHeader from "@/components/detailHeader";
import ManWomanRatio from "./components/ManWomanRatio";
import NewTeamRatio from "./components/NewTeamRatio";
import EconomicTargets from "./components/EconomicTargets";
import StatisticsAge from "./components/StatisticsAge";
import EducationBac from "./components/EducationBac";
import Specialty from "./components/Specialty";
import PromotionContent from "./components/PromotionContent";
import Area from "./components/Area";

export default {
  components: {
    detailHeader,
    ManWomanRatio,
    NewTeamRatio,
    EconomicTargets,
    StatisticsAge,
    EducationBac,
    Specialty,
    PromotionContent,
    Area,
  },
  data() {
    return {
      addform: {},
      loading: true,
    };
  },
  mounted() {
    this.getindex("");
  },
  methods: {
    isLook(){

        if ( this.$store.state.roleIdList.includes(2) &&  this.$store.state.roleIdList.length == 1) {
          // 只是县人防办
          return false
        }
        if (this.$store.state.roleIdList.includes(4) &&  this.$store.state.roleIdList.length == 1) {
          //  只是联络员
          return false
        }
        if((this.$store.state.roleIdList.includes(4) && this.$store.state.roleIdList.includes(2)) && this.$store.state.roleIdList.length == 2 ){
          // 是县人防办且是联络员 
          return false
        }
        return true
    },
    // 获取首页数据
    getindex(id) {
      this.loading = true;
      let adminId;
      // 不是县人防办
      // 并且不是联络员
      if (this.isLook()) {
        adminId = id;
      } else {
        adminId = this.$store.state.administrativeCode;
      }
      this.$api.apiIndex({ id: adminId }).then((res) => {
        this.loading = false;
        if (res.code === 200) {
          this.addform = res.data;
        } else {
          this.$message.error(res.message);
        }
      });
    },
  },
};
</script>
<style >
</style>
<style lang="scss" scoped>
.indexBox {
  min-width: 1700px;
}
.tableListBox.index {
  .isShow {
    display: none;
  }
  .BREAD {
    // text-align: center;
    // width: calc(50% - 20px);
    margin-bottom: 8px;
    // text-decoration: underline;
    border-bottom: 1px solid rgb(0, 0, 0);
    // background-color: rgb(121, 180, 248);
    height: 33px;
    font-size: 23px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 800;
    color: #000000;
    line-height: 33px;
  }
  .user2icon {
    height: 35px;
    padding: 11px 0 15px 0;
    text-align: center;
    position: relative;
    img {
      height: 100%;
      width: 37px;
    }
    .userText {
      // width: 70px;
      // height: 50px;
      width: 100%;
      position: absolute;
      bottom: -45px;
      // left: 36%;
      text-align: center;
      margin: 0 auto;
      font-size: 14px;
    }
  }
  .usernumber {
    text-align: center;
    height: 70px;
    font-size: 50px;
    font-family: PingFangSC-Bold, PingFang SC;
    font-weight: bold;
    color: #3396fa;
    line-height: 70px;
    letter-spacing: 2px;
  }
  .unit {
    padding: 20px 17px 0 0;
    text-align: right;
    height: 17px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
    line-height: 17px;
  }

  padding: 30px;
  .colbootom {
    width: 100%;
    height: 339px;
    box-shadow: 0px 0px 22px 0px rgba(0, 0, 0, 0.1);
    .bootom {
      height: 295px;
      display: flex;
      justify-content: space-around;
      .classbox {
        width: calc(100% / 3);
        // border: 1px solid red;
        .title {
          text-align: center;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #666666;
          line-height: 17px;
        }
        .conter {
          width: 100%;
          height: calc(100% - 17px);
        }
      }
    }
  }
  .top {
    display: flex;
    align-items: center;
    height: 49px;
    line-height: 57px;
    margin-left: 20px;
    color: #c0c0c0;
    .tips {
      display: inline-block;
      width: 4px;
      height: 25px;
      background: #1492ff;
      border-radius: 2px;
      margin-right: 12px;
    }
    .title {
      font-size: 18px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #333333;
      line-height: 25px;
    }
  }
  .col {
    height: 250px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
    .childCLO-5.shadow {
      box-shadow: 0px 0px 22px 0px rgba(0, 0, 0, 0.1);
    }
    .chart {
      // height: 190px;
      height: 210px;
      width: 100%;
    }

    .childCLO-5.flxe {
      display: flex;
      justify-content: space-between;
    }
    .childCLO-5 {
      // width: calc(50%);
      // width: calc(50% - 20px);
      width: calc(50% - 20px);
      // min-width: 260px;
      height: 250px;
      .grandsonCLO-5 {
        box-shadow: 0px 0px 22px 0px rgba(0, 0, 0, 0.1);
        // width: calc(33% - 20px);
        width: calc(50% - 20px);
        height: 250px;
      }
      .grandsonCLO-3 {
        box-shadow: 0px 0px 22px 0px rgba(0, 0, 0, 0.1);
        width: calc(33% - 10px);
        height: 250px;
      }
    }
  }
}
</style>