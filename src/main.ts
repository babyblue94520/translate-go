import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

function loadApp() {
  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.log(err));
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
