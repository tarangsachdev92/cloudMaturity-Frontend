import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AssessmentService } from "@app/core";
import { AssessmentRouteConstants } from "@app/utility";
import { forkJoin, Observable, Subscription } from "rxjs";

@Component({
  selector: "app-assessment-criteria",
  templateUrl: "./assessment-criteria.component.html",
  styleUrls: ["./assessment-criteria.component.scss"],
})
export class AssessmentCriteriaComponent implements OnInit {
  assessmentId: string;
  elementId: string;
  assessmentDetail;
  assessmentSurveyDetail;
  assessmentDetailsSubscription$: Subscription;
  isLoadingResults = false;
  elementList = [];
  allElementList = [];
  allChildElementList = [];
  selectedElement;
  previousElement;
  nextElement;
  selectedSurveyElement;
  selectedNodeElement;
  isSurveyUpdated = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private assessmentService: AssessmentService,
    private router: Router
  ) {
    this.assessmentService.setSubElementIndex(0);
  }

  ngOnInit() {
    this.routeSubscribe();
  }

  routeSubscribe = () => {
    const params = this.activatedRoute.snapshot.params;
    this.elementId = params.planId;
    this.assessmentId = params.assessmentId;
    if (this.assessmentId) {
      this.bindAssessmentData(this.assessmentId);
    }
  };

  handleElementRelatedData = (elementId) => {
    this.allElementList = [];
    this.allChildElementList = [];
    this.prepareAllElementList(
      this.allElementList,
      JSON.parse(JSON.stringify(this.elementList))
    );
    this.allChildElementList = this.allElementList.filter(e => e.ischild_element || e.subElements.length === 0);
    if (elementId) {
      this.bindNextPrevElement(elementId);
    } else {
      const selectedElement = this.allChildElementList[0];
      this.bindNextPrevElement(selectedElement && selectedElement._id);
    }
  };

  bindNextPrevElement = (elementId) => {
    const elementIndex = this.allChildElementList.findIndex(
      (elem) => elem.element_id === elementId
    );
    this.selectedElement = this.allChildElementList[elementIndex]
    this.nextElement = this.allChildElementList[elementIndex + 1]
    this.previousElement = this.allChildElementList[elementIndex - 1];
  }

  onClickPrevious = (e) => {
    if (this.previousElement) {
      const { element_id } = this.previousElement;
      this.router.navigateByUrl(this.router.url.replace(this.selectedElement.element_id, element_id));
      this.bindNextPrevElement(element_id);
    }
  }

  onClickNext = (e) => {
    if (this.nextElement) {
      const { element_id } = this.nextElement;
      this.router.navigateByUrl(this.router.url.replace(this.selectedElement.element_id, element_id));
      this.bindNextPrevElement(element_id);
    }
  }

  onSelectElement = (event) => {
    const { elementId } = event
    this.router.navigateByUrl(this.router.url.replace(this.selectedElement.element_id, elementId));
    this.bindNextPrevElement(elementId);
  }

  bindAssessmentData = (assessmentId, isLoading = true) => {
    const params = this.activatedRoute.snapshot.params;
    this.elementId = params.planId;
    if (isLoading) {
      this.isLoadingResults = true;
    }
    const observables: Observable<any>[] = [];
    observables.push(this.getAssessmentDetail(assessmentId));
    if (this.assessmentDetailsSubscription$) {
      this.assessmentDetailsSubscription$.unsubscribe();
    }
    this.assessmentDetailsSubscription$ = forkJoin(observables).subscribe(
      (response) => {
        this.assessmentDetail = response[0].payload.data;
        if (this.assessmentDetail && this.assessmentDetail.elements) {
          this.elementList = this.assessmentDetail.elements || [];
          this.handleElementRelatedData(this.elementId);
        }
        this.isLoadingResults = false;
      },
      (error) => {
        this.isLoadingResults = false;
      }
    );
  };
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

  getAssessmentDetail = (assessmentId) => {
    return this.assessmentService.getAssessmentDetail(assessmentId);
  };

  onUpdateSurveySuccess = (event) => {
    this.assessmentDetail = event.data;
    if (this.assessmentDetail && this.assessmentDetail.elements) {
      // if survey update then -> preserve expanded nodes and
      this.isSurveyUpdated = true;
      this.elementList = this.assessmentDetail.elements || [];
      const params = this.activatedRoute.snapshot.params;
      this.elementId = params.planId;
      this.handleElementRelatedData(this.elementId);
      setTimeout(() => {
        this.isSurveyUpdated = false;
      });
    }
  };

  onSelectElementNode = (event) => {
    this.selectedNodeElement = event.selectedNodeElement;
  };

}
