import Papa from 'papaparse';

// Initialize chart configuration
export const areaChartConfig = {
    type: 'line',
    data: {
        labels: [], 
        datasets: [
            {
                label: 'Series 1', 
                data: [], 
                backgroundColor: 'rgba(0, 123, 255, 0.5)', 
                borderColor: 'rgba(0, 123, 255, 1)', 
                fill: true 
            },
            {
                label: 'Series 2', 
                data: [], 
                backgroundColor: 'rgba(23, 162, 184, 0.5)', 
                borderColor: 'rgba(23, 162, 184, 1)', 
                fill: true 
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

// Function to load data from CSV
export function loadAreaChartDataFromCSV(csvUrl, chart) {
    Papa.parse(csvUrl, {
        download: true,
        header: true, 
        complete: function(results) {
            let data = results.data;

            data = data.filter(row => row.Year);
            const labels = data.map(row => row.Year);
            const series1Data = data.map(row => parseFloat(row.Series1) || 0); 
            const series2Data = data.map(row => parseFloat(row.Series2) || 0);  

            if (chart && chart.data && chart.data.datasets) {
                chart.data.labels = labels;

                if (chart.data.datasets.length > 0) {
                    chart.data.datasets[0].data = series1Data;
                }
                if (chart.data.datasets.length > 1) {
                    chart.data.datasets[1].data = series2Data;
                }

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
