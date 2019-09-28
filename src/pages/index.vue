<template>
  <div>
    <div class="header">
      <span class="iconfont iconnew logo"></span>
      <div class="header_search">
        <span class="iconfont iconsearch"></span>
        <i>搜索新闻</i>
      </div>
      <router-link to="/personal">
        <span class="iconfont iconwode personal"></span>
      </router-link>
    </div>

    <van-tabs v-model="active" swipeable sticky>
      <van-tab v-for="(item,index) in categories" :title="item.name" :key="index">
        <van-list
          v-model="item.loading"
          :finished="item.finished"
          finished-text="没有更多了"
          @load="onLoad"
          :immediate-check="false"
        >
          <postList v-for="(item,index) in item.posts" :post="item" :key="index" />
        </van-list>
      </van-tab>
    </van-tabs>
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
      active: localStorage.getItem("token") ? 1 : 0,
      categories: [],
      cid: 999,
      pageIndex: 1,
      pageSize: 5
    };
  },

  watch: {
    active() {
      this.cid = this.categories[this.active].id;
      this.onLoad();
    }
  },
  methods: {
    onLoad() {
      setTimeout(() => {
        let category = this.categories[this.active];
        // console.log(category);[]
        this.$axios({
          url: `/post?category=${this.cid}
                    &pageIndex=${category.pageIndex}
                    &pageSize=${this.pageSize}`
        }).then(res => {
          let { data } = res.data;
          if (data.length < this.pageSize) {
            category.finished= true;
          }
          category.posts = [...category.posts, ...data];
          category.pageIndex++;
          category.loading = false;
        });
      }, 500);
    }
  },
  mounted() {
    let config = {
      url: "/category"
    };
    if (localStorage.getItem("token")) {
      config.headers = {
        Authorization: localStorage.getItem("token")
      };
    }

    this.$axios(config).then(res => {
      //   console.log(res);
      let { data } = res.data;
      let newData = [];

      data.forEach(e => {
        e.posts = [];
        e.loading = false;
        e.finished = false;
        e.pageIndex = 1;
        newData.push(e);
      });

      this.categories = newData;
      this.$axios({
        url: `/post?category=${this.cid}&pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`
      }).then(res => {
        // console.log(res);
        let { data } = res.data;
        this.categories[this.active].posts = data;
        this.categories[this.active].pageIndex++;
      });
    });
  }
};
</script>

<style scoped lang="less">
.header {
  display: flex;
  height: 52/360 * 100vw;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  background-color: #ff0000;
  .logo {
    font-size: 52/360 * 100vw;
    color: #fff;
  }
  .header_search {
    flex: 1;
    background: rgba(255, 255, 255, 0.3);
    color: #fff;
    height: 35/360 * 100vw;
    border-radius: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 10px;
    i {
      font-size: 14px;
      margin-left: 5px;
    }
  }
  .personal {
    color: #fff;
    font-size: 22/360 * 100vw;
  }
}
/deep/.van-tabs__nav {
  background: #e4e4e4;
}
</style>