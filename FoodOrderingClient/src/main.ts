import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/config/app.config';
import { RootComponent } from './app/root/root.component'; //Main Component



bootstrapApplication(RootComponent, appConfig).catch((err) => console.error(err));
