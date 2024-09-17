<template>
    <div class="wrapper">
      <div class="nav-bar">Order Overview</div>
      <div class="info-container">
        <div class="info-row">
          <div class="info-block">
            <div class="info-title">Update Time</div>
            <div class="info-value date">{{ infoConfig.updateTime }}</div>
          </div>
          <div class="info-block">
            <div class="info-title">Order Volume</div>
            <div class="info-value date">{{ infoConfig.orderVolume }}</div>
          </div>
          <div class="info-block">
            <div class="info-title">YTD Orders</div>
            <div class="info-value">
              <div
                  class="info-main-value ytd-orders"
                  :style="{ color: infoConfig.ytdOrders.isPositive ? infoConfig.ytdOrders.positiveColor : infoConfig.ytdOrders.negativeColor }"
              >
                {{ infoConfig.ytdOrders.value }}
              </div>
              <div
                  class="info-sub-value positive"
                  :style="{ color: infoConfig.ytdOrders.isPositive ? infoConfig.ytdOrders.positiveColor : infoConfig.ytdOrders.negativeColor }"
              >
                Last Year:{{ infoConfig.ytdOrders.lastYearValue }}({{ infoConfig.ytdOrders.change }}%)
              </div>
            </div>
          </div>
          <div class="info-block">
            <div class="info-title">Completion Rate</div>
            <div class="info-value">
              <div
                  class="info-main-value completion-rate"
                  :style="{ color: infoConfig.completionRate.isPositive ? infoConfig.completionRate.positiveColor : infoConfig.completionRate.negativeColor }"
              >
                {{ infoConfig.completionRate.value }}
              </div>
              <div
                  class="info-sub-value positive"
                  :style="{ color: infoConfig.completionRate.isPositive ? infoConfig.completionRate.positiveColor : infoConfig.completionRate.negativeColor }"
              >
                WoW:{{ infoConfig.completionRate.WoWValue }}({{ infoConfig.completionRate.change }}%)
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="item" style="display: flex;flex-flow: column;justify-content: space-around">
          <div
              style="background: #426871;color:white;height:30px;line-height: 30px;text-align: center;font-weight: 400">
            Service_min distribution
          </div>

          <canvas id="myOrderVolumeChart"></canvas>
        </div>
        <div class="item" style="display: flex;flex-flow: column;justify-content: space-around">
          <div
              style="background: #426871;color:white;height:30px;line-height: 30px;text-align: center;font-weight: 400">
            Order price&time
          </div>
          <canvas id="bubbleChart"></canvas>
        </div>
        <div class="item" style="display: flex;flex-flow: column;justify-content: space-around">
          <div
              style="background: #426871;color:white;height:30px;line-height: 30px;text-align: center;font-weight: 400">
            Order Funnel
          </div>
          <canvas id="myFunnelChart"></canvas>
        </div>
        <div class="item" style="display: flex;flex-flow: column;justify-content: space-around">
          <div style="background: #426871;color:white;height:30px;line-height: 30px;text-align: center;font-weight: 400">
            Distance distribution
          </div>
          <canvas id="myAreaChart"></canvas>

        </div>
        <div class="item">
          <el-table
              stripe
              :data="tableData"
              max-height="355"
              show-summary
              sum-text="合计"
          >
            <el-table-column sortable prop="date" label="Start date"/>
            <el-table-column sortable prop="order_volume" label="order_volume"/>
            <el-table-column sortable prop="courier_pick_up" label="courier_pick_up"/>
            <el-table-column sortable prop="complete_order_volume" label="complete_order_volume"/>
            <el-table-column sortable prop="service_mins" label="service_mins"/>
          </el-table>
        </div>
        <div class="item" style="display: flex;flex-flow: column;justify-content: space-around">
          <div style="background: #426871;color:white;height:30px;line-height: 30px;text-align: center;font-weight: 400">
            Order Tendency
          </div>
          <canvas id="orderTendencyChart"></canvas>
        </div>
      </div>
    </div>
</template>

