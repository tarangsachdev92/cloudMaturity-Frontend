import { NgControl } from '@angular/forms';
import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[disableFormControl]'
})
export class DisableFormControlDirective {

  constructor(private ngControl: NgControl) {
  }

  @Input() set disableFormControl(condition: boolean) {
    const action = condition ? 'disable' : 'enable';
    this.ngControl['_parent'].form.controls[this.ngControl.name][action]({ emitEvent: false })
  }

}
