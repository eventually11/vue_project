// Define an array of labels for the X axis, representing months
export const labels = ['January', 'February', 'March', 'April', 'May'];

// Define the dataset values (each data point contains x, y coordinates and r radius)
export const bubbleData = [
    { x: 10, y: 20, r: 15 },
    { x: 15, y: 10, r: 10 },
    { x: 20, y: 30, r: 20 },
    { x: 25, y: 15, r: 12 },
    { x: 30, y: 25, r: 18 }
];

// Define the dataset label
export const bubbleLabel = 'Sales Data';

// Define the dataset color
export const bubbleBackgroundColor = 'rgba(0, 123, 255, 0.5)';
export const bubbleBorderColor = 'rgba(0, 123, 255, 1)';
export const bubbleBorderWidth = 1;

// Define the X axis title
export const xAxisTitle = 'X Axis Label';

// Define the Y axis title
export const yAxisTitle = 'Y Axis Label';

// Full configuration object for the chart
export const bubbleChartConfig = {
    type: 'bubble', // Chart type, using 'bubble' to create a bubble chart
    data: {
        labels: labels, // Reference the extracted X axis label array
        datasets: [{
            label: bubbleLabel, // Dataset label
            data: bubbleData, // Dataset data
            backgroundColor: bubbleBackgroundColor, // Dataset background color
            borderColor: bubbleBorderColor, // Dataset border color
            borderWidth: bubbleBorderWidth // Dataset border width
        }]
    },
    options: {
        responsive: true, // Enable responsive layout to make the chart adapt to different screen sizes
        scales: {
            x: {
                beginAtZero: true, // Start X axis at zero
                title: {
                    display: true, // Display the X axis title
                    text: xAxisTitle // X axis title text
                }
            },
            y: {
                beginAtZero: true, // Start Y axis at zero
                title: {
                    display: true, // Display the Y axis title
                    text: yAxisTitle // Y axis title text
                }
            }
        }
    }
};
