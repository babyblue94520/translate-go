
import { enableProdMode } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { createApplication } from '@angular/platform-browser';
import { AppComponent } from 'app/app.component';
import { TranslateToolbar } from 'translate-go/interface';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

function loadApp() {
  createApplication({ providers: [] }).then((appRef) => {
    // create a constructor of a custom element
    const component = createCustomElement<TranslateToolbar>(
      AppComponent, // component for Angular element
      { injector: appRef.injector } // used to inject the component to the DOM
    );
  
    // register in a browser
    customElements.define('translate-toolbar', component);
  });
}

setTimeout(function () {
  if (window['Zone'] === undefined) {
    console.log('Unable to find zone, so loading one...');
    import('zone.js/dist/zone')
      .then(() => {
        loadApp();
      });
  } else {
    console.log('Found an existing Zone, so just reusing it');
    loadApp();
  }
}, 1000);
