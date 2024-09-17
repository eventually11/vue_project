<template>
  <div id="map" ref="map" style="height: 100vh; width: 100%;"></div>
</template>

<script>
import { onMounted, ref } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';
import { mapConfig } from './mapConfig.js';  
import Papa from 'papaparse'; 
import heatDataCsvUrl from './csv/heatData.csv?url';

export default {
  name: 'Heatmap',
  setup() {
    const map = ref(null);

    onMounted(() => {
      map.value = L.map('map').setView(mapConfig.mapCenter, mapConfig.initialZoom);
      L.tileLayer(mapConfig.tileLayerUrl, mapConfig.tileLayerOptions).addTo(map.value);

      Papa.parse(heatDataCsvUrl, {
        download: true,
        header: true,
        complete: function (results) {
          const data = results.data;
          const heatData = data.map(row => [
            parseFloat(row.latitude),
            parseFloat(row.longitude),
            parseFloat(row.weight)
          ]).filter(point => !isNaN(point[0]) && !isNaN(point[1]) && !isNaN(point[2])); 

          if (heatData.length > 0) {
            const heatLayer = L.heatLayer(heatData, mapConfig.heatLayerOptions);
            if (typeof heatLayer.addTo === 'function') {
              heatLayer.addTo(map.value);
            } else {
              console.error('heatLayer is not a valid Leaflet layer');
            }
          } else {
            console.error('No valid heat data to display on the map.');
          }
        },
        error: function (err) {
          console.error('Error parsing CSV:', err);
        }
      });

      const logMapInfo = () => {
        const zoom = map.value.getZoom();
        const center = map.value.getCenter();
        console.log(`Current Zoom Level: ${zoom}`);
        console.log(`Current Center: Latitude ${center.lat}, Longitude ${center.lng}`);
      };

      map.value.on('moveend', logMapInfo);
      map.value.on('zoomend', logMapInfo);
    });

    return {
      map,
    };
  }
};
</script>

<style scoped>
#map {
  height: 100vh;
  width: 100%;
}
</style>
