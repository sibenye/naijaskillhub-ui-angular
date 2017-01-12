import {Component} from '@angular/core';


@Component({
  selector: 'nsh-portfolio-edit',
  templateUrl: 'portfolio_edit.component.html',
  styleUrls: ['portfolio_edit.component.css']
})
export class NSH_PortfolioEditComponent {

  selected: string;

  constructor() {
    this.selected = 'profile';

  }
  
}
