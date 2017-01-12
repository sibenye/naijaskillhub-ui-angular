import { Component } from '@angular/core';
import { RegisterRequest } from '../../models';
import { AuthService } from '../../services';


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
    passwordConfirm = '';
    accountTypes = ['talent', 'hunter']
    register :RegisterRequest;
    authToken: string;
    userEmailAddress: string;
    successResponse = {};
    errorMessage = null;

    constructor(private authService: AuthService) {
        this.clearForm();
    }

    clearForm() {
        this.submitted = false;
        this.register = new RegisterRequest(this.accountTypes[0], 'standard', '', '', '', '');
    }

    onSubmit(){
        this.submitted = true;
        if (this.validateFormInput()){
            //start spin
            //make http request
            this.registerUser();
        }
        //stop spin
        if (this.errorMessage) {
            //show error notification
        } else {
            //save authToken and emailAddress as cookies
            //redirect to profile page.
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
    
    this.authService.registerUser(this.register)
                     .subscribe(
                       response  => this.successResponse = response,
                       error =>  this.errorMessage = <any>error);
  }

    // TODO: Remove this when we're done
  //get diagnostic() { return JSON.stringify(this.register); }
  
}
