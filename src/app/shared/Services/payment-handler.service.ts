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


}
