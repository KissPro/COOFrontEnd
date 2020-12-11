import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { DNData, DNManualModel, DNModel } from '../models/dn';
import { DataTablesResponse } from '../models/datatables';

@Injectable()
export class DNService extends DNData {


    readonly dnURL = environment.apiUrl + '/api/dn/';

    constructor(private http: HttpClient) {
        super();
    }
    getDN(dtParameter: any): Observable<DataTablesResponse> {
        return this.http.post<DataTablesResponse>(this.dnURL + 'all-list',
            dtParameter).pipe(catchError(this.handleError));
    }
    getDNManual(dtParameter: any, type: string): Observable<DataTablesResponse> {
        return this.http.post<DataTablesResponse>(this.dnURL + 'list-manual/' + type,
            dtParameter).pipe(catchError(this.handleError));
    }
    getListDNCOO(cooNo: string): Observable<DNModel[]> {
        return this.http.get<DNModel[]>(this.dnURL + 'open-coo/' + cooNo).pipe(catchError(this.handleError));
    }
    DownloadDN() {
        return this.http.get(this.dnURL + 'download-dn', {responseType: 'blob'});
    }
    DownloadManual(type: string) {
        return this.http.get(this.dnURL + 'download-manual/' + type, {responseType: 'blob'});
    }
    handleError(error: HttpErrorResponse) {
        return throwError(error);
    }
}
