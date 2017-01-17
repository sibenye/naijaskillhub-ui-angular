//import Angular modules
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '@angular/material';
import { RouterModule }   from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ResponsiveModule } from 'ng2-responsive';
import { HttpModule, JsonpModule } from '@angular/http';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { LocalStorageModule } from 'angular-2-local-storage';


//import NSH Components
import { NSH_AppComponent } from './app.component';
import { ROUTES } from './app.routes';
import { 
    SampleComponent,
    NSH_NavComponent,
    NSH_FooterComponent,
    NSH_HeroComponent,
    NSH_HomeComponent,
    NSH_PortfolioViewComponent,
    NSH_PortfolioEditComponent,
    NSH_ExperienceEditSectionComponent,
    NSH_MediaEditSectionComponent,
    NSH_PhysicEditSectionComponent,
    NSH_ProfileEditSectionComponent,
    NSH_VoiceClipsViewSectionComponent,
    NSH_VideosViewSectionComponent,
    NSH_PhotosViewSectionComponent,
    NSH_CreditsViewSectionComponent,
    NSH_PhysicViewSectionComponent,
    NSH_RegisterComponent,
    NSH_LoginComponent
} from './components';

//import directives, providers, and services
import { ToggleTemplateDirective } from './directives/toggleTemplate.directive';
import { AuthService } from './services';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule.forRoot(),
    RouterModule.forRoot(ROUTES),
    NgbModule.forRoot(),
    ResponsiveModule,
    HttpModule,
    JsonpModule,
    SimpleNotificationsModule,
    LocalStorageModule.withConfig({
            prefix: 'nsh-app',
            storageType: 'localStorage'
        })
  ],
  declarations: [
    NSH_AppComponent,
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
    NSH_PhysicViewSectionComponent,
    NSH_RegisterComponent,
    NSH_LoginComponent
  ],
  providers: [AuthService],
  bootstrap: [ NSH_AppComponent ]
})
export class NSH_AppModule { }
