import Papa from 'papaparse';
import { reactive } from 'vue'; // 引入 reactive 函数使 infoConfig 响应式

// 初始化 infoConfig 的默认值，并使其响应式
export const infoConfig = reactive({
    updateTime: '',
    orderVolume: 0,
    ytdOrders: {
        value: 0,
        change: 0,
        lastYearValue: 0,
        isPositive: true,
        positiveColor: '#1aab40',
        negativeColor: '#ff4d4f'
    },
    completionRate: {
        value: '',
        change: 0,
        WoWValue: '',
        isPositive: true,
        positiveColor: '#1aab40',
        negativeColor: '#ff4d4f'
    }
});

// 从CSV文件加载 infoConfig 数据的函数
export function loadInfoConfigFromCSV(csvUrl) {
    Papa.parse(csvUrl, {
        download: true,
        header: true,
        complete: function(results) {
            let data = results.data[0]; // 只取第一行数据

            // 更新 infoConfig 数据，Vue 的 reactive 会自动监听这些变化
            infoConfig.updateTime = data.updateTime;
            infoConfig.orderVolume = parseInt(data.orderVolume, 10);
            infoConfig.ytdOrders.value = parseInt(data.ytdOrdersValue, 10);
            infoConfig.ytdOrders.change = parseFloat(data.ytdOrdersChange);
            infoConfig.ytdOrders.lastYearValue = parseInt(data.ytdOrdersLastYearValue, 10);
            infoConfig.ytdOrders.isPositive = parseFloat(data.ytdOrdersChange) > 0;

            infoConfig.completionRate.value = data.completionRateValue;
            infoConfig.completionRate.change = parseFloat(data.completionRateChange);
            infoConfig.completionRate.WoWValue = data.completionRateWoWValue;
            infoConfig.completionRate.isPositive = parseFloat(data.completionRateChange) > 0;
        },
        error: function(err) {
            console.error('Error parsing CSV:', err);
        }
    });
}