<script>
import {ref, onMounted} from 'vue';
import {
  Chart,
  BubbleController,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  CategoryScale,
  BarElement,
  registerables
} from 'chart.js';import {FunnelController, TrapezoidElement} from 'chartjs-chart-funnel';
import {BoxAndWiskers, BoxPlotController} from '@sgratzl/chartjs-chart-boxplot';
import { orderVolumeConfig, loadBoxplotDataFromCSV } from './config/orderVolumeConfig'; // 加载箱线图 CSV 数据
import { bubbleChartConfig, loadBubbleChartDataFromCSV } from './config/bubbleChartConfig';
import { funnelChartConfig, loadFunnelChartDataFromCSV } from './config/funnelChartConfig'; // 加载漏斗图CSV函数
import { loadAreaChartDataFromCSV, areaChartConfig } from './config/areaChartConfig';
import { orderTendencyChartConfig, loadOrderTendencyChartDataFromCSV } from './config/orderTendencyChartConfig';
import { loadTableDataFromCSV, tableData } from './config/tableData'; // 导入表格数据和加载函数
import { infoConfig, loadInfoConfigFromCSV } from './config/infoConfig'; // 加载 infoConfig
import csv from './csv/area.csv?url';
import bubbleCsv from './csv/bubble.csv?url';
import funnelCsv from './csv/funnel.csv?url';
import infoCsv from './csv/info.csv?url'; // 引入 info CSV 文件
import orderTendencyCsv from './csv/orderTendency.csv?url'; // 加载 orderTendency CSV 文件
import orderVolumeCsv from './csv/orderVolume.csv?url'; // 加载 orderVolume CSV 文件
import tableCsv from './csv/tableData.csv?url'; // 加载表格数据的 CSV 文件


Chart.register(...registerables, FunnelController, TrapezoidElement);
Chart.register(BubbleController, LinearScale, PointElement, Tooltip, Legend);
Chart.register(LinearScale, CategoryScale, BarElement, BoxPlotController, BoxAndWiskers);

export default {
  name: 'OrderOverview',
  setup() {
    onMounted(() => {
      // 箱线图实例
      const orderVolumeChart = new Chart(document.getElementById('myOrderVolumeChart').getContext('2d'), orderVolumeConfig);
      loadBoxplotDataFromCSV(orderVolumeCsv, orderVolumeChart); // 从 CSV 加载箱线图数据

      // 漏斗图的实例化
      const funnelChart = new Chart(document.getElementById('myFunnelChart').getContext('2d'), funnelChartConfig);
      loadFunnelChartDataFromCSV(funnelCsv, funnelChart); // 加载漏斗图的CSV数据

      const chart = new Chart(document.getElementById('myAreaChart').getContext('2d'), areaChartConfig);
      loadAreaChartDataFromCSV(csv, chart);

      const bubbleChart = new Chart(document.getElementById('bubbleChart').getContext('2d'), bubbleChartConfig);
      loadBubbleChartDataFromCSV(bubbleCsv, bubbleChart);


      // 订单趋势图实例
      const orderTendencyChart = new Chart(document.getElementById('orderTendencyChart').getContext('2d'), orderTendencyChartConfig);
      loadOrderTendencyChartDataFromCSV(orderTendencyCsv, orderTendencyChart); // 从 CSV 加载订单趋势数据
      // 加载 infoConfig 的 CSV 数据
      loadInfoConfigFromCSV(infoCsv); // 从CSV加载 infoConfig 数据
      // 从 CSV 加载表格数据
      loadTableDataFromCSV(tableCsv);
    });

    return {
      tableData, infoConfig
    };
  }
};

</script>

<style scoped>
/* global styles */
html, body {
  margin: 0;
  height: 100%;
}

.wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100vh; /* 使 wrapper 占据整个视口高度 */
}

.nav-bar {
  background: #426871;
  color: white;
  text-align: center;
  font-weight: bold;
  height: 50px;
  line-height: 50px;
  font-size: 30px;
}

.info-container {
  display: flex;
  flex-direction: column;
}

.info-row {
  display: flex;
  height: 120px;
}

.info-block {
  flex: 1;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  align-items: center;
}

.info-title {
  font-weight: 400;
  font-size: 20px;
}

.info-value {
  font-weight: 400;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.date, .order-volume {
  font-size: 50px;
  color: #426871;
}

.ytd-orders {
  font-size: 50px;
  color: #1aab40;
}

.completion-rate {
  font-size: 50px;
  color: #1aab40;
}

.positive {
  color: rgb(45, 228, 42);
}

.container {
  flex: 1; /* 使 container 占据剩余空间 */
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px;
  box-sizing: border-box;
}

.item {
  flex: 1 1 calc(33.333% - 20px); /* 3列布局 */
  box-sizing: border-box;
  height: 355px;
  min-width: 200px; /* 设置最小宽度以确保小屏幕下不会太窄 */
  //background: #e0e0e0;
}
</style>
