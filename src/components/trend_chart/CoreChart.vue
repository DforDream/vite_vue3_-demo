<template>
  <div class="core_chart">
    <div id="core"></div>
    <div class="input">
      <a-select :value="selectYear" :options="props.options" @select="selectd" dropdownClassName="core_chart_select"
        :bordered="false">
        <template #suffixIcon>
          <a-image :preview="false" width="18px" height="18px" :src="icon_classify"></a-image>
        </template>
      </a-select>
    </div>
    <div class="title">
      {{props.code}} · {{props.title}} · 基准价趋势图
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, watch, ref, watchEffect } from "vue";
import * as echarts from "echarts/core";
import {
  TitleComponent,
  TitleComponentOption,
  ToolboxComponent,
  ToolboxComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  LegendComponent,
  LegendComponentOption,
} from "echarts/components";
import { LineChart, LineSeriesOption } from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import icon_classify from "@/assets/icon_classify.png";

const props = defineProps(['code','title', 'chartData', 'options'])
const emits = defineEmits(['changeYear'])
const selectYear = ref('')
echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
]);

type EChartsOption = echarts.ComposeOption<
  | TitleComponentOption
  | ToolboxComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | LegendComponentOption
  | LineSeriesOption
>;

onMounted(() => {
  var chartDom = document.getElementById("core")!;
  var myChart = echarts.init(chartDom, {}, {
    // width: '100%',
    height: 340,
  });
  var option: EChartsOption;
  const getChart = () => {
    option = {
      title: {
        text: `${props.code} · ${props.title} · 基准价趋势图`,
        textStyle: {
          color: '#191B28',
          fontFamily: 'MicrosoftYaHei-Bold',
        },
        subtext: "单位：元",
        subtextStyle: {
          color: '#6F738D',
          fontFamily: 'MicrosoftYaHei',
        },
        itemGap: 26,
      },
      tooltip: {
        trigger: "axis",
        backgroundColor: '#191B28',
        textStyle: {
          color: '#fff',
        },
        formatter: '<span style="display: inline-block;width:6px;height: 6px;border-radius: 50%;background: #1CC2C3;vertical-align: middle;margin-right: 8px;"></span>{a0}: {c0}<br /><span style="display: inline-block;width:6px;height: 6px;border-radius: 50%;background: #4064F2;vertical-align: middle;margin-right: 8px;"></span>{a1}: {c1}',
        // formatter: (params: any) => { console.log(params[0].data) },
      },
      legend: {
        itemGap: 20,
        itemWidth: 6,
        itemHeight: 6,
        right: 276,
        icon: 'circle',
        selectedMode: false,
        textStyle: {
          color: '#191B28',
          fontFamily: 'MicrosoftYaHei',
          fontSize: 12
        },
        data: [
          {
            name: '采购价',
            itemStyle: {
              color: '#1CC2C3',
            },
          },
          {
            name: '基准价',
            itemStyle: {
              color: '#4064F2'
            },
          }
        ],
      },
      grid: {
        left: "1%",
        right: 60,
        bottom: "0",
        top: 90,
        containLabel: true,
      },
      xAxis: {
        type: "category",
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: 'rgba(0, 0, 0, 0.45)',
          fontFamily: 'MicrosoftYaHei'
        },
        boundaryGap: false,
        data: props.chartData.month
      },
      yAxis: {
        type: "value",
        axisLabel: {
          color: 'rgba(0,0,0,0.45)',
          fontFamily: 'MicrosoftYaHei'
        },
        splitLine: {
          lineStyle: {
            type: 'dashed',
            color: '#E4E5EC'
          }
        }
      },
      series: [
        {
          name: "采购价",
          type: "line",
          // stack: "Total",
          showSymbol: false,
          itemStyle: {
            color: '#1CC2C3'
          },
          lineStyle: {
            width: 1
          },
          // data: [{ value: 120, symbol: 'emptyCircle', }, { value: 120, symbol: 'none' }, { value: 120, symbol: 'none' }, { value: 120, symbol: 'none' }, { value: 120, symbol: 'none' }, { value: 120, symbol: 'none' }, { value: 120, symbol: 'none' }, { value: 120, symbol: 'none' }, { value: 120, symbol: 'none' }, { value: 120, symbol: 'none' }, { value: 120, symbol: 'none' }, { value: 120, symbol: 'none' },],
          data: props.chartData.purchase
        },
        {
          name: "基准价",
          type: "line",
          // stack: "Total",
          showSymbol: false,
          itemStyle: {
            color: '#4064F2'
          },
          lineStyle: {
            width: 1
          },
          data: props.chartData.basic,
        }
      ],
    };
    option && myChart.setOption(option);
  }
  watchEffect(() => {
    getChart()
  })
  // watch(() => props.chartData.basic, (/* oldValue, newValue */) => {
  //   getChart()
  // }, {
  //   immediate: true
  // })
  // watch(() => props.title, (/* oldValue, newValue */) => {
  //   getChart()
  // }, {
  //   immediate: true
  // })
  watch(() => props.options, () => {
    selectYear.value = `${props.options[0] && props.options[0].value}年`
  }, {
    immediate: true
  })
});

const selectd = (value: string) => {
  selectYear.value = `${value}年`
  emits('changeYear', value)
}
</script>

<style scoped lang="less">
.core_chart {
  margin-top: 31px;
  min-width: 1200px;
  position: relative;

  #core {
    width: 100%;
    height: 100%;
  }

  .input {
    position: absolute;
    top: -7px;
    right: 60px;
    width: 156px;
    height: 36px;

    :deep(.ant-select) {
      width: 100%;

      .ant-select-selector {
        background-color: #F2F3F5 !important;
        color: #191B28 !important;

      }

      .ant-select-arrow {
        margin-top: -10px;
        cursor: pointer;
      }
    }

    :deep(.ant-select-focused) {

      .ant-select-selector {
        background-color: #F2F3F5;

        .ant-select-selection-item {
          color: #191B28;
        }
      }
    }
  }
  .title {
    position: absolute;
    top: -1px;
    left: 5px;
    color: transparent;
    font-size: 18px;
    font-family: 'MicrosoftYaHei-Bold';
    font-weight: 700;
  }
}
</style>

<style lang="less">
.core_chart_select {
  .ant-select-item {

    .ant-select-item-option-content {
      color: #191B28;
    }

    &:hover {
      background-color: transparent;
      color: #191B28;
    }
  }

  .ant-select-item-option-active {
    font-weight: normal;

    .ant-select-item-option-content {
      color: #4064F2;
    }

    background: transparent;
  }

}
</style>
