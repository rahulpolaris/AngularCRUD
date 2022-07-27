import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileTransferService {

  constructor(private http:HttpClient) { }

  postFile(data:FormData)
  {
   return this.http.post('http://localhost:5000/files',data,{ withCredentials: true })
  }
}
