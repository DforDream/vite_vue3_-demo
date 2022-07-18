<template>
  <div class="model_title">
    <div>
      <img :src="modalError" alt="">
      <p>是否确认当前修改"<span>{{data.name}}基准价:{{data.price || 0}}</span>"?</p>
    </div>
  </div>
</template>
<script setup lang='ts'>
import modalError from '@/assets/modal_error.png'
const {data} = defineProps(['data'])
</script>

<style scoped lang='less'>
.model_title {
  display: inline-block;
  vertical-align: middle;
  font-size: 14px;
  line-height: 38px;
  div {
    p {
      display: inline-block;
      vertical-align: middle;
      span {
      font-weight: 700;
    }
    }
    img {
      width: 40px;
      height: 40px;
      margin-right: 14px;
      vertical-align: middle;
    }
  }
}
</style>