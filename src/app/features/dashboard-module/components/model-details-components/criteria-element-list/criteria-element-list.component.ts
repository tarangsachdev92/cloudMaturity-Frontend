import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { AssessmentModelDataModel, ExpandCollapseEnum } from '@app/utility';

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  element_name: string;
  description: string;
  criterias: number;
  _id: string;
  level: number;
  nodeSelectTime: number;
}

@Component({
  selector: 'app-criteria-element-list',
  templateUrl: './criteria-element-list.component.html',
  styleUrls: ['./criteria-element-list.component.scss'],
})

export class CriteriaElementListComponent implements OnChanges {

  @Input() modelElementList = [];
  @Input() isModelElementListUpdated: boolean;
  @Input() isLoadingModelElements: boolean;
  @Input() isCriteriaUpdated: boolean;
  @Input() isCriteriaAdded: boolean;
  @Input() isCriteriaRemoved: boolean;
  @Input() modelData: AssessmentModelDataModel;

  @Output() selectSubElement = new EventEmitter<any>();

  // State variables
  isShowElementSearch = false;

  searchSubElementFormControl: FormControl = new FormControl();
  nodeSelectTime = new Date().getTime();
  currentNode;
  expandCollapseText = ExpandCollapseEnum.EXPAND_ALL;

  private _transformer = (node: any, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      element_name: node.element_name,
      _id: node._id,
      criterias: node.criterias,
      description: node.description,
      level,
      nodeSelectTime: node.nodeSelectTime
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.modelElementList) {
      const change = changes.modelElementList;
      if (change.currentValue) {
        this.bindTreeData(change.currentValue);
      }
    }
    if (changes.isCriteriaAdded) {
      const change = changes.isCriteriaAdded;
      if (change.currentValue) {
        this.currentNode.criterias = (this.currentNode.criterias || 0) + 1;
      }
    }
    if (changes.isCriteriaRemoved) {
      const change = changes.isCriteriaRemoved;
      if (change.currentValue) {
        this.currentNode.criterias = this.currentNode.criterias - 1;
      }
    }
  }

  bindTreeData = (elementList) => {
    const treeData = [];
    this.prepareArray(treeData, elementList);
    this.dataSource.data = treeData;
    if (this.treeControl.dataNodes.length) {
      let node;
      for (let i = 0; i < this.treeControl.dataNodes.length; i++) {
        if (this.treeControl.dataNodes[i].expandable) {
          this.treeControl.expand(this.treeControl.dataNodes[i])
        } else {
          node = this.treeControl.dataNodes[i]
          break;
        }
      }
      if (node) {
        this.currentNode = node;
        this.setSelectTime(node);
        this.emitSelectSubElement(node);
      }
    }

  }

  prepareArray = (arr, arrList) => {
    for (const element of arrList) {
      const data = element;
      element.children = [];
      const subElements = element.subElements;
      arr.push({ ...data, children: element.children });
      if (subElements && subElements.length) {
        this.prepareArray(element.children, subElements);
      }
    }
  }

  onClickElementNode = (node) => {
    if (!node.expandable) {
      this.currentNode = node;
      this.setSelectTime(node);
      this.emitSelectSubElement(node);
    }
  }

  emitSelectSubElement = (currentSubElement) => {
    this.selectSubElement.emit({
      currentSubElement
    });
  }

  setSelectTime = (node) => {
    const currentTime = new Date().getTime();
    this.nodeSelectTime = currentTime;
    node.nodeSelectTime = currentTime;
  }

  expandCollapseAllNodes() {
    if (this.expandCollapseText === ExpandCollapseEnum.EXPAND_ALL) {
      this.treeControl.expandAll();
      this.expandCollapseText = ExpandCollapseEnum.COLLAPSE_ALL;
    } else {
      this.treeControl.collapseAll();
      this.expandCollapseText = ExpandCollapseEnum.EXPAND_ALL;
    }
  }

}
