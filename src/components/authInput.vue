<template>
  <input
    class="input"
    :class="{
      success:status==='success',
      error:status==='error'
  }"
    :placeholder="placeholder"
    :value="value"
    @input="handleInput"
    @change="handlechange"
  />
</template>

<script>
export default {
  props: ["placeholder", "value", "name", "rule", "err_massage"],
  data() {
    return {
      status: ""
    };
  },
  methods: {
    handleInput(event) {
      const { value } = event.target;
      this.$emit("input", value);

      if (this.rule) {
        if (this.rule.test(value)) {
          this.status = "success";
        } else {
          this.status = "error";
        }
      }
    },

    handlechange() {
      if (this.err_massage && this.status === "error") {
        this.$toast.fail(this.err_massage);
      }
    }
  }
};
</script>

<style scoped lang="less">
.input {
  width: 100%;
  height: 38/360 * 100vw;
  padding: 20px 0;
  box-sizing: border-box;
  background: #fff;
  border: none;
  border-bottom: 2px solid #666;
  outline: none;
  font-size: 18px;
}

.success {
  border-bottom-color: rgb(77, 230, 77);
}

.error {
  border-bottom-color: rgb(231, 22, 22);
}
</style>