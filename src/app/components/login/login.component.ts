import {Component} from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from '../../providers';
import { NotificationsService } from 'angular2-notifications';
import { SimpleNotificationsComponent } from 'angular2-notifications';


@Component({
  selector: 'nsh-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class NSH_LoginComponent {
  emailAddress: string = '';
  password: string = '';
  submitted = false;
  spin = false;

  constructor(private _authService: AuthService, 
        private _notificationService: NotificationsService, 
        private _router: Router) {

  }

  onSubmit(){
    this.submitted = true;
    this.spin = true;
    //make http request
    this.login();
      
  }

  private login() {
    this._authService.login(this.emailAddress, this.password)
                        .subscribe(
                        response  => this.handleResponse(response, null),
                        error =>  this.handleResponse(null,error));
  }

  private handleResponse(response, error) {
        if (error) {
            //show error notification
            this._notificationService.error(error.message, 'emailAddress or password is invalid');
        } else if (response) {
            //save authToken
            this._authService.storeAuthToken(response.authToken);
            this._authService.storeLoggedInUserId(response.userId);
            //redirect to profile page.
            this._router.navigateByUrl('portfolio');
        }
        //stop spin
        this.spin = false;
        this.submitted = false;
    }
  
}
