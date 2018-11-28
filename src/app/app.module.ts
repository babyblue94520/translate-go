import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { DialogComponent } from './app-common/component/dialog/dialog.component';
import { ElementZoneStrategyFactory } from 'elements-zone-strategy';
import { FormsModule } from '@angular/forms';
import { InitElementDirective } from './app-common/directive/init-element/init-element.directive';
import { Injector, NgModule } from '@angular/core';
import { TabComponent } from './app-common/component/tabs/tab/tab.component';
import { TabGroupComponent } from './app-common/component/tabs/tab-group/tab-group.component';


@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    InitElementDirective,
    TabComponent,
    TabGroupComponent,
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
