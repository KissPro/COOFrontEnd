import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { BoomEcusData } from '../models/boom-ecus';
import { DataTablesResponse } from '../models/datatables';

@Injectable()
export class BoomEcusService extends BoomEcusData {

    readonly ecusBoomURL = environment.apiUrl + '/api/boom-ecus/all-list';

    constructor(private http: HttpClient) {
        super();
    }

    getBoomEcus(dtParameter: any): Observable<DataTablesResponse> {
        return this.http.post<DataTablesResponse>(this.ecusBoomURL, dtParameter).pipe(catchError(this.handleError));
    }

    handleError(error: HttpErrorResponse) {
        return throwError(error);
    }
}
