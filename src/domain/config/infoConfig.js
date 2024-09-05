export const infoConfig = {
    // The update time for the order data, displayed in the "Update Time" section
    updateTime: '2024/08/22',

    // The current total order volume, displayed in the "Order Volume" section
    orderVolume: 1000,

    // Year-to-date order-related data
    ytdOrders: {
        value: 204, // Year-to-date order count
        change: 257.89, // Percentage increase compared to last year
        lastYearValue: 57, // Last year's order count
        isPositive: true, // Indicates the direction of change, determining the color to display
        positiveColor: '#1aab40', // Color for positive (growth) values
        negativeColor: '#ff4d4f' // Color for negative (decline) values
    },

    // Completion rate-related data
    completionRate: {
        value: '99.53%', // The current completion rate
        change: 0.6, // Percentage change compared to last week
        WoWValue: '98.93%', // Last week's completion rate
        isPositive: true, // Indicates the direction of change, determining the color to display
        positiveColor: '#1aab40', // Color for positive (growth) values
        negativeColor: '#ff4d4f' // Color for negative (decline) values
    }
};
