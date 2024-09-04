export const infoConfig = {
    // 订单数据的更新时间，显示在 "Update Time" 部分
    updateTime: '2024/08/22',

    // 当前的订单总量，显示在 "Order Volume" 部分
    orderVolume: 1000,

    // 年初至今的订单数量相关数据
    ytdOrders: {
        value: 204, // 年初至今的订单数量
        change: 257.89, // 相比去年的增长百分比
        lastYearValue: 57, // 去年的订单数量
        isPositive: true, // 表示涨跌状态，决定显示的颜色
        positiveColor: '#1aab40', // 正值时（增长）的颜色
        negativeColor: '#ff4d4f' // 负值时（下降）的颜色
    },

    // 完成率相关数据
    completionRate: {
        value: '99.53%', // 当前的完成率
        change: 0.6, // 相比上周的变化百分比
        WoWValue: '98.93%', // 上周的完成率
        isPositive: true, // 表示涨跌状态，决定显示的颜色
        positiveColor: '#1aab40', // 正值时（增长）的颜色
        negativeColor: '#ff4d4f' // 负值时（下降）的颜色
    }
};
