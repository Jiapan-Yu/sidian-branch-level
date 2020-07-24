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
const $ = require("jquery");

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

  // videoElm.width = "200"
  // videoElm.height = "140"

  sourceElm.src = "../src/static/images/movie.mp4"
  sourceElm.type = "video/mp4"
  videoElm.append(sourceElm)

  document.getElementsByClassName('video-container')[0].append(videoElm)
}


// issue info
let warningCount = 5
let warningText = '预警详情预警详情预警详情预警详情预警详情预警详情'
let issueText = '问题详情问题详情问题详情问题详情问题详情问题详情'

let warningContentDiv = document.createElement('div')
for (let i = 0; i < warningCount; i++) {
  let itemDiv = document.createElement('div')
  itemDiv.style.fontSize = '0.88rem'
  itemDiv.style.marginBottom = '0.5rem'

  let itemP = document.createElement('div')
  let itemPStyle = itemP.style
  itemPStyle.cssText = `
    color: #00A59A;
    font-size: 1rem;
  `

  itemP.textContent = `预警00${i + 1}`

  itemDiv.append(itemP, warningText)
  warningContentDiv.append(itemDiv)
}

let issueContentDiv = document.createElement('div')
for (let i = 0; i < warningCount; i++) {
  let itemDiv = document.createElement('div')
  itemDiv.style.fontSize = '0.88rem'
  itemDiv.style.marginBottom = '0.5rem'

  let itemP = document.createElement('div')
  let itemPStyle = itemP.style
  itemPStyle.cssText = `
    color: #00A59A;
    font-size: 1rem;
  `

  itemP.textContent = `问题00${i + 1}`

  itemDiv.append(itemP, issueText)
  issueContentDiv.append(itemDiv)
}


document.querySelector('.important-work').classList.add('selected')

document.querySelector('.important-work').onclick = e => {
  if (document.querySelector('.important-work').classList.contains('selected')) {
    return
  }

  document.querySelector('.important-work').classList.add('selected')
  document.querySelector('.issue-base').classList.remove('selected')
}

document.querySelector('.issue-base').onclick = e => {
  if (document.querySelector('.issue-base').classList.contains('selected')) {
    return
  }

  document.querySelector('.issue-base').classList.add('selected')
  document.querySelector('.important-work').classList.remove('selected')
}



// G2
// const data = [
//   { title: '', actual: 220, target: 250 },
// ];

// // Step 1: 创建 Chart 对象
// const chart = new Chart({
//   container: 'c1', // 指定图表容器 ID
//   width: 300, // 指定图表宽度
//   height: 200, // 指定图表高度
// });
// chart.legend(false) // 不展示图例

// const view = chart.createView({
//   region: {
//     start: {
//       x: 0,
//       y: 0,
//     },
//     end: {
//       x: 1,
//       y: 0.1
//     }
//   },
//   padding: [15, 120, 10]
// })
// view.data(data)


// // Step 2: 载入数据源
// // chart.data(data);

// // Step 3：创建图形语法，绘制柱状图
// // chart.interval().position('genre*sold');

// // Step 4: 渲染图表
// chart.render();
let fontSize = 16;
window.onload = function () {
  fontSize = document.getElementsByTagName("html")[0].style.fontSize
  fontSize = fontSize.split("px")[0];
  console.log('fontSize****', fontSize)
  // setProjectChart()
  setProject()
  setPersonChart()
  setPersonTable()
}

// 项目进度 条形图
function setProjectChart() {
  const data = [
    { label: '项目进度', type: '项目进度', value: 2800 },
    { label: '实际进度', type: '实际进度', value: 2260 },
  ];
  const chart = new Chart({
    container: 'projectChart',
    autoFit: true,
    height: fontSize * 10,
    width: fontSize * 23
  });

  chart.data(data);

  chart
    .coordinate()
    .transpose()
    .scale(1, -1);

  chart.axis('value', {
    position: 'right',
  });
  chart.axis('label', {
    label: {
      offset: 12,
    },
  });

  chart.tooltip({
    shared: true,
    showMarkers: false,
  });

  chart
    .interval()
    .position('label*value')
    .color('type')
    .adjust([
      {
        type: 'dodge',
        marginRatio: 0,
      },
    ]);

  chart.interaction('active-region');
  chart.legend({
    position: 'top-right',
  });

  chart.render();
}

