import {
  Component,
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';

import { AuthService } from '../../services';

export class Menu {
  name: string;
  route: string;
}

const MENU_ITEMS: Menu[] = [
  { name: 'Portfolio', route: '/portfolio' },
  { name: 'Sample Page', route: '/sample' },
  { name: 'Contact', route: '/contact' }
];

@Component({
  selector: 'nsh-nav',
  templateUrl: 'nav.component.html',
  styleUrls: ['nav.component.css']
})
export class NSH_NavComponent {
  menuItems = MENU_ITEMS;

  constructor (public _authService: AuthService) {}

  isLoggedIn() {
    return this._authService.getAuthStatus();
  }
}
