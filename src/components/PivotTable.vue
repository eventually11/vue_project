<!-- src/components/PivotTable.vue -->
<script setup lang="ts">

const props = defineProps<{
  data: Array<{ date: string, orderVolume: number, pickUp: number, complete: number, serviceMin: number }>
}>();

</script>

<template>
  <div class="pivot-table">
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Order Volume</th>
          <th>Pick Up</th>
          <th>Complete Order Volume</th>
          <th>Service Min</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in props.data" :key="row.date">
          <td>{{ row.date }}</td>
          <td>{{ row.orderVolume }}</td>
          <td>{{ row.pickUp }}</td>
          <td>{{ row.complete }}</td>
          <td>{{ row.serviceMin }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.pivot-table table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.pivot-table th, .pivot-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

.pivot-table th {
  background-color: #f2f2f2;
}
</style>
