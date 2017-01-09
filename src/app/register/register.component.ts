import {Component} from '@angular/core';


@Component({
  selector: 'nsh-register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css']
})
export class NSH_RegisterComponent {
    selected: string;

    constructor() {
        this.selected = 'talent';

    }
  
}
