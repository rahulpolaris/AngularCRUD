import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../shared/Services/api.service';
// import { EmployeeModel } from '../shared/Models/employee-dashboard.model';
import { SignUpModel } from './signUp.model';


@Component({
  selector: 'app-signup',
  // encapsulation:ViewEncapsulation.None,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  signUpModelObj:SignUpModel =  new SignUpModel()
  formBlur!:{email:boolean,firstName:boolean,phone:boolean,password:boolean,cPassword:boolean}
  

  constructor(private formBuilder : FormBuilder, private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.formBlur = {email:false,firstName:false,phone:false,password:false,cPassword:false}
    this.signupForm = this.formBuilder.group({
      firstName:[''],
      lastName:[''],
      email:[''],
      phone:[''],
      // dob:[''],
      password:[''],
      confirmPassword:[''],
      // country:[''],
      // state:[''],
      // city:['']
    },{
      validators:[this.customPasswordCompareValidator('password','confirmPassword')]
    })
    this.signupForm.controls['email'].setValidators([Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
    this.signupForm.controls['phone'].setValidators([
      Validators.minLength(10),
      Validators.required
    ]);
    this.signupForm.controls['firstName'].setValidators([Validators.required])
  //  this.formBlur.email = false
  }
  // postEmployee():void{
  // this.signUpModelObj.date_of_birth = this.signupForm.value.dob
  // this.signUpModelObj.country = this.signupForm.value.country
  // this.signUpModelObj.state = this.signupForm.value.state
  // this.signUpModelObj.city = this.signupForm.value.city
  // const signUpPayLoad = new Map()

  
  // }
  onSignUpButtonClick():void {
    this.signUpModelObj.firstname = this.signupForm.value.firstName
    this.signUpModelObj.lastname = this.signupForm.value.lastName
    this.signUpModelObj.email = this.signupForm.value.email
    this.signUpModelObj.phone = this.signupForm.value.phone
    this.signUpModelObj.password = this.signupForm.value.password
    console.log(this.signUpModelObj)
  
    this.api.postEmployee(this.signUpModelObj).subscribe(res=>{
      console.log(res)
      if(res?.emailExists)
      {
        alert("User Already Exists with this email")
      }
      else{
        
        alert("SignUp Successful")
        this.signupForm.reset()
        this.router.navigate(['login'])
      }
    },err=>{
      if(err){
        console.log(err)
        alert("something  went wrong")
      }
    })
    // console.log(this.signUpModelObj)
  }
  onEmailBlur(){
    this.formBlur.email = true
  }
  private customPasswordCompareValidator(passwordControlName:string,cPasswordControlName:string):ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup =  control as FormGroup
      const valueOfPAssword = formGroup.get(passwordControlName)?.value
      const valueOfCPassword = formGroup.get(cPasswordControlName)?.value
      if (valueOfPAssword === valueOfCPassword)
      {
        return null
      }
      else
      {
        return {
          passwordsDoNotMatch: true
        }
      }  
    }

  }

}
