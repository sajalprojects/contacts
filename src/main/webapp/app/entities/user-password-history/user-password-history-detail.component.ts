import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUserPasswordHistory } from 'app/shared/model/user-password-history.model';

@Component({
    selector: 'jhi-user-password-history-detail',
    templateUrl: './user-password-history-detail.component.html'
})
export class UserPasswordHistoryDetailComponent implements OnInit {
    userPasswordHistory: IUserPasswordHistory;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ userPasswordHistory }) => {
            this.userPasswordHistory = userPasswordHistory;
        });
    }

    previousState() {
        window.history.back();
    }
}
