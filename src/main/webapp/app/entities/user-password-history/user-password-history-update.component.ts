import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IUserPasswordHistory } from 'app/shared/model/user-password-history.model';
import { UserPasswordHistoryService } from './user-password-history.service';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-user-password-history-update',
    templateUrl: './user-password-history-update.component.html'
})
export class UserPasswordHistoryUpdateComponent implements OnInit {
    userPasswordHistory: IUserPasswordHistory;
    isSaving: boolean;

    users: IUser[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private userPasswordHistoryService: UserPasswordHistoryService,
        private userService: UserService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ userPasswordHistory }) => {
            this.userPasswordHistory = userPasswordHistory;
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
        if (this.userPasswordHistory.id !== undefined) {
            this.subscribeToSaveResponse(this.userPasswordHistoryService.update(this.userPasswordHistory));
        } else {
            this.subscribeToSaveResponse(this.userPasswordHistoryService.create(this.userPasswordHistory));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IUserPasswordHistory>>) {
        result.subscribe((res: HttpResponse<IUserPasswordHistory>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
