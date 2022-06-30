import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  employeeData !: any

  constructor(private formbuilder: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      phone: [''],
      ctc: [''],
    });
    this.getAllEmployee()
  }

  postEmployeeDetail() {
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.phone = this.formValue.value.phone;
    this.employeeModelObj.ctc = this.formValue.value.ctc;

    this.api.postEmployee(this.employeeModelObj).subscribe((res) => {
      console.log(res);
      alert('employee added successfully');
      let ref = document.getElementById("closebutton")
      ref?.click();
      this.formValue.reset()
      this.getAllEmployee()
    },err=>{
      alert("something went wrong")
    });
  }
  getAllEmployee(){
    this.api.getEmployee().subscribe(res=>{
      this.employeeData = res;

    })

  }
}
