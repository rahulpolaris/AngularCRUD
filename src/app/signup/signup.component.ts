import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { ApiService } from '../shared/Services/api.service';
import { EmployeeModel } from '../shared/Models/employee-dashboard.model';


@Component({
  selector: 'app-signup',
  // encapsulation:ViewEncapsulation.None,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  employeeModelObj!:EmployeeModel
  

  constructor(private formBuilder : FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      firstName:[''],
      lastName:[''],
      email:[''],
      phone:[''],
      dob:[''],
      password:[''],
      confirmPassword:[''],
      country:[''],
      state:[''],
      city:['']
    })
  }
  postEmployee():void{
  this.employeeModelObj.firstname = this.signupForm.value.firstName
  this.employeeModelObj.lastname = this.signupForm.value.lastName
  this.employeeModelObj.email = this.signupForm.value.email
  this.employeeModelObj.phone = this.signupForm.value.phone
  this.employeeModelObj.date_of_birth = this.signupForm.value.dob
  this.employeeModelObj.country = this.signupForm.value.country
  this.employeeModelObj.state = this.signupForm.value.state
  this.employeeModelObj.city = this.signupForm.value.city
  }
  onSignUpButtonClick():void {
    this.api
  }

}
