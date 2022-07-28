import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Editor } from 'ngx-editor';

@Component({
  selector: 'app-assessment-scope',
  templateUrl: './assessment-scope.component.html',
  styleUrls: ['./assessment-scope.component.scss']
})
export class AssessmentScopeComponent implements OnInit, OnChanges, OnDestroy {

  editor: Editor;

  @Input() longText;
  @Output() updateDetail = new EventEmitter<any>();
  longTextModel
  constructor() { }

  ngOnInit(): void {
    this.editor = new Editor();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.longText) {
      const longTextChange = changes.longText;
      this.longTextModel = longTextChange.currentValue;
    }
  }

  onSaveClick = () => {
    this.updateDetail.emit({ details: this.longTextModel })
  }

  onResetClick = () => {
    this.longTextModel = this.longText;
  }

  ngOnDestroy() {
    this.editor.destroy();
  }
}
