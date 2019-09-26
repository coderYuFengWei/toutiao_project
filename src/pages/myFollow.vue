<template>
  <div>
    <headerNormal text="我的关注" />

    <div class="focus" v-for="(item,index) in list" :key="index">
      <img :src="$axios.defaults.baseURL+item.head_img" alt />
      <div class="name">
        <p>{{item.nickname}}</p>
        <span>2019-10-10</span>
      </div>

      <span class="cancel" @click="handleUnfollow(index)">取消关注</span>
    </div>
  </div>
</template>

<script>
import HeaderNormal from "@/components/HeaderNormal";

export default {
  data() {
    return {
      list: []
    };
  },
  components: {
    HeaderNormal
  },
  methods: {
    handleUnfollow(index) {
      let id = this.list[index].id;
      console.log(this.list)
      this.$axios({
          url: "/user_unfollow/" + id,
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }).then(res=>{
            let {message} = res.data;
            if(message==="取消关注成功"){
                this.list.splice(index,1);

                this.$toast.success(message);
            }
        })
    }
  },

  mounted() {
    this.$axios({
      url: "/user_follows",
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then(res => {
      let { data } = res.data;
    //   console.log(data);
      this.list = data;
    //   console.log(this.list);
    });
  }
};
</script>

<style scoped lang="less">
.focus {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #aaa;
  img {
    display: block;
    width: 60/360 * 100vw;
    height: 60/360 * 100vw;
    border-radius: 50%;
  }
}
</style>