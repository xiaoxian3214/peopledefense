<template>
  <div class="watchTvbox">
    <detail-header
      title="直播"
      :breadcrumbList="team == 0 ? breadcrumbList : breadcrumbList1"
    ></detail-header>
    <div class="fromHeader" @click="closeDevice">
      <i class="el-icon-arrow-left"></i>
      <el-button type="text" style="color: black; font-size: 20px"
        >返回</el-button
      >
    </div>
    <div class="watch">
      <div class="videoview" :class="{ fullscreen, ClassOBbjrotate }">
        <div id="remotetracks" :class="{ ClassOBbjrotate }">
          <div class="viewbootom">
            <el-button type="text" @click="fullscreChange">
              <img
                v-if="fullscreen"
                src="@/assets/img/outquanping.png"
                alt=""
                style="width: 30px"
              />
              <img
                v-else
                src="@/assets/img/toquanping.png"
                alt=""
                style="width: 30px"
              />
            </el-button>
            <el-button v-if="fullscreen" type="text" @click="rotateChange">
              <img
                src="@/assets/img/cdxuanzuan.png"
                alt=""
                style="width: 30px"
              />
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import detailHeader from "@/components/detailHeader";
import * as QNRTC from "pili-rtc-web"; //引入七牛直播sdk

export default {
  components: {
    detailHeader,
  },

  data() {
    return {
      //   people: false,
      fullscreen: false,
      ClassOBbjrotate: false,
      localTracks: [],
      myRoom: {},
      breadcrumbList: ["首页", "拉动点验", "直播"],
      breadcrumbList1: ["首页", "队伍训练管理", "训练计划表", "直播"],
      roomName: this.$route.query.roomName,
      team: "",
    };
  },
  mounted() {
    console.log("七牛云sdk版本号---------current version", QNRTC.version);
    this.team = this.$route.query.team;
    this.watchVideo(this.roomName);
  },
  methods: {
    fullscreChange() {
      this.fullscreen = !this.fullscreen;
    },
    rotateChange() {
      this.ClassOBbjrotate = !this.ClassOBbjrotate;
    },
    async closeDevice() {
      if (this.localTracks.length) {
        await this.myRoom.unpublish(
          this.localTracks.map((track) => track.info.trackId)
        );
      }
      this.$router.back();
    },
    // 获取直播token链接直播间用
    watchVideo(roomName) {
      this.watchDialogVisible = true;
      let roleId = JSON.parse(sessionStorage.getItem("data")).roleId;
      this.$api
        .qiniucreateRoomToken({
          roomName: roomName,
          userId: "room_" + roleId,
        })
        .then((res) => {
          if (res.code == 200) {
            this.joinRoom(res.data);
          } else {
            this.$message.error(res.message);
          }
        });
    },
    // 加入房间
    async joinRoom(ROOMTOKEN) {
      // 初始化一个房间 Session 对象, 这里使用 Track 模式
      this.myRoom = new QNRTC.TrackModeSession();
      // 这里是后端刚刚生成的 RoomToken
      await this.myRoom.joinRoomWithToken(ROOMTOKEN);
      console.log("joinRoom success!");
      //这里的参数 myRoom 是指刚刚加入房间时初始化的 Session 对象,订阅远端发布的音视频轨
      this.autoSubscribe(this.myRoom);
      await this.publish(this.myRoom);
    },
    // 采集并发布本地的音视频轨
    // 这里的参数 myRoom 是指刚刚加入房间时初始化的 Session 对象
    async publish(myRoom) {
      // 我们打开了 3 个参数，即采集音频，采集视频，采集屏幕共享。
      // 这个函数会返回一个列表，列表中每一项就是一个音视频轨对象
      const localTracks = await QNRTC.deviceManager.getLocalTracks({
        audio: { enabled: true, tag: "audio" },
        video: { enabled: true, tag: "video" },
        screen: { enabled: false, tag: "screen" },
      });
      console.log("------------------------------", { localTracks });
      this.localTracks = localTracks;
      //
      await myRoom.publish(localTracks);
      // 将刚刚的 Track 列表发布到房间中
      // console.log(localTracks);
      // 在这里添加
      // 获取页面上的一个元素作为播放画面的父元素
      //   const localElement = document.getElementById("localtracks");
      //   // 遍历本地采集的 Track 对象
      //   for (const localTrack of localTracks) {
      //     // 如果这是麦克风采集的音频 Track，我们就不播放它。
      //     if (localTrack.info.tag === "audio") continue;
      //     // 调用 Track 对象的 play 方法在这个元素下播放视频轨
      //     localTrack.play(localElement, true);
      //   }
    },
    // 先是发起订阅
    autoSubscribe(myRoom) {
      // 拿到返回的 Track 对象
      const trackInfoList = myRoom.trackInfoList;
      //   console.log("room current trackInfo list", trackInfoList);
      //   if (!trackInfoList.length) {
      //     this.people = true;
      //   } else {
      //     this.people = false;
      //   }
      // 调用我们刚刚编写的 subscribe 方法
      // 注意这里我们没有使用 async/await，而是使用了 Promise
      this.subscribe(myRoom, trackInfoList)
        .then(() => console.log("subscribe success!"))
        .catch((e) => console.error("subscribe error", e));

      // 添加事件监听，当房间中出现新的 Track 时就会触发，参数是 trackInfo 列表（大白话：放发布之后就自动调用）
      myRoom.on("track-add", (trackInfoList) => {
        console.log("get track-add event!", trackInfoList);
        this.subscribe(myRoom, trackInfoList)
          .then(() => console.log("subscribe success!"))
          .catch((e) => console.error("subscribe error", e));
      });
      // 就是这样，就像监听 DOM 事件一样通过 on 方法监听相应的事件并给出处理函数即可
    },
    // 调用 Track 的 play 方法在页面上播放
    async subscribe(myRoom, trackInfoList) {
      // 通过传入 trackId 调用订阅方法发起订阅，成功会返回相应的 Track 对象，也就是远端的 Track 列表了
      const remoteTracks = await myRoom.subscribe(
        trackInfoList.map((info) => info.trackId)
      );

      // 选择页面上的一个元素作为父元素，播放远端的音视频轨
      const remoteElement = document.getElementById("remotetracks");
      // 遍历返回的远端 Track，调用 play 方法完成在页面上的播放
      for (const remoteTrack of remoteTracks) {
        remoteTrack.play(remoteElement);
      }
    },
  },
};
</script>

