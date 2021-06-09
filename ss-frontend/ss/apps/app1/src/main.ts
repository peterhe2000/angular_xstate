import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { inspect } from '@xstate/inspect';

if (environment.production) {
  enableProdMode();
}

if (!environment.production) {
  inspect({
    iframe: false,
  });
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
