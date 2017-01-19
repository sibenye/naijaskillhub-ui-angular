import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router'
import { Observable }     from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
// Add the RxJS Observable operators.
import '../rxjs-operators';
import { LocalStorageService } from 'angular-2-local-storage';

@Injectable()
export class HttpService {
    private apiBaseUrl = 'http://naijaskillhub-api';
    headers = new Headers({ 'Content-Type': 'application/json' });
    options = new RequestOptions({ headers: this.headers });

    constructor (private _http: Http, 
    private _localStorageService: LocalStorageService,
    private _router: Router) {}

    makeRequest (data, endPoint: string): Observable<any> {
        let url = this.apiBaseUrl + endPoint;
        return this._http.post(url, data, this.options)
                        .map(this.extractData)
                        .catch(this.handleError);
    }

    private extractData(res: Response) {
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
