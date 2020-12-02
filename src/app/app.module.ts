import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { DialogComponent } from './common/component/dialog/dialog.component';
import { ElementZoneStrategyFactory } from 'elements-zone-strategy';
import { FormsModule } from '@angular/forms';
import { InitElementDirective } from './common/directive/init-element/init-element.directive';
import { Injector, NgModule } from '@angular/core';
import { TabComponent } from './common/component/tabs/tab/tab.component';
import { TabGroupComponent } from './common/component/tabs/tab-group/tab-group.component';
import { ShrinkComponent } from './common/component/shrink/shrink.component';


@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    InitElementDirective,
    TabComponent,
    TabGroupComponent,
    ShrinkComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  entryComponents: [AppComponent],
})
export class AppModule {
  constructor(private injector: Injector) {
    const strategyFactory = new ElementZoneStrategyFactory(AppComponent, this.injector);
    const toolbar = createCustomElement(AppComponent, {
      injector: this.injector
      , strategyFactory
    });
    customElements.define('translate-toolbar', toolbar);
  }

  ngDoBootstrap() {
  }
}
