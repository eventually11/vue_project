export const mapConfig = {
  // 地图的初始中心点，指定地图初次加载时显示的经纬度位置
  mapCenter: [-12.4083, 130.9032], // [纬度, 经度]

  // 地图的初始缩放级别，决定地图初次加载时的缩放程度
  initialZoom: 13, // 缩放级别，值越大地图越放大，越详细

  // 瓦片图层的URL模板，用于加载地图瓦片
  tileLayerUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",

  // 瓦片图层的配置选项
  tileLayerOptions: {
    maxZoom: 25,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  },

  // 热力图层的配置选项
  heatLayerOptions: {
    radius: 25,   // 热力点的半径
    blur: 15,     // 热力点的模糊程度
    maxZoom: 17   // 热力图层的最大缩放级别
  }
};
