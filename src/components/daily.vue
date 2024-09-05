<template>
  <div class="container">
    <div class="header">
      <div class="date-info">
        <div>Date</div>
        <div class="date">2024-12-31</div>
      </div>
      <div class="button-wrapper">
        <div class="button-group">
          <div
              :class="['button', { active: isAllSelected }]"
              @click="toggleAll"
          >
            Select All
          </div>
          <div
              v-for="item in options"
              :key="item.label"
              :class="['button', { active: checkedOptions.includes(item.label) }]"
              @click="toggleOption(item.label)"
          >
            {{ item.label }}
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-section">
      <div class="charts-section">
        <div class="chart chart1">
          <div id="chart1"></div>
        </div>
        <div class="chart chart2">
          <div id="chart2"></div>
        </div>
        <div class="chart chart3">
          <div id="chart3"></div>
        </div>
        <div class="chart chart4">
          <div id="chart4"></div>
        </div>
      </div>
      <div class="table-section">
        <!-- Table content -->
        <div class="">
          <el-table
              stripe
              :data="tableData"
              show-summary
              sum-text="Total"
              max-height="760"
          >
            <el-table-column sortable prop="date" label="Start date"/>
            <el-table-column sortable prop="order_volume" label="Order Volume"/>
            <el-table-column sortable prop="service_mins" label="Service Minutes"/>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  data() {
    return {
      checkedOptions: [],
      options: [
        {label: 'delivered'},
        {label: 'on the way'},
        {label: 'waiting for accept'},
        {label: 'waiting for courier'},
      ],
      tableData: [
        { date: '2024-12-01', order_volume: 137, service_mins: 174 },
        { date: '2024-12-02', order_volume: 183, service_mins: 203 },
        { date: '2024-12-03', order_volume: 90, service_mins: 356 },
        { date: '2024-12-04', order_volume: 209, service_mins: 285 },
        { date: '2024-12-05', order_volume: 59, service_mins: 314 },
        { date: '2024-12-06', order_volume: 240, service_mins: 144 },
        { date: '2024-12-07', order_volume: 116, service_mins: 345 },
        { date: '2024-12-08', order_volume: 181, service_mins: 292 },
        { date: '2024-12-09', order_volume: 144, service_mins: 374 },
        { date: '2024-12-10', order_volume: 187, service_mins: 187 },
        { date: '2024-12-11', order_volume: 59, service_mins: 183 },
        { date: '2024-12-12', order_volume: 204, service_mins: 391 },
        { date: '2024-12-13', order_volume: 170, service_mins: 347 },
        { date: '2024-12-14', order_volume: 225, service_mins: 133 },
        { date: '2024-12-15', order_volume: 60, service_mins: 371 },
        { date: '2024-12-16', order_volume: 185, service_mins: 310 },
        { date: '2024-12-17', order_volume: 153, service_mins: 177 },
        { date: '2024-12-18', order_volume: 221, service_mins: 128 },
        { date: '2024-12-19', order_volume: 238, service_mins: 200 },
        { date: '2024-12-20', order_volume: 79, service_mins: 217 },
        { date: '2024-12-21', order_volume: 185, service_mins: 320 },
        { date: '2024-12-22', order_volume: 83, service_mins: 179 },
        { date: '2024-12-23', order_volume: 179, service_mins: 323 },
        { date: '2024-12-24', order_volume: 217, service_mins: 257 },
        { date: '2024-12-25', order_volume: 147, service_mins: 240 },
        { date: '2024-12-26', order_volume: 135, service_mins: 254 },
        { date: '2024-12-27', order_volume: 242, service_mins: 296 },
        { date: '2024-12-28', order_volume: 123, service_mins: 343 },
        { date: '2024-12-29', order_volume: 165, service_mins: 174 },
        { date: '2024-12-30', order_volume: 127, service_mins: 179 },
        { date: '2024-12-31', order_volume: 143, service_mins: 301 },
      ],
      colorList: ['#0066ff', '#192f6a', '#ff6600', '#800080'], // Unified color array
    };
  },
  computed: {
    isAllSelected() {
      return this.checkedOptions.length === this.options.length;
    },
  },
  methods: {
    toggleOption(option) {
      const index = this.checkedOptions.indexOf(option);
      if (index > -1) {
        this.checkedOptions.splice(index, 1);
      } else {
        this.checkedOptions.push(option);
      }
    },
    toggleAll() {
      if (this.isAllSelected) {
        this.checkedOptions = [];
      } else {
        this.checkedOptions = this.options.map(option => option.label);
      }
    },
    setChartHeights() {
      setTimeout(() => {
        const chart1Container = document.querySelector('.chart1');
        const chart2Container = document.querySelector('.chart2');
        const chart3Container = document.querySelector('.chart3');
        const chart4Container = document.querySelector('.chart4');
        const chart1 = document.getElementById('chart1');
        const chart2 = document.getElementById('chart2');
        const chart3 = document.getElementById('chart3');
        const chart4 = document.getElementById('chart4');

        if (chart1) {
          const chart1Rect = chart1Container.getBoundingClientRect();
          if (chart1) {
            chart1.style.height = `${chart1Rect.height}px`;
            chart1.style.width = `${chart1Rect.width}px`;
          }
          const chart2Rect = chart2Container.getBoundingClientRect();
          if (chart2) {
            chart2.style.height = `${chart2Rect.height}px`;
            chart2.style.width = `${chart2Rect.width}px`;
          }
          const chart3Rect = chart3Container.getBoundingClientRect();
          if (chart3) {
            chart3.style.height = `${chart3Rect.height}px`;
            chart3.style.width = `${chart3Rect.width}px`;
          }
          const chart4Rect = chart4Container.getBoundingClientRect();
          if (chart4) {
            chart4.style.height = `${chart4Rect.height}px`;
            chart4.style.width = `${chart4Rect.width}px`;
          }
          this.initChart1();
          this.initChart2();
          this.initChart3();
          this.initChart4();
        }
      }, 500);
    },
    initChart1() {
      const myChart = echarts.init(document.getElementById('chart1'));
      const option = {
        title: {
          text: 'Order Proportion',
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          right: '10',
          top: 'center',
          data: ['delivered', 'on the way', 'waiting for accept', 'waiting for courier'],
        },
        series: [
          {
            name: 'status',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: 'outside',
              formatter: '{b}\n{c} ({d}%)',
            },
            labelLine: {
              show: true,
            },
            data: [
              {value: 837, name: 'delivered', itemStyle: {color: this.colorList[0]}},
              {value: 198, name: 'on the way', itemStyle: {color: this.colorList[1]}},
              {value: 182, name: 'waiting for accept', itemStyle: {color: this.colorList[2]}},
              {value: 449, name: 'waiting for courier', itemStyle: {color: this.colorList[3]}},
            ],
          },
        ],
      };

      myChart.setOption(option);
    },
    initChart2() {
      const chartDom = document.getElementById('chart2');
      const myChart = echarts.init(chartDom);

      const option = {
        title: {
          text: 'Hourly distribution',
        },
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          type: 'category',
          data: Array.from({length: 24}, (_, i) => i.toString().padStart(2, '0')),
          axisLabel: {
            interval: 0,
          },
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: 'hour',
            type: 'bar',
            data: [
              200, 150, 100, 50, 70, 90, 130, 200, 150, 100, 50, 70, 90, 130, 100,
              50, 70, 90, 130, 100, 50, 70, 90, 130,
            ],
            itemStyle: {
              color: this.colorList[0],
            },
          },
        ],
      };

      myChart.setOption(option);
    },
    initChart3() {
      const chartDom = document.getElementById('chart3');
      const myChart = echarts.init(chartDom);

      const option = {
        title: {
          text: 'Order volume',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        legend: {
          top: 40,
          left: 'center',
          data: ['delivered', 'on the way', 'waiting for accept', 'waiting for courier'],
        },
        xAxis: {
          type: 'value',
          name: 'order_id count',
          axisLabel: {
            formatter: '{value}',
          },
        },
        yAxis: {
          type: 'category',
          data: ['delivered', 'on the way', 'waiting for accept', 'waiting for courier'],
        },
        series: [
          {
            name: 'status',
            type: 'bar',
            data: [
              {value: 837, name: 'delivered', itemStyle: {color: this.colorList[0]}},
              {value: 198, name: 'on the way', itemStyle: {color: this.colorList[1]}},
              {value: 182, name: 'waiting for accept', itemStyle: {color: this.colorList[2]}},
              {value: 449, name: 'waiting for courier', itemStyle: {color: this.colorList[3]}},
            ],
            label: {
              show: true,
              position: 'insideRight',
              formatter: '{c}',
            },
          },
        ],
      };

      myChart.setOption(option);
    },
    initChart4() {
      const chartDom = document.getElementById('chart4');
      const myChart = echarts.init(chartDom);

      const data = [
        [5, 10, 15, 25, 35],   // delivered: [min, Q1, median, Q3, max]
        [10, 15, 20, 25, 30],  // on the way
        [0, 10, 15, 20, 25],   // waiting for accept
        [5, 15, 20, 30, 35],   // waiting for courier
      ];

      const option = {
        title: {
          text: 'Service fee comparison',
        },
        tooltip: {
          trigger: 'item',
          axisPointer: {
            type: 'shadow',
          },
        },
        xAxis: {
          type: 'category',
          data: ['delivered', 'on the way', 'waiting for accept', 'waiting for courier'],
        },
        yAxis: {
          type: 'value',
          min: -20,
          max: 40,
        },
        series: [
          {
            name: 'service fee',
            type: 'boxplot',
            data: data.map((item, index) => ({
              value: item,
              itemStyle: {
                color: this.colorList[index],
                borderColor: this.colorList[index],
              },
            })),
            tooltip: {
              formatter: function (param) {
                return [
                  'Status: ' + param.name,
                  'Upper: ' + param.data.value[4],
                  'Q3: ' + param.data.value[3],
                  'Median: ' + param.data.value[2],
                  'Q1: ' + param.data.value[1],
                  'Lower: ' + param.data.value[0],
                ].join('<br/>');
              },
            },
          },
          {
            name: 'outlier',
            type: 'scatter',
            data: [
              // Outliers for each category
              [0, 38],  // delivered outlier
              [1, 26],  // on the way outlier
              [2, 32],  // waiting for accept outlier
              [3, 38],  // waiting for courier outlier
            ],
            itemStyle: {
              color: '#000000',
            },
          },
        ],
      };

      myChart.setOption(option);
    },
  },
  mounted() {
    this.setChartHeights();
    window.addEventListener('resize', this.setChartHeights); // Recalculate heights when window size changes
  },
};
</script>

