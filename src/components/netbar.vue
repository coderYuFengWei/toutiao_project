<template>
  <div class="netbar" @click="$emit('click',$event)">
      <div class="cell">
          <span>{{label}}</span>
          <i>{{type==='password'?'******':text}}</i>
          <span class="iconfont iconjiantou1"></span>
      </div>

  </div>
</template>

<script>
export default {
    props:[
        "label",
        "text",
        "type"
    ]
}
</script>

<style scoped lang="less">
.netbar{
    padding-left: 10px;
}

.cell{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 10px;
    height: 48/360*100vw;
    border-bottom: 1px solid #eee;
}

i{
    display: block;
    flex: 1;
    text-align: right;
    padding: 0 10px;
    font-size: 14px;
    color:#999;
}
</style>