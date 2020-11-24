import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { AuthenticationService } from './authentication.service';

@Injectable({
    providedIn: 'root',
})
export class UploadService {

    constructor(
        private http: HttpClient,
        private userService: AuthenticationService,
    ) { }
    user = this.userService.userId();
    readonly url = environment.apiUrl + '/api/plant';
    readonly urlFile = environment.apiUrl + '/api/file';

    UploadExcel(formData: FormData, type: string) { // type: folder name, ex: Plant/CountryShip
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');
        return this.http.post(this.urlFile + '/upload/' + type, formData, {
            headers: headers,
            reportProgress: true,
            observe: 'events',
        });
    }
    DeleteFile(path: string) {
        const file = {
            'path': path,
            'userId': this.user,
          };
        return this.http.post(this.urlFile + '/delete', file);
    }

    SubmitUpload(path: string) {
        const file = {
            'path': path,
            'userId': this.user,
          };
        return this.http.post(this.url + '/import-excel', file);
    }
}
