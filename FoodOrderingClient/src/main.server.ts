import { bootstrapApplication } from '@angular/platform-browser';
import { config } from './app/config/app.config.server';
import { RootComponent } from './app/root/root.component'; //Main Component

const bootstrap = () => bootstrapApplication(RootComponent, config);

export default bootstrap;
