import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, throwError } from 'rxjs';
import { EmployeeModel } from '../models/Employee';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AdwebService {
    constructor(private http: HttpClient) { }
    readonly adwebUrl = environment.apiUrl + '/api/adweb/';

    getAccessToken(code: string) {
        return this.http.get(this.adwebUrl + 'token/' + code).pipe(catchError(this.handleError));
    }

    getUserInfor(token: string): Observable<any> {
        return this.http.get<EmployeeModel>(this.adwebUrl + 'user-infor/'+ token).pipe(catchError(this.handleError));
    }

    getUserDetailByID(token: string, employee_id: string) {
        return this.http.get(this.adwebUrl + `user-detail/${token}/${employee_id}`).pipe(catchError(this.handleError));
    }

    handleError(error: HttpErrorResponse) {
        // return throwError(error);
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // client-side error
            alert(`Client error, Kindly contact IT!`);
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // server-side error
            alert(`Server error, Kindly contact IT!`);
            errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }
}
