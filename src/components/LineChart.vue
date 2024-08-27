<!-- src/components/LineChart.vue -->
<script setup lang="ts">
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';

// 注册 Chart.js 模块
ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);

// 定义 Props，用于接收数据和标签
const props = defineProps<{
  labels: string[],
  datasets: Array<{ label: string, data: number[], backgroundColor: string, borderColor: string }>
}>();

// 设置默认的图表选项
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
    },
  },
};
</script>

<template>
  <div>
    <!-- 渲染折线图 -->
    <Line :data="{ labels: props.labels, datasets: props.datasets }" :options="chartOptions" />
  </div>
</template>

<style scoped>
/* 为图表容器设置样式 */
</style>
