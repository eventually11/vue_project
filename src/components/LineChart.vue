<script setup lang="ts">
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js'

// 注册 Chart.js 模块
ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale)

// 定义组件的 Props
const props = defineProps<{
  labels: string[],
  datasets: Array<{ label: string, data: number[], backgroundColor: string, borderColor: string }>
}>()

// 设置默认配置
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true
    }
  }
}
</script>

<template>
  <div>
    <Line :data="{ labels: props.labels, datasets: props.datasets }" :options="chartOptions" />
  </div>
</template>

<style scoped>
/* 自定义样式 */
</style>
