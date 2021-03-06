var Chartist = require('chartist');

// ##############################
// // // variables used to create animation on charts
// #############################
var delays = 80,
  durations = 500;
var delays2 = 80,
  durations2 = 500;

// ##############################
// // // Daily Sales
// #############################

const avgEvolution = {
  data: {
    labels: [],
    series: [[]],
  },
  options: {
    lineSmooth: Chartist.Interpolation.cardinal({
      tension: 0,
    }),
    low: 0,
    high: 6,
    chartPadding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  },
  // for animation
  animation: {
    draw: function (data) {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path
              .clone()
              .scale(1, 0)
              .translate(0, data.chartRect.height())
              .stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint,
          },
        });
      } else if (data.type === 'point') {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease',
          },
        });
      }
    },
  },
};

// ##############################
// // // Subject Acc Avg
// #############################

var subjectAccAvg = {
  data: {
    labels: [],
    series: [[]],
  },
  options: {
    axisX: {
      showGrid: false,
    },
    low: 0,
    high: 6,
    chartPadding: {
      top: 0,
      right: 5,
      bottom: 0,
      left: 0,
    },
  },
  responsiveOptions: [
    [
      'screen and (max-width: 640px)',
      {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          },
        },
      },
    ],
  ],
  animation: {
    draw: function (data) {
      if (data.type === 'bar') {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: 'ease',
          },
        });
      }
    },
  },
};

// ##############################
// // // Completed Tasks
// #############################

const completedTasksChart = {
  data: {
    labels: ['12am', '3pm', '6pm', '9pm', '12pm', '3am', '6am', '9am'],
    series: [[230, 750, 450, 300, 280, 240, 200, 190]],
  },
  options: {
    lineSmooth: Chartist.Interpolation.cardinal({
      tension: 0,
    }),
    low: 0,
    high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
    chartPadding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  },
  animation: {
    draw: function (data) {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path
              .clone()
              .scale(1, 0)
              .translate(0, data.chartRect.height())
              .stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint,
          },
        });
      } else if (data.type === 'point') {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease',
          },
        });
      }
    },
  },
};

const calcSubjectAccAvg = (courses) => {
  subjectAccAvg.data.labels = Array.from(
    courses,
    (courseStudent) => courseStudent.course.nrc
  );
  let average = (array) => {
    if (array.length === 0) return 0;
    return array.reduce((a, b) => a + b) / array.length;
  };
  subjectAccAvg.data.series = [
    Array.from(courses, (courseStudent) => average(courseStudent.grades)),
  ];
};

const calcAvgEvolution = (enrollments) => {
  avgEvolution.data.labels = Array.from(
    enrollments,
    (enrollment) => enrollment.semester
  );
  avgEvolution.data.series = [
    Array.from(enrollments, (enrollment) => enrollment.finalGrade),
  ];
  return avgEvolution;
};

module.exports = {
  subjectAccAvg,
  avgEvolution,
  completedTasksChart,
  calcSubjectAccAvg,
  calcAvgEvolution,
};
