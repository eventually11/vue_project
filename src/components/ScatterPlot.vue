<!-- src/components/ScatterPlot.vue -->
<script setup lang="ts">
import { ScatterController, LinearScale, PointElement, Title, Tooltip, Chart as ChartJS } from 'chart.js';
import { Chart } from 'vue-chartjs';

// 注册 ScatterController 到 Chart.js
ChartJS.register(ScatterController, LinearScale, PointElement, Title, Tooltip);

const props = defineProps<{
  datasets: Array<{ label: string, data: Array<{ x: number, y: number }>, backgroundColor: string }>
}>();

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
    },
    title: {
      display: true,
      text: 'Order Price & Time',
    },
  },
  scales: {
    x: {
      beginAtZero: true,
    },
    y: {
      beginAtZero: true,
    },
  },
};
</script>

<template>
  <div>
    <Chart
      :type="'scatter'"
      :data="{ datasets: props.datasets }"
      :options="chartOptions"
    />
  </div>
</template>

<style scoped>
/* 样式可以根据需要调整 */
</style>
