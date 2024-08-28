<!-- src/components/CompletionRate.vue -->
<template>
    <div class="completion-rate">
      <h2>Completion Rate</h2>
      <p>99.53% <span>(+0.68%)</span></p>
    </div>
  </template>
  
  <style scoped>
  .completion-rate {
    text-align: center;
    background-color: #ecf0f1;
    padding: 10px;
    border-radius: 5px;
    margin: 10px;
  }
  h2 {
    margin: 0;
  }
  p {
    font-size: 24px;
    font-weight: bold;
  }
  span {
    color: green;
    font-size: 14px;
  }
  </style>
  