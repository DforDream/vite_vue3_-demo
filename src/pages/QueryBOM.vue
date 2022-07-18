<template>
  <div class="query_bom">
    <div class="left">
      <h2>物料类别</h2>
      <div class="global_tree">
        <a-directory-tree v-model:selectedKeys="queryBom.formState.categoryIds" :tree-data="treeData"
          :fieldNames="{ children: 'childCategory', title: 'name', key: 'id' }" @select="treeSelect">
        </a-directory-tree>
      </div>
    </div>
    <div class="right">
      <QueryBomHeader />
      <QueryBomTable />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import QueryBomHeader from "@/components/query_bom/QueryBomHeader.vue";
import QueryBomTable from "@/components/query_bom/QueryBomTable.vue";
import type { TreeProps } from "ant-design-vue";
import request from '@/http'
import { QUERY_BOM_CATEGORY_LIST } from '@/http/api';
import useQueryBom from '@/store/queryBom';

const treeData = ref<TreeProps["treeData"]>([])
const queryBom = useQueryBom()

request.get({
  url: QUERY_BOM_CATEGORY_LIST
}).then((res: any) => {
  if (res.data.code === 200) {
    const data = res.data.data.filter(
      (item: any) => item.childCategory.length !== 0
    );
    treeData.value = data.map((item: any) => ({
      ...item,
      disabled: true
    }))
  }
})
const treeSelect = (selectedKeys: string[]) => {
  queryBom.pagination.current = 1;
  queryBom.getQueryBomList();
}
</script>

<style scoped lang="less">
@import url('@/styles/global_tree.less');

.query_bom {
  width: 100%;
  height: 100%;
  display: flex;

  .left {
    min-width: 300px;
    padding: 39px 30px;
    border-right: 1px solid #f2f3f5;

    :deep(.ant-tree-treenode-disabled) {

      .ant-tree-switcher,
      .ant-tree-node-content-wrapper {
        color: #1D2129;
        cursor: pointer;
      }
    }

    h2 {
      font-size: 14px;
      font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
      font-weight: bold;
      color: #191b28;
      line-height: 19px;
      margin-bottom: 16px;
    }
  }

  .right {
    flex: 1;
    padding: 0 20px;
    min-width: 900px;
    // background: blue;
  }
}
</style>
