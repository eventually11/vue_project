// 定义 X 轴的标签数组，表示月份
export const labels = ['January'];

// 定义数据集的数值对象，表示箱线图的各个统计值
export const boxplotData = [{
    min: 1,      // 最小值
    q1: 3,       // 第一四分位数
    median: 4,   // 中位数
    q3: 5,       // 第三四分位数
    max: 11      // 最大值
}];

// 定义数据集的标签
export const boxplotLabel = 'Order Data';

// 定义数据集的颜色
export const boxplotBackgroundColor = 'rgba(0, 123, 255, 0.5)';
export const boxplotBorderColor = 'rgba(0, 123, 255, 1)';
export const boxplotBorderWidth = 1;

// 图表的完整配置对象
export const orderVolumeConfig = {
    type: 'boxplot', // 图表类型，使用 'boxplot' 类型创建箱线图
    data: {
        labels: labels, // 引用提取的 X 轴标签数组
        datasets: [{
            label: boxplotLabel, // 数据集的标签
            data: boxplotData, // 数据集的箱线图数据
            backgroundColor: boxplotBackgroundColor, // 数据集的背景颜色
            borderColor: boxplotBorderColor, // 数据集的边框颜色
            borderWidth: boxplotBorderWidth // 数据集的边框宽度
        }]
    },
    options: {
        responsive: true, // 启用响应式布局，使图表适应不同的屏幕大小
        scales: {
            y: {
                beginAtZero: true, // Y 轴从零开始
            }
        }
    }
};
