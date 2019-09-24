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
        placeholder="密码"
        type="password"
        v-model="form.password"
        :rule="/^[0-9a-zA-Z]{3,12}$/"
        err_message="请输入正确的密码"
      ></authInput>
      <!-- @input="handleInputValue" -->
    </div>

    <p class="tips">
      没有账号?
      <router-link to="/register">立即注册</router-link>
    </p>

    <authButton text="登录" @click="handleSubmit"></authButton>
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
        password: ""
      }
    };
  },

  methods: {
    //按钮提交事件
    handleSubmit() {
      this.$axios({
        url: "/login",
        method: "POST",
        data: this.form
      }).then(res => {
        console.log(res)
        let { message,data} = res.data;
        if (message === "登录成功") {
          localStorage.setItem("token",data.token)
          localStorage.setItem("user_id",data.user.id)
          this.$router.push("/personal");
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