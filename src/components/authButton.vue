<template>
  <div class="button" @click="handleClick">{{text}}</div>
</template>

<script>
export default {
  props: ["text"],
  methods: {
    handleClick(event) {
      this.$emit("click", event);
    }
  }
};
</script>

<style scoped lang="less">
.button {
  width: 100%;
  height: 48/360 * 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #e4393c;
  color: white;
  border-radius: 50px;
  font-style: 24px;
}
</style>