<template>
  <div class="footer-wrap">
    <div class="footer" v-show="!isFocus">
      <input type="text" placeholder="写跟贴" @focus="handleFocus" />

      <span class="comment" @click="$router.push(`/post_comments/${post.id}`)">
        <em>{{post.comment_length}}</em>
        <i class="iconfont iconpinglun-"></i>
      </span>

      <!-- 收藏 -->
      <i
        class="iconfont iconshoucang"
        :class="{star_active: post.has_star}"
        @click="$emit('handleStar')"
      ></i>

      <i class="iconfont iconfenxiang"></i>
    </div>

    <div class="footer_comment" v-show="isFocus">
      <textarea
        rows="3"
        v-model="value"
        :placeholder="placeholder"
        ref="textarea"
        @blur="handleBlur"
        :autofocus="isFocus"
      ></textarea>
      <span @click="handleSubmit">发送</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isFocus: false,
      value: "",
      placeholder: "写跟贴"
    };
  },

  props: ["post", "replyComment"],

  watch: {
    replyComment() {
      if (this.replyComment) {
        this.isFocus = true;
        this.placeholder = "@" + this.replyComment.user.nickname;
      }
    }
  },

  methods: {
    handleFocus() {
      this.isFocus = true;
    },

    handleBlur() {
      if (!this.value) {
        this.isFocus = false;

        if (this.replyComment) {
          this.$emit("handleReply", null);
          this.placeholder = "写跟贴";
        }
      }
    },

    handleSubmit() {
      if (!this.value) {
        return;
      }

      let data = {
        content: this.value
      };

      if (this.replyComment) {
        data.parent_id = this.replyComment.id;
      }
      this.$axios({
        url: "/post_comment/" + this.post.id,
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token")
        },
        data
      }).then(res => {
        let { message } = res.data;
        console.log(message);
        if (message === "评论发布成功") {
          this.$emit("getComments", this.post.id, "isReply");
          this.post.comment_length++;
          this.isFocus = false;
          this.value = "";

          window.scrollTo(0, 0);
        }
      });
    }
  }
};
</script>


<style scoped lang="less">
.footer-wrap {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  border-top: 1px #eee solid;
  padding: 0 10px;
  box-sizing: border-box;
  background: #fff;
}

.footer_comment {
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  textarea {
    width: 260 / 360 * 100vw;
    background: #eee;
    padding: 10px;
    box-sizing: border-box;
    border: none;
    border-radius: 8px;
    resize: none;
  }

  span {
    font-size: 12px;
    background: red;
    width: 60 / 360 * 100vw;
    height: 26 / 360 * 100vw;
    line-height: 26 / 360 * 100vw;
    color: #fff;
    text-align: center;
    border-radius: 50px;
  }
}

.footer {
  height: 60 / 360 * 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;

  input {
    width: 40%;
    height: 36 / 360 * 100vw;
    background: #eee;
    border: none;
    font-size: 12px;
    padding: 0 15px;
    border-radius: 50px;
  }

  .comment {
    display: block;
    position: relative;

    em {
      position: absolute;
      display: block;
      background: red;
      border-radius: 50px;
      color: #fff;
      padding: 0 5px;
      font-size: 10px;
      height: 14px;
      line-height: 14px;
      left: 0;
      top: -5px;
    }
  }

  .iconfont {
    font-size: 24px;
  }
}

.star_active {
  color: red;
}
</style>