//设置项目进度数据
function setProject() {
  const data = {
    plan: 86,
    actual: 23
  }
  $(".progress").css({ width: (data.actual / data.plan * 100) + "%" })
  $(".progress-text text").text((data.actual / data.plan * 100).toFixed(2) + "%")
}

// 人员统计 仪表盘
function setPersonChart() {
  function creatData() {
    const data = [];
    const val = 3;
    data.push({ value: +val });
    return data;
  }

  const color = ['#F5222D', '#0086FA', '#FFBF00'];
  const chart = new Chart({
    container: 'personChart',
    autoFit: true,
    height: fontSize * 8,
    padding: [0, 0, 0, 0],
  });
  chart.data(creatData());
  chart.animate(false);

  chart.coordinate('polar', {
    startAngle: -Math.PI,
    endAngle: 0,
    radius: 0.85,
  });
  chart.scale('value', {
    min: 0,
    max: 6,
    tickInterval: 1,
  });

  chart.axis('1', false);
  chart.axis('value', false);
  chart.legend(false);
  chart.tooltip(false);
  chart
    .point()
    .position('value*1')
    .shape('pointer')
    .color('value', (val) => {
      if (val < 2) {
        return color[0];
      } else if (val <= 4) {
        return color[1];
      } else if (val <= 6) {
        return color[2];
      }
    });

  draw(creatData());

  function draw(data) {
    const val = data[0].value;
    const lineWidth = 25;
    chart.annotation().clear(true);
    // 绘制仪表盘背景
    chart.annotation().arc({
      top: false,
      start: [0, 1],
      end: [6, 1],
      style: {
        stroke: '#CBCBCB',
        lineWidth,
        lineDash: null,
      },
    });

    if (val >= 2) {
      chart.annotation().arc({
        start: [0, 1],
        end: [val, 1],
        style: {
          stroke: color[0],
          lineWidth,
          lineDash: null,
        },
      });
    }

    if (val >= 4) {
      chart.annotation().arc({
        start: [2, 1],
        end: [4, 1],
        style: {
          stroke: color[1],
          lineWidth,
          lineDash: null,
        },
      });
    }

    if (val > 4 && val <= 6) {
      chart.annotation().arc({
        start: [4, 1],
        end: [val, 1],
        style: {
          stroke: color[2],
          lineWidth,
          lineDash: null,
        },
      });
    }

    if (val > 2 && val <= 4) {
      chart.annotation().arc({
        start: [2, 1],
        end: [val, 1],
        style: {
          stroke: color[1],
          lineWidth,
          lineDash: null,
        },
      });
    }

    if (val < 2) {
      chart.annotation().arc({
        start: [0, 1],
        end: [val, 1],
        style: {
          stroke: color[0],
          lineWidth,
          lineDash: null,
        },
      });
    }

    // 绘制指标数字
    chart.annotation().text({
      position: ['50%', '90%'],
      content: '打卡人数/应到人数',
      style: {
        fontSize: fontSize,
        fill: '#545454',
        textAlign: 'center',
      },
    });
    chart.annotation().text({
      position: ['50%', '55%'],
      content: `${data[0].value * 10} %`,
      style: {
        fontSize: 2 * fontSize,
        fill: '#545454',
        textAlign: 'center',
      },
      offsetY: 15,
    });
    chart.changeData(data);
  }

}

function setPersonTable(){
  const data = [
    {name:"班组2",plan: 86,actual: 23,workingHours:'3小时'},
    {name:"班组3",plan: 86,actual: 23,workingHours:'3小时'},
    {name:"班组4",plan: 86,actual: 23,workingHours:'3小时'},
  ]
  var tr = ''
  for(var i in data){
    tr+=`<tr><td><text>${i+1}</text><span>${data[i].name}</span></td><td>${data[i].actual}/${data[i].plan}</td><td>${data[i].workingHours}</td></tr>`
  }
  $(".person-table tbody").append(tr)
}