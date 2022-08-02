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
import { FileTransferService } from '../shared/Services/file-transfer.service';
import { Observable } from 'rxjs';
import fileSaver from 'file-saver'
import { PaymentHandlerService } from '../shared/Services/payment-handler.service';
const { saveAs } = fileSaver




@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  routeEmailParam!: any;
  user: EmployeeModel = new EmployeeModel();
  formValue!: FormGroup;
  uploadForm!: FormGroup;
  paymentForm!: FormGroup;
  updateUploadForm!: FormGroup;
  fileToBeUpdated!: any

  employeeModelObj: EmployeeModel = new EmployeeModel();
  userFiles$ !: Observable<any>

  countries!: any;

  states!: any[];

  cities!: any[];

  formBlur!: {
    email: boolean;
    date_of_birth: boolean;
    age: boolean;
    phone: boolean;
  };
  
  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private formbuilder: FormBuilder,
    private api: ApiService,
    private cscapi: CscapiService,
    private filetransfer: FileTransferService,
    private paymentHandler: PaymentHandlerService
  ) {}

  ngOnInit(): void {
    this.formValue = this.formbuilder.group(
      {
        firstName: [''],
        lastName: [' '],
        email: [''],
        phone: [''],
        date_of_birth: [''],
        age: [''],
        countryname: [''],
        statename: [''],
        cityname: [''],
      },
      {
        validators: [this.customDobValidation('date_of_birth')],
      }
    );

    this.formValue.controls['email'].setValidators([
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]);
    this.formValue.controls['phone'].setValidators([
      Validators.minLength(10),
      Validators.required,
    ]);

    this.uploadForm = this.formbuilder.group({
      file: [''],
      emp_id: [this.user.id],
    });
   this.updateUploadForm = this.formbuilder.group({
    file:['']
   })
   this.paymentForm = this.formbuilder.group({
    amount:['']
   })
    

    this.routeEmailParam = this.activeRoute.params;
    console.log(this.routeEmailParam.value.email);
    this.getUserDetails();
  }
  onFileSelect(e: any) {
    console.log(e);

    if(e.target.files.length > 1)
    {
      alert(" you can only upload one file at a time")
    }
    const file  =  e.target.files[0]
    this.uploadForm.get('file')?.setValue(file)
    this.uploadForm.get('emp_id')?.setValue(this.user.id)
  }
  onUpdatedFileSelect(e:any){
    if(e.target.files.length > 1){
      alert(" you can only upload one file at a time")
      return
    }
    const file = e.target.files[0]
    this.updateUploadForm.get('file')?.setValue(file)
  }
  onFileSubmit(e: any) {
    const formData =  new  FormData()
    formData.append('file',this.uploadForm.controls['file'].value)
    formData.append('emp_id',this.uploadForm.controls['emp_id'].value)
    this.filetransfer.postFile(formData).subscribe((res:any)=>{
      console.log(res)
      if(!res.error){
        console.log("inside res not error")
        this.uploadForm.reset()
        this.getUserFiles()
      }
    },(err:any)=>{
      console.log(err)
      alert("something went wrond")
    })
  }
  onUpdatedFileSubmit(e:any){
    console.log("inside update file submit function")
    const formData = new FormData()
    formData.append('file',this.updateUploadForm.controls['file'].value)
    formData.append('emp_id',this.fileToBeUpdated.emp_id)
    formData.append('location',this.fileToBeUpdated.location)
    formData.append('filename',this.fileToBeUpdated.filename)
    formData.append('file_id',this.fileToBeUpdated.file_id)
    formData.append('originalname',this.fileToBeUpdated.originalname)
    this.filetransfer.postFileUpdate(formData,this.fileToBeUpdated).subscribe((res:any)=>{
      console.log(res)
      this.getUserFiles()
    },(err:any)=>{
      console.log(err)
      alert("file not updated something went wrong")
    })
  }

  onDeleteFileClick(row:any){
    this.filetransfer.deleteFile(row).subscribe((res:any)=>{
      console.log(res)
      alert("file has been deleted")
      this.getUserFiles()
    },(err:any)=>{
      console.log(err)
      alert("something went wrong")
    })
  }
  onUpdateFileClick(row:any){
    this.fileToBeUpdated = row
  }
  resetOnClose() {
    this.formValue.reset();
    this.countries = [];
    this.states = [];
    this.cities = [];
  }
  resetUpdateFileForm(){
    this.uploadForm.reset()
  }
  onDOBChange(): void {
    console.log(this.formValue.controls['date_of_birth'].value);
  }
  onCountryChange(event: any): void {
    let countryObj = this.formValue.controls['countryname'].value;
    this.getStates(countryObj.id);
    this.cities = [];
    console.log(this.states);
  }
  onStateChange(event: any): void {
    let StateObjIsoCode = this.formValue.controls['statename'].value.id;
    console.log('State id is: ', StateObjIsoCode);
    this.getCities(StateObjIsoCode);
  }
  onAmountChange(){
    // console.log("inside amount change")
    if(parseInt(this.paymentForm.controls['amount'].value) < 0 ){
      const val = this.paymentForm.controls['amount'].value.toString()
      const newVal = parseInt(val.slice(1))
      // const newVal = "23"
      this.paymentForm.controls['amount'].setValue(newVal)
      console.log(val)
    }
  }

  onEmailBlur(): void {
    this.formBlur.email = true;
  }
  getCountries() {
    this.cscapi.getCountries(null).subscribe(
      (res) => {
        this.countries = res;
        // this.cities = [""]
        // console.log(this.countries)
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getStates(arg: number) {
    this.cscapi.getStates(arg).subscribe(
      (res) => {
        // console.log(res)
        this.states = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getCities(arg: number) {
    this.cscapi.getCities(arg).subscribe(
      (res) => {
        this.cities = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }



  getUserDetails() {
    this.authService
      .getUserDetail(this.routeEmailParam.value.email)
      .subscribe((res: any) => {
        if (Object.keys(res).includes('isUserLoggedIn')) {
          if (res.isUserLoggedIn) {
            console.log(res.rows);
            this.user.id = res.rows[0].emp_id;
            this.user.firstname = res.rows[0].firstname;
            this.user.lastname = res.rows[0].lastname;
            this.user.email = res.rows[0].email;
            this.user.phone = res.rows[0].phone;
            this.user.date_of_birth = res.rows[0].date_of_birth;
            this.user.country = res.rows[0].country;
            this.user.state = res.rows[0].state;
            this.user.city = res.rows[0].city;
            this.uploadForm.controls['emp_id'].setValue(res.rows[0].emp_id)
            this.getUserFiles()
            // this.user = res.rows[0]
          } else {
            this.router.navigate(['login']);
          }
        }
      });
  }
  getUserFiles(){
    this.userFiles$ = this.filetransfer.getFiles(this.user.id)
  }
  getUserDownloadableFile(row:any){
    const data = {emp_id:this.user.id, file_id:row.file_id}
     this.filetransfer.downloadFile(data).subscribe((res:any) =>{
     let downloadUrl =  window.URL.createObjectURL(res)
     saveAs(downloadUrl,row.originalname)
     
     },(err:any) =>{
      console.log(err)
      alert("some error occured please check console")
     })
  }

  getMeOutOfHere() {
    this.authService
      .logOutUser(this.routeEmailParam.value.email)
      .subscribe((res: any) => {
        if (res?.sessionDestroyed) {
          alert('User Has been logged Out');
          this.router.navigate(['login']);
        } else {
          alert('something went wrong');
        }
      });
  }

  onEdit() {
    console.log('Edit Profile Triggederd');
    console.log(this.user);
    const date: Date = new Date(this.user.date_of_birth);
    const monthStr = (date: Date): string => {
      const m = date.getUTCMonth() + 1;
      if (m < 10) {
        return `0${m}`;
      } else {
        return `${m}`;
      }
    };
    const dateStr = (date: Date): string => {
      const m = date.getUTCDate();
      if (m < 10) {
        return `0${m}`;
      } else {
        return `${m}`;
      }
    };
    const DateStr = `${date.getFullYear()}-${monthStr(date)}-${dateStr(date)}`;
    this.getCountries();
    this.employeeModelObj.id = this.user.id;
    this.formValue.controls['firstName'].setValue(this.user.firstname);
    this.formValue.controls['lastName'].setValue(this.user.lastname);
    this.formValue.controls['email'].setValue(this.user.email);
    this.formValue.controls['phone'].setValue(this.user.phone);
    this.formValue.controls['date_of_birth'].setValue(DateStr);
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
        this.getUserDetails();
      });
  }
 pay(){
  console.log("inside Pay method")
  let options ={
    "key": "rzp_live_OhgQOzSc7Kc9V2", 
    "amount": "50000", 
    "currency": "INR",
    "name": "Acme Corp",
    "description": "Test Transaction",
    "image": "https://example.com/your_logo",
    "order_id": "", 
    "handler": function (response:any){
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature)
    },
    "prefill": {
        "name": this.user.firstname + " " + this.user.lastname,
        "email": this.user.email,
        "contact": this.user.phone
    },
    "notes": {
        "address": "Razorpay Corporate Office"
    },
    "theme": {
        "color": "#3399cc"
    }
};

const rzp1 = this.paymentHandler.nativeWindow.Razorpay(options)
rzp1.open()
 }

  private customDobValidation(controlDobName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control as FormGroup;
      const valueOfDOB = formGroup.get(controlDobName)?.value;
      // console.log(valueOfDOB)
      const currentDate = new Date();
      const acquiredDate = new Date(valueOfDOB);
      if (currentDate.getFullYear() - acquiredDate.getFullYear() < 10) {
        return {
          wrongDate: true,
        };
      } else {
        return null;
      }
      //       return {
      //   wrongDate: true
      // }
    };
  }
}
