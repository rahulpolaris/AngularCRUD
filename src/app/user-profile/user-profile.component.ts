import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';
import { AuthService } from '../shared/Services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  routeEmailParam!:any
  user!:any

  constructor(private activeRoute: ActivatedRoute, private router: Router, private authService : AuthService) { }

  ngOnInit(): void {
    // this.authService.getLoginStatus().subscribe((res:any) =>{

    // })
    // this.checkLoginStatus()
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
          this.user = res.rows[0]
        
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
