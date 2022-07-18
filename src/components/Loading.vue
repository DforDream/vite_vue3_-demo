<template>
  <div class="loading" v-show="http.isLoading">
    <a-spin />
  </div>
</template>

<script setup lang="ts">
import useHttp from "@/store/http";
const http = useHttp();
</script>

<style scoped lang="less">
.loading {
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  z-index: 999;

  :deep(.ant-spin) {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%);
    transform: translateY(-50%);
  }
}
</style>
