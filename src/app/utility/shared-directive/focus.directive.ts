
import { AfterContentInit, Input, ElementRef, Directive } from '@angular/core';

@Directive({
  selector: '[appAutofocus]'
})
export class AutofocusDirective implements AfterContentInit {

  @Input() public autoFocus: boolean;

  public constructor(private el: ElementRef) {

  }

  public ngAfterContentInit() {
    setTimeout(() => {
      this.el.nativeElement.focus();
    }, 500);
  }

}