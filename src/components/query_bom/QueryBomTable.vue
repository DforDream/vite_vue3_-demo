<template>
  <div class="global_table">
    <a-table :dataSource="queryBom.dataSource" :columns="columns" :pagination="queryBom.pagination"
      :scroll="{ y: 'calc(100vh - 60px - 92px - 78px - 45px)' }" :row-key="(record: DataSource) => record.id">
      <template #bodyCell="{ column, record }">
        <TableBodyCell :column="column" :record="record" :showBom="true" detailFrom="/query_bom" :canModify="false"
          chartFrom="/query_bom" />
      </template>
    </a-table>
  </div>
</template>
<script setup lang='ts'>
import TableBodyCell from '../TableBodyCell.vue';
import useQueryBom from '@/store/queryBom';
import type { DataSource } from '@/store/queryBom';

const queryBom = useQueryBom()
const columns = [
  {
    title: "物料编码",
    dataIndex: "code",
    width: 120
  },
  {
    title: "物料名称",
    dataIndex: "name",
  },
  {
    title: "物料规格",
    dataIndex: "spec",
    width: 160,
  },
  {
    title: "分类",
    dataIndex: "categoryName",
  },
  {
    title: "单位",
    dataIndex: "meas",
  },
  {
    title: "父项数量",
    dataIndex: "parentNum",
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
queryBom.pagination.onChange = (page, pageSize) => {
  queryBom.formState.pageNum = page;
  queryBom.formState.pageSize = pageSize;
  queryBom.pagination.current = page;
  queryBom.getQueryBomList();
}
</script>

<style scoped lang='less'>
@import url('@/styles/global_table.less');
</style>