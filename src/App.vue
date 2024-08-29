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
            <div class="info-sub-value positive">Last Year: 57 (+257.89%)</div>
          </div>
        </div>
        <div class="info-block">
          <div class="info-title">Completion Rate</div>
          <div class="info-value">
            <div class="info-main-value completion-rate">99.53%</div>
            <div class="info-sub-value positive">WoW: 98.93% (+0.6%)</div>
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
        <canvas id="myFunnelChart"></canvas>
      </div>
      <div class="item">
        <canvas id="myAreaChart"></canvas>
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

import { FunnelController, TrapezoidElement } from 'chartjs-chart-funnel';

import { BoxAndWiskers, BoxPlotController } from '@sgratzl/chartjs-chart-boxplot';

Chart.register(...registerables, FunnelController, TrapezoidElement);
Chart.register(BubbleController, LinearScale, PointElement, Tooltip, Legend);
Chart.register(LinearScale, CategoryScale, BarElement, BoxPlotController, BoxAndWiskers);

export default {
  name: 'OrderOverview',
  mounted() {
    // Initialize Chart.js
    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
      type: 'boxplot', // 'boxplot' type requires additional plugin
      data: {
        labels: ['January'],
        datasets: [{
          label: 'Order Data',
          data: [{
            min: 1,      // Minimum value
            q1: 3,       // First quartile
            median: 4,   // Median
            q3: 5,       // Third quartile
            max: 11      // Maximum value
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
            {x: 10, y: 20, r: 15}, // x: X-axis position, y: Y-axis position, r: Bubble radius
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

    // Get the canvas context for the funnel chart
    const ctx3 = document.getElementById('myFunnelChart').getContext('2d');
    new Chart(ctx3, {
      type: 'funnel', // Set chart type to funnel
      data: {
        labels: ['order_id', 'task_id', 'work_id'], // Labels array
        datasets: [{
          label: 'Order Funnel', // Dataset label
          data: [100, 60, 47], // Data array representing quantities at each stage
          backgroundColor: ['#007bff', '#17a2b8', '#28a745'], // Background color
          borderColor: '#fff', // Border color
          borderWidth: 1       // Border width
        }]
      },
      options: {
        responsive: true, // Responsive option
        indexAxis: 'y',   // Set Y-axis as the primary axis for vertical funnel
        plugins: {
          legend: {
            display: true,    // Display legend
            position: 'top'   // Legend position
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.label}: ${context.raw} K`; // Set tooltip display format
              }
            }
          }
        },
        scales: {
          x: {
            beginAtZero: true, // Start X-axis at zero
            title: {
              display: true,
              text: 'Percentage' // X-axis title
            }
          }
        }
      }
    });

    // Get the canvas context for the area chart
    const ctx4 = document.getElementById('myAreaChart').getContext('2d');

    // Create stacked area chart
    new Chart(ctx4, {
      type: 'line', // Area chart uses 'line' type but needs fill option set
      data: {
        labels: ['2020', '2021', '2022', '2023', '2024'], // X-axis labels
        datasets: [{
          label: 'Series 1', // Dataset label
          data: [800, 1000, 600, 1100, 900], // Data
          backgroundColor: 'rgba(0, 123, 255, 0.5)', // Background color with transparency for stacking
          borderColor: 'rgba(0, 123, 255, 1)', // Border color
          fill: true, // Enable area fill
        }, {
          label: 'Series 2',
          data: [400, 500, 300, 700, 600],
          backgroundColor: 'rgba(23, 162, 184, 0.5)',
          borderColor: 'rgba(23, 162, 184, 1)',
          fill: true,
        }]
      },
      options: {
        responsive: true, // Responsive design
        plugins: {
          legend: {
            display: true, // Display legend
            position: 'top' // Legend position
          },
          tooltip: {
            mode: 'index', // Tooltip mode
            intersect: false
          }
        },
        scales: {
          x: {
            beginAtZero: true, // Start X-axis at zero
            stacked: true // Enable stacking
          },
          y: {
            beginAtZero: true, // Start Y-axis at zero
            stacked: true // Enable stacking
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
  height: 100vh; /* Make wrapper occupy the full viewport height */
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
  flex: 1; /* Make container occupy the remaining space */
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px;
  box-sizing: border-box;
}

.item {
  flex: 1 1 calc(33.333% - 10px); /* 3-column layout */
  box-sizing: border-box;
  background: #e0e0e0; /* Example background color */
  padding: 10px; /* Example padding */
}
</style>
