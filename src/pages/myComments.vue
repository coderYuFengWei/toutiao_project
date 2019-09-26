<template>
  <div>
    <headerNormal text="我的跟帖" />
    <div class="comment-list" v-for="(item,index) in list" :key="index">
      <p class="time">2019-9-26 20:04</p>
      <div class="parent" v-if="item.parent">
        <p class="reply">@:{{item.parent.user.nickname}}</p>
        <div class="parent_content">{{item.parent.content}}</div>
      </div>
      <div class="content">{{item.content}}</div>

      <router-link to="#" class="link">
        <p>原文:{{item.post.title}}</p>
        <span class="iconfont iconjiantou1"></span>
      </router-link>
    </div>
  </div>
</template>

<script>
import headerNormal from "@/components/headerNormal";

export default {
  props: ["text"],
  components: {
    headerNormal
  },
  data() {
    return {
      list: []
    };
  },

  mounted() {
    this.$axios({
      url: "/user_comments",
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then(res => {
      console.log(res);
      let { data } = res.data;
      this.list = data;
    });
  }
};
</script>

<style scoped lang="less">
.comment-list {
  padding: 15px;
  border-bottom: 1px solid #aaa;
  .parent {
    background-color: #dddddd;
    padding: 8px;
    margin: 8px 0;
    font-size: 14px;
    color: #999;
    p {
      margin-bottom: 5px;
    }
  }

  .time {
    color: #999;
    font-size: 14px;
    padding-bottom: 5px;
  }

  .link {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    color: #999;

    p {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-top: 8px;
    }
  }
}
</style>