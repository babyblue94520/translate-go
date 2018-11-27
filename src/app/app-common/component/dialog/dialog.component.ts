import {
  ApplicationRef,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  Injector,
  Input,
  OnDestroy,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { CUI, Overlay } from '@cui/core';
import { DomPortalOutlet, TemplatePortal } from '@angular/cdk/portal';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnDestroy {
  private dialogWindow: HTMLElement;
  private toolbar: HTMLElement;
  private overlay = new Overlay();
  private outlet: DomPortalOutlet;

  public marginBottom = '10px';
  public _windowClassName;

  @ViewChild('dialog')
  public templateRef: TemplateRef<any>;

  @Input()
  set windowClassName(value: string) {
    this._windowClassName = value;
  }

  @Input()
  public title;

  @Input()
  public onClose: Function;

  @Input()
  public top: string;
  @Input()
  public height: string;
  @Input()
  public width: string;

  constructor(
    private cd: ChangeDetectorRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private viewContainerRef: ViewContainerRef
  ) {
  }

  ngOnDestroy() {
    this.destroy();
  }

  public isOpen(): boolean {
    return this.outlet ? true : false;
  }

  /**
   * 打開Dialog
  */
  public open() {
    if (this.outlet) {
      return;
    }
    this.overlay.open(this.doOpen);
  }

  /**
   * 關閉Dialog
  */
  public close() {
    window.removeEventListener('resize', this.resize);
    this.overlay.close(this.doClose);
    if (this.dialogWindow) {
      CUI.removeElementContentChangeEvent(this.dialogWindow, this.resize);
    }
    CUI.callFunction(this.onClose);
  }

  /**
   * 讓overlay 呼叫的callback
  */
  private doOpen = () => {
    let wrapper = this.overlay.getElement();
    this.outlet = new DomPortalOutlet(wrapper
      , this.componentFactoryResolver
      , this.injector.get<ApplicationRef>(ApplicationRef)
      , this.injector
    );
    this.outlet.attach(new TemplatePortal(
      this.templateRef,
      this.viewContainerRef
    ));

    this.toolbar = wrapper.querySelector('.ttb-dialog-toolbar');
    this.dialogWindow = wrapper.querySelector('.ttb-dialog-window');
    if (this.toolbar.childElementCount == 0) {
      this.toolbar.style.display = 'none';
      this.marginBottom = '10px';
    } else {
      this.toolbar.style.display = 'block';
      this.marginBottom = (this.toolbar.offsetHeight + 10) + 'px';
    }
    CUI.addElementContentChangeEvent(this.dialogWindow, this.resize);
    window.addEventListener('resize', this.resize);
    // 第一次開啟，必須重新計算兩次才能抓到正確位置
    this.resize();
    this.resize();
    this.cd.markForCheck();
  }

  /**
   * 讓overlay 呼叫的callback
   * 等待動畫結束後才移除物件
  */
  private doClose = () => {
    if (this.outlet) {
      this.outlet.dispose();
      this.outlet = undefined;
    }
    this.cd.markForCheck();
  }

  /**
   * 移除物件
   */
  private destroy() {
    window.removeEventListener('resize', this.resize);
    if (this.dialogWindow) {
      CUI.removeElementContentChangeEvent(this.dialogWindow, this.resize);
    }
    if (this.outlet) {
      this.outlet.dispose();
      this.outlet = undefined;
    }
    if (this.overlay) {
      this.overlay.destory();
      this.overlay = undefined;
    }
  }

  /**
   * 重新計算Dialog位置
   * @param e
   */
  private resize = (e?) => {
    this.setCenter(this.dialogWindow);
  }

  /**
   * 設定Element Translate置中
   * @param element
   */
  private setCenter(element: HTMLElement) {
    let winWidth = window.innerWidth;
    let winHeight = window.innerHeight;
    let height = element.offsetHeight;
    let width = element.offsetWidth;
    let top = '50%';
    let left = '50%';
    let translateTop = Math.round(height / 2);
    let translateLeft = Math.round(width / 2);
    if (width > winWidth) {
      left = '10px';
      translateLeft = 0;
    }
    if (height > winHeight) {
      top = '20px';
      translateTop = 0;
    }
    if (this.top != undefined) {
      top = this.top;
      translateTop = 0;
    }
    element.style.top = top;
    element.style.left = left;
    CUI.style(element, 'transform', 'translate(-' + translateLeft + 'px,-' + translateTop + 'px)');
  }
}
