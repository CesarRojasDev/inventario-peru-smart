import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, withHashLocation } from '@angular/router';

import { NzIconModule } from 'ng-zorro-antd/icon';

import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom(NzIconModule),
    provideHttpClient(),
    provideRouter(routes, withHashLocation()),
  ],
});
