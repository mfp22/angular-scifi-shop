import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { defineComponents, IgcRatingComponent } from 'igniteui-webcomponents';
import { bootstrapApplication } from '@angular/platform-browser';
import { FooterComponent } from './libs/footer/src';
defineComponents(IgcRatingComponent);

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

bootstrapApplication(FooterComponent);
