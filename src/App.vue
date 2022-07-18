<template>
  <a-config-provider :locale="zhCN">
    <div class="app">
      <Loading />
      <router-view></router-view>
    </div>
  </a-config-provider>
</template>
<script setup lang='ts'>
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import Loading from '@/components/Loading.vue';
</script>

<style scoped lang='less'>
.app {
  width: 100vw;
  height: 100vh;
}
</style>
<style lang="less">
.ant-btn-primary {
  background: #4064F2 !important;
  border-color: #4064F2 !important;
}
</style>