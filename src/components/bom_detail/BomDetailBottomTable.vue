<template>
  <div class="global_table">
    <a-table :dataSource="props.data" :columns="columns" :pagination="false" :scroll="{ y: 'calc((100vh - 140px) / 2)' }">
      <template #bodyCell="{ column, record }">
        <TableBodyCell :column="column" :record="record" :canModify="false" :chartFrom=" record.next ? '/query_bom' : '/query_material'"/>
      </template>
    </a-table>
  </div>
</template>
<script setup lang='ts'>
import TableBodyCell from '../TableBodyCell.vue';

const props = defineProps(['data']);
const columns = [
  {
    title: "子项编码",
    dataIndex: "code",
    width: 120
  },
  {
    title: "子项名称",
    dataIndex: "name",
  },
  {
    title: "规格",
    dataIndex: "spec",
    width: 160,
  },
  {
    title: "单位",
    dataIndex: "meas",
  },
  {
    title: "子项数量",
    dataIndex: "itemNum",
  },
  {
    title: "底数",
    dataIndex: "baseNum",
  },
  {
    title: "位置号",
    dataIndex: "location",
  },
  {
    title: "采购价",
    dataIndex: "purPrice",
  },
  {
    title: "基准价(元)",
    dataIndex: "price",
  },
  {
    title: "操作",
    dataIndex: "operation",
  },
];
</script>

<style scoped lang='less'>
@import url('@/styles/global_table.less');
.global_table {
  flex: 1;
  border-bottom: 1px solid #E4E5EC;
}
</style>