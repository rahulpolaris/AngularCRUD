import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthGuard } from '../guards/auth.guard';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAdminLoggedIn: boolean = false;
  isUserLoggedIn: boolean = false;
  constructor(private http: HttpClient) {}
  postLoginCredentials(val: { email: string; password: string }): any {
    if (val.email !== 'admin') {
      return this.http.post('http://localhost:5000/users/login', val,{ withCredentials: true });
    } else {
      return { admin: 'not configured' };
    }
  }
  getLoginStatus():any {
    return this.http.get('http://localhost:5000/users/login',{withCredentials:true})
  }
  setIsUserLoggedIn(value: boolean) {
    this.isUserLoggedIn = value;
  }
  setIsAdminLoggedIn(value: boolean) {
    this.isAdminLoggedIn = value;
  }
  getUserDetail(email:string):any {
    return this.http.get(`http://localhost:5000/users/${email}`, {withCredentials:true})
  }
  logOutUser(email:string):any {
    return this.http.get(`http://localhost:5000/users/${email}/logout`,{withCredentials:true})
  }
}
