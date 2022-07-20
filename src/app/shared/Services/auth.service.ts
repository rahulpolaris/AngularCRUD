import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   isAdminLoggedIn: boolean = false
   isUserLoggedIn: boolean = false
  constructor(private http:HttpClient) { 
    
  }
  login(email:string, password:string):void {
    if (email!=='admin')
    {
      
    }
  }
  setUserLoggedIn(value:boolean){
    this.isUserLoggedIn = value
  }
  setAdminLoggedIn(value:boolean){
    this.isAdminLoggedIn = value
  }
}
