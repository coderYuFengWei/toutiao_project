<template>
  <div class="head">
    <span class="iconfont iconjiantou2" @click="$router.back()"></span>
    <h3>{{text}}</h3>
    <span>>></span>
  </div>
</template>

<script>
export default {
    props:[
        "text"
    ]
};
</script>

<style coped lang="less">
.head{
    height: 60/360*100vw;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span{
        display: block;
        padding: 0 10px;
    }
    span:last-child{
        opacity:0
    }
}
</style>