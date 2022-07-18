<template>
  <div class="query_bom_header">
    <a-form layout="inline" :model="queryBom.formState" @submit="onSearch">
      <a-form-item label="物料编码:" name="code">
        <a-input allowClear v-model:value="queryBom.formState.code" />
      </a-form-item>
      <a-form-item label="物料名称:" name="name">
        <a-input allowClear v-model:value="queryBom.formState.name" />
      </a-form-item>
      <a-form-item label="物料规格:" name="spec">
        <a-input allowClear v-model:value="queryBom.formState.spec" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">查询</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup lang="ts">
import useQueryBom from '@/store/queryBom';


const queryBom = useQueryBom()

const onSearch = () => {
  queryBom.pagination.current = 1;
  queryBom.formState.pageNum = 1;
  queryBom.getQueryBomList();
}
queryBom.getQueryBomList()
</script>

<style scoped lang="less">
.query_bom_header {
  :deep(.ant-form) {
    margin: 30px 0;
    display: flex;
    flex-wrap: nowrap;

    .ant-form-item {
      flex: 1;

      &:last-child {
        margin-right: 0;
      }

      .ant-input {
        min-width: 135px;
      }

      .ant-select-arrow {
        margin-top: -10px;
        cursor: pointer;
      }

      .ant-input-affix-wrapper,
      .ant-select-selector {
        &:hover {
          border-color: #4064F2;
        }
      }

      .ant-input-affix-wrapper-focused {
        border-color: #4064F2;
      }

      .ant-btn {
        font-family: 'MicrosoftYaHei';
        font-size: 14px;
        float: right;
        font-weight: 400;
      }
    }
  }
}
</style>
