import AMapLoader from '@amap/amap-jsapi-loader'

AMapLoader.load({
  "key": "cce9058e8e767e6dc4f66e8309bd4e12",
  "version": "2.0",
  "plugins": ['AMap.Scale'],
}).then((AMap) => {
  let map = new AMap.Map('container', {
    zoom: 14,
    center: [113.237192, 22.959006],
    zooms: [13, 20],
  })

  map.addControl(new AMap.Scale())
}).catch(e => {
  console.log(e)
})