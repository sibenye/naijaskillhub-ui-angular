import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Observable }     from 'rxjs/Observable';
import { Router, ActivatedRoute, Params } from '@angular/router';
// Add the RxJS Observable operators.
import '../../../rxjs-operators';


@Component({
  selector: 'nsh-portfolio-edit',
  templateUrl: 'portfolio_edit.component.html',
  styleUrls: ['portfolio_edit.component.css']
})
export class NSH_PortfolioEditComponent implements OnInit {

  selected: string;
  userId: string;

  constructor(
              private _route: ActivatedRoute,
              private _router: Router) {
    this.selected = 'profile';

  }

  ngOnInit () {
    this._route.params
    .switchMap((params: Params) => {this.userId = params['id']; let resp = Observable.of(this.userId); return resp;})
    .subscribe();
    
  }


}
