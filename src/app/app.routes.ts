import { Routes, RouterModule } from '@angular/router';
import {
  NSH_HomeComponent,
  SampleComponent,
  NSH_PortfolioViewComponent,
  NSH_PortfolioEditComponent,
  NSH_RegisterComponent,
  NSH_LoginComponent
} from './components';

export const ROUTES: Routes = [
  { path: '',      component: NSH_HomeComponent },
  { path: 'home',  component: NSH_HomeComponent },
  { path: 'portfolio', component: NSH_PortfolioViewComponent },
  { path: 'portfolio/:id/edit', component: NSH_PortfolioEditComponent },
  { path: 'sample', component: SampleComponent },
  { path: 'register', component: NSH_RegisterComponent},
  { path: 'login', component: NSH_LoginComponent}
];
