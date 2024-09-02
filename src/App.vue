<template>
  <div id="app">
    <!-- 使用 Heatmap 组件 -->
    <Heatmap />
  </div>
</template>

<script>
import Heatmap from './components/map.vue';  // 导入 Heatmap 组件

export default {
  name: 'App',
  components: {
    Heatmap  // 注册 Heatmap 组件
  }
};
</script>

<style>
/* 你可以在这里添加全局样式 */
</style>
