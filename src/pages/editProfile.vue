<template>
  <div>
    <headerNormal text="编辑资料" />

    <div class="header">
      <img :src="profile.head_img" alt />
      <van-uploader :after-read="afterRead" class="uploader" />
    </div>

    <netbar label="昵称" :text="profile.nickname" @click="show1 = !show1" />

    <!-- 使用vant的组件 -->
    <van-dialog v-model="show1" title="编辑昵称" show-cancel-button @confirm="handleNickname">
      <van-field :value="profile.nickname" placeholder="请输入你的昵称" ref="nickname" />
    </van-dialog>

    <!-- 修改密码 -->
    <netbar label="密码" text="******" @click="show2 = !show2" />
    <van-dialog v-model="show2" title="编辑密码" show-cancel-button @confirm="handlePassword">
      <van-field :value="profile.password" placeholder="请输入你的密码" ref="password" />
    </van-dialog>

    <!-- 编辑性别 -->
    <netbar label="性别" :text="profile.gender===1?'男':'女'" @click="show3 = !show3" />
    <van-dialog v-model="show3" title="编辑性别" show-cancel-button @confirm="handleGender">
      <van-radio-group v-model="genderCache">
        <van-cell-group>
          <van-cell title="男" clickable @click="genderCache = '1'">
            <van-radio slot="right-icon" name="1" />
          </van-cell>
          <van-cell title="女" clickable @click="genderCache = '0'">
            <van-radio slot="right-icon" name="0" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>
  </div>
</template>

<script>
import headerNormal from "@/components/headerNormal";
import netbar from "@/components/netbar";

export default {
  components: {
    headerNormal,
    netbar
  },
  data() {
    return {
      profile: {},
      show1: false,
      show2: false,
      show3: false,
      genderCache: "1"
    };
  },
  methods: {
    //封装请求
    editProfile(data, callback) {
      if (!data) return;
      this.$axios({
        url: "/user_update/" + localStorage.getItem("user_id"),
        method: "post",
        headers: {
          Authorization: localStorage.getItem("token")
        },
        data
      }).then(res => {
        let { message } = res.data;
        if (message === "修改成功") {
          if (callback) {
            callback();
          }
          this.$toast.success(message);
        }
      });
    },

    //上传图片
    afterRead(file) {
      let formData = new FormData();
      formData.append("file", file.file);
      this.$axios({
        url: "/upload",
        method: "post",
        headers: {
          Authorization: localStorage.getItem("token")
        },
        data: formData
      }).then(res => {
        const { data } = res.data;
        this.profile.head_img = this.$axios.defaults.baseURL + data.url;
        this.editProfile({ head_img: data.url });
      });
    },

    //修改昵称
    handleNickname() {
      let value = this.$refs.nickname.$refs.input.value;
      this.editProfile({ nickname: value }, () => {
        this.profile.nickname = value;
      });
    },

    //修改密码
    handlePassword() {
      let value = this.$refs.password.$refs.input.value;
      this.editProfile({ password: value }, () => {
        this.profile.password = value;
      });
    },

    //编辑性别
    handleGender() {
      let gender = this.genderCache - 0;
      this.editProfile({ gender }, () => {
        this.profile.gender = gender;
      });
    }
  },

  //页面加载完毕时渲染
  mounted() {
    this.$axios({
      url: "/user/" + localStorage.getItem("user_id"),
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then(res => {
      const { data } = res.data;
      if (data) {
        this.profile = data;
        if (data.head_img) {
          this.profile.head_img = this.$axios.defaults.baseURL + data.head_img;
        } else {
          this.profile.head_img = "./static/kobe.jpg";
        }
      }
    });
  }
};
</script>

<style scoped lang="less">
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  position: relative;
  img {
    display: flex;
    width: 100/360 * 100vw;
    height: 100/360 * 100vw;
    border-radius: 50%;
  }
  .uploader {
    position: absolute;
    opacity: 0;
  }
}
/deep/.van-uploader__input {
  display: flex;
  width: 100/360 * 100vw;
  height: 100/360 * 100vw;
  border-radius: 50%;
}
</style>