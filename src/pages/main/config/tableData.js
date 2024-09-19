import Papa from 'papaparse';
import { reactive } from 'vue'; // 使用 reactive 使 tableData 响应式

// 初始化 tableData，数据为空
export const tableData = reactive([]);

// 从 CSV 文件加载表格数据的函数
export function loadTableDataFromCSV(csvUrl) {
    Papa.parse(csvUrl, {
        download: true,
        header: true,
        complete: function(results) {
            const data = results.data;

            // 将 CSV 中的数据映射到 tableData 中
            data.forEach(row => {
                tableData.push({
                    date: row.date,
                    order_volume: row.order_volume,
                    courier_pick_up: row.courier_pick_up,
                    complete_order_volume: row.complete_order_volume,
                    service_mins: row.service_mins
                });
            });
        },
        error: function(err) {
            console.error('Error parsing CSV:', err);
        }
    });
}
