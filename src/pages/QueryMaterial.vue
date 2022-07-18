<template>
  <div class="query_material">
    <MaterialHeader />
    <MaterialTable />
  </div>
</template>
<script setup lang="ts">
import MaterialHeader from '@/components/query_material/MaterialHeader.vue'
import MaterialTable from '@/components/query_material/MaterialTable.vue'
</script>

<style scoped lang="less">
.query_material {
  padding: 0 20px;
}
</style>
