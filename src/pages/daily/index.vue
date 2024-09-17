<template>
  <div class="container">
    <div class="header">
      <div class="date-info">
        <div>Date</div>
        <div class="date">{{ latestFilteredDate }}</div>
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
        <div class="">
          <el-table
              stripe
              :data="filteredTableData"
              show-summary
              sum-text="Total"
              max-height="760"
          >
            <el-table-column sortable prop="hour" label="Hour"/>
            <el-table-column sortable prop="order" label="Order"/>
            <el-table-column sortable prop="service_fee" label="Service Fee"/>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import * as echarts from 'echarts';
import Papa from 'papaparse'; // Importing PapaParse library
import orderCsv from './csv/order.csv?url'; // Loading CSV file with table data

export default {
  data() {
    return {
      checkedOptions: ['delivered', 'on the way', 'waiting for accept', 'waiting for courier'],
      options: [
        { label: 'delivered' },
        { label: 'on the way' },
        { label: 'waiting for accept' },
        { label: 'waiting for courier' }
      ],
      tableData: [
        { date: '2024-12-01', order_volume: 137, service_mins: 174, status: 'delivered', time: '12:34:56' },
        { date: '2024-12-02', order_volume: 183, service_mins: 203, status: 'on the way', time: '09:45:23' },
        { date: '2024-12-03', order_volume: 90, service_mins: 356, status: 'waiting for accept', time: '14:12:39' },
        { date: '2024-12-04', order_volume: 209, service_mins: 285, status: 'waiting for courier', time: '10:27:54' },
        { date: '2024-12-05', order_volume: 59, service_mins: 314, status: 'delivered', time: '11:11:29' },
        { date: '2024-12-06', order_volume: 240, service_mins: 144, status: 'on the way', time: '13:09:12' },
        { date: '2024-12-07', order_volume: 116, service_mins: 345, status: 'waiting for accept', time: '15:34:48' },
        { date: '2024-12-08', order_volume: 181, service_mins: 292, status: 'waiting for courier', time: '08:43:26' },
        { date: '2024-12-09', order_volume: 144, service_mins: 374, status: 'delivered', time: '16:27:10' },
        { date: '2024-12-10', order_volume: 187, service_mins: 187, status: 'on the way', time: '07:56:31' },
        { date: '2024-12-11', order_volume: 59, service_mins: 183, status: 'waiting for accept', time: '10:12:49' },
        { date: '2024-12-12', order_volume: 204, service_mins: 391, status: 'waiting for courier', time: '12:23:45' },
        { date: '2024-12-13', order_volume: 170, service_mins: 347, status: 'delivered', time: '14:11:05' },
        { date: '2024-12-14', order_volume: 225, service_mins: 133, status: 'on the way', time: '16:50:12' },
        { date: '2024-12-15', order_volume: 60, service_mins: 371, status: 'waiting for accept', time: '13:37:19' },
        { date: '2024-12-16', order_volume: 185, service_mins: 310, status: 'waiting for courier', time: '08:29:31' },
        { date: '2024-12-17', order_volume: 153, service_mins: 177, status: 'delivered', time: '09:45:55' },
        { date: '2024-12-18', order_volume: 221, service_mins: 128, status: 'on the way', time: '11:21:03' },
        { date: '2024-12-19', order_volume: 238, service_mins: 200, status: 'waiting for accept', time: '14:54:16' },
        { date: '2024-12-20', order_volume: 79, service_mins: 217, status: 'waiting for courier', time: '15:12:49' },
        { date: '2024-12-21', order_volume: 185, service_mins: 320, status: 'delivered', time: '07:59:18' },
        { date: '2024-12-22', order_volume: 83, service_mins: 179, status: 'on the way', time: '09:37:11' },
        { date: '2024-12-23', order_volume: 179, service_mins: 323, status: 'waiting for accept', time: '13:42:02' },
        { date: '2024-12-24', order_volume: 217, service_mins: 257, status: 'waiting for courier', time: '10:25:55' },
        { date: '2024-12-25', order_volume: 147, service_mins: 240, status: 'delivered', time: '12:01:44' },
        { date: '2024-12-26', order_volume: 135, service_mins: 254, status: 'on the way', time: '08:33:15' },
        { date: '2024-12-27', order_volume: 242, service_mins: 296, status: 'waiting for accept', time: '14:07:23' },
        { date: '2024-12-28', order_volume: 123, service_mins: 343, status: 'waiting for courier', time: '15:49:10' },
        { date: '2024-12-29', order_volume: 165, service_mins: 174, status: 'delivered', time: '09:18:33' },
        { date: '2024-12-30', order_volume: 127, service_mins: 179, status: 'on the way', time: '07:45:02' },
        { date: '2024-12-31', order_volume: 143, service_mins: 301, status: 'waiting for accept', time: '13:24:18' }
      ],
      colorList: ['#0066ff', '#192f6a', '#ff6600', '#800080'], // Unified color array
      latestFilteredDate: '',  // Used to store the latest date from filteredTableData
    };
  },
  computed: {
    filteredTableData() {
      const hourlyData = Array.from({ length: 24 }, (_, hour) => ({
        hour: hour.toString().padStart(2, '0'),
        order: 0,
        service_fee: 0
      }));

      this.tableData.forEach(item => {
        if (item.time && typeof item.time === 'string') {
          const itemHour = parseInt(item.time.split(':')[0], 10);
          if (!isNaN(itemHour) && this.checkedOptions.includes(item.status)) {
            hourlyData[itemHour].order += 1;
            hourlyData[itemHour].service_fee += item.service_fee;
            hourlyData[itemHour].date = item.date;
          }
        }
      });

      return hourlyData.filter(item => item.order > 0 || item.service_fee > 0);
    },
    isAllSelected() {
      return this.checkedOptions.length === this.options.length;
    },
  }, 
  watch: {
    checkedOptions: {
      handler() {
        this.initChart1();
        this.initChart2();
        this.initChart3();
        this.initChart4();
      },
      deep: true,
    },
    filteredTableData: {
      deep: true,
      immediate: true,
      handler() {
        this.updateLatestFilteredDate();
      }
    }
  },
  methods: {
    updateLatestFilteredDate() {
      const dates = this.filteredTableData.map(item => new Date(item.date).getTime());

      if (dates.length > 0) {
        const latestDateTimestamp = Math.max(...dates);
        const latestDateObj = new Date(latestDateTimestamp);
        this.latestFilteredDate = latestDateObj.toISOString().split('T')[0];
      } else {
        this.latestFilteredDate = '';
      }
    },
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
      const chartDom = document.getElementById('chart1');
      let myChart = echarts.getInstanceByDom(chartDom);

      // 如果已经有图表实例存在，销毁它
      if (myChart) {
        myChart.dispose();
      }

      // 初始化图表
      myChart = echarts.init(chartDom);

      // 汇总tableData中的order_id数量，根据checkedOptions中的状态
      const statusCount = this.checkedOptions.reduce((acc, status) => {
        // 根据状态过滤tableData，然后计算订单ID的数量
        acc[status] = this.tableData.filter(item => item.status === status).length; // 计算每种状态的order_id数量
        return acc;
      }, {});

      // 构建图表数据
      const seriesData = this.checkedOptions.map((status, index) => ({
        value: statusCount[status],
        name: status,
        itemStyle: {color: this.colorList[index]},
      }));

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
          data: this.checkedOptions, // 使用checkedOptions更新图例
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
            data: seriesData, // 使用根据checkedOptions和tableData生成的图表数据
          },
        ],
      };

      myChart.setOption(option);
    }
    ,
    initChart2() {
      const chartDom = document.getElementById('chart2');
      let myChart = echarts.getInstanceByDom(chartDom);

      // 如果已经有图表实例存在，销毁它
      if (myChart) {
        myChart.dispose();
      }

      // 重新初始化图表
      myChart = echarts.init(chartDom);

      // 过滤出根据checkedOptions选中的数据
      const filteredData = this.tableData.filter(item =>
          this.checkedOptions.includes(item.status)
      );

      // 初始化小时分布数组，每个元素代表每个小时的订单数量
      const hourDistribution = Array(24).fill(0);

      // 计算每小时的数据分布，按 order_id 数量统计
      filteredData.forEach(item => {
        const hour = parseInt(item.time.split(':')[0], 10); // 获取小时部分
        hourDistribution[hour] += 1; // 每个小时的订单数量（order_id计数）
      });

      // 判断是否所有小时的订单数量都为 0
      const hasData = hourDistribution.some(value => value > 0);

      // 如果所有小时的订单数量都为 0，打印错误并返回
      if (!hasData) {
        console.error("No data available for the selected status.");
        return;
      }

      // 找到最早有订单的小时和最晚有订单的小时
      const firstHour = hourDistribution.findIndex(value => value > 0);
      const lastHour = hourDistribution.findLastIndex(value => value > 0);


      // 只保留有数据的小时范围的订单数量和对应的小时标签
      const trimmedHourDistribution = hourDistribution.slice(firstHour, lastHour + 1);
      const hourLabels = Array.from({length: 24}, (_, i) => i.toString().padStart(2, '0')).slice(firstHour, lastHour + 1);
      const option = {
        title: {
          text: 'Hourly distribution',
        },
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          type: 'category',
          data: hourLabels, // 动态生成的小时标签
          axisLabel: {
            interval: 0,
          },
        },
        yAxis: {
          type: 'value',
          name: 'Order Count',
        },
        series: [
          {
            name: 'Order Count by Hour',
            type: 'bar',
            data: trimmedHourDistribution, // 使用根据数据动态生成的分布
            itemStyle: {
              color: this.colorList[0], // 自定义颜色
            },
          },
        ],
      };

      myChart.setOption(option);
    },
    initChart3() {
      const chartDom = document.getElementById('chart3');
      let myChart = echarts.getInstanceByDom(chartDom);

      // 如果已经有图表实例存在，销毁它
      if (myChart) {
        myChart.dispose();
      }

      // 重新初始化图表
      myChart = echarts.init(chartDom);

      // 计算每种状态的订单数量
      const statusCount = this.checkedOptions.reduce((acc, status) => {
        acc[status] = this.tableData
            .filter(item => item.status === status)
            .reduce((total, item) => total + 1, 0); // 统计order_id的数量（每个订单作为一个计数）
        return acc;
      }, {});

      // 生成柱状图的数据
      const seriesData = this.checkedOptions.map((status, index) => ({
        value: statusCount[status],
        name: status,
        itemStyle: {color: this.colorList[index]},
      }));

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
          data: this.checkedOptions, // 动态生成图例
        },
        xAxis: {
          type: 'value',
          name: 'Order Count',
          axisLabel: {
            formatter: '{value}',
          },
        },
        yAxis: {
          type: 'category',
          data: this.checkedOptions, // 根据checkedOptions生成Y轴标签
        },
        series: [
          {
            name: 'status',
            type: 'bar',
            data: seriesData, // 使用根据checkedOptions和tableData生成的图表数据
            label: {
              show: true,
              position: 'insideRight',
              formatter: '{c}', // 显示订单计数
            },
          },
        ],
      };

      myChart.setOption(option);
    }
    ,initChart4() {
      const chartDom = document.getElementById('chart4');
      let myChart = echarts.getInstanceByDom(chartDom);

      // 如果已经有图表实例存在，销毁它
      if (myChart) {
        myChart.dispose();
      }

      // 重新初始化图表
      myChart = echarts.init(chartDom);

      // 根据状态筛选 tableData 中的数据
      const filteredData = this.tableData.filter(item => this.checkedOptions.includes(item.status));

      // 按状态分组数据
      const statusGroups = {
        delivered: [],
        'on the way': [],
        'waiting for accept': [],
        'waiting for courier': [],
      };

      // 将选中的数据添加到对应的状态组中
      filteredData.forEach(item => {
        if (statusGroups[item.status]) {
          statusGroups[item.status].push(item.service_fee);
        }
      });

      // 计算箱线图所需的 min, Q1, median, Q3, max
      const calculateBoxPlotData = (data) => {
        if (data.length === 0) return [0, 0, 0, 0, 0];
        data.sort((a, b) => a - b);

        const min = data[0];
        const max = data[data.length - 1];
        const median = data[Math.floor(data.length / 2)];
        const q1 = data[Math.floor(data.length / 4)];
        const q3 = data[Math.floor(3 * data.length / 4)];

        return [min, q1, median, q3, max];
      };

      // 对选中的状态进行箱线图数据计算
      const selectedData = this.checkedOptions.map(status => {
        return calculateBoxPlotData(statusGroups[status]);
      });

      // 更新 X 轴的状态名称
      const xAxisData = this.checkedOptions;
      const colors = this.checkedOptions.map((_, index) => this.colorList[index]);

      const option = {
        title: {
          text: 'Service Fee Comparison',
        },
        tooltip: {
          trigger: 'item',
          axisPointer: {
            type: 'shadow',
          },
        },
        xAxis: {
          type: 'category',
          data: xAxisData,  // 动态更新 X 轴数据
        },
        yAxis: {
          type: 'value',
          min: 0,  // 根据实际数据设置最小值
        },
        series: [
          {
            name: 'service fee',
            type: 'boxplot',
            data: selectedData.map((item, index) => ({
              value: item,
              itemStyle: {
                color: colors[index],
                borderColor: colors[index],
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
        ],
      };

      myChart.setOption(option);
    }
    ,
// 加载 CSV 并解析数据
    loadTableDataFromCSV(csvUrl) {
      Papa.parse(csvUrl, {
        download: true,
        header: true,
        complete: (results) => {
          // 解析 CSV 后的结果
          this.tableData = results.data.map(row => ({
            date: row.date,
            order_id: parseInt(row.order_id, 10), // 将 order_id 转换为整数
            service_fee: parseFloat(row.service_fee), // 将 service_fee 转换为浮点数
            status: row.status,
            time: row.time // 保留时间
          }));
        },
        error: (err) => {
          console.error('Error parsing CSV:', err);
        }
      });
    }

  },
  mounted() {
    this.setChartHeights();
    this.loadTableDataFromCSV(orderCsv)
    window.addEventListener('resize', this.setChartHeights); // 当窗口大小改变时，重新计算高度
  },
  beforeDestroy() {
    const chart1 = echarts.getInstanceByDom(document.getElementById('chart1'));
    if (chart1) chart1.dispose();

    const chart2 = echarts.getInstanceByDom(document.getElementById('chart2'));
    if (chart2) chart2.dispose();

    const chart3 = echarts.getInstanceByDom(document.getElementById('chart3'));
    if (chart3) chart3.dispose();

    const chart4 = echarts.getInstanceByDom(document.getElementById('chart4'));
    if (chart4) chart4.dispose();
  }

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
  background-color: #35494e; /* 默认未选中的颜色 */
  color: white;
  font-weight: 700;
  transition: background-color 0.3s, border-color 0.3s;
}

.button:not(:last-child) {
  border-right: none; /* 去掉中间按钮的右边框 */
}

.button.active {
  background-color: #333333; /* 选中的颜色 */
  border-color: #333333; /* 选中后的边框颜色 */
}

.button:hover {
  background-color: #ebebeb; /* 鼠标悬停时的颜色 */
  color: #333333; /* 悬停时字体颜色 */
}
</style>
