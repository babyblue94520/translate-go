import { Async } from 'ts/decorators/async';
import {
  Component,
  Input,
  TemplateRef,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';


@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent {
  @ViewChild('all')
  public templateRef: TemplateRef<any>;
  @ViewChild('content')
  public contentRef: TemplateRef<any>;
  @ViewChild('label')
  public labelRef: TemplateRef<any>;

  public render = false;

  @Input() id = '';
  @Input() label = '';
  @Input() disabled = false;
  @Input() active = false;

  @Input() onActive: Function;

  @Input()
  onClose: Function;

  constructor(private cdf: ChangeDetectorRef) { }

  public doActive() {
    this.active = true;
    if (this.onActive instanceof Function) {
      this.onActive();
    }
    if (this.render) {
      this.cdf.markForCheck();
    } else {
      this.doRender();
    }
  }

  @Async(50)
  private doRender() {
    this.render = true;
    this.cdf.markForCheck();
  }

  public doClose(index: number) {
    if (this.onClose instanceof Function) {
      this.doClose(index);
    }
  }
}
