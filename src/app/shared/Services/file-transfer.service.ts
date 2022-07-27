import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileTransferService {

  constructor(private http:HttpClient) { }

  postFile(data:FormData)
  {
   return this.http.post('http://localhost:5000/files',data,{ withCredentials: true })
  }
  getFiles(emp_id:string):Observable<any>{
    return this.http.get(`http://localhost:5000/files/${emp_id}`,{withCredentials:true})
  }
}
