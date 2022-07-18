<template>
  <div class="material_header">
    <a-form layout="inline" :model="queryMaterial.formState" @submit="onSearch">
      <a-form-item label="物料编码:" name="code">
        <a-input allowClear v-model:value="queryMaterial.formState.code" />
      </a-form-item>
      <a-form-item label="物料名称:" name="name">
        <a-input allowClear v-model:value="queryMaterial.formState.name" />
      </a-form-item>
      <a-form-item label="物料分类:" name="categoryIds">
        <a-tree-select v-model:value="queryMaterial.formState.categoryIds" placeholder="请选择分类" :tree-data="options"
          allowClear :fieldNames="{
            children: 'childCategory',
            label: 'name',
            value: 'id',
          }" treeLine dropdownClassName="query_material_select_tree">
          <template #suffixIcon>
            <a-image :preview="false" width="18px" height="18px" :src="icon_classify"></a-image>
          </template>
        </a-tree-select>
      </a-form-item>
      <a-form-item label="物料规格:" name="spec">
        <a-input allowClear v-model:value="queryMaterial.formState.spec" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">查询</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import icon_classify from "@/assets/icon_classify.png";
import type { SelectProps } from "ant-design-vue";
import useQueryMaterial from '@/store/queryMaterial'
import request from "@/http";
import { QUERY_MATERIAL_CATEGORY } from "@/http/api";

const queryMaterial = useQueryMaterial();
const options = ref<SelectProps["options"]>([]);
request
  .get({
    url: QUERY_MATERIAL_CATEGORY,
  })
  .then((res: any) => {
    if (res.data.code === 200) {
      const data = res.data.data.filter(
        (item: any) => item.childCategory.length !== 0
      );
      options.value = data.map((item: any) => ({
        ...item,
        disabled: true,
      }));
    }
  });

const onSearch = async () => {
  queryMaterial.formState.pageNum = 1
  queryMaterial.pagination.current = 1
  queryMaterial.getMaterialList()
}
</script>

<style scoped lang="less">
.material_header {
  :deep(.ant-form) {
    margin-top: 30px;
    margin-bottom: 30px;
    display: flex;
    flex-wrap: nowrap;

    .ant-form-item {
      flex: 1;

      &:last-child {
        margin-right: 0;
      }

      .ant-input {
        min-width: 140px;
      }

      .ant-select {
        min-width: 180px;
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

      .ant-select-focused {
        .ant-select-selector {
          border-color: #4064F2;
        }
      }

      .ant-input-affix-wrapper-focused {
        border-color: #4064F2;
      }

      .ant-btn {
        font-family: "MicrosoftYaHei";
        font-size: 14px;
        float: right;
        font-weight: 400;
      }
    }
  }
}
</style>
<style lang="less">
.query_material_select_tree {
  .ant-select-tree {
    .ant-select-tree-treenode-disabled {

      .ant-select-tree-switcher,
      .ant-select-tree-node-content-wrapper {
        color: #1d2129;
        cursor: pointer;
      }
    }

    .ant-select-tree-node-selected {
      color: #4064F2;
      background: transparent;
    }
  }
}
</style>