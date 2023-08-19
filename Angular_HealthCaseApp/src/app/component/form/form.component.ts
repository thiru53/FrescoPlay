import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Patient } from '../../models/patient';
import { DataService } from '../../services/data.service';
import { fn } from '@angular/compiler/src/output/output_ast';
// import * as alertify from 'alertify.js';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [DatePipe]
})
export class FormComponent implements OnInit {

  complexForm: FormGroup;
  patientDetails = new Patient;
  result;

  today: string;

  noRecordsFound = 'No patient records found in the list. Click on Register New Patient to add Patient details.';

  emptyFirstname = 'You must include a first name.';
  minlengthFirstname = 'Your first name must be at least 3 characters long.';
  maxlengthFirstname = 'Your first name cannot exceed 20 characters.';
  emptyLastname = 'You must include a last name.';
  minlengthLastname = 'Your last name must be at least 3 characters long.';
  maxlengthLastname = 'Your last name cannot exceed 20 characters.';
  noGender = 'You must select a gender.';
  noDob = 'You must select a valid date of birth.';
  noMobile = 'You must include mobile number.';
  numberMobile = 'You must enter a valid 10 digit mobile number.';
  maxlengthMobile = 'Your mobile number should not exceed 10 digits.';
  noEmail = 'You must include a valid email.';
  patternEmail = 'Pattern does not match.';

  ngOnInit() {
    this.today = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
  }

  constructor( fb: FormBuilder,private datePipe: DatePipe,private route: Router, private dataService: DataService){
    this.complexForm = fb.group({
      'firstName': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      'lastName': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      'gender': [null, Validators.required],
      'dob': [null, Validators.required],
      'mobile': ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^\d{10,}$/)]],
      'email': ['', [Validators.required, Validators.email]],
      'description': ''
    })
  }

  submitForm(value: any){

    // assign new date object to reportedTime
    // should reister new patient using service
    // if added successfully should redirect to 'patientList' page
  
    const patient = populatePatient(value);
    alert("patient : "+JSON.stringify(patient));
    this.dataService.registerPatient(patient).subscribe(res => {
      this.route.navigate(['patientList'])
    }, err => {

    })


  }

}

function populatePatient(value: any) : Patient {
  const patient:Patient = new Patient();
  patient.firstName = value['firstName'];
  patient.lastName = value['lastName'];
  patient.gender = value['gender'];
  patient.dob = value['dob'];
  patient.mobile = value['mobile'];
  patient.email = value['email'];
  patient.description = value['description'];
  return patient;
}
