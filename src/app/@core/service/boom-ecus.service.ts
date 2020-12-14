import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { BoomEcusData } from '../models/boom-ecus';
import { DataTablesResponse } from '../models/datatables';

@Injectable()
export class BoomEcusService extends BoomEcusData {

    readonly ecusBoomURL = environment.apiUrl + '/api/boom-ecus/';

    constructor(private http: HttpClient) {
        super();
    }

    getBoomEcus(dtParameter: any): Observable<DataTablesResponse> {
        return this.http.post<DataTablesResponse>(this.ecusBoomURL + 'all-list', dtParameter).pipe(catchError(this.handleError));
    }
    downloadBoomEcus() {
        return this.http.get(this.ecusBoomURL + 'download', { responseType: 'blob' }).pipe(catchError(this.handleError));
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
