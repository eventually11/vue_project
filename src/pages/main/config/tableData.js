import Papa from 'papaparse';
import { reactive } from 'vue'; // Using reactive to make tableData responsive

// Initialize tableData as empty
export const tableData = reactive([]);

// Function to load table data from a CSV file
export function loadTableDataFromCSV(csvUrl) {
    Papa.parse(csvUrl, {
        download: true,
        header: true,
        complete: function(results) {
            const data = results.data;

            // Map data from CSV to tableData
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
