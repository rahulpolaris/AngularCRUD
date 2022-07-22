import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';
import { EmployeeModel } from '../shared/Models/employee-dashboard.model';
import { AuthService } from '../shared/Services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  routeEmailParam!:any
  user!:EmployeeModel 

  constructor(private activeRoute: ActivatedRoute, private router: Router, private authService : AuthService) { }

  ngOnInit(): void {
    this.user = new EmployeeModel
   
    this.routeEmailParam= this.activeRoute.params
    console.log(this.routeEmailParam.value.email)
    this.getUserDetails()
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
          this.user.firstname = res.rows[0].firstname
          this.user.lastname = res.rows[0].lastname
          this.user.email = res.rows[0].email
          this.user.phone = res.rows[0].phone
          this.user.date_of_birth = res.rows[0].date_of_birth
          this.user.country = res.rows[0].country
          this.user.state = res.rows[0].state
          this.user.city = res.rows[0].city
        
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

}
