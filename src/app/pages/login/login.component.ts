import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'app/@core/service/authentication.service';


@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
    ) {

    }
    ngOnInit() {
        window.location.href = this.authenticationService.login();
    }
}
