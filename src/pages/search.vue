<template>
  <div class="container">
    <div class="header">
      <span class="iconfont iconjiantou2" @click="$router.back()"></span>
      <div class="input-wrap">
        <span class="iconfont iconsearch"></span>
        <input type="text" v-model="keyword" placeholder="搜索关键字" />
      </div>
      <span class="search-btn" @click="handleSearch">搜索</span>
    </div>

    <div class="list">
      <postList v-for="(item,index) in list" :key="index" :post="item" />
    </div>
  </div>
</template>

<script>
import postList from "@/components/postList";
export default {
  components: {
    postList
  },
  data() {
    return {
      keyword: "",
      list: []
    };
  },
  methods: {
    handleSearch() {
      this.$axios({
        url: `/post_search?keyword=${this.keyword}`
      }).then(res => {
        let { data } = res.data;
        this.list = data;
      });
    }
  }
};
</script>

<style scoped lang="less">
.header {
  height: 60/360 * 100vw;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  background-color: #f2f2f2;
  .input-wrap {
    position: relative;
    flex: 1;
    margin: 0 10px;

    .iconsearch {
      position: absolute;
      left: 10px;
      top: 12/360 * 100vw;
    }

    input {
      width: 100%;
      display: block;
      height: 40/360 * 100vw;
      background: #fff;
      border: 1px solid #eee;
      border-radius: 50px;
      padding: 0 15px 0 30px;
      font-size: 12px;
      box-sizing: border-box;
    }
  }

  .search-btn {
    font-size: 14px;
  }
}
</style>