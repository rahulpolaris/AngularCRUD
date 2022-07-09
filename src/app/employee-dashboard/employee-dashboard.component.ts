import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { EmployeeModel } from './employee-dashboard.model';
import { ApiService } from '../shared/api.service';
import { CscapiService } from '../cscapi.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css'],
})
export class EmployeeDashboardComponent implements OnInit, OnChanges {
  formValue!: FormGroup;
  employeeModelObj: EmployeeModel = new EmployeeModel();
  employeeData!: any;
  showAdd!: boolean;
  showUpdate!: boolean;
  emailValidated!: boolean;
  phoneInput!: string;
  countries!: any
  states!: any[]
  cities!: any[]
  

  constructor(private formbuilder: FormBuilder, private api: ApiService, private cscapi: CscapiService) {}

  ngOnInit(): void {
    this.showAdd = true;
    this.showUpdate = false;
    console.log(this.countries)
    this.formValue = this.formbuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      phone: [''],
      age: [''],
      countryname:[''],
      statename:[''],
      cityname:['']
    },{
      validators : this.customAgeValidation('age')
    });
    this.getAllEmployee();
    // this.getCountries()
    this.formValue.controls['email'].setValidators([
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]);
    this.formValue.controls['phone'].setValidators([
      Validators.minLength(10),
      Validators.required,
    ]);
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
  clickAddEmployee() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
    this.getCountries()
  }
  clickUpdateEmployee() {
    // this.formValue.reset()
    this.showAdd = !true;
    this.showUpdate = !false;
  }
  resetOnClose(){
    this.formValue.reset()
    this.countries = [];
    this.states = [];
    this.cities=[];
  }

  postEmployeeDetail() {
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.phone = this.formValue.value.phone;
    this.employeeModelObj.age = this.formValue.value.age;
    this.employeeModelObj.countryname = this.formValue.value.countryname.name;
    this.employeeModelObj.statename = this.formValue.value.statename.name;
    this.employeeModelObj.cityname = this.formValue.value.cityname.name;

    this.api.postEmployee(this.employeeModelObj).subscribe(
      (res) => {
        console.log(res);
        alert('employee added successfully');
        let ref = document.getElementById('closebutton');
        ref?.click();
        this.formValue.reset();
        this.getAllEmployee();
      },
      (err) => {
        alert('something went wrong');
      }
    );
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
  getAllEmployee() {
    this.api.getEmployee().subscribe((res) => {
      this.employeeData = res;
      console.log(this.employeeData)
    });
  }
  deleteEmployee(row: any) {
    this.api.deleteEmployee(row.id).subscribe(
      (res) => {
        alert('Employee Removed');
        this.getAllEmployee();
      },
      (err) => {
        alert('something went wrong');
        console.error(err);
      }
    );
  }
  onEdit(row: any) {
    this.getCountries()
    this.clickUpdateEmployee();
    this.employeeModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['phone'].setValue(row.phone);
    this.formValue.controls['age'].setValue(row.age);
    this.formValue.controls['countryname'].setValue(row.countryname);
    this.formValue.controls['statename'].setValue(row.statename);
    this.formValue.controls['cityname'].setValue(row.cityname);
    
  }
  onUpdateEmployee() {
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.phone = this.formValue.value.phone;
    this.employeeModelObj.age = this.formValue.value.age;
    this.employeeModelObj.countryname = this.formValue.value.countryname.name;
    this.employeeModelObj.statename = this.formValue.value.statename.name;
    this.employeeModelObj.cityname = this.formValue.value.cityname.name;

    

    this.api
      .updateEmployee(this.employeeModelObj, this.employeeModelObj.id)
      .subscribe((res) => {
        alert('updated successfully');
        let ref = document.getElementById('closebutton');
        ref?.click();
        this.formValue.reset();
        this.getAllEmployee();
      });
  }
  private customAgeValidation(controlAgeName:string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup =  control as FormGroup
      const valueOfAge = formGroup.get(controlAgeName)?.value
      // console.log(valueOfAge)
      if (parseFloat(valueOfAge)>10 && parseFloat(valueOfAge)<120) {
        return null;
      } else {
        return  {
          wrongAge: true
        }
      }
    };
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
}
