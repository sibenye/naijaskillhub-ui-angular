import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MaterialModule} from '@angular/material';
import { RouterModule }   from '@angular/router';
import { ResponsiveModule } from 'ng2-responsive';

import {NSH_AppComponent} from './app.component';
import {SampleComponent} from './sample';
import {NSH_NavComponent} from './nav';
import {NSH_HeaderComponent} from './header';
import {NSH_HomeComponent} from './home';

@NgModule({
  imports: [
    BrowserModule,
    MaterialModule.forRoot(),
    ResponsiveModule,
    RouterModule.forRoot([
      {
        path: '',
        component: NSH_HomeComponent
      },
      {
        path: 'sample',
        component: SampleComponent
      }
    ])
  ],
  declarations: [NSH_AppComponent, NSH_NavComponent, NSH_HeaderComponent, NSH_HomeComponent, SampleComponent],
  bootstrap: [NSH_AppComponent],
})
export class NSH_AppModule { }
