<template>
  <div>
    <!-- 单张图片 -->
    <div class="post_pic" v-if="post.cover.length>0&&post.cover.length<3">
      <div class="post_left">
        <router-link :to="`/postDetail/${post.id}`">
          <div class="title">{{post.title}}</div>
        </router-link>
        <p>
          <span class="username">{{post.user.nickname}}</span>
          <span class="follow">{{post.comment_length}}跟帖</span>
        </p>
      </div>
      <router-link :to="`/postDetail/${post.id}`">
        <div class="post_right">
          <img :src="post.cover[0].url" alt />
        </div>
      </router-link>
    </div>

    <!-- 多张图片 -->
    <div class="post_pics" v-if="post.cover.length>=3">
      <router-link :to="`/postDetail/${post.id}`">
        <div class="post_title">{{post.title}}</div>
      </router-link>
      <div class="img_list">
        <router-link :to="`/postDetail/${post.id}`">
          <img
            :src="item.url"
            v-for="(item,index) in post.cover"
            :key="index"
            v-show="index<=3"
            alt
          />
        </router-link>
      </div>
      <p class="post_info">
        <span>{{post.user.nickname}}</span>
        <span>{{post.comment_length}}跟帖</span>
      </p>
    </div>

    <!-- 视频 -->
    <div class="video" v-if="post.type===2&&post.cover.length===1">
      <p class="post_title">{{post.title}}</p>
      <router-link :to="`/postDetail/${post.id}`">
        <div class="video_img">
          <img :src="post.cover[0].url" alt />
          <span class="video_layer">
            <i class="iconfont iconshipin"></i>
          </span>
        </div>
      </router-link>
      <p class="post_info">
        <span>{{post.user.nickname}}</span>
        <span>{{post.comment_length}}跟帖</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["post"]
};
</script>

<style scoped lang="less">
.post_pic {
  display: flex;
  justify-content: space-between;
  padding: 20px 10px;
  border-bottom: 1px solid #ddd;
  .post_left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .title {
      font-size: 14px;
      line-height: 1.5;
      margin-bottom: 5px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
    }
    p {
      font-size: 12px;
      color: #999;
      .username {
        margin-right: 5px;
      }
    }
  }
  .post_right img {
    display: block;
    width: 120/360 * 100vw;
    height: 80/360 * 100vw;
    object-fit: cover;
  }
}

.post_pics {
  padding: 20px 10px;
  border-bottom: 1px solid #ddd;
  .post_title {
    font-size: 14px;
    line-height: 1.5;
    margin-bottom: 5px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .img_list {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
    img {
      display: block;
      width: 33%;
      height: 80/360 * 100vw;
      object-fit: cover;
    }
  }
  .post_info {
    font-size: 12px;
    color: #999;
  }
}

.video {
  padding: 20px 10px;
  border-bottom: 1px #ccc solid;
  .post_title {
    line-height: 1.5;
    font-size: 14px;
    margin-bottom: 5px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .video_img {
    position: relative;
    margin-bottom: 5px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      display: block;
      width: 100%;
      height: 170 / 360 * 100 vw;
    }
    .video_layer {
      position: absolute;
      background: rgba(0, 0, 0, 0.5);
      width: 46 / 360 * 100vw;
      height: 46 / 360 * 100vw;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;

      i {
        color: #fff;
        font-size: 30px;
      }
    }
  }

  .post_info {
    font-size: 12px;
    color: #999;
  }
}
</style>