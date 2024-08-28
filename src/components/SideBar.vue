<!-- src/components/Sidebar.vue -->
<template>
  <div class="sidebar">
    <ul>
      <li>Global</li>
      <li>Daily Monitoring</li>
      <li>Anomaly Detection</li>
      <li>Courier Performance</li>
      <li>Map Visualization</li>
    </ul>
  </div>
</template>

<style scoped>
.sidebar {
  width: 200px;
  background-color: #2c3e50;
  color: #fff;
  padding: 20px;
  height: 100vh;
}
.sidebar ul {
  list-style: none;
  padding: 0;
}
.sidebar li {
  margin: 20px 0;
  cursor: pointer;
}
.sidebar li:hover {
  text-decoration: underline;
}
</style>