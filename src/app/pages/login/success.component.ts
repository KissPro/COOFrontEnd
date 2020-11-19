import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { concatMap, first, mergeMap, takeWhile } from 'rxjs/operators';
import { AuthenticationService } from 'app/@core/service/authentication.service';
import { UserService } from 'app/@core/service/user.service';
import { NbThemeService } from '@nebular/theme';


@Component({ templateUrl: 'success.component.html' })
export class SuccessComponent implements OnInit {
    code: string;
    token: string;
    alive: boolean;
    constructor(
        private activeRoute: ActivatedRoute,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private router: Router,
    ) {

    }
    ngOnInit() {
        this.activeRoute.queryParams.subscribe(params => {
            this.code = params['code'];
            console.log(this.code);
        });

        this.authenticationService.getAccessToken(this.code)
        .pipe(
            concatMap(token => this.userService.getUser(token["access_token"])),
        )
        .subscribe(user => {
            console.log(user.employee["name"]);
            localStorage.setItem('user', JSON.stringify(user));
            this.router.navigate(['/']);
        });
    }
}
