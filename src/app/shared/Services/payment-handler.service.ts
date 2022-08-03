import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

function _window():any{
  return window;
}
 
@Injectable({
  providedIn: 'root'
})
export class PaymentHandlerService {

  constructor(private http:HttpClient) { 
  
  }
get nativeWindow():any{
  return _window()
}

generateOrder(amount:number){
  return this.http.post("http://localhost:5000/generateOrder",{amount},{withCredentials:true})
}
verifyPayment(data:any){
  return this.http.post("http://localhost:5000/verifyPayment",data,{withCredentials:true})
}
}
