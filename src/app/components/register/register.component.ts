import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { RegisterRequest } from '../../models';
import { AuthService } from '../../services';
import { NotificationsService } from 'angular2-notifications';
import { SimpleNotificationsComponent } from 'angular2-notifications';


@Component({
  selector: 'nsh-register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css']
})
export class NSH_RegisterComponent {
    validEmail = false;
    validPassword = false;
    confirmedPassword = false;
    submitted = false;
    spin = false;
    passwordConfirm = '';
    accountTypes = ['talent', 'hunter']
    register :RegisterRequest;
    authToken: string;
    userEmailAddress: string;

    constructor(
        private _authService: AuthService, 
        private _notificationService: NotificationsService, 
        private _router: Router) {
        this.clearForm();
    }

    clearForm() {
        this.submitted = false;
        this.register = new RegisterRequest(this.accountTypes[0], 'standard', '', '', '', '');
    }

    resetFlags() {
        this.validEmail = false;
        this.validPassword = false;
        this.confirmedPassword = false;
    }

    onSubmit(){
        this.submitted = true;
        this.resetFlags();
        if (this.validateFormInput()){
            //start spin
            this.spin = true;
            //make http request
            this.registerUser();
        } else {
            this.submitted = false;
        }
        
    }

    validateFormInput(): boolean {
        //validate email
        this.validEmail = this.validateEmail(this.register.emailAddress);
        //validate password
        this.validPassword = this.validatePassword(this.register.password);
        //confirm password
        this.confirmedPassword = this.confirmPassword(this.register.password, this.passwordConfirm);

        return (this.validEmail && this.validPassword && this.confirmedPassword);
    }

    validateEmail(email: string): boolean{
        var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

        return (email.length > 4 && EMAIL_REGEXP.test(email));

    }

    validatePassword(password: string): boolean {
        return (password.length > 7 && password.length <= 100);
    }

    confirmPassword(password: string, passwordConfirm: string): boolean {
        return password === passwordConfirm;
    }

    registerUser () {
        this._authService.registerUser(this.register)
                        .subscribe(
                        response  => this.handleResponse(response, null),
                        error =>  this.handleResponse(null,error));
    }

    handleResponse(response, error) {
        if (error) {
            //show error notification
            this._notificationService.error('Invalid Request', error);
        } else if (response) {
            //save authToken and emailAddress as cookies
            this._authService.storeAuthToken(response.authToken);
            //redirect to profile page.
            this._router.navigateByUrl('portfolio/edit');
        }
        //stop spin
        this.spin = false;
        this.submitted = false;
    }
}
