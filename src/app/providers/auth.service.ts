import { Injectable }     from '@angular/core';
import { Router } from '@angular/router'
import { Observable }     from 'rxjs/Observable';
import { HttpService } from './http.service';
import { RegisterRequest } from '../models';
import { LocalStorageService } from 'angular-2-local-storage';

@Injectable()
export class AuthService {
    private registerUrl = '/register';
    private loginUrl = '/login';
    public isAuthenticated = false;

    constructor (private _httpService: HttpService,
    private _localStorageService: LocalStorageService,
    private _router: Router) {}

    registerUser (request: RegisterRequest): Observable<any> {
        let data = JSON.stringify(request);
        return this._httpService.postRequest(data, this.registerUrl, 'application/json');
    }

    login (emailAddress: string, password: string, credType = 'standard'): Observable<any> {
        let data = {'emailAddress': emailAddress, 
            'password' : password, 
            'credentialType': credType
        };
        return this._httpService.postRequest(data, this.loginUrl, 'application/json');
    }

    getAuthStatus() {
        this.isAuthenticated = this._localStorageService.get('isLoggedIn') == true;
        return this.isAuthenticated;
    }

    public storeAuthToken(value: string){
        this._localStorageService.set('NSH-AUTH-TOKEN', value);
        this._localStorageService.set('isLoggedIn', true);
    }

    public storeLoggedInUserId(userId) {
        this._localStorageService.set('loggedInUserId', userId);
    }

    public getAuthToken() {
        return this._localStorageService.get('NSH-AUTH-TOKEN');
    }

    public getLoggedInUserId() {
        
        return (this._localStorageService.get('loggedInUserId')) ? this._localStorageService.get('loggedInUserId') : "";
    }

    public logOut() {
        this._localStorageService.remove('NSH-AUTH-TOKEN');
        this._localStorageService.set('isLoggedIn', false);
        this._localStorageService.set('loggedInUserId', null);
        //redirect to home page.
        this._router.navigateByUrl('home');
    }

}