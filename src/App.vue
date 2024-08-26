<script setup lang="ts">

import { provide } from 'vue'
// for iviewui
import 'view-ui-plus/dist/styles/viewuiplus.css';

// import HelloWorld from './components/HelloWorld.vue'
// import ProgressBar from './components/ProgressBar.vue';
import ProgressBarGroup from './components/ProgressBarGroup.vue';

</script>
<template>
  <div class="test-root-div">
    <h1>Component Testing</h1>
    <Suspense>
      <template #default>
        <div>
          <!-- <ProgressBar :progress="30" :count="30" title="Published" style="width:300px"/> -->
          <ProgressBarGroup title="Group 1" :items="[
            {title: 'Item 1', progress: 30, count: 30, color: 'red'},
            {title: 'Item 2', progress: 50, count: 50},
            {title: 'Item 3', progress: 70, count: 70},
            {title: 'Item 4', progress: 90, count: 90},
          ]"/>

          <ProgressBarGroup title="Group 2" :items="[
            {title: 'Item 1', progress: 30, count: 30, color: 'red'},
            {title: 'Item 2', progress: 50, count: 50},
            {title: 'Item 3', progress: 70, count: 70},
            {title: 'Item 4', progress: 90, count: 90},
          ]"/>

        </div>
      </template>
      <template #fallback>
        <div>Loading...</div>
      </template>
    </Suspense>

  </div>
</template>
<style scoped>
.test-root-div {
  margin: 20px;
  width: 900px;
  background-color: #fff;
}
</style>
