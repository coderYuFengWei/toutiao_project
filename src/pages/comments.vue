<template>
  <div class="container">
    <headerNormal text="精彩跟帖" />

    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :immediate-check="false"
      @load="onLoad"
    >
      <div class="comment" v-for="(item,index) in comments" :key="index">
        <div class="comment-info">
          <div class="comment-user">
            <img :src="$axios.defaults.baseURL + item.user.head_img" v-if="item.user.head_img" />
            <img src="../../static/kobe.jpg" v-else />
            <div class="user-info">
              <p>{{item.user.nickname}}</p>
              <span>2小时前</span>
            </div>
          </div>

          <span class="reply" @click="handleReply(item)">回复</span>
        </div>

        <commentFloor v-if="item.parent" :data="item.parent" @handleReply="handleReply" />
        <div class="commemt-content">{{item.content}}</div>
      </div>
    </van-list>

    <postFooter
      :post="detail"
      :replyComment="replyComment"
      @handleReply="handleReply"
      @getComments="getComments"
    />
  </div>
</template>

<script>
import headerNormal from "@/components/headerNormal";
import commentFloor from "@/components/commentFloor";
import postFooter from "@/components/postFooter";
export default {
  components: {
    headerNormal,
    commentFloor,
    postFooter
  },
  data() {
    return {
      comments: [],
      detail: {},
      replyComment: null,

      loading: false,
      finished: false,
      pageIndex: 1,
      pageSize: 10
    };
  },
  methods: {
    getComments(id, isReply) {
      if (isReply === "isReply") {
        this.pageIndex = 1;
        this.comments = [];
      }

      this.$axios({
        url: `/post_comment/${id}?pageIndex=${this.pageIndex}`
      }).then(res => {
        console.log(res);
        let { data } = res.data;
        this.comments = [...this.comments, ...data];
        this.loading = false;
        if (data.length < this.pageSize) {
          this.finished = true;
          return;
        }
        this.pageIndex++;
      });
    },

    onLoad() {
      setTimeout(() => {
        let { id } = this.$route.params;
        this.getComments(id);
      }, 500);
    },

    handleReply(item) {
      this.replyComment = item;
    }
  },

  mounted() {
    let { id } = this.$route.params;
    this.getComments(id);

    let config = {
      url: "/post/" + id
    };

    let token = localStorage.getItem("token");

    if (token) {
      config.headers = {
        Authorization: token
      };
    }

    this.$axios(config).then(res => {
      let { data } = res.data;
      this.detail = data;
    });
  }
};
</script>

<style scoped lang="less">
.container {
  padding-bottom: 100/360 * 100vw;
}
.comment {
  padding: 15px 10px;
  border-bottom: 1px solid #eee;

  .comment-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .comment-user {
    display: flex;
    align-items: center;

    img {
      width: 40/360 * 100vw;
      height: 40/360 * 100vw;
      display: block;
      border-radius: 50%;
      object-fit: cover;
      margin-right: 10px;
    }

    .user-info {
      font-size: 13px;
      span {
        font-size: 12px;
        color: #999;
      }
    }
  }

  .reply {
    font-size: 13px;
    color: #666;
  }

  .comment-content {
    padding: 15px 0 0;
  }
}
</style>