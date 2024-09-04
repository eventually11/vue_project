// 定义 X 轴的标签数组，表示月份
export const labels = ['January', 'February', 'March', 'April', 'May'];

// 定义数据集的数值（每个数据点包含 x, y 坐标和 r 半径）
export const bubbleData = [
    { x: 10, y: 20, r: 15 },
    { x: 15, y: 10, r: 10 },
    { x: 20, y: 30, r: 20 },
    { x: 25, y: 15, r: 12 },
    { x: 30, y: 25, r: 18 }
];

// 定义数据集的标签
export const bubbleLabel = 'Sales Data';

// 定义数据集的颜色
export const bubbleBackgroundColor = 'rgba(0, 123, 255, 0.5)';
export const bubbleBorderColor = 'rgba(0, 123, 255, 1)';
export const bubbleBorderWidth = 1;

// 定义 X 轴的标题
export const xAxisTitle = 'X Axis Label';

// 定义 Y 轴的标题
export const yAxisTitle = 'Y Axis Label';

// 图表的完整配置对象
export const bubbleChartConfig = {
    type: 'bubble', // 图表类型，使用 'bubble' 类型创建气泡图
    data: {
        labels: labels, // 引用提取的 X 轴标签数组
        datasets: [{
            label: bubbleLabel, // 数据集的标签
            data: bubbleData, // 数据集的数据
            backgroundColor: bubbleBackgroundColor, // 数据集的背景颜色
            borderColor: bubbleBorderColor, // 数据集的边框颜色
            borderWidth: bubbleBorderWidth // 数据集的边框宽度
        }]
    },
    options: {
        responsive: true, // 启用响应式布局，使图表适应不同的屏幕大小
        scales: {
            x: {
                beginAtZero: true, // X 轴从零开始
                title: {
                    display: true, // 显示 X 轴标题
                    text: xAxisTitle // X 轴的标题文本
                }
            },
            y: {
                beginAtZero: true, // Y 轴从零开始
                title: {
                    display: true, // 显示 Y 轴标题
                    text: yAxisTitle // Y 轴的标题文本
                }
            }
        }
    }
};
