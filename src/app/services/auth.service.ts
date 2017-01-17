import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
// Add the RxJS Observable operators.
import '../rxjs-operators';
import { RegisterRequest } from '../models';
import { LocalStorageService } from 'angular-2-local-storage';

@Injectable()
export class AuthService {
    private registerUrl = 'http://naijaskillhub-api/register';  // URL to web API
    public isAuthenticated = false;

    constructor (private _http: Http, private _localStorageService: LocalStorageService) {}

    registerUser (request: RegisterRequest): Observable<any> {
        let data = JSON.stringify(request);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post(this.registerUrl, data, options)
                        .map(this.extractData)
                        .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.response || { };
    }

    private handleError (error: Response | any) {
        let errMsg: string;
        let logMsg: string;
        if (error instanceof Response) {
            let body = error.json() || '';
            logMsg = '';
            errMsg = 'Unexpected error received from the API';
            if (body.message) {
                errMsg = body.message + ': ' + body.messageDetail;
                logMsg = errMsg;
            } else {
                if (body !== '') {
                    logMsg = errMsg + ': ...' + JSON.stringify(body);
                }
            }
        } else {
            logMsg = errMsg + ': ' + error.message ? error.message : error.toString();
        }
        // TODO: we might use a remote logging infrastructure
        console.log(logMsg);
        return Observable.throw(errMsg);
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

    public logout() {
        this._localStorageService.remove('AUTH-TOKEN');
        this._localStorageService.set('isLoggedIn', false);
    }

}