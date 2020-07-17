import {
  paths,
  parkingLot,
  parkingLotContent,
  stationNamesMarker,
  stationNamesText,
  projectBase,
  parkingLotBase,
} from './paths.js'
import AMapLoader from '@amap/amap-jsapi-loader'
import { Chart } from '@antv/g2'
import './static/css/reset.less'
import './static/css/index.less'

AMapLoader.load({
  "key": "cce9058e8e767e6dc4f66e8309bd4e12",
  "version": "2.0",
}).then((AMap) => {
  let map = new AMap.Map('container', {
    zoom: 14,
    center: [113.237192, 22.959006],
    zooms: [13, 20],
  })

  // 项目部驻地添加点标记
  var projectBaseMarker = new AMap.Marker({
    position: projectBase,
    content: `<div class="project-base-star"></div>`,
    anchor: 'center',
  })
  map.add(projectBaseMarker)

  // 项目部驻地文字
  var projectBaseText = new AMap.Text({
    position: projectBase,
    text: '中铁武汉电气化局集团有限公司项目部驻地',
    anchor: 'bottom-center',
    offset: [60, 0],
    style: {
      color: 'red',
      width: '170px',
      textAlign: 'center',
      textOverflow: 'initial',
      wordBreak: 'normal',
      whiteSpace: 'normal',
      fontSize: '14px',
    }
  })
  map.add(projectBaseText);

  // 站点名添加文字
  var spots = [];
  for (var i = 0; i < stationNamesText.length; i += 1) {
    var marker = new AMap.Text({
      position: stationNamesText[i].position,
      text: stationNamesText[i].name,
      anchor: 'bottom-center',
      offset: [-20, -10],
    })
    spots.push(marker);
  }
  map.add(spots);

  // 站点名添加点标记
  let spotMarkers = []
  for (let i = 0; i < stationNamesMarker.length; i++) {
    var marker = new AMap.Marker({
      position: stationNamesMarker[i],
      // style里的样式为换乘站的样式，注意 property name 和 property value
      // 间不能有空格
      content: `<div 
        class="station-name-marker" 
        style=${/(2|3|7)/.test(i) && ("background-color:yellow;")}>
      </div>`,
      anchor: 'center',
    })
    spotMarkers.push(marker)
  }
  map.add(spotMarkers)

  // 停车场
  var polygon = new AMap.Polygon({
    path: parkingLot,
    fillColor: '#fff', // 多边形填充颜色
    borderWeight: 3, // 线条宽度，默认为 1
    strokeColor: 'red', // 线条颜色
    strokeOpacity: 1,
    fillOpacity: 0,
    bubble: true,
  });
  map.add(polygon);

  // 停车场内容
  for (let i = 0; i < parkingLotContent.length; i++) {
    var polyline = new AMap.Polyline({
      path: parkingLotContent[i],
      strokeColor: 'red',
      strokeWeight: 1,
      strokeStyle: "solid",
      strokeOpacity: 1,
    })
    map.add(polyline)
  }

  // 停车场文字
  var parkingLotText = new AMap.Text({
    position: parkingLotBase,
    text: '益丰停车场',
    anchor: 'bottom-center',
    offset: [20, -10],
    style: {
      color: 'red',
      width: '300px',
      textAlign: 'center',
      textOverflow: 'initial',
      wordBreak: 'normal',
      whiteSpace: 'normal',
      fontSize: '14px',
    }
  })
  map.add(parkingLotText);

  // 地铁线路
  var polyline = new AMap.Polyline({
    path: paths,
    strokeColor: 'red',
    strokeWeight: 3,
    strokeStyle: "solid",
    strokeOpacity: 1,
    bubble: true,
  })
  map.add(polyline)

}).catch(e => {
  console.log(e)
})


// .video-container
let videoCounts = 5

for (let i = 0; i < videoCounts; i++) {
  let videoElm = document.createElement('video')
  let sourceElm = document.createElement('source')
  let videoContainerWidth = document.getElementsByClassName('video-container')[0].style.width
  console.log(videoContainerWidth)
  console.log('...123')
  let videoContainerHeight = document.getElementsByClassName('video-container')[0].style.height

  videoElm.width = "200"
  videoElm.height = "140"

  sourceElm.src = "../src/static/images/movie.mp4"
  sourceElm.type = "video/mp4"
  videoElm.append(sourceElm)

  document.getElementsByClassName('video-container')[0].style.backgroundColor = 'beige'
  document.getElementsByClassName('video-container')[0].append(videoElm)
}


// G2
const data = [
  { title: '', actual: 220, target: 250 },
];

// Step 1: 创建 Chart 对象
const chart = new Chart({
  container: 'c1', // 指定图表容器 ID
  width: 300, // 指定图表宽度
  height: 200, // 指定图表高度
});
chart.legend(false) // 不展示图例

const view = chart.createView({
  region: {
    start: {
      x: 0,
      y: 0,
    },
    end: {
      x: 1,
      y: 0.1
    }
  },
  padding: [15, 120, 10]
})
view.data(data)


// Step 2: 载入数据源
// chart.data(data);

// Step 3：创建图形语法，绘制柱状图
// chart.interval().position('genre*sold');

// Step 4: 渲染图表
chart.render();