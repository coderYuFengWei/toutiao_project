<template>
  <div class="post_page">
    <div class="post_detail" v-if="detail.type===1">
      <div class="header">
        <div class="header_left" @click="$router.back()">
          <i class="iconfont iconjiantou2"></i>
          <i class="iconfont iconnew"></i>
        </div>
        <span class="focus" v-if="!detail.has_follow" @click="handleFollow">关注</span>
        <span class="focused" v-else @click="handleUnfollow">已关注</span>
      </div>
      <h4>{{detail.title}}</h4>
      <p>
        <span>{{detail.user.nickname}}</span>
        <span class="time">2019-9-28</span>
      </p>
      <div class="content" v-html="detail.content"></div>
    </div>

    <!-- 视频列表 -->
    <div class="video" v-if="detail.type===2">
      <video
        src="https://video.pearvideo.com/mp4/adshort/20190927/cont-1607446-14434032_adpkg-ad_hd.mp4"
        class="video_pic"
        controls
        poster="https://timgmb04.bdimg.com/timg?searchbox_feed&quality=100&wh_rate=0&size=b576_324&ref=http%3A%2F%2Fwww.baidu.com&sec=1568739067&di=612dd27cae470b93b01a4b32ef72fbac&src=http%3A%2F%2Fpic.rmb.bdstatic.com%2Fe18c6ffa079441431f8988ca4c3ac106.jpeg"
      ></video>

      <div class="video-info">
        <div class="video-user">
          <img :src="$axios.defaults.baseURL + detail.user.head_img" />
          <span>{{detail.user.nickname}}</span>
        </div>

        <span class="focus" v-if="!detail.has_follow" @click="handleFollow">关注</span>
        <span class="focus focus_active" v-else @click="handleUnfollow">已关注</span>
      </div>
    </div>

    <!-- 按钮列表 -->
    <div class="btns">
      <span :class="{like_active: detail.has_like}" @click="handleLike">
        <i class="iconfont icondianzan"></i>
        {{detail.like_length}}
      </span>
      <span class="wechat">
        <i class="iconfont iconweixin"></i>
        <a href="https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#1">微信</a>
      </span>
    </div>

    <!-- 页脚组件 -->
    <postFooter :post="detail" @handleStar="handleStar" />
  </div>
</template>

<script>
import postFooter from "@/components/postFooter";
export default {
  components: {
    postFooter
  },

  data() {
    return {
      detail: {
        user: {}
      }
    };
  },

  methods: {
    //关注作者
    handleFollow() {
      this.$axios({
        url: "/user_follows/" + this.detail.user.id,
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then(res => {
        let { message } = res.data;

        if (message === "关注成功") {
          this.detail.has_follow = true;
          this.$toast.success(message);
        }
      });
    },

    //取消关注
    handleUnfollow() {
      this.$axios({
        url: "/user_unfollow/" + this.detail.user.id,
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then(res => {
        let { message } = res.data;
        if (message === "取消关注成功") {
          this.detail.has_follow = false;
          this.$toast.success(message);
        }
      });
    },

    //收藏
    handleStar() {
      this.$axios({
        url: "/post_star/" + this.detail.id,
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then(res => {
        let { message } = res.data;
        if (message == "收藏成功") {
          this.detail.has_star = true;
        }

        if (message === "取消成功") {
          this.detail.has_star = false;
        }

        this.$toast.success(message);
      });
    },

    //点赞
    handleLike() {
      this.$axios({
        url: "/post_like/" + this.detail.id,
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then(res => {
        let { message } = res.data;

        if (message === "点赞成功") {
          this.detail.has_like = true;
          this.detail.like_length++;
        }

        if (message === "取消成功") {
          this.detail.has_like = false;
          this.detail.like_length--;
        }

        this.$toast.success(message);
      });
    }
  },

  //加载时渲染
  mounted() {
    let { id } = this.$route.params;
    let token = localStorage.getItem("token");
    let config = {
      url: "/post/" + id
    };

    if (token) {
      config.headers = {
        Authorization: token
      };
    }

    this.$axios(config).then(res => {
      // console.log(res);
      let { data } = res.data;
      this.detail = data;
    });
  }
};
</script>

<style scoped lang="less">
.post_page {
  padding: 65/360 * 100vw 15/360 * 100vw;
  .header {
    background-color: #f2f2f2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 60/360 * 100vw;
    box-sizing: border-box;
    padding: 0 15px;
    .header_left {
      * {
        vertical-align: middle;
      }
    }
    .iconnew {
      font-size: 50/360 * 100vw;
    }
    .focus {
      border: 1px #ccc solid;
      color: #333;
      border-radius: 100px;
      font-size: 12px;
      padding: 3px 10px;
    }
    .focused {
      border: 1px #ccc solid;
      color: #333;
      border-radius: 100px;
      font-size: 12px;
      padding: 3px 10px;
    }
  }

  p {
    padding: 10/360 * 100vw;
    font-size: 14/360 * 100vw;
    .time {
      margin-left: 8/360 * 100vw;
    }
  }
  .content {
    line-height: 1.5;
    // img是有服务器返回的标签，不属于当前的也米阿尼，不受scoped的影响
    /deep/ img {
      max-width: 100%;
    }
  }
}

.video_pic {
  width: 100%;
}
.video-info {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .video-user {
    display: flex;
    align-items: center;
    font-size: 12px;
    color: #999;
  }

  img {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    margin-right: 10px;
  }
}

.btns {
  display: flex;
  justify-content: space-around;
  margin: 20/360 * 100vw 0 10/360 * 100vw 0;
  span {
    padding: 0 15px;
    height: 30 / 360 * 100vw;
    line-height: 30 / 360 * 100vw;
    font-size: 12px;
    border: 1px #ddd solid;
    border-radius: 50px;

    * {
      vertical-align: middle;
    }
  }
  .iconweixin {
    color: #00c800;
  }
  .like_active {
    i {
      color: red;
    }
  }
}
</style>