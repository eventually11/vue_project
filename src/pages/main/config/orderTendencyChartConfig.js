import Papa from 'papaparse';

// 定义图表的初始配置对象，数据为空
export const orderTendencyChartConfig = {
    type: 'bar', // 图表的主类型，柱状图
    data: {
        labels: [], // 初始化为空
        datasets: [
            {
                type: 'bar', // 第一个数据集类型，柱状图
                label: 'order_volume 的总和', // 第一个数据集的标签
                data: [], // 数据初始化为空
                backgroundColor: 'rgba(66, 104, 113, 0.8)', // 第一个数据集的背景颜色
                yAxisID: 'y', // 使用主 Y 轴（左侧 Y 轴）
            },
            {
                type: 'line', // 第二个数据集类型，折线图
                label: 'proportion 的平均值', // 第二个数据集的标签
                data: [], // 数据初始化为空
                backgroundColor: 'rgba(33, 114, 229, 0.8)', // 第二个数据集的背景颜色
                borderColor: 'rgba(33, 114, 229, 0.8)', // 第二个数据集的边框颜色
                fill: false, // 不填充折线图下方区域
                yAxisID: 'y1', // 使用副 Y 轴（右侧 Y 轴）
            }
        ]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                type: 'linear',
                position: 'left',
                title: {
                    display: true,
                    text: 'order_volume 的总和',
                },
                ticks: {
                    beginAtZero: true,
                    max: 300,
                }
            },
            y1: {
                type: 'linear',
                position: 'right',
                title: {
                    display: true,
                    text: 'proportion 的平均值',
                },
                ticks: {
                    beginAtZero: true,
                    max: 1,
                },
                grid: {
                    drawOnChartArea: false, // 不在图表区域显示副 Y 轴的网格线
                }
            }
        },
        plugins: {
            legend: {
                position: 'top',
            }
        }
    }
};

// 从 CSV 文件加载数据的函数
export function loadOrderTendencyChartDataFromCSV(csvUrl, chart) {
    Papa.parse(csvUrl, {
        download: true,
        header: true, // 使用 CSV 的第一行为字段名
        complete: function(results) {
            let data = results.data;

            data = data.filter(row => row.year);
            // 假设 CSV 文件包含 'year', 'orderVolume', 'proportion' 三列
            const labels = data.map(row => row.year);
            const orderVolumeData = data.map(row => parseFloat(row.orderVolume) || 0);
            const proportionData = data.map(row => parseFloat(row.proportion) || 0);

            // 确保 chart 对象存在且 datasets 已初始化
            if (chart && chart.data && chart.data.datasets) {
                chart.data.labels = labels;
                chart.data.datasets[0].data = orderVolumeData;
                chart.data.datasets[1].data = proportionData;

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
