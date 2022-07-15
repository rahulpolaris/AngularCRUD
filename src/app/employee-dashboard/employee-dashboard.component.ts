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
import { ApiService } from '../shared/Services/api.service';
import { CscapiService } from '../shared/Services/cscapi.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css'],
})
export class EmployeeDashboardComponent implements OnInit, OnChanges {
  formValue!: FormGroup;
  sortForm!: FormGroup;
  filterForm!: FormGroup;
  employeeModelObj: EmployeeModel = new EmployeeModel();
  employeeData!: any;
  showAdd!: boolean;
  showUpdate!: boolean;
  emailValidated!: boolean;
  phoneInput!: string;
  countries!: any
  states!: any[]
  cities!: any[]
  formBlur!: {email:boolean,date_of_birth:boolean,age:boolean,phone:boolean}
  page: number = 1;
  count: number = 0;
  tableSize: number =2;
  tableSizes: number[]= [2,3,4,5,10,15,20]
  

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
      date_of_birth:[''],
      age: [''],
      countryname:[''],
      statename:[''],
      cityname:['']
    },{
      validators : [this.customDobValidation('date_of_birth')]
    });
    this.sortForm = this.formbuilder.group({
      sortby:['id'],
      order:['asc']
    })
    this.filterForm = this.formbuilder.group({
      filter:['']
    })

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
    this.formBlur = {email:false,date_of_birth:false, age:false,phone:false}
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
    this.employeeModelObj.firstname = this.formValue.value.firstName;
    this.employeeModelObj.lastname = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.phone = this.formValue.value.phone;
    this.employeeModelObj.date_of_birth = this.formValue.value.date_of_birth;
    // this.employeeModelObj.age = this.formValue.value.age;
    this.employeeModelObj.country = this.formValue.value.countryname.name;
    this.employeeModelObj.state = this.formValue.value.statename.name;
    this.employeeModelObj.city = this.formValue.value.cityname.name;

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
      // console.log(this.employeeData)
    });
  }
  getAllSortedEmployee(sortby:string,order:string){
    this.api.getSortedEmployee(sortby,order).subscribe((res)=> {
      this.employeeData = res;
    })
  }
  getAllfilteredEmployee(filter:string){
    this.api.getFilteredEmployee(filter).subscribe((res)=>{
      this.employeeData = res
    })
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
    const date : Date = new Date(row.date_of_birth)
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
    this.clickUpdateEmployee();
    this.employeeModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstname);
    this.formValue.controls['lastName'].setValue(row.lastname);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['phone'].setValue(row.phone);
    this.formValue.controls['date_of_birth'].setValue(DateStr)
    // this.formValue.controls['age'].setValue(row.age);
    this.formValue.controls['countryname'].setValue(row.country);
    this.formValue.controls['statename'].setValue(row.state);
    this.formValue.controls['cityname'].setValue(row.city);
    
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
        this.getAllEmployee();
      });
  }


  //custom validations....
  // private customAgeValidation(controlAgeName:string): ValidatorFn {
  //   return (control: AbstractControl): ValidationErrors | null => {
  //     const formGroup =  control as FormGroup
  //     const valueOfAge = formGroup.get(controlAgeName)?.value
  //     // console.log(valueOfAge)
  //     if (parseFloat(valueOfAge)>10 && parseFloat(valueOfAge)<120) {
  //       return null;
  //     } else {
  //       return  {
  //         wrongAge: true
  //       }
  //     }
  //   };
  // }
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
  onClickGetSortedEmployees():void{
    if(this.sortForm.controls['sortby'].value.length===0 || this.sortForm.controls['order'].value.length === 0)
    {
      // const sb ='id'
      // const o = 'asc'
      this.getAllSortedEmployee('id','asc')
    }
    this.getAllSortedEmployee(this.sortForm.controls['sortby'].value,this.sortForm.controls['order'].value)
  }
 onClickFilteredEmployees():void { 
  if (this.filterForm.controls['filter'].value.length === 0)
  {
    return
  }
  this.getAllfilteredEmployee(this.filterForm.controls['filter'].value)

 }
  //form change events
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
  onSortChange():void {
    console.log(this.sortForm.value.sortby,this.sortForm.value.order)
  }

  //form blur events
  onEmailBlur():void{
    this.formBlur.email = true
    
  }


  onTableDataChange(event:any){
    this.page = event
    this.getAllEmployee();
  }
  onTableSizeChange(event :any){
    this.tableSize = event.target.value
    this.page = 1;
    this.getAllEmployee();
  }
}