<style scoped>

.bottom-section {
  height: 85vh;
  display: flex;
  flex: 1;
}

.charts-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 10px;
  flex: 3;
  padding: 10px;
}

.chart {
  flex: 1 1 calc(50% - 20px);
  box-sizing: border-box;
  border-radius: 8px;
  min-width: 300px;
}


.table-section {
  display: flex;
  padding: 10px;
  border-radius: 8px;
}

.table-content {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}

.container {
  height: 100vh;
  width: 100vw;
}

.header {
  height: 15vh;
  display: flex;
}

.date-info {
  width: 23vw;
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  align-items: center;
  color: #426871;
  font-size: 27px;
  font-weight: 600;
}

.date {
  font-size: 50px;
  font-weight: 500;
}

.button-wrapper {
  padding: 10px;
  flex: 1;
  background: #426871;
}

.button-group {
  display: flex;
  align-items: center;
  height: 100%;
}

.button {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80%;
  padding: 10px 20px;
  margin: 5px;
  font-size: 20px;
  text-align: center;
  cursor: pointer;
  background-color: #35494e; /* Default unselected color */
  color: white;
  font-weight: 700;
  transition: background-color 0.3s, border-color 0.3s;
}

.button:not(:last-child) {
  border-right: none; /* Remove right border for middle buttons */
}

.button.active {
  background-color: #333333; /* Selected color */
  border-color: #333333; /* Border color for selected state */
}

.button:hover {
  background-color: #ebebeb; /* Color on hover */
  color: #333333; /* Font color on hover */
}
</style>
