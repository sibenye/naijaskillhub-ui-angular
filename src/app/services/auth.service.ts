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
        return this._httpService.makeRequest(data, this.registerUrl);
    }

    login (emailAddress: string, password: string, credType = 'standard'): Observable<any> {
        let data = {'emailAddress': emailAddress, 
            'password' : password, 
            'credentialType': credType
        };
        return this._httpService.makeRequest(data, this.loginUrl);
    }

    getAuthStatus() {
        this.isAuthenticated = this._localStorageService.get('isLoggedIn') == true;
        return this.isAuthenticated;
    }

    public storeAuthToken(value: String){
        this._localStorageService.set('AUTH-TOKEN', value);
        this._localStorageService.set('isLoggedIn', true);
    }

    public getAuthToken() {
        return this._localStorageService.get('AUTH-TOKEN');
    }

    public logOut() {
        this._localStorageService.remove('AUTH-TOKEN');
        this._localStorageService.set('isLoggedIn', false);
        //redirect to home page.
        this._router.navigateByUrl('home');
    }

}