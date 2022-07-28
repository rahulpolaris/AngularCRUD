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
  //  return this.http.post('http://localhost:5000/files/wth',data,{ withCredentials: true })
  }
  getFiles(emp_id:string):Observable<any>{
    return this.http.get(`http://localhost:5000/files/${emp_id}`,{withCredentials:true})
  }
  downloadFile(data:{emp_id:string,file_id:string}):any{
    return this.http.get(`http://localhost:5000/files/${data.emp_id}/${data.file_id}`,{withCredentials:true, responseType:'blob'})
  }
  deleteFile(data:any):any{
    return this.http.post(`http://localhost:5000/files/${data.emp_id}/${data.file_id}/delete`,data,{withCredentials:true})
  }
  postFileUpdate(data: FormData, file:any)
  {
    console.log("inside post file update file transfer service method....")
    // return this.http.post(`http://localhost:5000/${file.emp_id}/${file.file_id}/update`,data,{withCredentials:true})
    return this.http.post(`http://localhost:5000/files/wth/${file.emp_id}/${file.file_id}`,data,{withCredentials:true})
  }
}
