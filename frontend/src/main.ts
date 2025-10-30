// File: d:\desarrollos\countries2\frontend\src\main.ts | Last Modified: 2025-10-24

import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
