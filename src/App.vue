<template>
  <div class="wrapper">
    <div class="nav-bar">Order Overview</div>
    <div class="info-container">
      <div class="info-row">
        <div class="info-block">
          <div class="info-title">Update Time</div>
          <div class="info-value date">2024/08/29</div>
        </div>
        <div class="info-block">
          <div class="info-title">Order Volume</div>
          <div class="info-value date">1000</div>
        </div>
        <div class="info-block">
          <div class="info-title">YTD Orders</div>
          <div class="info-value">
            <div class="info-main-value ytd-orders">204</div>
            <div class="info-sub-value positive">Last Year:57(+257.89%)</div>
          </div>
        </div>
        <div class="info-block">
          <div class="info-title">Completion Rate</div>
          <div class="info-value">
            <div class="info-main-value completion-rate">99.53%</div>
            <div class="info-sub-value positive">WoW:98.93%(+0.6%)</div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="item">
        <canvas id="myChart"></canvas>
      </div>
      <div class="item">
        <canvas id="bubbleChart"></canvas>
      </div>
      <div class="item">
        <canvas id="myFunnelChart" ></canvas>
      </div>
      <div class="item"><canvas id="myAreaChart" ></canvas>

      </div>
      <div class="item">a</div>
      <div class="item">a</div>
    </div>
  </div>
</template>

<script>

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
} from 'chart.js';

import {FunnelController,TrapezoidElement} from 'chartjs-chart-funnel';

import {BoxAndWiskers, BoxPlotController} from '@sgratzl/chartjs-chart-boxplot';

Chart.register(...registerables, FunnelController,TrapezoidElement);
Chart.register(BubbleController, LinearScale, PointElement, Tooltip, Legend);
Chart.register(LinearScale, CategoryScale, BarElement, BoxPlotController, BoxAndWiskers);

export default {
  name: 'OrderOverview',
  mounted() {
    // 初始化Chart.js
    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
      type: 'boxplot', // 使用'boxplot'类型，需依赖额外插件
      data: {
        labels: ['January'],
        datasets: [{
          label: 'Order Data',
          data: [{
            min: 1,      // 最小值
            q1: 3,       // 第一四分位数
            median: 4,   // 中位数
            q3: 5,       // 第三四分位数
            max: 11      // 最大值
          }],
          backgroundColor: 'rgba(0, 123, 255, 0.5)',
          borderColor: 'rgba(0, 123, 255, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          }
        }
      }
    });

    const ctx2 = document.getElementById('bubbleChart').getContext('2d');
    new Chart(ctx2, {
      type: 'bubble',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [{
          label: 'Sales Data',
          data: [
            {x: 10, y: 20, r: 15}, // x: X轴位置, y: Y轴位置, r: 泡泡半径
            {x: 15, y: 10, r: 10},
            {x: 20, y: 30, r: 20},
            {x: 25, y: 15, r: 12},
            {x: 30, y: 25, r: 18}
          ],
          backgroundColor: 'rgba(0, 123, 255, 0.5)',
          borderColor: 'rgba(0, 123, 255, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'X Axis Label'
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Y Axis Label'
            }
          }
        }
      }
    });


// 获取 canvas 元素的上下文
    const ctx3 = document.getElementById('myFunnelChart').getContext('2d');
    new Chart(ctx3, {
      type: 'funnel', // 设置图表类型为漏斗图
      data: {
        labels: ['order_id', 'task_id', 'work_id'], // 标签数组
        datasets: [{
          label: 'Order Funnel', // 数据集标签
          data: [100, 60, 47], // 数据数组，代表各阶段的数量
          backgroundColor: ['#007bff', '#17a2b8', '#28a745'], // 背景颜色
          borderColor: '#fff', // 边框颜色
          borderWidth: 1       // 边框宽度
        }]
      },
      options: {
        responsive: true, // 响应式选项
        indexAxis: 'y',   // 设置 Y 轴为主要轴，这样漏斗图会垂直显示
        plugins: {
          legend: {
            display: true,    // 显示图例
            position: 'top'   // 图例位置
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.label}: ${context.raw} 千`; // 设置工具提示显示的格式
              }
            }
          }
        },
        scales: {
          x: {
            beginAtZero: true, // X轴从零开始
            title: {
              display: true,
              text: 'Percentage' // X轴标题
            }
          }
        }
      }
    });


// 获取 canvas 元素的上下文
    const ctx4 = document.getElementById('myAreaChart').getContext('2d');

// 创建堆叠面积图
    new Chart(ctx4, {
      type: 'line', // 面积图使用 'line' 类型，但需要设置填充属性
      data: {
        labels: ['2020', '2021', '2022', '2023', '2024'], // X轴的标签
        datasets: [{
          label: 'Series 1', // 数据集标签
          data: [800, 1000, 600, 1100, 900], // 数据
          backgroundColor: 'rgba(0, 123, 255, 0.5)', // 背景颜色，透明以便堆叠显示
          borderColor: 'rgba(0, 123, 255, 1)', // 边框颜色
          fill: true, // 关键设置，启用填充区域
        }, {
          label: 'Series 2',
          data: [400, 500, 300, 700, 600],
          backgroundColor: 'rgba(23, 162, 184, 0.5)',
          borderColor: 'rgba(23, 162, 184, 1)',
          fill: true,
        }]
      },
      options: {
        responsive: true, // 响应式设计
        plugins: {
          legend: {
            display: true, // 显示图例
            position: 'top' // 图例位置
          },
          tooltip: {
            mode: 'index', // 工具提示的模式
            intersect: false
          }
        },
        scales: {
          x: {
            beginAtZero: true, // X轴从零开始
            stacked: true // 关键设置，启用堆叠
          },
          y: {
            beginAtZero: true, // Y轴从零开始
            stacked: true // 关键设置，启用堆叠
          }
        }
      }
    });
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
  flex: 1 1 calc(33.333% - 10px); /* 3列布局 */
  box-sizing: border-box;
  background: #e0e0e0; /* 背景颜色示例 */
  padding: 10px; /* 内边距示例 */
}
</style>
