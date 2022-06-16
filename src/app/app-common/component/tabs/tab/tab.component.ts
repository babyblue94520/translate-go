import {
  Component,
  Input,
  TemplateRef,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { CUI } from '@cui/core';


@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent {
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

  @Input() onActive: Function;

  @Input() onClose: Function;

  constructor(private cd: ChangeDetectorRef) { }

  public doActive() {
    this.active = true;
    CUI.callFunction(this.onActive);
    setTimeout(() => {
      this.cd.markForCheck();
    }, 0);
  }
}
