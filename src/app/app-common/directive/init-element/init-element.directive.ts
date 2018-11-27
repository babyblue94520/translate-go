import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';
import { CUI } from '@cui/core';

@Directive({
  selector: '[appInitElement]'
})
export class InitElementDirective implements OnDestroy {
  private element: HTMLElement;
  constructor(
    private el: ElementRef
  ) {

  }

  @Input() set appInitElement(element: HTMLElement) {
    if (this.element != element) {
      CUI.remove(this.element);
      this.element = element;
      this.el.nativeElement.appendChild(element);
    }
  }

  ngOnDestroy() {
    CUI.remove(this.element);
    this.element = undefined;
  }
}
