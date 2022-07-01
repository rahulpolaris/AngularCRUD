import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeModel } from './employee-dashboard.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css'],
})
export class EmployeeDashboardComponent implements OnInit {
  formValue!: FormGroup;
  employeeModelObj: EmployeeModel = new EmployeeModel();
  employeeData!: any;
  showAdd! : boolean;
  showUpdate! : boolean;
  emailValidated!: boolean;

  constructor(private formbuilder: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.showAdd = true;
    this.showUpdate = false;
    this.formValue = this.formbuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      // email: ['',Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")],
      phone: [''],
      ctc: [''],
    });
    this.getAllEmployee();
    this.formValue.controls["email"].setValidators([Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]);
  }
  clickAddEmployee(){
    this.formValue.reset()
    this.showAdd = true;
    this.showUpdate = false;

  }
  clickUpdateEmployee(){
    // this.formValue.reset()
    this.showAdd = !true;
    this.showUpdate = !false;

  }


  postEmployeeDetail() {
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.phone = this.formValue.value.phone;
    this.employeeModelObj.ctc = this.formValue.value.ctc;

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
  getAllEmployee() {
    this.api.getEmployee().subscribe((res) => {
      this.employeeData = res;
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
        console.error(err)
      }
    );
  }
  onEdit(row: any) {
    this.clickUpdateEmployee()
    this.employeeModelObj.id = row.id
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['phone'].setValue(row.phone);
    this.formValue.controls['ctc'].setValue(row.ctc);
  }
  onUpdateEmployee() {
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.phone = this.formValue.value.phone;
    this.employeeModelObj.ctc = this.formValue.value.ctc;

    this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.id).subscribe(
      res=>{
        alert("updated successfully")
        let ref = document.getElementById('closebutton');
        ref?.click();
        this.formValue.reset();
        this.getAllEmployee();

      }
      
    )
  }
}
