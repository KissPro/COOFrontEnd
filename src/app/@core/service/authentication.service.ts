import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { environment } from 'environments/environment';
import { Router } from '@angular/router';
import { data, post } from 'jquery';
import { Employee } from '../models/Employee';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private userSubject: BehaviorSubject<Employee>;
    public user: Observable<Employee>;
    public login_uri: string;

    constructor(
        private router: Router,
        private http: HttpClient,
    ) {
        this.userSubject = new BehaviorSubject<Employee>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): Employee {
        return this.userSubject.value;
    }

    login() {
        this.login_uri = `${environment.ADWeb_URI}/adweb/oauth2/authorization/v1?scope=read&redirect_uri=${environment.CLIENT_REDIRECT_URL}&response_type=code&client_id=${environment.CLIENT_ID}&state=online`;
        return this.login_uri;
    }

    success() {
        // tslint:disable-next-line: no-console
        console.log('this is hoang');
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/auth/login']);
    }
    readonly rootURL = `${environment.ADWeb_URI}/adweb/oauth2/access_token/v1`;
    readonly userURL = `${environment.ADWeb_URI}/adweb/people/me/v1`;

    getAccessToken(code: string) {
        let token;
        var formData: any = new FormData();

        formData.append('client_id', environment.CLIENT_ID);
        formData.append('redirect_uri', environment.CLIENT_REDIRECT_URL);
        formData.append('client_secret', environment.CLIENT_SECRET);
        formData.append('code', code);
        formData.append('grant_type', 'authorization_code');


        return this.http.post<any>(this.rootURL, formData);
        // .subscribe(data => {
        //         token = data["access_token"];
        //         return token;
        // });
    }

    // getUserInfor(token: string) {
    //     const headers = new HttpHeaders({
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${token}`,
    //       })
    //     this.http.get<any>(this.userURL, { headers })
    //     .subscribe(data =>{
    //         this.user = data;
    //     });
    //     console.log(this.user);
    // }



    // getAccessGet(code: string) {
    //     this.http.get<any>('http://localhost:5001/api/adweb/access?code=' + code)
    //     .subscribe(data =>{
    //         console.log(data[0].access_token);
    //         console.log(data[0]);
    //     })
    // }
}
