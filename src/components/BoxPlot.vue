<!-- src/components/BoxPlot.vue -->
<script setup lang="ts">
import { BoxPlotController, BoxAndWiskers, LinearScale, CategoryScale, Title, Tooltip, Chart as ChartJS } from 'chart.js';
import { Chart } from 'vue-chartjs';

// 注册 BoxPlotController 到 Chart.js
ChartJS.register(BoxPlotController, BoxAndWiskers, LinearScale, CategoryScale, Title, Tooltip);

const props = defineProps<{
  labels: string[],
  datasets: Array<{ label: string, data: number[][], backgroundColor: string }>
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
      text: 'Service Min Distribution',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};
</script>

<template>
  <div>
    <Chart
      :type="'boxplot'"
      :data="{ labels: props.labels, datasets: props.datasets }"
      :options="chartOptions"
    />
  </div>
</template>

<style scoped>
/* 样式可以根据需要调整 */
</style>
