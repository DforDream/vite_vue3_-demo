<template>
  <div class="global_table">
    <a-table :dataSource="queryMaterial.dataSource" :columns="columns" :pagination="queryMaterial.pagination"
      :scroll="{ y: 'calc(100vh - 60px - 92px - 78px - 45px)' }" :row-key="(record: DataSource) => record.id">
      <template #bodyCell="{ column, record }">
        <TableBodyCell :column="column" :record="record" :showBom="false" chartFrom="/query_material"
          :canModify="true" />
      </template>
    </a-table>
  </div>
</template>
<script setup lang="ts">
import TableBodyCell from '../TableBodyCell.vue';
import useQueryMaterial from '@/store/queryMaterial';
import type { DataSource } from '@/store/queryMaterial';

const queryMaterial = useQueryMaterial();
const columns = [
  {
    title: "序号",
    dataIndex: "number",
    width: 80,
  },
  {
    title: "物料编码",
    dataIndex: "code",
  },
  {
    title: "物料名称",
    dataIndex: "name",
  },
  {
    title: "物料规格",
    dataIndex: "spec",
    width: 400,
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
queryMaterial.getMaterialList()
queryMaterial.pagination.onChange = (page, pageSize) => {
  queryMaterial.formState.pageNum = page;
  queryMaterial.formState.pageSize = pageSize;
  queryMaterial.pagination.current = page;
  queryMaterial.getMaterialList();
}

</script>

<style scoped lang="less">
@import url('@/styles/global_table.less');
</style>
<style lang="less">
.material_table_model {
  text-align: center;
  .ant-btn {
    width: 60px;
    height: 32px;
    background: #F2F3F5;
    border: 0;
    color: #6F738D;
  }
  .ant-modal-body {
    padding: 40px 0 20px 60px;
  }
  .ant-modal-footer {
    border-top: none;
    padding: 10px 41px 17px 0;
  }
  .ant-btn-primary {
    background: #4064F2;
    color: #FFFFFF;
  }
}
</style>
