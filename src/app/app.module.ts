import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { DialogComponent } from './app-common/component/dialog/dialog.component';
import { DownloadDialogComponent } from './dialog/download-dialog/download-dialog.component';
import { ElementZoneStrategyFactory } from 'elements-zone-strategy';
import { FormsModule } from '@angular/forms';
import { ImportDialogComponent } from './dialog/import-dialog/import-dialog.component';
import { Injector, NgModule } from '@angular/core';
import { ShrinkComponent } from 'app/app-common/component/shrink/shrink.component';
import { TabComponent } from './app-common/component/tabs/tab/tab.component';
import { TabGroupComponent } from './app-common/component/tabs/tab-group/tab-group.component';
import { TranslateToolbar } from 'translate-go/interface';
import { ToolViewComponent } from './dialog/tool-view/tool-view.component';
import { ToolTabComponent } from './dialog/tool-view/tool-tab/tool-tab.component';


@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    TabComponent,
    TabGroupComponent,
    ShrinkComponent,
    DownloadDialogComponent,
    ImportDialogComponent,
    ToolViewComponent,
    ToolTabComponent,
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
  }

  ngDoBootstrap() {
    const strategyFactory = new ElementZoneStrategyFactory(AppComponent, this.injector);
    const component = createCustomElement<TranslateToolbar>(AppComponent, {
      injector: this.injector
      , strategyFactory
    });

    customElements.define('translate-toolbar', component);
  }
}
