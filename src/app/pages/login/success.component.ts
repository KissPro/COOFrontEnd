import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { concatMap, first, mergeMap, takeWhile } from 'rxjs/operators';
import { AuthenticationService } from 'app/@core/service/authentication.service';
import { UserService } from 'app/@core/service/user.service';
import { NbThemeService } from '@nebular/theme';
import { AdwebService } from 'app/@core/service/adweb.service';


@Component({ templateUrl: 'success.component.html' })
export class SuccessComponent implements OnInit {
    code: string;
    token: string;
    alive: boolean;
    constructor(
        private activeRoute: ActivatedRoute,
        private adwebService: AdwebService,
        private router: Router,
    ) {

    }
    ngOnInit() {
        this.activeRoute.queryParams.subscribe(params => {
            this.code = params['code'];
            console.log(this.code);
        });
        this.adwebService.getAccessToken(this.code)
        .pipe(
            concatMap(token => this.adwebService.getUserInfor(token["access_token"])),
        )
        .subscribe(user => {
            console.log(user.employee["name"]);
            localStorage.setItem('user', JSON.stringify(user));
            this.router.navigate(['/']);
        });
    }
}
