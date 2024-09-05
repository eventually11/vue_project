// Define an array of labels representing the stages of the funnel chart
export const labels = ['order_id', 'task_id', 'work_id'];

// Define the dataset's values array, representing the data for each stage
export const funnelData = [100, 60, 47];

// Define the dataset label
export const funnelLabel = 'Order Funnel';

// Define the dataset's array of background colors
export const funnelBackgroundColor = ['#007bff', '#17a2b8', '#28a745'];

// Define the dataset's border color
export const funnelBorderColor = '#fff';

// Define the dataset's border width
export const funnelBorderWidth = 1;

// Define the X axis title
export const xAxisTitle = 'Percentage';

// Full configuration object for the chart
export const funnelChartConfig = {
    type: 'funnel', // Chart type, using 'funnel' to create a funnel chart
    data: {
        labels: labels, // Reference the extracted label array
        datasets: [{
            label: funnelLabel, // Dataset label
            data: funnelData, // Dataset data
            backgroundColor: funnelBackgroundColor, // Array of background colors for the dataset
            borderColor: funnelBorderColor, // Dataset border color
            borderWidth: funnelBorderWidth // Dataset border width
        }]
    },
    options: {
        responsive: true, // Enable responsive layout to make the chart adapt to different screen sizes
        indexAxis: 'y', // Set the Y axis as the primary axis, displaying the funnel vertically
        plugins: {
            legend: {
                display: true, // Display the legend
                position: 'top' // Legend position at the top
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `${context.label}: ${context.raw}k`; // Text displayed in the tooltip
                    }
                }
            }
        },
        scales: {
            x: {
                beginAtZero: true, // Start X axis at zero
                title: {
                    display: true, // Display the X axis title
                    text: xAxisTitle // X axis title text
                }
            }
        }
    }
};
