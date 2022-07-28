import { Component, Input, OnChanges, OnInit, SimpleChanges, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AssessmentModelService } from '@app/features/dashboard-module/services';
import {
  countPercentage,
  isCriteriaImplemented, isCriteriaNotImplemented, isCriteriaNotRated,
  assessmentCriteriaStatusWithNoRated,
  isCriteriaPartiallyImplemented, maximumScore, PagerModel, PAGE_SIZE_OPTIONS, prepareElementsTreeData
} from '@app/utility';
import { ChartDataSets, ChartType, RadialChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { Subscription } from 'rxjs';
interface RadarChartModel {
  radarChartOptions: RadialChartOptions;
  radarChartType: ChartType;
  radarChartLabels: Label[];
  assetChartColors: any[];
  radarChartData: ChartDataSets[];
}
@Component({
  selector: 'app-assessment-dashboard',
  templateUrl: './assessment-dashboard.component.html',
  styleUrls: ['./assessment-dashboard.component.scss'],
})
export class AssessmentDashboardComponent implements OnInit, OnChanges, OnDestroy {
  constructor(private assessmentModelService: AssessmentModelService) { }

  // Angular variables
  @Input() assessmentDashboardData;
  @Input() assessmentDetail;
  @Input() assessmentId;
  @Input() isLoadingResults: boolean;

  elementsResult = [];
  currentCriteriaByElementsData;
  levels = [];
  statusChoiceList = assessmentCriteriaStatusWithNoRated;

  maxScoreGoal = maximumScore;
  scoreDataChartFullLabels = [];
  elementSelectionHierarchy = []
  allElementList = [];
  selectedElement;
  elementNodes = [];

  // Form controls variables
  levelFormControl: FormControl = new FormControl('');
  practiceCtrl: FormControl = new FormControl('');
  statusCtrl: FormControl = new FormControl('');
  elementCtrl: FormControl = new FormControl('');
  elementStoreValue = '';

  // State variables
  isShowFilter = false;
  pageSizeOptions = PAGE_SIZE_OPTIONS;
  criteriaPager: PagerModel = { page: 1, recordsPerPage: this.pageSizeOptions[0], totalRecords: 0, filteredRecords: 0 };
  criteriaList = [];
  criteriaStatics;
  criteriaLoader = false;
  private criteriaListSubscription$: Subscription;

  // Score Data Radar Chart
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
    assetChartColors: [
      {
        backgroundColor: ['rgba(214, 79, 79, 0.5)'],
        borderColor: ['#d64f4f'],
      },
    ],
    radarChartData: [
      {
        data: [],
        label: 'Score'
      },
    ]
  };

  public radarChartType: ChartType = 'radar';

  ngOnInit() {
    this.bindAssessmentCriteria();
    this.elementCtrl.valueChanges.subscribe(e => {
      if (e === null) {
        if (this.elementStoreValue) {
          this.bindAssessmentCriteria();
        }
        this.elementStoreValue = '';
        this.elementCtrl.setValue("", { emitEvent: false });
      } else {
        this.elementStoreValue = e;
        this.bindAssessmentCriteria();
      }
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.assessmentDetail) {
      const assessmentDetailChange = changes.assessmentDetail;
      if (assessmentDetailChange.currentValue) {
        this.bindLevels(+this.assessmentDetail.evaluation_level);
        this.allElementList = [];
        this.prepareAllElementList(
          this.allElementList,
          JSON.parse(JSON.stringify(this.assessmentDetail.elements))
        );

        this.bindElementsResult(this.assessmentDetail.elements)
        this.fillScoreDataChart(this.elementsResult)
      }
    }
    if (changes.assessmentDashboardData) {
      const assessmentDashboardDataChange = changes.assessmentDashboardData;
      if (assessmentDashboardDataChange.currentValue) {
        const assessmentDashboardData = this.assessmentDashboardData;
        this.setCurrentCriteriaByElementsData(assessmentDashboardData);
      }
    }
  }

  prepareAllElementList = (arr, arrList) => {
    for (const element of arrList) {
      const data = element;
      const subElements = element.subElements;
      subElements.forEach(el => {
        el.parentElementId = data._id
      });
      arr.push({ ...data });
      if (subElements && subElements.length) {
        this.prepareAllElementList(arr, subElements);
      }
    }
  };

  bindElementsResult = (elements) => {
    this.elementsResult = JSON.parse(JSON.stringify(elements))
    const mapElement: any = { title: 'All', value: '', key: '', children: [], isLeaf: true };
    const elementNodes = prepareElementsTreeData(this.elementsResult, true);
    this.elementNodes = [{ ...mapElement }].concat(elementNodes)
  }

  // fill score Data Chart
  fillScoreDataChart = (elements = []) => {
    this.scoreDataRadarChart.radarChartLabels = elements.map(element => element.element_name);
    this.scoreDataChartFullLabels = elements.map(element => element.description);
    this.scoreDataRadarChart.radarChartData[0].data = elements.map(element => (element.score != null && element.score.toFixed(2)) || 0);
  }

  bindAssessmentCriteria = () => {
    if (this.criteriaListSubscription$) {
      this.criteriaListSubscription$.unsubscribe()
    }
    this.criteriaLoader = true;
    this.criteriaListSubscription$ = this.getAssessmentCriteria(this.assessmentId, this.criteriaApiParams).subscribe(response => {
      this.criteriaLoader = false;
      const { criterias, statics, pager } = response.payload;
      this.criteriaList = criterias;
      this.criteriaStatics = statics
      this.criteriaPager = pager;
    }, e => {
      this.criteriaLoader = false;
    })
  }

  getAssessmentCriteria = (assessmentId, params) => {
    return this.assessmentModelService.getAssessmentDashboardCriteria(assessmentId, params)
  }

  getDynamicStyleAverageScore(score, maxScoreGoal) {
    return { width: `${!isNaN(score) && score !== null ? countPercentage(score, maxScoreGoal) : 0}%` };
  }

  getScoreGoalToolTip = (value) => {
    return !isNaN(value) && value !== null ? value.toFixed(2) : '';
  }

  onClickElement = (element) => {
    this.selectedElement = element;
    this.elementSelectionHierarchy.push(this.selectedElement._id);
    const subElements = this.allElementList.filter(e => e.parentElementId === this.selectedElement._id);
    this.bindElementsResult(subElements)
  }

  onClickPreviousElement = () => {
    this.selectedElement = this.allElementList.find(e => e._id === this.selectedElement.parentElementId);
    const subElements = this.selectedElement ? this.allElementList.filter(e => e.parentElementId === this.selectedElement._id) : this.assessmentDetail.elements;
    this.bindElementsResult(subElements)
  }

  setCurrentCriteriaByElementsData = (assessmentDashboardData) => {
    let currentCriteria;
    if (this.levelFormControl.value === 'All') {
      let allCriteria = [];
      assessmentDashboardData.criterias.forEach(el => {
        allCriteria = [...allCriteria, ...el.criterias];
      });
      currentCriteria = {
        ...assessmentDashboardData,
        criterias: allCriteria
      };
    } else {
      currentCriteria = assessmentDashboardData.criterias.filter(el => el.level === +this.levelFormControl.value)[0];
    }

    if (currentCriteria) {
      const criterias = currentCriteria.criterias || [];
      const groups = {};

      for (const criteria of criterias) {
        const groupName = criteria.element.element_name;
        if (!groups[groupName]) {
          groups[groupName] = [];
        }
        groups[groupName].push(criteria);
      }
      currentCriteria.elements = [];

      Object.keys(groups).forEach(el => {
        currentCriteria.elements.push({
          name: el,
          criterias: groups[el]
        });
      });
    }

    this.currentCriteriaByElementsData = currentCriteria;
  }

  bindLevels = (levelNumber: number) => {
    this.levels = [];
    for (let i = 1; i <= levelNumber; i++) {
      this.levels.push(i);
    }
  }

  isImplemented = (status) => {
    return isCriteriaImplemented(status)
  }

  isPartiallyImplemented = (status) => {
    return isCriteriaPartiallyImplemented(status)
  }

  isNotImplemented = (status) => {
    return isCriteriaNotImplemented(status)
  }

  isNotRated = (status) => {
    return isCriteriaNotRated(status)
  }

  onFilterToggle = () => {
    this.isShowFilter = !this.isShowFilter;
  }

  onClearFilter = () => {
  };

  pageChange = (page: any) => {
    this.criteriaPager.page = page.pageIndex + 1;
    this.criteriaPager.recordsPerPage = page.pageSize;
    this.bindAssessmentCriteria();
  };

  getPercentage = (value, total) => {
    return countPercentage(value || 0, total)
  }

  get criteriaApiParams() {
    const { page, recordsPerPage } = this.criteriaPager;
    const params: any = { page, recordsPerPage };
    const level = this.levelFormControl.value;
    const element_id = this.elementCtrl.value;
    const status = this.statusCtrl.value;
    const criteria_unique_id = this.practiceCtrl.value;

    if (level) {
      params.level = level;
    }
    if (element_id) {
      params.element_id = element_id;
    }
    if (criteria_unique_id) {
      params.criteria_unique_id = criteria_unique_id;
    }
    if (status || status === 0) {
      params.status = status;
    }
    return params
  }

  get isFilterApplied() {
    return false;
  }

  ngOnDestroy() {
    if (this.criteriaListSubscription$) {
      this.criteriaListSubscription$.unsubscribe()
    }
  }

}
