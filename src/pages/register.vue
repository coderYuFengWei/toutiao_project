<template>
  <div class="container">
    <!-- 关闭按钮 -->
    <div class="close">
      <span class="iconfont iconicon-test"></span>
    </div>

    <!-- logo -->
    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>

    <!-- 用户，密码输入框 -->
    <div class="inputs">
      <authInput
        placeholder="用户名/手机号码"
        :value="form.username"
        @input="handleInputValue"
        :rule="/^1[0-9]{4,10}$/"
        err_message="请输入正确的手机号码"
      ></authInput>

      <authInput
        placeholder="昵称"
        v-model="form.nickname"
        :rule="/^[0-9a-zA-Z\u4e00-\u9fa5]{2,6}$/"
        err_message="请输入正确的昵称"
      ></authInput>

      <authInput
        placeholder="密码"
        type="password"
        v-model="form.password"
        :rule="/^[0-9a-zA-Z]{3,12}$/"
        err_message="请输入正确的密码"
      ></authInput>
      <!-- @input="handleInputValue" -->
    </div>

    <p class="tips">
      有账号?
      <router-link to="/login">立即登录</router-link>
    </p>

    <authButton text="注册" @click="handleSubmit"></authButton>
  </div>
</template>

<script>
import authButton from "@/components/authButton";
import authInput from "@/components/authInput";

export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
        nickname:""
      }
    };
  },

  methods: {
    //按钮提交事件
    handleSubmit() {
      this.$axios({
        url: "/register",
        method: "POST",
        data: this.form
      }).then(res => {
        let { message } = res.data;
        if (message === "注册成功") {
          this.$router.push("/login");
        }
      });
    },

    //获取input输入框的值
    handleInputValue(value) {
      this.form.username = value;
    }
  },

  components: {
    authButton,
    authInput
  }
};
</script>

<style scoped lang="less">
.container {
  padding: 20px;
}

.close {
  span {
    font-size: 27 / 360 * 100vw;
  }
}

.logo {
  display: flex;
  justify-content: center;

  span {
    display: block;
    font-size: 126 / 360 * 100vw;
    color: #d81e06;
  }
}

.inputs {
  input {
    margin-bottom: 20px;
  }
}

.tips {
  text-align: right;
  margin-bottom: 20px;

  a {
    color: #3385ff;
  }
}
</style>