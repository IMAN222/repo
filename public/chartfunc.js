//const moment = require("moment");
//const Chart = require("chart");

//localization (must be at the beginning of the script)
moment.locale("de");

// generate testDay1 and testDay2
let testDay = moment("2019/04/04");

createDayGraph("myChart", generateDayTestData(testDay));

// Initialize a graph, configure for a day chart and populate with two datasets
function createDayGraph(_elementId, _data) {  ///////// read "testDay" out of the provided data or a parameter
  //Initialize Graph
  let testDay1 = _data[0]; // the first dataset (temp inside)
  let testDay2 = _data[1]; // the second dataset (temp outside)

  // configure for a day chart
  
  //populate with two datasets
  //generate the labels for the day to be displayed (in 2h steps)
  let dayLabels = getDayLabels("2019/04/04");

  // chart
  //Chart.defaults.line.datasets.showLine = true;
  var ctx = document.getElementById(_elementId).getContext("2d");
  var chart = new Chart(ctx, {
    type: "line",

    // The data for our dataset
    data: {
      labels: dayLabels,
      datasets: [
        {
          label: "Temperatur innen",
          showLine: true,
          fill: false,
          pointRadius: 3,
          borderColor: "rgb(0,0,255)",
          borderWidth: 1,
          borderDash: [4, 3],
          backgroundColor: "rgb(150, 255, 255)",
          data: testDay1
        },
        {
          label: "Temperatur aussen",
          showLine: true,
          fill: false,
          pointRadius: 3,
          borderColor: "rgb(0,150,0)",
          borderWidth: 1,
          borderDash: [4, 3],
          backgroundColor: "rgb(100, 230, 100)",
          showLine: true,
          fill: false,
          data: testDay2
        }
      ]
    },

    // Configuration options go here
    options: {
      responsive: true,
      maintainAspectRatio: false,
      showLines: true,
      title: {
        display: true,
        text: testDay.format("dddd D. MMMM YYYY"),
        fontSize: 14
      },
      tooltips: {
        mode: "index",
        intersect: false
      },
      hover: {
        mode: "nearest",
        intersect: true
      },
      legend: {
        display: true,
        labels: {
          color: "rgb(255, 99, 132)"
          //usePointStyle: true,
        }
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              drawTicks: true
            },
            ticks: {
              source: "labels" //auto, data, labels
            },
            type: "time",
            time: {
              tooltipFormat: "[Zeit: ]H[:]mm",
              displayFormats: {
                hour: "H[:]mm"
              }
              //min: moment().add(0, 'd').format(),
              //max: moment().add(8, 'd').format()
            },
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Datum / Zeit"
            }
          }
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              labelString: "Temperatur [ ºC ]",
              display: true
            }
          }
        ]
      }
    }
  });
}

// create labels for a day chart
function getDayLabels(_day) {
  //the day to be displayed in YYYY/MM/DD
  let _dayLabels = [];
  let _labelTime = moment(_day);
  let i;
  for (i = 0; i < 12; i++) {
    _dayLabels[i] = _labelTime.format();
    _labelTime.add(2, "h").format();
  }
  _labelTime.subtract(1, "m").format();
  _dayLabels[12] = _labelTime.format();
  return _dayLabels;
}

// create two series of test data with ~15min intervals for 24h for a specified day
function generateDayTestData(_day) {
  let i;
  let mtestDay1 = [];
  let mtestDay2 = [];
  let samplingTime;
  samplingTime = moment(testDay); // set samplingTime to the start of the day
  for (i = 0; i < 96; i++) {
    mtestDay1[i] = {
      t: samplingTime.format(),
      y: Math.round(2 * Math.random() * 25) / 2
    };
    mtestDay2[i] = {
      t: samplingTime.format(),
      y: Math.round(2 * Math.random() * 2) / 2
    };
    samplingTime.add(15 + Math.random() * 2 - 1, "m");
  }
  return [mtestDay1, mtestDay2];
}