<style lang="scss">
.watchTvbox {
  .videoview.fullscreen {
    #remotetracks {
      position: fixed;
      width: 100vw;
      height: 100vh;
      top: -20px;
      left: 0;
      background-color: rgb(0, 0, 0);
    }
  }
  .videoview.fullscreen.ClassOBbjrotate {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw !important;
    height: 100vh !important;
    background-color: rgb(0, 0, 0);
    #remotetracks {
      transform: rotate(90deg);
      position: fixed;
      // width: 100vw;
      height: 141vh;
      top: -214px;
      left: 0;
      // margin: 20px auto;
      background-color: rgb(0, 0, 0);
    }
    .viewbootom {
      transform: rotate(90deg);
      position: fixed;
      bottom: 1700px !important;
      z-index: 99999999;
      right: 162px;
      text-align: right;
      padding-right: 15px;
      height: 60px !important;
      width: 800px;
    }
  }
  .videoview {
    #remotetracks {
      position: relative;
      width: 100%;
      height: 700px;
      margin: 20px auto;
      background-color: rgb(0, 0, 0);
    }
  }
  .viewbootom {
    // transform: rotate(90deg);
    position: fixed;
    bottom: 0;
    z-index: 99999999;
    right: 0;
    text-align: right;
    padding-right: 40px;
    height: 60px;
    width: 100%;
  }
}
</style>