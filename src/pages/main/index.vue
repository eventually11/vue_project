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
              sum-text="sum"
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
import { BoxAndWiskers, BoxPlotController } from '@sgratzl/chartjs-chart-boxplot';
import { orderVolumeConfig, loadBoxplotDataFromCSV } from './config/orderVolumeConfig'; 
import { bubbleChartConfig, loadBubbleChartDataFromCSV } from './config/bubbleChartConfig';
import { funnelChartConfig, loadFunnelChartDataFromCSV } from './config/funnelChartConfig'; 
import { loadAreaChartDataFromCSV, areaChartConfig } from './config/areaChartConfig';
import { orderTendencyChartConfig, loadOrderTendencyChartDataFromCSV } from './config/orderTendencyChartConfig';
import { loadTableDataFromCSV, tableData } from './config/tableData'; 
import { infoConfig, loadInfoConfigFromCSV } from './config/infoConfig'; 
import csv from './csv/area.csv?url';
import bubbleCsv from './csv/bubble.csv?url';
import funnelCsv from './csv/funnel.csv?url';
import infoCsv from './csv/info.csv?url'; 
import orderTendencyCsv from './csv/orderTendency.csv?url'; 
import orderVolumeCsv from './csv/orderVolume.csv?url'; 
import tableCsv from './csv/tableData.csv?url'; 



Chart.register(...registerables, FunnelController, TrapezoidElement);
Chart.register(BubbleController, LinearScale, PointElement, Tooltip, Legend);
Chart.register(LinearScale, CategoryScale, BarElement, BoxPlotController, BoxAndWiskers);

export default {
  name: 'OrderOverview',
  setup() {
    onMounted(() => {
      // Box plot instance
      const orderVolumeChart = new Chart(document.getElementById('myOrderVolumeChart').getContext('2d'), orderVolumeConfig);
      loadBoxplotDataFromCSV(orderVolumeCsv, orderVolumeChart); // Load box plot data from CSV

      // Funnel chart instance
      const funnelChart = new Chart(document.getElementById('myFunnelChart').getContext('2d'), funnelChartConfig);
      loadFunnelChartDataFromCSV(funnelCsv, funnelChart); // Load funnel chart data from CSV

      const chart = new Chart(document.getElementById('myAreaChart').getContext('2d'), areaChartConfig);
      loadAreaChartDataFromCSV(csv, chart);

      const bubbleChart = new Chart(document.getElementById('bubbleChart').getContext('2d'), bubbleChartConfig);
      loadBubbleChartDataFromCSV(bubbleCsv, bubbleChart);

      // Order tendency chart instance
      const orderTendencyChart = new Chart(document.getElementById('orderTendencyChart').getContext('2d'), orderTendencyChartConfig);
      loadOrderTendencyChartDataFromCSV(orderTendencyCsv, orderTendencyChart); // Load order tendency data from CSV
      
      // Load infoConfig data from CSV
      loadInfoConfigFromCSV(infoCsv); // Load infoConfig data from CSV
      
      // Load table data from CSV
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
  height: 100vh; /*  wrapper whole window height */
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
  flex: 1; /* let container occupy left room */
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px;
  box-sizing: border-box;
}

.item {
  flex: 1 1 calc(33.333% - 20px); /* 3 columns */
  box-sizing: border-box;
  height: 355px;
  min-width: 200px; /* min width make sure small screen wont be too narrow */
  //background: #e0e0e0;
}
</style>
