import { Injectable } from '@angular/core';
import {Country, State, City} from 'country-state-city'

@Injectable({
  providedIn: 'root'
})
export class CscapiService {
countryCode !: string  
countries =  Country.getAllCountries()
getStates(cc:string) : any {
  return State.getStatesOfCountry( cc )
}
getCities(cc:string,sc:string):any {
  return City.getCitiesOfState(cc,sc)
}
  constructor() { }
}
