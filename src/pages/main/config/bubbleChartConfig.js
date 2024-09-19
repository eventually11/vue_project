// 引入PapaParse库来解析CSV文件
import Papa from 'papaparse';

// 初始化气泡图配置
export const bubbleChartConfig = {
    type: 'bubble', // 图表类型为 'bubble'
    data: {
        labels: [], // X轴标签初始化为空
        datasets: [{
            label: 'Sales Data', // 数据集的标签
            data: [], // 数据初始化为空
            backgroundColor: 'rgba(0, 123, 255, 0.5)', // 数据集的背景颜色
            borderColor: 'rgba(0, 123, 255, 1)', // 数据集的边框颜色
            borderWidth: 1 // 边框宽度
        }]
    },
    options: {
        responsive: true, // 启用响应式布局
        scales: {
            x: {
                beginAtZero: true, // X轴从零开始
                title: {
                    display: true, // 显示X轴标题
                    text: 'X Axis Label' // X轴标题
                }
            },
            y: {
                beginAtZero: true, // Y轴从零开始
                title: {
                    display: true, // 显示Y轴标题
                    text: 'Y Axis Label' // Y轴标题
                }
            }
        }
    }
};

// 从CSV文件加载气泡图数据的函数
export function loadBubbleChartDataFromCSV(csvUrl, chart) {
    Papa.parse(csvUrl, {
        download: true,
        header: true, // 使用CSV的第一行为字段名
        complete: function(results) {
            let data = results.data;

            // 假设CSV文件包含 'x', 'y', 'r' 三列
            const bubbleData = data.map(row => ({
                x: parseFloat(row.x) || 0,  // X轴数据
                y: parseFloat(row.y) || 0,  // Y轴数据
                r: parseFloat(row.r) || 0   // 气泡的半径
            }));

            // 确保 chart 对象存在且 datasets 已初始化
            if (chart && chart.data && chart.data.datasets) {
                chart.data.datasets[0].data = bubbleData;

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
