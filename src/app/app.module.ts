import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MaterialModule} from '@angular/material';
import { RouterModule }   from '@angular/router';
import { ResponsiveModule } from 'ng2-responsive';

import { ToggleTemplateDirective } from './directives/toggleTemplate.directive';

import {NSH_AppComponent} from './app.component';
import { ROUTES } from './app.routes';
import {SampleComponent} from './sample';
import {NSH_NavComponent} from './nav';
import {NSH_FooterComponent} from './footer';
import {NSH_HeroComponent} from './hero';
import {NSH_HomeComponent} from './home';
import {NSH_PortfolioViewComponent} from './portfolio';
import {NSH_PortfolioEditComponent} from './portfolio';
import {NSH_ExperienceEditSectionComponent} from './portfolio';
import {NSH_MediaEditSectionComponent} from './portfolio';
import {NSH_PhysicEditSectionComponent} from './portfolio';
import {NSH_ProfileEditSectionComponent} from './portfolio';
import {NSH_VoiceClipsViewSectionComponent} from './portfolio';
import {NSH_VideosViewSectionComponent} from './portfolio';
import {NSH_PhotosViewSectionComponent} from './portfolio';
import {NSH_CreditsViewSectionComponent} from './portfolio';
import {NSH_PhysicViewSectionComponent} from './portfolio';

@NgModule({
  imports: [
    BrowserModule,
    MaterialModule.forRoot(),
    ResponsiveModule,
    RouterModule.forRoot(ROUTES)
  ],
  declarations: [NSH_AppComponent,
   NSH_NavComponent,
   NSH_FooterComponent,
   NSH_HeroComponent,
   NSH_HomeComponent,
   NSH_PortfolioViewComponent,
   NSH_PortfolioEditComponent,
   SampleComponent,
   ToggleTemplateDirective,
   NSH_ExperienceEditSectionComponent,
   NSH_MediaEditSectionComponent,
   NSH_PhysicEditSectionComponent,
   NSH_ProfileEditSectionComponent,
   NSH_VoiceClipsViewSectionComponent,
   NSH_VideosViewSectionComponent,
   NSH_PhotosViewSectionComponent,
   NSH_CreditsViewSectionComponent,
   NSH_PhysicViewSectionComponent],
  bootstrap: [NSH_AppComponent],
})
export class NSH_AppModule { }
