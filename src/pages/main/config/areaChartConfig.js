// 引入PapaParse库来解析CSV文件
import Papa from 'papaparse';

// 初始化图表配置
export const areaChartConfig = {
    type: 'line',
    data: {
        labels: [], // X轴标签初始化为空
        datasets: [
            {
                label: 'Series 1', // 第一个数据集的标签
                data: [], // 第一个数据集的数据初始化为空
                backgroundColor: 'rgba(0, 123, 255, 0.5)', // 第一个数据集的背景颜色
                borderColor: 'rgba(0, 123, 255, 1)', // 第一个数据集的边框颜色
                fill: true // 启用填充
            },
            {
                label: 'Series 2', // 第二个数据集的标签
                data: [], // 第二个数据集的数据初始化为空
                backgroundColor: 'rgba(23, 162, 184, 0.5)', // 第二个数据集的背景颜色
                borderColor: 'rgba(23, 162, 184, 1)', // 第二个数据集的边框颜色
                fill: true // 启用填充
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top'
            },
            tooltip: {
                mode: 'index',
                intersect: false
            }
        },
        scales: {
            x: {
                beginAtZero: true,
                stacked: true
            },
            y: {
                beginAtZero: true,
                stacked: true
            }
        }
    }
};

// 函数从CSV文件加载数据
export function loadAreaChartDataFromCSV(csvUrl, chart) {
    Papa.parse(csvUrl, {
        download: true,
        header: true, // 使用CSV的第一行为字段名
        complete: function(results) {
            let data = results.data;

            data = data.filter(row => row.Year);
            // 假设CSV文件有 'Year', 'Series1', 'Series2' 三列
            const labels = data.map(row => row.Year);
            const series1Data = data.map(row => parseFloat(row.Series1) || 0);  // 防止 NaN
            const series2Data = data.map(row => parseFloat(row.Series2) || 0);  // 防止 NaN

            // 确保 chart 对象存在且 datasets 已初始化
            if (chart && chart.data && chart.data.datasets) {
                chart.data.labels = labels;

                // 检查 datasets 数组是否包含足够的条目
                if (chart.data.datasets.length > 0) {
                    chart.data.datasets[0].data = series1Data;
                }
                if (chart.data.datasets.length > 1) {
                    chart.data.datasets[1].data = series2Data;
                }

                // 更新图表
                chart.update();
            } else {
                console.error('Chart object is not properly initialized');
            }
        },
        error: function(err) {
            console.error('Error parsing CSV:', err);
        }
    });
}

