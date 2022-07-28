import { Directive, ElementRef, HostListener } from '@angular/core';
@Directive({
  selector: '[appTwoDigitDecimalNumber]'
})
export class TwoDigitDecimalNumberDirective {
  regexStr = /^([0-9]|1[0])?(\.\d{0,1})?$/;

  private regex: RegExp = new RegExp(this.regexStr);
  // private regex: RegExp = new RegExp(/^\d*\.?\d{0,1}$/g);
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', '-', 'ArrowLeft', 'ArrowRight', 'Del', 'Delete'];
  constructor(private el: ElementRef) {
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    // Allow Backspace, tab, end, and home keys
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    let current: string = this.el.nativeElement.value;
    const position = this.el.nativeElement.selectionStart;
    const next: string = [current.slice(0, position), event.key == 'Decimal' ? '.' : event.key, current.slice(position)].join('');
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }

}