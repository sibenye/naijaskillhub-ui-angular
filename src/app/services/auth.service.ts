import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
// Add the RxJS Observable operators.
import '../rxjs-operators';

import { RegisterRequest } from '../models';

@Injectable()
export class AuthService {
    private registerUrl = 'http://naijaskillhub-api/register';  // URL to web API

    constructor (private http: Http) {}

    registerUser (request: RegisterRequest): Observable<any> {
        let data = JSON.stringify(request);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.registerUrl, data, options)
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
            const body = error.json() || '';
            const err = body.message || JSON.stringify(body);
            logMsg = '';
            errMsg = 'Unexpected error received from the API';
            if (body !== '' && body.messsage) {
                errMsg = body.message;
                logMsg = errMsg;
            } else {
                if (body !== '') {
                    logMsg = errMsg + ': ' + JSON.stringify(body);
                }
            }
        } else {
            logMsg = errMsg + error.message ? error.message : error.toString();
        }
        // TODO: we might use a remote logging infrastructure
        console.error(logMsg);
        return Observable.throw(errMsg);
    }
}