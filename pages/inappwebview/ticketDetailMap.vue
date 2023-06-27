<template lang="pug">
.ticket-detail-map
  .echarts(ref='echartsEl')
</template>
<script setup>
const { $eChart } = useNuxtApp();
import "echarts/extension/bmap/bmap";
import { shallowRef } from "vue";

let echartsInstance;
let echartsEl = ref();

onMounted(() => {
  echartsInstance = $eChart.init(echartsEl.value);
  initECharts();
});

function initECharts() {
  function getData(point) {
    var A = point[0],
      B = point[1],
      n = 30,
      arc = Math.PI / 4,
      points = [];

    function getCircleRadio(A, B, arc) {
      return (
        Math.sqrt(Math.pow(B[0] - A[0], 2) + Math.pow(B[1] - A[1], 2)) /
        (2 * Math.sin(arc / 2))
      );
    }

    function getCircleOrigin(A, B, r) {
      var x0 = 0,
        y0 = 0;
      if (A[0] == B[0]) {
        x0 = A[0] - Math.sqrt(r * r - Math.pow(B[1] - A[1] / 2, 2));
        y0 = (A[1] + B[1]) / 2;
      } else if (A[1] == B[1]) {
        x0 = (A[0] + B[0]) / 2;
        y0 = A[1] + Math.sqrt(r * r - Math.pow(B[0] - A[0] / 2, 2));
      } else {
        var M = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2],
          k = (A[0] - B[0]) / (B[1] - A[1]),
          a = 1.0 + k * k,
          b = -2 * M[0] - k * k * (A[0] + B[0]),
          c =
            M[0] * M[0] +
            (k * k * (A[0] + B[0]) * (A[0] + B[0])) / 4.0 -
            (r * r -
              ((M[0] - A[0]) * (M[0] - A[0]) + (M[1] - A[1]) * (M[1] - A[1])));
        x0 = (-1.0 * b - Math.sqrt(b * b - 4 * a * c)) / (2 * a);
        y0 = k * x0 - k * M[0] + M[1];
      }
      return [x0, y0];
    }
    var R = getCircleRadio(A, B, arc);
    var Ori = getCircleOrigin(A, B, R);
    for (var i = 0; i < n; i++) {
      var angl = (arc * i) / n,
        arc0 = Math.asin((A[0] - Ori[0]) / R);
      var x = Ori[0] + Math.sin(arc0 + angl) * R;
      var y = Ori[1] + Math.cos(arc0 + angl) * R;
      points.push([x, y]);
    }
    return points;
  }

  var busLines = [
    {
      coords: getData([
        [116.4383, 40.1471],
        [120.5383, 23.1471],
      ]),
      lineStyle: {
        normal: {
          color: $eChart.color.modifyHSL("#5A94DF", Math.round(350)),
        },
      },
    },
    {
      coords: getData([
        [116.4383, 40.1471],
        [114.5383, 25.1471],
      ]),
      lineStyle: {
        normal: {
          color: $eChart.color.modifyHSL("#5A94DF", Math.round(160)),
        },
      },
    },
    {
      coords: getData([
        [116.4383, 40.1471],
        [118.5383, 33.1471],
      ]),
      lineStyle: {
        normal: {
          color: $eChart.color.modifyHSL("#5A94DF", Math.round(140)),
        },
      },
    },
    {
      coords: getData([
        [116.4383, 40.1471],
        [123.5383, 28.1471],
      ]),
      lineStyle: {
        normal: {
          color: $eChart.color.modifyHSL("#5A94DF", Math.round(250)),
        },
      },
    },
  ];

  echartsInstance.setOption({
    bmap: {
      center: [104.114129, 37.550339],
      zoom: 7,
      roam: true,
      mapStyle: {
        styleJson: [
          {
            featureType: "water",
            elementType: "all",
            stylers: {
              color: "#d1d1d1",
            },
          },
          {
            featureType: "land",
            elementType: "all",
            stylers: {
              color: "#f3f3f3",
            },
          },
          {
            featureType: "railway",
            elementType: "all",
            stylers: {
              visibility: "off",
            },
          },
          {
            featureType: "highway",
            elementType: "all",
            stylers: {
              color: "#fdfdfd",
            },
          },
          {
            featureType: "highway",
            elementType: "labels",
            stylers: {
              visibility: "off",
            },
          },
          {
            featureType: "arterial",
            elementType: "geometry",
            stylers: {
              color: "#fefefe",
            },
          },
          {
            featureType: "arterial",
            elementType: "geometry.fill",
            stylers: {
              color: "#fefefe",
            },
          },
          {
            featureType: "poi",
            elementType: "all",
            stylers: {
              visibility: "off",
            },
          },
          {
            featureType: "green",
            elementType: "all",
            stylers: {
              visibility: "off",
            },
          },
          {
            featureType: "subway",
            elementType: "all",
            stylers: {
              visibility: "off",
            },
          },
          {
            featureType: "manmade",
            elementType: "all",
            stylers: {
              color: "#d1d1d1",
            },
          },
          {
            featureType: "local",
            elementType: "all",
            stylers: {
              color: "#d1d1d1",
            },
          },
          {
            featureType: "arterial",
            elementType: "labels",
            stylers: {
              visibility: "off",
            },
          },
          {
            featureType: "boundary",
            elementType: "all",
            stylers: {
              color: "#fefefe",
            },
          },
          {
            featureType: "building",
            elementType: "all",
            stylers: {
              color: "#d1d1d1",
            },
          },
          {
            featureType: "label",
            elementType: "labels.text.fill",
            stylers: {
              color: "#999999",
            },
          },
        ],
      },
    },
    series: [
      {
        type: "lines",
        coordinateSystem: "bmap",
        polyline: true,
        data: busLines,
        silent: true,
        lineStyle: {
          color: "rgb(200, 35, 45)",
          opacity: 0.2,
          width: 1,
        },
        progressiveThreshold: 500,
        progressive: 200,
      },
    ],
  });
}
</script>
<style lang="scss" scoped>
.ticket-detail-map {
}
</style>
