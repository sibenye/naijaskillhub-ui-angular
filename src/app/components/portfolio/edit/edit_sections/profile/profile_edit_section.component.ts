import { Component, Input, OnInit } from '@angular/core';
import { UserProfile } from '../../../../../models';
import { UserProfileService } from '../../../../../providers';
import { StateService } from '../../../../../providers';
import { NotificationsService } from 'angular2-notifications';
// Add the RxJS Observable operators.
import '../../../../../rxjs-operators';



@Component({
  selector: 'nsh-edit-section-profile',
  templateUrl: 'profile_edit_section.component.html',
  styleUrls: ['profile_edit_section.component.css']
})
export class NSH_ProfileEditSectionComponent implements OnInit {

  userProfile: UserProfile;
  states: string[];
  profileSaveBtnspin = false;
  imageSaveBtnspin = false;
  @Input() userId: string;

  constructor (private _userProfileService: UserProfileService, 
  private _stateService: StateService, private _notificationService: NotificationsService) {
    this.userProfile = this._userProfileService.userProfile;
  }

  ngOnInit () {
    this.states = this._stateService.getStates();
    this.getUserprofile();
  }

  getButtonText () {
    if (this.userProfile.profileImage != '') {
      return "Change Profile Image";
    } else {
      return "Add Profile Image";
    }
  }

  profileImageExists () {
    return this.userProfile.profileImage != '';
  }

  getFullImageUrl () {
    return "http://static-staging.naijaskillhub.com/dev/" + this.userProfile.profileImage
  }

  getUserprofile () {
    this._userProfileService.getUserProfile(this.userId)
    .subscribe(
      response  => this._userProfileService.handleResponse(response, null, 'profile'),
      error =>  this._userProfileService.handleResponse(null, error, 'profile')
    );
  }

  updateProfile () {
    this.profileSaveBtnspin = true;
    this._userProfileService.postUserProfile(this.userId, this.userProfile).subscribe(
      response  => {this.profileSaveBtnspin = false; this._userProfileService.handleResponse(response, null, 'profile', false)},
      error =>  {this.profileSaveBtnspin = false; this._userProfileService.handleResponse(null,error, 'profile', false)}
    );
  }

  uploadProfileImage(fileType, file) {
    this.imageSaveBtnspin = true
    this._userProfileService.postUserProfileImage(file, fileType).subscribe(
          response  => {this.imageSaveBtnspin = false; this._userProfileService.handleResponse(response, null, 'image', false)},
          error =>  {this.imageSaveBtnspin = false; this._userProfileService.handleResponse(null,error, 'image', false)}
        );
  }

  handleInputChange (event) {
    
    var file = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];

    var pattern = /image-*/;
    var reader = new FileReader();

    if (!file.type.match(pattern)) {
        this._notificationService.error("Invalid File", "File not an image");
        return;
    }

    let fileType = file.type;

    this.uploadProfileImage(fileType, file);

  }
  
}
