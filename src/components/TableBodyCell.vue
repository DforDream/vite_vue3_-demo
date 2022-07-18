<template>
  <template v-if="props.record[column.dataIndex]">
    <template v-if="props.column.dataIndex === 'name'">
      <template v-if="canSeeChart && props.showBom">
        <a :class="isClick ? 'link' : ''" class="cur" :href="`${props.detailFrom}/bom_detail/${props.record.id}`"
          @click="isClick = true" target="__blank">{{ props.record.name }}</a>
      </template>
      <template v-else>
        <div>{{ props.record.name }}</div>
      </template>
    </template>
    <template v-else-if="props.column.dataIndex === 'number'">
      <span class="grey">{{ props.record.number }}</span>
    </template>
    <template v-else-if="props.column.dataIndex === 'spec'">
      <a-tooltip class="specifications" :destroyTooltipOnHide="true" :overlayStyle="{
        'max-width': '100%',
        margin: '0 auto',
        'white-space': 'nowrap',
      }" :title="props.record.spec">
        <div @click="copy(props.record.spec)">{{ props.record.spec }}</div>
      </a-tooltip>
    </template>
    <template v-else-if="props.column.dataIndex === 'price'">
      <template v-if="canModify && props.canModify">
        <a-input @blur="inputBlur(props.record)" v-model:value="price"></a-input>
      </template>
      <template v-else>
        {{ props.record[column.dataIndex] || 0 }}
      </template>
    </template>
    <template v-else>
      {{ props.record[column.dataIndex] }}
    </template>
  </template>
  <template v-else-if="props.column.dataIndex === 'operation'">
    <template v-if="canSeeChart">
      <a class="link" target="_blank" :href="`${props.chartFrom}/trend_chart/${props.record.id}`">趋势图</a>
    </template>
    <template v-else>
      <span>-</span>
    </template>
  </template>
  <template v-else>
    <template v-if="props.column.dataIndex === 'price'">
      <template v-if="canModify && props.canModify">
        <a-input @blur="inputBlur(props.record)" v-model:value="price"></a-input>
      </template>
      <template v-else>
        {{ props.record[column.dataIndex] || 0 }}
      </template>
    </template>
    <template v-else>
      <span>-</span>
    </template>
  </template>
  <a-modal v-model:visible="visible" wrapClassName="material_table_model" centered :mask="false" :width="450"
    :closable="false" @cancel="cancel" @ok="ok">
    <ModalTitle :data="titleData" />
  </a-modal>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { message } from "ant-design-vue";
import ModalTitle from "@/components/query_material/ModelTitle.vue";
import useUser from "@/store/user";
import request from '@/http';
import { QUERY_MATERIAL_UPDATE_PRICE } from '@/http/api';
import type { DataSource } from '@/store/queryMaterial'
import useQueryMaterial from "@/store/queryMaterial";

const props = defineProps([
  "column",
  "record",
  "showBom",
  "chartFrom",
  "detailFrom",
  "canModify"
]);
const user = useUser();
const queryMaterial = useQueryMaterial()
const isClick = ref(false);
const price = ref('')
const visible = ref(false)
const titleData = ref<DataSource>()
const canSeeChart = user.canSeeChartUser.includes(
  `${localStorage.getItem("user")}`
);
const canModify = user.canModifyUser.includes(
  `${localStorage.getItem("user")}`
);
window.showModel = true;
price.value = props.record.price || '0';

const inputBlur = (e: DataSource) => {
  if (window.showModel) {
    window.showModel = false;
    visible.value = true;
    titleData.value = e
  }
};
const cancel = () => {
  window.showModel = true;
  visible.value = false;
}
const ok = async () => {
  if (titleData.value?.price !== price.value) {
    await request.put({
      url: QUERY_MATERIAL_UPDATE_PRICE,
      data: {
        id: titleData.value?.id,
        price: price.value
      }
    }).then((res: any) => {
      if (res.data.code === 200) {
        message.success('修改成功')
        queryMaterial.getMaterialList()
      } else {
        message.error(res.data.message)
      }
    })
  }
  window.showModel = true;
  visible.value = false;
}
const copy = (value: string) => {
  // const Input = document.createElement('input');
  // Input.value = value;
  // document.body.appendChild(Input)
  // Input.select()
  // document.execCommand('copy')
  // Input.style.display = 'none'
  // message.success('复制成功')
  // document.body.removeChild(Input)
  if (navigator.clipboard) {
    navigator.clipboard.writeText(value);
    message.success('复制成功')
  } else {
    // message.error('您的浏览器不支持快捷复制')
    const Input = document.createElement('input');
    Input.value = value;
    document.body.appendChild(Input);
    Input.select();
    document.execCommand('copy');
    Input.style.display = 'none';
    message.success('复制成功');
    document.body.removeChild(Input);
  }

}
</script>

<style scoped lang="less">
</style>
