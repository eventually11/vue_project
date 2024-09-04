// Define the labels array for the X-axis, representing years
export const labels = ['2020', '2021', '2022', '2023', '2024'];

// Define the data values for the first dataset (order volume data)
export const orderVolumeData = [250, 200, 180, 190, 300];

// Define the data values for the second dataset (average proportion data)
export const proportionData = [0.4, 0.5, 0.6, 0.7, 0.9];

// Define the label for the first dataset (used in the legend and axis title)
export const orderVolumeLabel = 'Total Order Volume';

// Define the label for the second dataset (used in the legend and axis title)
export const proportionLabel = 'Average Proportion';

// Define the color for the first dataset
export const orderVolumeBackgroundColor = 'rgba(66, 104, 113, 0.8)';

// Define the color for the second dataset
export const proportionBackgroundColor = 'rgba(33, 114, 229, 0.8)';
export const proportionBorderColor = 'rgba(33, 114, 229, 0.8)';

// Complete chart configuration object
export const orderTendencyChartConfig = {
    type: 'bar', // Main chart type, bar chart
    data: {
        labels: labels, // Use the defined labels array for the X-axis
        datasets: [
            {
                type: 'bar', // The first dataset type, bar chart
                label: orderVolumeLabel, // Label for the first dataset
                data: orderVolumeData, // Data for the first dataset
                backgroundColor: orderVolumeBackgroundColor, // Background color for the first dataset
                yAxisID: 'y', // Use the primary Y-axis (left side)
            },
            {
                type: 'line', // The second dataset type, line chart
                label: proportionLabel, // Label for the second dataset
                data: proportionData, // Data for the second dataset
                backgroundColor: proportionBackgroundColor, // Background color for the second dataset (affects points on the line chart)
                borderColor: proportionBorderColor, // Border color for the second dataset (affects the line)
                fill: false, // Do not fill the area under the line
                yAxisID: 'y1', // Use the secondary Y-axis (right side)
            }
        ]
    },
    options: {
        responsive: true, // Enable responsive layout to make the chart fit different screen sizes
        scales: {
            y: {
                type: 'linear', // Primary Y-axis type, linear scale
                position: 'left', // Primary Y-axis position, left side
                title: {
                    display: true, // Display the primary Y-axis title
                    text: orderVolumeLabel, // Title text for the primary Y-axis
                },
                ticks: {
                    beginAtZero: true, // Start the Y-axis from zero
                    max: 300, // Set the maximum value for the primary Y-axis to 300
                }
            },
            y1: {
                type: 'linear', // Secondary Y-axis type, linear scale
                position: 'right', // Secondary Y-axis position, right side
                title: {
                    display: true, // Display the secondary Y-axis title
                    text: proportionLabel, // Title text for the secondary Y-axis
                },
                ticks: {
                    beginAtZero: true, // Start the secondary Y-axis from zero
                    max: 1, // Set the maximum value for the secondary Y-axis to 1
                },
                grid: {
                    drawOnChartArea: false, // Do not show the secondary Y-axis gridlines in the chart area
                }
            }
        },
        plugins: {
            legend: {
                position: 'top', // Show the legend at the top of the chart
            }
        }
    }
};
