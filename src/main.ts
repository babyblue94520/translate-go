
import { enableProdMode, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { createApplication } from '@angular/platform-browser';
import { AppComponent } from 'app/app.component';
import { TranslateToolbar } from 'translate-go/interface';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

function loadApp() {
  createApplication({
    providers: [
      provideExperimentalZonelessChangeDetection()
    ]
  })
    .then((appRef) => {
      // create a constructor of a custom element
      const component = createCustomElement<TranslateToolbar>(
        AppComponent, // component for Angular element
        { injector: appRef.injector } // used to inject the component to the DOM
      );

      // register in a browser
      customElements.define('translate-toolbar', component);
    });
}

loadApp();
