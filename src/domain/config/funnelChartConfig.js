// 定义标签数组，表示漏斗图的各个阶段
export const labels = ['order_id', 'task_id', 'work_id'];

// 定义数据集的数值数组，表示各个阶段的数据
export const funnelData = [100, 60, 47];

// 定义数据集的标签
export const funnelLabel = 'Order Funnel';

// 定义数据集的颜色数组
export const funnelBackgroundColor = ['#007bff', '#17a2b8', '#28a745'];

// 定义数据集的边框颜色
export const funnelBorderColor = '#fff';

// 定义数据集的边框宽度
export const funnelBorderWidth = 1;

// 定义 X 轴的标题
export const xAxisTitle = 'Percentage';

// 图表的完整配置对象
export const funnelChartConfig = {
    type: 'funnel', // 图表类型，使用 'funnel' 类型创建漏斗图
    data: {
        labels: labels, // 引用提取的标签数组
        datasets: [{
            label: funnelLabel, // 数据集的标签
            data: funnelData, // 数据集的数据
            backgroundColor: funnelBackgroundColor, // 数据集的背景颜色数组
            borderColor: funnelBorderColor, // 数据集的边框颜色
            borderWidth: funnelBorderWidth // 数据集的边框宽度
        }]
    },
    options: {
        responsive: true, // 启用响应式布局，使图表适应不同的屏幕大小
        indexAxis: 'y', // 设置 Y 轴为主要轴，漏斗图垂直显示
        plugins: {
            legend: {
                display: true, // 显示图例
                position: 'top' // 图例显示在顶部
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `${context.label}: ${context.raw} 千`; // 工具提示中显示的文本
                    }
                }
            }
        },
        scales: {
            x: {
                beginAtZero: true, // X 轴从零开始
                title: {
                    display: true, // 显示 X 轴标题
                    text: xAxisTitle // X 轴的标题文本
                }
            }
        }
    }
};
