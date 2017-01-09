import { Routes, RouterModule } from '@angular/router';
import {NSH_HomeComponent} from './home';
import {SampleComponent} from './sample';
import {NSH_PortfolioViewComponent} from './portfolio';
import {NSH_PortfolioEditComponent} from './portfolio';
import {NSH_RegisterComponent} from './register';
import {NSH_LoginComponent} from './login';



//import { DataResolver } from './app.resolver';


export const ROUTES: Routes = [
  { path: '',      component: NSH_HomeComponent },
  { path: 'home',  component: NSH_HomeComponent },
  { path: 'portfolio', component: NSH_PortfolioViewComponent },
  { path: 'portfolio/edit', component: NSH_PortfolioEditComponent },
  { path: 'sample', component: SampleComponent },
  { path: 'register', component: NSH_RegisterComponent},
  { path: 'login', component: NSH_LoginComponent}
];
