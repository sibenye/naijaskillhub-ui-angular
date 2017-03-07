import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router'
import { Observable }     from 'rxjs/Observable';
import { Headers, Request, RequestOptions } from '@angular/http';
// Add the RxJS Observable operators.
import '../rxjs-operators';
import { LocalStorageService } from 'angular-2-local-storage';

@Injectable()
export class HttpService {
    private apiBaseUrl = 'http://api-staging.naijaskillhub.com';
    headers: Headers = new Headers();
    

    constructor (private _http: Http, 
    private _localStorageService: LocalStorageService,
    private _router: Router) {}

    postRequest (data, endPoint: string, contentType: string, addAuth = false): Observable<any> {
        let url = this.apiBaseUrl + endPoint;
        this.headers.set('Content-Type', contentType);
        this.addAuthHeader(addAuth);
        let options = new RequestOptions({ headers: this.headers });
        return this._http.post(url, data, options)
                        .map(this.extractData)
                        .catch(this.handleError);
    }

    getRequest (urlPath: string, addAuth = false): Observable<any> {
        let url = this.apiBaseUrl + urlPath;
        this.headers.set('Content-Type', 'text/html');
        this.addAuthHeader(addAuth);
        let options = new RequestOptions({ headers: this.headers });
        return this._http.get(url, options)
                        .map(this.extractData)
                        .catch(this.handleError);
    }

    makeRequest (endPoint: string, method: string, body = null, headers: Headers = new Headers(), addAuth = false): Observable<any> {
        let url = this.apiBaseUrl + endPoint;
        this.headers = headers;
        this.addAuthHeader(addAuth);
        if (method == 'GET') {
            let options = new RequestOptions({ headers: this.headers });
            return this._http.get(url, options)
                            .map(this.extractData)
                            .catch(this.handleError);
        } else if (method == 'POST') {
            let options = new RequestOptions({ headers: this.headers });
            return this._http.post(url, body, options)
                            .map(this.extractData)
                            .catch(this.handleError);
        }
    }

    private addAuthHeader (addAuth = false) {
        this.headers.set('NSH-API-KEY', '3JG11ML5uT6Vz5SIypE6FL0552gUdkos');
        if (addAuth) {
            this.headers.set('NSH-AUTH-TOKEN', this._localStorageService.get('NSH-AUTH-TOKEN').toString());
        } else {
            this.headers.delete('NSH-AUTH-TOKEN');
        }
    }

    private extractData (res: Response) {
        let body = res.json();
        return body.response || { };
    }

    private handleError (error: Response | any) {
        let errMsg = {};
        let logMsg: string;
        if (error instanceof Response) {
            let body = error.json() || '';
            logMsg = '';
            errMsg['message'] = 'Unexpected error received from the API';
            if (body.message) {
                errMsg['code'] = body.code;
                errMsg['message'] = body.message;
                errMsg['messageDetail'] = body.messageDetail;
                logMsg = body.message + ':' + body.messageDetail;
            } else {
                if (body !== '') {
                    logMsg = errMsg['message'] + ': ...' + JSON.stringify(body);
                }
            }
        } else {
            logMsg = errMsg['message'] + ': ' + error.message ? error.message : error.toString();
        }
        // TODO: we might use a remote logging infrastructure
        console.log(logMsg);
        return Observable.throw(errMsg);
    }
}
