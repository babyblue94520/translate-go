import {
  Component,
  Input,
  TemplateRef,
  ViewChild,
} from '@angular/core';

export interface TabCallback<T> {
  (index: number, value: T, tab: TabComponent<T>): void;
}
@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent<T = any> {
  @ViewChild('all', { static: true })
  public templateRef: TemplateRef<any>;
  @ViewChild('content', { static: true })
  public contentRef: TemplateRef<any>;
  @ViewChild('label', { static: true })
  public labelRef: TemplateRef<any>;

  @Input() id = '';
  @Input() label = '';
  @Input() disabled = false;
  @Input() active = false;
  @Input() value: T;

  @Input() onActive: TabCallback<T>;

  @Input() onClose: TabCallback<T>;

  public canClose(): boolean {
    return this.onClose instanceof Function;
  }

  public doActive(index: number) {
    if (this.onActive instanceof Function) {
      this.onActive(index, this.value, this);
    }
  }

  public doClose(index: number) {
    if (this.canClose()) {
      this.onClose(index, this.value, this)
    }
  }
}
