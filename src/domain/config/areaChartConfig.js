// Import PapaParse library to parse CSV files
import Papa from 'papaparse';

// Initialize the chart configuration
export const areaChartConfig = {
    type: 'line',
    data: {
        labels: [], // X-axis labels initialized as empty
        datasets: [
            {
                label: 'Series 1', // Label for the first dataset
                data: [], // Data for the first dataset initialized as empty
                backgroundColor: 'rgba(0, 123, 255, 0.5)', // Background color for the first dataset
                borderColor: 'rgba(0, 123, 255, 1)', // Border color for the first dataset
                fill: true // Enable fill
            },
            {
                label: 'Series 2', // Label for the second dataset
                data: [], // Data for the second dataset initialized as empty
                backgroundColor: 'rgba(23, 162, 184, 0.5)', // Background color for the second dataset
                borderColor: 'rgba(23, 162, 184, 1)', // Border color for the second dataset
                fill: true // Enable fill
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top'
            },
            tooltip: {
                mode: 'index',
                intersect: false
            }
        },
        scales: {
            x: {
                beginAtZero: true,
                stacked: true
            },
            y: {
                beginAtZero: true,
                stacked: true
            }
        }
    }
};

// Function to load data from CSV file
export function loadAreaChartDataFromCSV(csvUrl, chart) {
    Papa.parse(csvUrl, {
        download: true,
        header: true, // Use the first row of the CSV as the field names
        complete: function(results) {
            let data = results.data;

            data = data.filter(row => row.Year);
            // Assuming the CSV file has 'Year', 'Series1', 'Series2' columns
            const labels = data.map(row => row.Year);
            const series1Data = data.map(row => parseFloat(row.Series1) || 0);  // Prevent NaN values
            const series2Data = data.map(row => parseFloat(row.Series2) || 0);  // Prevent NaN values

            // Ensure the chart object exists and datasets are initialized
            if (chart && chart.data && chart.data.datasets) {
                chart.data.labels = labels;

                // Check if the datasets array contains enough entries
                if (chart.data.datasets.length > 0) {
                    console.log(chart.data)
                    chart.data.datasets[0].data = series1Data;
                }
                if (chart.data.datasets.length > 1) {
                    chart.data.datasets[1].data = series2Data;
                }

                // Update the chart
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
