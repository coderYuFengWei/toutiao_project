<template>
  <div>
    <div class="profile">
      <img :src="profile.head_img" alt />
      <div class="profile-center">
        <div class="name">
          <span class="iconfont iconxingbienan"></span>
          {{profile.nickname}}
        </div>
        <div class="time">2019-9-24</div>
      </div>
      <span class="iconfont iconjiantou1"></span>
    </div>

    <!-- 条形组件 -->
    <netbar label="我的关注" text="关注的用户" />
    <netbar label="我的跟帖" text="跟帖/回复" />
    <netbar label="我的收藏" text="文章/视频" />
    <netbar label="退出" @click="handleLogout" />
  </div>
</template>

<script>
import netbar from "@/components/netbar";
export default {
  data() {
    return {
      profile: {}
    };
  },

  components: {
    netbar
  },

  methods: {
    handleLogout() {
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");

      this.$router.replace("/login");
    }
  },

  mounted() {
    this.$axios({
      url: "/user/" + localStorage.getItem("user_id"),
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then(res => {
        console.log(res)
      let { data } = res.data;

      if (data) {
        this.profile = data;
        if (data.head_img) {
          this.profile.head_img = this.$axios.defaults.baseURL + data_head_img;
        } else {
          this.profile.head_img = "./static/kobe.jpg";
        }
      }
    });
  }
};
</script>

<style scoped lang="less">
.profile {
  display: flex;
  padding: 20px 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px solid #eee;

  img {
    width: 70/360 * 100vw;
    height: 70/360 * 100vw;
    border-radius: 50%;
  }

  .profile-center {
    flex: 1;
    padding: 0 10px;
  }

  .name {
    span {
      color: #75b9eb;
    }
  }

  .time {
    color: #666;
    font-size: 14px;
    margin-top: 5px;
  }
}
</style>