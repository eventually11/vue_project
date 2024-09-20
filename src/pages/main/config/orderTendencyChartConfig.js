import Papa from 'papaparse';

// Initial configuration object for the chart, with data starting empty
export const orderTendencyChartConfig = {
    type: 'bar',
    data: {
        labels: [], // Initialize empty labels
        datasets: [
            {
                type: 'bar',
                label: 'Sum of order_volume',
                data: [], // Initialize empty dataset
                backgroundColor: 'rgba(66, 104, 113, 0.8)',
                yAxisID: 'y', // Left Y-axis
            },
            {
                type: 'line',
                label: 'Average of proportion',
                data: [], // Initialize empty dataset
                backgroundColor: 'rgba(33, 114, 229, 0.8)',
                borderColor: 'rgba(33, 114, 229, 0.8)',
                fill: false, // No area fill for line chart
                yAxisID: 'y1', // Right Y-axis
            }
        ]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                type: 'linear',
                position: 'left',
                title: {
                    display: true,
                    text: 'Sum of order_volume',
                },
                ticks: {
                    beginAtZero: true,
                    max: 300,
                }
            },
            y1: {
                type: 'linear',
                position: 'right',
                title: {
                    display: true,
                    text: 'Average of proportion',
                },
                ticks: {
                    beginAtZero: true,
                    max: 1,
                },
                grid: {
                    drawOnChartArea: false, // No grid lines on right Y-axis
                }
            }
        },
        plugins: {
            legend: {
                position: 'top',
            }
        }
    }
};

// Function to load chart data from a CSV file
export function loadOrderTendencyChartDataFromCSV(csvUrl, chart) {
    Papa.parse(csvUrl, {
        download: true,
        header: true,
        complete: function(results) {
            let data = results.data;

            data = data.filter(row => row.year);
            const labels = data.map(row => row.year);
            const orderVolumeData = data.map(row => parseFloat(row.orderVolume) || 0);
            const proportionData = data.map(row => parseFloat(row.proportion) || 0);

            if (chart && chart.data && chart.data.datasets) {
                chart.data.labels = labels;
                chart.data.datasets[0].data = orderVolumeData;
                chart.data.datasets[1].data = proportionData;

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
