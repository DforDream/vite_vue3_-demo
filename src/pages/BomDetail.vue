<template>
  <div class="bom_detail">
    <div class="left">
      <div class="global_tree">
        <a-directory-tree :tree-data="treeData" :fieldNames="{ children: 'childBom', title: 'name', key: 'code' }"
          @select="gotoDetail">
        </a-directory-tree>
      </div>
    </div>
    <div class="right">
      <BomDetailTopTable :data="data.bomList" />
      <BomDetailBottomTable :data="data.details" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from "vue-router";
import useTabRouter from "@/store/tabrouter";
import { message, TreeProps, TreeSelect } from "ant-design-vue";
import BomDetailTopTable from "@/components/bom_detail/BomDetailTopTable.vue";
import BomDetailBottomTable from '@/components/bom_detail/BomDetailBottomTable.vue';
import request from '@/http';
import { BOM_DETAIL_LIST, BOM_DETAIL_BOM_STRUCT } from '@/http/api'

interface BomList {
  categoryId: string;
  categoryName: string;
  code: string;
  id: string;
  materialId: string;
  meas: string;
  name: string;
  parentNum: number;
  price: string;
  spec: string;
}
interface Details {
  baseNum: number;
  beginPeriod: null | string;
  categoryId: string;
  categoryName: string;
  cbomid: null | string;
  code: string;
  endPeriod: null | string;
  id: string;
  itemNum: null | string;
  location: string;
  materialId: string;
  meas: string;
  measureId: string;
  name: string;
  parentNum: null | number;
  price: string;
  spec: string;
}
interface Data {
  bomList: BomList[];
  details: Details[];
}

const router = useRouter();
const tabrouter = useTabRouter();
const treeData = ref<TreeProps["treeData"]>([])
const id = router.currentRoute.value.params.id as string
tabrouter.route = [`/${router.currentRoute.value.params.from}`];
const data = ref<Data>({
  bomList: [],
  details: []
})
const getTableData = (id: string) => {
  request.get({
    url: `${BOM_DETAIL_LIST
      }/${id}`,
    headers: {
      hasLoading: true
    }
  }).then((res: any) => {
    if (res.data.code === 200) {
      data.value = res.data.data
    }
  })
}
getTableData(id)
request.get({
  url: `${BOM_DETAIL_BOM_STRUCT
    }/${id}`
}).then((res: any) => {
  if (res.data.code === 200) {
    treeData.value = res.data.data
  }
})
const gotoDetail = (selectedKeys: string[], e: any) => {
  if (e.selectedNodes[0].childBom.length) {
    getTableData(e.selectedNodes[0].childBom[0].cbomid)
  } else {
    message.error('别点了，已经是最后一层了')
  }
  // console.log(e.selectedNodes[0].childBom ? e.selectedNodes[0].childBom[0].cbomid : e.selectedNodes[0].cbomid)
  // location.replace(`/query_bom/bom_detail/${selectedKeys
  // [0]}`);
}
const filterItem = (node: any) => {
  return node.filter((item: any) => {
    item.childBom = filterItem(item.childBom)
    return item.childBom.length
  })
}
</script>

<style scoped lang="less">
@import url("@/styles/global_tree.less");

.global_tree {
  height: calc(100% - 30px);
  overflow-y: auto;

  :deep(.ant-tree) {
    .ant-tree-treenode-selected {
      .ant-tree-switcher {
        color: #000 !important;
      }
    }

  }

}

.bom_detail {
  display: flex;
  width: 100%;
  height: 100%;
  min-width: 1200px;

  .left {
    min-width: 300px;
    padding: 37px 30px 0;
    border-right: 1px solid #f2f3f5;

    :deep(.ant-tree-treenode-disabled) {

      .ant-tree-switcher,
      .ant-tree-node-content-wrapper {
        color: #1D2129;
        cursor: pointer;
      }
    }
  }

  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 900px;
    padding: 30px 20px 30px;
  }
}
</style>
