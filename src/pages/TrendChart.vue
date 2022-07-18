<template>
  <div class="trend_chart">
    <CoreChart :title="title" :code="code" :chartData="chartData" :options="options" @changeYear="changeYear" />
    <TrendTable v-if="from === 'query_material'" :basicSheet="basicSheet" :purchaseSheet="purchaseSheet"
      :month="chartData.month" />
    <div class="recalculate" @click="recalculate">
      <LoadingOutlined v-if="isRecalculate" />
      重新计算
    </div>
  </div>
</template>
<script setup lang='ts'>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import useTabRouter from '@/store/tabrouter';
import CoreChart from '@/components/trend_chart/CoreChart.vue'
import TrendTable from '@/components/trend_chart/TrendTable.vue'
import request from '@/http';
import { MATERIAL_CHART_YEAR, BOM_CHART_YEAR, MATERIAL_TREND, BOM_TREND, RECALCULATE_BOM_TREND, RECALCULATE_MATERIAL_TREND } from '@/http/api';
import { LoadingOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';

interface Data {
  [key: string]: any
}

interface ChartData {
  basic: Data[]
  month: string[]
  purchase: Data[]
}
const router = useRouter()
const tabrouter = useTabRouter()
const id = router.currentRoute.value.params.id
const from = router.currentRoute.value.params.from
tabrouter.route = [`/${from}`];

const chartData = reactive<ChartData>({
  basic: [],
  month: [],
  purchase: []
});
const basicSheet = ref<any>([])
const purchaseSheet = ref<any>([])
const title = ref<string>('');
const code = ref<string>('');
const options = ref<any>([])
const year = ref('');
const isRecalculate = ref(false)

const changeYear = (y: string) => {
  year.value = y
  getChartData()
}

const recalculate = async () => {
  isRecalculate.value = true
  await getChartData(RECALCULATE_MATERIAL_TREND, RECALCULATE_BOM_TREND)
  isRecalculate.value = false
  message.success({
    content: '已重新计算',
    class: 'recalculate-success',
    style: {
      marginTop: '100px',
    }
  })
}
request.get({
  url: from === 'query_material' ? `${MATERIAL_CHART_YEAR}/${id}` : `${BOM_CHART_YEAR}/${id}`,
}).then((res: any) => {
  if (res.data.code === 200) {
    const dataArr = res.data.data.sort((a: any, b: any) => (b - a));
    if (dataArr.length === 0) {
      options.value = [
        {
          id: new Date().getFullYear(),
          value: new Date().getFullYear(),
        }
      ]
    } else {
      options.value = dataArr.map((item: string) => {
        return {
          id: item,
          value: item
        }
      })
    }

  }
}).then(() => {
  getChartData()
})



const getChartData = (materialUrl = MATERIAL_TREND, bomUrl = BOM_TREND) => {
  request.post({
    url: from === 'query_material' ? materialUrl : bomUrl,
    data: from === 'query_material' ?
      {
        materialId: id,
        year: year.value || options.value[0].value
      } : {
        id,
        year: year.value || options.value[0].value
      }
  }).then((res: any) => {
    if (res.data.code === 200) {
      const { data } = res.data
      chartData.basic = data.chart.basic.map((item: Data) => {
        if (item.symbol) {
          return {
            value: item.price,
            symbol: 'emptyCircle'
          }
        } else {
          return {
            value: item.price,
            symbol: 'none'
          }
        }
      })
      chartData.month = data.chart.month.map((item: string) => {
        return `${item}月`
      })
      chartData.purchase = data.chart.purchase.map((item: Data) => {
        if (item.symbol) {
          return {
            value: item.price,
            symbol: 'emptyCircle'
          }
        } else {
          return {
            value: item.price,
            symbol: 'none'
          }
        }
      })
      title.value = data.title
      code.value = data.code
      basicSheet.value = data.basicSheet
      purchaseSheet.value = data.purchaseSheet
    }
  })
}
</script>

<style scoped lang='less'>
.trend_chart {
  width: 100%;
  height: 100%;
  padding: 0 20px;

  .recalculate {
    position: fixed;
    right: 0;
    bottom: 53px;
    border-radius: 24px 0px 0px 24px;
    overflow: hidden;
    width: 93px;
    height: 48px;
    background: #4064F2;
    box-shadow: 0px 4px 16px 0px rgba(64, 100, 242, 0.4);
    cursor: pointer;
    text-align: center;
    line-height: 48px;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: #FFFFFF;
    font-weight: normal;
  }
}
</style>

<style lang="less">
.recalculate-success {
  .ant-message-notice-content {
    background-color: rgba(64, 100, 242, .08);
    border-radius: 4px;
  }
  .anticon {
    color: #4064F2;
  }
}
</style>