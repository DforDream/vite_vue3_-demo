<template>
  <div class="trend_table">
    <div class="tab">
      <template v-for="item in tab" :key="item.title">
        <span :class="select === item.select ? 'active' : ''" @click="changeSelect(item.select)">{{ item.title }}</span>
      </template>
    </div>
    <div class=" table">
      <div class="row">
        <div class="row_item" v-for="item in month" :key="item">{{ item }}</div>
      </div>
      <div class="row">
        <div class="content_item" v-for="(item, index) in selectData" :key="index">
          <template v-for="data in item" :key="data.date">
            <p>{{ `${data.date}` }} : ￥{{ data.price }}</p>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang='ts'>
import { computed, ref } from 'vue';

const tab = [
  {
    select: 'purchaseSheet',
    title: '采购价'
  },
  {
    select: 'basicSheet',
    title: '基准价'
  },
]
const select = ref('purchaseSheet')
const props = defineProps(['month', 'basicSheet', 'purchaseSheet'])
const month = computed(() => props.month)
const selectData = computed(() => {
  if (select.value === 'purchaseSheet') {
    return props.purchaseSheet
  } else {
    return props.basicSheet
  }
})
const changeSelect = (val: string) => {
  select.value = val
}
</script>

<style scoped lang='less'>
.trend_table {
  margin-top: 48px;

  .tab {
    span {
      display: inline-block;
      width: 76px;
      height: 36px;
      background: #F2F3F5;
      border-radius: 0px 2px 2px 0px;
      text-align: center;
      line-height: 36px;
      color: #191B28;
      cursor: pointer;

      &:first-child {
        border-radius: 2px 0px 0px 2px;
      }
    }

    .active {
      background: #4064F2;
      color: #fff;
      font-family: 'MicrosoftYaHei';
      font-size: 14px;
    }
  }

  .table {
    margin-top: 14px;
    min-width: 1200px;
    // max-height: calc(100vh - 60px - 31px - 340px -48px - 36px - 14px - 44px);
    max-height: calc(100vh - 573px);
    overflow: auto;
    border-bottom: 1px solid #E4E5EC;

    .row {
      display: flex;
      color: #191B28;
      background: #fff;

      &:first-child {
        position: sticky;
        top: 0;
      }

      .row_item {
        flex: 1;
        text-align: center;
        height: 44px;
        border: 1px solid #E4E5EC;
        line-height: 44px;
        border-right: none;

        &:last-child {
          border-right: 1px solid #E4E5EC;
        }
      }

      .content_item {
        text-align: left;
        flex: 1;
        padding-left: 10px;
        border-left: 1px solid #E4E5EC;
        line-height: 24px;
        font-size: 12px;

        &:last-child {
          border-right: 1px solid #E4E5EC;
        }
      }
    }
  }
}
</style>