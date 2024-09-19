// 引入PapaParse库来解析CSV文件
import Papa from 'papaparse';

// 初始化漏斗图配置
export const funnelChartConfig = {
    type: 'funnel', // 使用 'funnel' 类型创建漏斗图
    data: {
        labels: [], // 标签初始化为空
        datasets: [{
            label: 'Order Funnel', // 数据集的标签
            data: [], // 数据初始化为空
            backgroundColor: ['#007bff', '#17a2b8', '#28a745'], // 数据集的背景颜色数组
            borderColor: '#fff', // 数据集的边框颜色
            borderWidth: 1 // 边框宽度
        }]
    },
    options: {
        responsive: true, // 启用响应式布局
        indexAxis: 'y', // 设置 Y 轴为主要轴，使漏斗图垂直显示
        plugins: {
            legend: {
                display: true, // 显示图例
                position: 'top' // 图例显示在顶部
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `${context.label}: ${context.raw} 千`; // 自定义工具提示的文本
                    }
                }
            }
        },
        scales: {
            x: {
                beginAtZero: true, // X 轴从零开始
                title: {
                    display: true, // 显示 X 轴标题
                    text: 'Percentage' // X 轴的标题文本
                }
            }
        }
    }
};

// 从CSV文件加载漏斗图数据的函数
export function loadFunnelChartDataFromCSV(csvUrl, chart) {
    Papa.parse(csvUrl, {
        download: true,
        header: true, // 使用CSV的第一行为字段名
        complete: function(results) {

            let data = results.data;

            data = data.filter(row => row.stage);

            // 假设CSV文件包含 'stage', 'value' 两列，分别表示漏斗的阶段和对应的数据
            const labels = data.map(row => row.stage);
            const funnelData = data.map(row => parseFloat(row.value) || 0); // 防止 NaN

            // 确保 chart 对象存在且 datasets 已初始化
            if (chart && chart.data && chart.data.datasets) {
                chart.data.labels = labels;
                chart.data.datasets[0].data = funnelData;

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
