import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { AuthService } from '../shared/Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: any;

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.checkLoginStatus()
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: [''],
    });
    this.loginForm.controls['email'].setValidators([Validators.required]);
    this.loginForm.controls['password'].setValidators([Validators.required]);
  }
  sendLoginRequest(val: { email: string; password: string }): any {
    this.auth.postLoginCredentials(val).subscribe((res: any) => {
      console.log(res);
      if (Object.keys(res).includes('emailExists')) {
        if (res.emailExists === false) {
          window.alert('this email  does not exist');
          this.loginForm.reset()
        } else {
          if (res?.passwordMatch === false){
            alert('wrong password')
            this.loginForm.controls['password'].reset()
          }
          else if(res?.passwordMatch === true)
          {
            alert('sign in successful')
            
            //here we redirect to user account
            this.router.navigate([`users/${val.email}`])
          }
        }
      }
    });
  }
  checkLoginStatus(){
    this.auth.getLoginStatus().subscribe((res:any)=>{
      if(Object.keys(res).includes('isSessionActive'))
      {
        if(res.isSessionActive)
        { 
          const sessionEmail =  res.sessionEmail
          this.router.navigate([`users/${sessionEmail}`])
        }
      }
    })
    return 
  }
  handleLoginSubmit() {
    const loginPayLoad = {email: this.loginForm.value.email, password: this.loginForm.value.password }
    this.sendLoginRequest(loginPayLoad)
    console.log('ok');
  }
}
