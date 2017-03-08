import { Injectable } from '@angular/core';
import { UserProfile } from '../models';
import { HttpService } from './http.service';
import { Observable }     from 'rxjs/Observable';
import { Headers } from '@angular/http';
import { NotificationsService } from 'angular2-notifications';

@Injectable()
export class UserProfileService {
    userProfile: UserProfile;

    constructor (private _httpService: HttpService, private _notificationService: NotificationsService) {
        this.userProfile = new UserProfile();
    }

    getUserProfile(userId): Observable<any> {
        let endPoint = '/users/' + userId +'/attributes';
        return this._httpService.getRequest(endPoint);
    }

    postUserProfile(userId, userProfile: UserProfile): Observable<any> {
        let endPoint = '/users/' + userId +'/attributes';
        let requestData = JSON.stringify(userProfile);
        return this._httpService.postRequest(requestData, endPoint, 'application/json', true);
    }

    postUserProfileImage (image, type) {
        let endPoint = '/upload/profileImage';
        let contentType = type;
        let headers = new Headers();
        headers.set('Content-Type', 'application/octet-stream');
        headers.set('Upload-Content-Type', type)
        return this._httpService.makeRequest(endPoint, 'POST', image, headers, true);
    }

    handleResponse (response, error, type: string, isRetreive = true) {
        if (error) {
            //log error
            console.error(error);
            this._notificationService.error(error.message, error.messageDetail);
        } else if (response) {
            if (isRetreive) {
                this.parseResponse(response);
            } else {
                if (type == 'image') {
                    this.userProfile.profileImage = response.filePath;
                }
                this._notificationService.success("Saved", null);
            }

        }
    }

    parseResponse (response) {
        response.attributes.forEach(element => {
            switch (element.attributeName) {
                case 'firstName':
                    this.userProfile.firstName = element.attributeValue
                    break;
                case 'lastName':
                    this.userProfile.lastName = element.attributeValue
                    break;
                case 'gender':
                    this.userProfile.gender = element.attributeValue
                    break;
                case 'yob':
                    this.userProfile.yob = element.attributeValue
                    break;
                case 'city':
                    this.userProfile.city = element.attributeValue
                    break;
                case 'state':
                    this.userProfile.state = element.attributeValue
                    break;
                case 'profileImage':
                    this.userProfile.profileImage = element.attributeValue
                    break;
                default:
                    break;
            }
        });
    }
}