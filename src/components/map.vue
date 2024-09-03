<template>
  <div id="map" ref="map" style="height: 100vh; width: 100%;"></div>
</template>

<script>
import { onMounted, ref } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';
import { mapConfig } from '..//domain/mapConfig.js';  // 导入 TypeScript 配置

export default {
  name: 'Heatmap',
  setup() {
    const map = ref(null);

    onMounted(() => {
      // 使用导入的配置初始化地图
      map.value = L.map('map').setView(mapConfig.mapCenter, mapConfig.initialZoom);

      // 添加 OpenStreetMap 图层
      L.tileLayer(mapConfig.tileLayerUrl, mapConfig.tileLayerOptions).addTo(map.value);

      // 添加热力图层
      L.heatLayer(mapConfig.heatData, mapConfig.heatLayerOptions).addTo(map.value);

      // 打印当前的层级和中心点经纬度
      const logMapInfo = () => {
        const zoom = map.value.getZoom();
        const center = map.value.getCenter();
        console.log(`Current Zoom Level: ${zoom}`);
        console.log(`Current Center: Latitude ${center.lat}, Longitude ${center.lng}`);
      };

      // 初次加载时打印一次
      logMapInfo();

      // 在地图视图变化（缩放或移动）时打印信息
      map.value.on('moveend', logMapInfo);
      map.value.on('zoomend', logMapInfo);
    });

    return {
      map,
    };
  },
};
</script>

<style scoped>
#map {
  height: 100vh;
  width: 100%;
}
</style>
