import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IUserExtra } from 'app/shared/model/user-extra.model';
import { UserExtraService } from './user-extra.service';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-user-extra-update',
    templateUrl: './user-extra-update.component.html'
})
export class UserExtraUpdateComponent implements OnInit {
    userExtra: IUserExtra;
    isSaving: boolean;

    users: IUser[];
    passwordResetDate: string;
    loginDate: string;
    lockDate: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private userExtraService: UserExtraService,
        private userService: UserService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ userExtra }) => {
            this.userExtra = userExtra;
            this.passwordResetDate =
                this.userExtra.passwordResetDate != null ? this.userExtra.passwordResetDate.format(DATE_TIME_FORMAT) : null;
            this.loginDate = this.userExtra.loginDate != null ? this.userExtra.loginDate.format(DATE_TIME_FORMAT) : null;
            this.lockDate = this.userExtra.lockDate != null ? this.userExtra.lockDate.format(DATE_TIME_FORMAT) : null;
        });
        this.userService.query().subscribe(
            (res: HttpResponse<IUser[]>) => {
                this.users = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.userExtra.passwordResetDate = this.passwordResetDate != null ? moment(this.passwordResetDate, DATE_TIME_FORMAT) : null;
        this.userExtra.loginDate = this.loginDate != null ? moment(this.loginDate, DATE_TIME_FORMAT) : null;
        this.userExtra.lockDate = this.lockDate != null ? moment(this.lockDate, DATE_TIME_FORMAT) : null;
        if (this.userExtra.id !== undefined) {
            this.subscribeToSaveResponse(this.userExtraService.update(this.userExtra));
        } else {
            this.subscribeToSaveResponse(this.userExtraService.create(this.userExtra));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IUserExtra>>) {
        result.subscribe((res: HttpResponse<IUserExtra>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackUserById(index: number, item: IUser) {
        return item.id;
    }
}
