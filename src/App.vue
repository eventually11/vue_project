<!-- src/App.vue -->
<script setup lang="ts">
import LineChart from './components/LineChart.vue';
import BarChart from './components/BarChart.vue';
</script>

<template>
  <div class="dashboard">
    <h1>Dashboard Overview</h1>
    
    <!-- 图表容器 -->
    <div class="charts-container">
      <!-- 折线图 -->
      <div class="chart-card">
        <h2>Performance Over Time</h2>
        <LineChart 
          :labels="['January', 'February', 'March', 'April', 'May', 'June']"
          :datasets="[
            {
              label: 'Performance',
              data: [40, 20, 60, 30, 70, 90],
              backgroundColor: 'rgba(66, 165, 245, 0.2)',
              borderColor: '#42A5F5'
            }
          ]"
        />
      </div>

      <!-- 柱状图 -->
      <div class="chart-card">
        <h2>Sales Data</h2>
        <BarChart 
          :labels="['January', 'February', 'March', 'April', 'May', 'June']"
          :datasets="[
            {
              label: 'Sales',
              data: [30, 50, 20, 40, 60, 80],
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)'
            }
          ]"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 页面样式 */
.dashboard {
  padding: 20px;
  background-color: #f4f4f4;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

/* 图表容器样式 */
.charts-container {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
}

/* 单个图表卡片样式 */
.chart-card {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 45%;
  min-width: 300px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}
</style>
