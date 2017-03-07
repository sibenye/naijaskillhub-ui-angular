import {
  Component,
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';

import { Observable }     from 'rxjs/Observable';
import { Router, ActivatedRoute, Params } from '@angular/router';
// Add the RxJS Observable operators.
import '../../rxjs-operators';

import { AuthService } from '../../providers';

export class Menu {
  name: string;
  route: string;
}

@Component({
  selector: 'nsh-nav',
  templateUrl: 'nav.component.html',
  styleUrls: ['nav.component.css']
})
export class NSH_NavComponent {
  
  currentUserId: string;

  constructor (public _authService: AuthService, 
              private _route: ActivatedRoute,
              private _router: Router) 
  {
    
  }

  isLoggedIn() {
    return this._authService.getAuthStatus();
  }

  logOut() {
    this._authService.logOut();
  }

  navigateTo(path) {
    this._router.navigateByUrl(path);
  }

  getMenuItems() {
    this.currentUserId = this._authService.getLoggedInUserId().toString();
    const MENU_ITEMS: Menu[] = [
      { name: 'Edit Portfolio', route: '/portfolio/' + this.currentUserId + '/edit' },
      { name: 'Portfolio', route: '/portfolio' },
      { name: 'Sample Page', route: '/sample' }
    ];
    return MENU_ITEMS;
  }
}
