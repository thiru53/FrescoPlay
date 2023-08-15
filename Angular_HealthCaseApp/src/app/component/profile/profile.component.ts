import { Component, OnInit, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Users } from '../../models/users.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  editProfile = false;
  userId = -1;
  userDetails = new Users;

  editProfileForm: FormGroup;
  userImg = './../../assets/user.jpg';
  mobileErrMsg = 'You must enter a valid mobile number';
  emailErrMsg = 'You must enter a valid Email ID';
  locationErrMsg = 'You must enter the location';

  constructor(private dataService: DataService) { }

  ngOnInit() {

    // add necessary validators
    // username should be disabled. it should not be edited

    this.editProfileForm = new FormGroup({
      userName: new FormControl({ value: '', disabled: true }, Validators.required),
      mobile: new FormControl('', [Validators.minLength(10), Validators.maxLength(10)]),
      email: new FormControl('', Validators.email),
      location: new FormControl('', Validators.required)
    });

    // get login status from service
    // get userId from service and assign it to userId property
    this.userId = this.dataService.getUserId();
    // get profile details and display it
    this.getProfileDetails();

  }

  changeMyProfile() {

    // if successfully changed the profile it should display new details hiding the form

  }

  editMyProfile() {

    // change editProfile property value appropriately

  }

  discardEdit() {

    // change editProfile property value appropriately

  }

  getProfileDetails() {

    // retrieve user details from service using userId
    console.log('UserProfile for id:',this.userId)
    this.dataService.getUserDetails(this.userId) .subscribe(data => {
      console.log('UserProfile:',data);
      this.userDetails = data;
    }, err => {
      this.userDetails = new Users();
    });

  }
  
}
