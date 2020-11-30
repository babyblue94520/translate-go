import {
  Directive,
  ElementRef,
  Input,
  OnDestroy
} from '@angular/core';
import { DomUtil } from 'ts/util/dom-util';

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
      DomUtil.remove(this.element);
      this.element = element;
      this.el.nativeElement.appendChild(element);
    }
  }

  ngOnDestroy() {
    DomUtil.remove(this.element);
    this.element = undefined;
  }
}
