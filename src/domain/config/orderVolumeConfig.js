// Define an array of labels for the X axis, representing months
export const labels = ['January'];

// Define the dataset's value object, representing the statistical values for the box plot
export const boxplotData = [{
    min: 1,      // Minimum value
    q1: 3,       // First quartile
    median: 4,   // Median
    q3: 5,       // Third quartile
    max: 11      // Maximum value
}];

// Define the dataset label
export const boxplotLabel = 'Order Data';

// Define the dataset color
export const boxplotBackgroundColor = 'rgba(0, 123, 255, 0.5)';
export const boxplotBorderColor = 'rgba(0, 123, 255, 1)';
export const boxplotBorderWidth = 1;

// Full configuration object for the chart
export const orderVolumeConfig = {
    type: 'boxplot', // Chart type, using 'boxplot' to create a box plot
    data: {
        labels: labels, // Reference the extracted X axis label array
        datasets: [{
            label: boxplotLabel, // Dataset label
            data: boxplotData, // Box plot data for the dataset
            backgroundColor: boxplotBackgroundColor, // Dataset background color
            borderColor: boxplotBorderColor, // Dataset border color
            borderWidth: boxplotBorderWidth // Dataset border width
        }]
    },
    options: {
        responsive: true, // Enable responsive layout to make the chart adapt to different screen sizes
        scales: {
            y: {
                beginAtZero: true, // Start the Y axis at zero
            }
        }
    }
};
