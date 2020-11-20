import { Injectable } from '@angular/core';
import { CountryShipData, CountryShipModel } from '../models/country-ship';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { CountryOrderData } from '../data/country-order';

@Injectable()
export class CountryShipService extends CountryShipData {
  readonly allCountryURL = environment.apiUrl + '/api/country/all';
  readonly createCountryURL = environment.apiUrl + '/api/country';
  readonly countryURL = environment.apiUrl + '/api/country/';


  constructor(private http: HttpClient) {
    super();
  }
  getAllCountryShip(): Observable<any> {
    return this.http.get<any>(this.allCountryURL);
  }
  createCountryShip(create: any): Observable<CountryShipService> {
    return this.http.post<any>(this.createCountryURL, create);
  }
  editCountryShip(id: string, update: any): Observable<any> {
    return this.http.put<any>(this.countryURL + id, update);
  }
  deleteCountryShip(id: string): Observable<any> {
    return this.http.delete<any>(this.countryURL + id);
  }
}
