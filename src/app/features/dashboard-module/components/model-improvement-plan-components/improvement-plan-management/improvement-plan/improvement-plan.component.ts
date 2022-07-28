import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { Color, Label } from "ng2-charts";
import {
  ChartOptions,
  ChartType,
  ChartDataSets,
  RadialChartOptions,
} from "chart.js";
import { formatDateString, formatDecimal, maximumScore, retrieveScore } from "@app/utility";

interface RadarChartModel {
  radarChartOptions: RadialChartOptions;
  radarChartType: ChartType;
  radarChartLabels: Label[];
  assetChartColors: any[];
  radarChartLegend: boolean;
  radarChartData: ChartDataSets[];
}
interface LineChartModel {
  lineChartOptions: ChartOptions;
  lineChartLabels: Label[];
  lineChartType: ChartType;
  lineChartLegend: boolean;
  lineChartData: ChartDataSets[];
  lineChartColors: Color[];
}
@Component({
  selector: "app-improvement-plan",
  templateUrl: "./improvement-plan.component.html",
  styleUrls: ["./improvement-plan.component.scss"],
})
export class ImprovementPlanComponent implements OnInit, OnChanges {
  @Input() improvementPlan;
  @Input() isImprovementPlanLoader;
  maxScoreGoal = maximumScore;
  scoreDataChartFullLabels = [];

  // State variables
  isChartExpand = false;
  gaugeTypeImplementation = "semi";
  gaugeValueImplementation = "47";
  gaugeLabelImplementation = "";
  gaugeAppendTextImplementation = "%";
  gaugeSizeImplementation = 100;
  gaugeThickImplementation = 7;
  gaugeClrImplementation = "rgb(59, 172, 197)";

  gaugeTypeActions = "semi";
  gaugeValueActions = "47";
  gaugeLabelActions = "";
  gaugeAppendTextActions = "%";
  gaugeSizeActions = 100;
  gaugeThickActions = 7;
  gaugeClrActions = "rgb(226, 173, 75)";

  constructor() { }

  // Score Goal Data Radar Chart
  public scoreDataRadarChart: RadarChartModel = {
    radarChartOptions: {
      responsive: true,
      scale: {
        ticks: {
          max: this.maxScoreGoal,
          beginAtZero: true,
        }
      },
      tooltips: {
        callbacks: {
          title: (tooltipItem, data) => {
            return `${data.labels[tooltipItem[0].index]}-${this.scoreDataChartFullLabels[tooltipItem[0].index]}`;
          }
        }
      }
    },
    radarChartType: 'radar',
    radarChartLabels: [],
    radarChartLegend: true,
    assetChartColors: [
      {
        backgroundColor: ["rgba(63, 81, 97, 0.5)"],
        borderColor: ["#3f5161"],
      }, {
        backgroundColor: ["rgba(214, 79, 79, 0.5)"],
        borderColor: ["#d64f4f"],
      },
    ],
    radarChartData: [
      {
        data: [],
        label: 'Score'
      },
      {
        data: [],
        label: 'Target'
      },
    ]
  };

  ngOnInit() { }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.improvementPlan) {
      const change = changes.improvementPlan;
      if (change.currentValue) {
        this.fillScoreDataChart(this.improvementPlan.elements)
        this.improvementPlan.history.sort((a, b) => {
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        })
        this.fillGapActionChart(this.improvementPlan.history);
      }
    }
  }

  fillScoreDataChart = (elements = []) => {
    this.scoreDataRadarChart.radarChartLabels =
      elements.map(element => this.isChartExpand ? element.description : element.element_name);
    this.scoreDataChartFullLabels = elements.map(element => element.description);
    this.scoreDataRadarChart.radarChartData[0].data =
      elements.map(element => (element.score != null && element.score.toFixed(2)) || 0);
    this.scoreDataRadarChart.radarChartData[1].data =
      elements.map(element => (element.target != null && element.target.toFixed(2)) || 0);
  }

  fillGapActionChart = (history = []) => {
    this.gapsLineChart.lineChartLabels = history.map(e => formatDateString(e.createdAt))
    this.gapsLineChart.lineChartData[0].data = history.map(e => e.open_gaps)
    this.actionLineChart.lineChartLabels = history.map(e => formatDateString(e.createdAt))
    this.actionLineChart.lineChartData[0].data = history.map(e => e.open_actions)
  }

  public gapsLineChart: LineChartModel = {
    lineChartLabels: [],
    lineChartData: [{ data: [] }],
    lineChartColors: [
      {
        backgroundColor: "rgba(255,255,255,0)",
        borderColor: "#3cacc5",
        pointBackgroundColor: "#3cacc5",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#3cacc5",
        pointHoverBorderColor: "#fff",
      },
    ],
    lineChartLegend: false,
    lineChartOptions: {
      responsive: true,
      scales: {
        xAxes: [
          {
            ticks: {
              fontFamily: '"Muli", sans-serif',
              fontColor: "#869195",
              fontSize: 10,
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              fontFamily: '"Muli", sans-serif',
              fontColor: "#869195",
              fontSize: 10,
            },
          },
        ],
      },
      plugins: {
        datalabels: {
          anchor: "end",
          align: "end",
        },
      },
    },
    lineChartType: "line",
  };

  public actionLineChart: LineChartModel = {
    lineChartLabels: [],
    lineChartData: [{ data: [] }],
    lineChartColors: [
      {
        backgroundColor: "rgba(255,255,255,0)",
        borderColor: "#e2ad4b",
        pointBackgroundColor: "#e2ad4b",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#e2ad4b",
        pointHoverBorderColor: "#fff",
      },
    ],
    lineChartLegend: false,
    lineChartOptions: {
      responsive: true,
      scales: {
        xAxes: [
          {
            ticks: {
              fontFamily: '"Muli", sans-serif',
              fontColor: "#869195",
              fontSize: 10,
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              fontFamily: '"Muli", sans-serif',
              fontColor: "#869195",
              fontSize: 10,
            },
          },
        ],
      },
      plugins: {
        datalabels: {
          anchor: "end",
          align: "end",
        },
      },
    },
    lineChartType: "line",
  };

  // events
  public chartClicked({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
  }

  public chartHovered({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
  }

  onExpandChart = () => {
    this.isChartExpand = true;
    this.fillScoreDataChart(this.improvementPlan.elements)
  };

  onCollapseChart = () => {
    this.isChartExpand = false;
    this.fillScoreDataChart(this.improvementPlan.elements)
  };

  getScore = (value) => {
    let score = 0;
    if (value) {
      score = retrieveScore(value);
    }
    return formatDecimal(score);
  };
}
