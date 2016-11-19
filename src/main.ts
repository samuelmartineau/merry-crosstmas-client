import './polyfills.ts';
import 'hammerjs';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/';
import {ContactService} from './app/contact.service';
import {ApiService} from './app/api.service';
import {EditorService} from './app/editor.service';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule, [ContactService, ApiService, EditorService]);
