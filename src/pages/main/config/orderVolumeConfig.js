import Papa from 'papaparse';

// 定义图表的初始配置对象，数据为空
export const orderVolumeConfig = {
    type: 'boxplot', // 图表类型，使用 'boxplot' 类型创建箱线图
    data: {
        labels: [], // 初始化为空
        datasets: [{
            label: 'Order Data', // 数据集的标签
            data: [], // 数据初始化为空
            backgroundColor: 'rgba(0, 123, 255, 0.5)', // 数据集的背景颜色
            borderColor: 'rgba(0, 123, 255, 1)', // 数据集的边框颜色
            borderWidth: 1 // 边框宽度
        }]
    },
    options: {
        responsive: true, // 启用响应式布局，使图表适应不同的屏幕大小
        scales: {
            y: {
                beginAtZero: true // Y 轴从零开始
            }
        }
    }
};

// 从 CSV 文件加载箱线图数据的函数
export function loadBoxplotDataFromCSV(csvUrl, chart) {
    Papa.parse(csvUrl, {
        download: true,
        header: true, // 使用 CSV 的第一行为字段名
        complete: function(results) {
            let data = results.data;

            data = data.filter(row => row.month);

            // 假设 CSV 文件包含 'month', 'min', 'q1', 'median', 'q3', 'max' 六列
            const labels = data.map(row => row.month); // 月份作为 X 轴标签
            const boxplotData = data.map(row => ({
                min: parseFloat(row.min),
                q1: parseFloat(row.q1),
                median: parseFloat(row.median),
                q3: parseFloat(row.q3),
                max: parseFloat(row.max)
            }));

            // 确保 chart 对象存在且 datasets 已初始化
            if (chart && chart.data && chart.data.datasets) {
                chart.data.labels = labels; // 更新 X 轴标签
                chart.data.datasets[0].data = boxplotData; // 更新数据集

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
