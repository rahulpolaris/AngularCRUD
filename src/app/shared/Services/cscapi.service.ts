import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CscapiService {
  constructor(private http: HttpClient) {}

  countryCode!: string;
  getCountries(data:any){
    return this.http.get<any>('http://localhost:5000/countries').pipe(
      map((res: any) => {
        // console.log(res);
        return res;
      })
    );
  }
  getStates(cc: number) {
    return this.http.get<any>('http://localhost:5000/states/'+cc).pipe(
      map((res: any) => {
        // console.log(res);
        return res;
      })
    );

  }
  getCities( sc: number) {
    return this.http.get<any>('http://localhost:5000/cities/'+sc).pipe(
      map((res: any) => {
        // console.log(res);
        return res;
      })
    );

  }
}
