import {Component} from '@angular/core';
import { Router }   from '@angular/router';
import { NavigationEnd }   from '@angular/router';


@Component({
  selector: 'nsh-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})
export class NSH_AppComponent {
  title = 'Naija Skill Hub';

  constructor(router: Router) {
    router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
        window.scroll(0, 0);
    });
  }

  public notificationOptions = {
      position: ["bottom", "right"],
      timeOut: 7000,
      lastOnBottom: true,
      maxLength: 50,
      preventDuplicates: true,
      preventLastDuplicates: "visible"
  }
}
