import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
// import { AuthGuard } from '../shared/guards/auth.guard';
import { EmployeeModel } from '../shared/Models/employee-dashboard.model';
import { AuthService } from '../shared/Services/auth.service';
import { ApiService } from '../shared/Services/api.service';
import { CscapiService } from '../shared/Services/cscapi.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  routeEmailParam!:any
  user:EmployeeModel =  new EmployeeModel(); 
  formValue!: FormGroup;

  employeeModelObj: EmployeeModel = new EmployeeModel();

  countries!: any

  states!: any[]

  cities!: any[]

  formBlur!: {email:boolean,date_of_birth:boolean,age:boolean,phone:boolean}


  constructor(private activeRoute: ActivatedRoute, private router: Router, private authService : AuthService, private formbuilder: FormBuilder,  private api: ApiService, private cscapi: CscapiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName: [''],
      lastName: [' '],
      email: [''],
      phone: [''],
      date_of_birth:[''],
      age: [''],
      countryname:[''],
      statename:[''],
      cityname:['']
    },{
      validators : [this.customDobValidation('date_of_birth')]
    });

    // this.getCountries()  
    this.formValue.controls['email'].setValidators([
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]);
    this.formValue.controls['phone'].setValidators([
      Validators.minLength(10),
      Validators.required,
    ]);
    

    // this.user = {firstname:"",lastname:"",email:"",phone:"",country:"",state:"",city:""}
    // this.user = new EmployeeModel
   
    this.routeEmailParam= this.activeRoute.params
    console.log(this.routeEmailParam.value.email)
    this.getUserDetails()
  }
  resetOnClose(){
    this.formValue.reset()
    this.countries = [];
    this.states = [];
    this.cities=[];
  }
  onDOBChange():void {
    console.log(this.formValue.controls['date_of_birth'].value)
  }
  onCountryChange(event:any): void{
    let countryObj = this.formValue.controls['countryname'].value
this.getStates(countryObj.id)
    this.cities = []
    console.log(this.states)
   
  }
  onStateChange(event:any): void{
    let StateObjIsoCode = this.formValue.controls['statename'].value.id
    console.log("State id is: ",StateObjIsoCode)
   this.getCities(StateObjIsoCode)
  }

  onEmailBlur():void{

    this.formBlur.email = true

  }

  // checkLoginStatus(){
  //   this.authService.getLoginStatus().subscribe((res:any)=>{
  //     if(Object.keys(res).includes('isSessionActive'))
  //     {
  //       if(res.isSessionActive)
  //       {
  //         // window.alert("a Session is already in progress")
  //       }
  //       else
  //       {
  //         this.router.navigate(['login'])
  //       }
  //     }
  //   })
  // }

  getUserDetails(){
    this.authService.getUserDetail(this.routeEmailParam.value.email).subscribe((res:any)=>{
       if(Object.keys(res).includes('isUserLoggedIn')){
        if(res.isUserLoggedIn){
          console.log(res.rows)
          this.user.id = res.rows[0].emp_id
          this.user.firstname = res.rows[0].firstname
          this.user.lastname = res.rows[0].lastname
          this.user.email = res.rows[0].email
          this.user.phone = res.rows[0].phone
          this.user.date_of_birth = res.rows[0].date_of_birth
          this.user.country = res.rows[0].country
          this.user.state = res.rows[0].state
          this.user.city = res.rows[0].city
          // this.user = res.rows[0]
        
        }
        else{
          this.router.navigate(['login'])
        }
       }
    })

  }
  getMeOutOfHere(){
    this.authService.logOutUser(this.routeEmailParam.value.email).subscribe((res:any)=>{
      if(res?.sessionDestroyed)
      {
        alert("User Has been logged Out")
        this.router.navigate(['login'])
      }
      else{
        alert("something went wrong")
      }
    })
  }

  onEdit() {
    console.log("Edit Profile Triggederd")
    console.log(this.user)
    const date : Date = new Date(this.user.date_of_birth)
    const monthStr = (date:Date):string =>{
      const m = date.getUTCMonth()+1
      if(m<10)
      {
        return `0${m}`
      }
      else
      {
        return `${m}`
      }
    }
    const dateStr = (date:Date):string =>{
      const m = date.getUTCDate()
      if(m<10)
      {
        return `0${m}`
      }
      else
      {
        return `${m}`
      }


    }
    const DateStr = `${date.getFullYear()}-${monthStr(date)}-${dateStr(date)}`
    this.getCountries()
    this.employeeModelObj.id = this.user.id;
    this.formValue.controls['firstName'].setValue(this.user.firstname);
    this.formValue.controls['lastName'].setValue(this.user.lastname);
    this.formValue.controls['email'].setValue(this.user.email);
    this.formValue.controls['phone'].setValue(this.user.phone);
    this.formValue.controls['date_of_birth'].setValue(DateStr)
    // this.formValue.controls['age'].setValue(this.user.age);
    this.formValue.controls['countryname'].setValue(this.user.country);
    this.formValue.controls['statename'].setValue(this.user.state);
    this.formValue.controls['cityname'].setValue(this.user.city);
    
  }
  onUpdateEmployee() {
    this.employeeModelObj.firstname = this.formValue.value.firstName;
    this.employeeModelObj.lastname = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.phone = this.formValue.value.phone;
    this.employeeModelObj.date_of_birth = this.formValue.value.date_of_birth;
    // this.employeeModelObj.age = this.formValue.value.age;
    this.employeeModelObj.country = this.formValue.value.countryname.name;
    this.employeeModelObj.state = this.formValue.value.statename.name;
    this.employeeModelObj.city = this.formValue.value.cityname.name;

    

    this.api
      .updateEmployee(this.employeeModelObj, this.employeeModelObj.id)
      .subscribe((res) => {
        alert('updated successfully');
        let ref = document.getElementById('closebutton');
        ref?.click();
        this.formValue.reset();
        // this.getAllEmployee();
      });
  }



  getCountries(){
    this.cscapi.getCountries(null).subscribe((res)=>{
      this.countries = res;
      // this.cities = [""]
      // console.log(this.countries)
    },err =>{
      console.log(err)
    })
  }
  getStates(arg:number){
    this.cscapi.getStates(arg).subscribe((res)=>{
      // console.log(res)
      this.states = res
    },err => {
      console.log(err)
    })
  }
  getCities(arg:number){
    this.cscapi.getCities(arg).subscribe((res)=>{
    this.cities = res
    },err => {
      console.log(err)
    })
  }



  private customDobValidation(controlDobName:string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>{
      const formGroup = control as FormGroup
      const valueOfDOB =  formGroup.get(controlDobName)?.value
      // console.log(valueOfDOB)
      const currentDate = new Date()
      const acquiredDate = new Date(valueOfDOB)
      if (currentDate.getFullYear()-acquiredDate.getFullYear()<10)
      {
        return {
          wrongDate: true
        }
      }
      else {
        return null
      }
        //       return {
        //   wrongDate: true
        // }

    }
  }


}
