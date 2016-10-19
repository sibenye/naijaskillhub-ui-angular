import {
  Component,
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';

export class Menu {
  name: string;
  route: string;
}

const MENU_ITEMS: Menu[] = [
  { name: 'Home', route: '/' },
  { name: 'Sample Page', route: '/sample' },
  { name: 'Contact', route: '' }
];

@Component({
  selector: 'nsh-nav',
  templateUrl: 'nav.component.html',
  styleUrls: ['nav.component.css'],
  animations: [
    trigger('menuState', [
      state('open', style({
        box: '0 3px 8px rgba(0, 0, 0, 0.2)',
        transform: 'translateY(50px)'
      })),
      state('closed',   style({
        transform: 'translateY(0)'
      })),
      transition('closed => open', animate('100ms ease-in')),
      transition('open => closed', animate('100ms ease-out'))
    ])
  ]
})
export class NSH_NavComponent {
  menuItems = MENU_ITEMS;
  menuStateValue = 'closed';

  toggleState(previousState: string): void {
    if (previousState == 'closed') {
      this.menuStateValue = 'open';
    } else {
      this.menuStateValue = 'closed';
    }
    
  }
  
}
