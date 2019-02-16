import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IUserPasswordHistory } from 'app/shared/model/user-password-history.model';
import { Principal } from 'app/core';
import { UserPasswordHistoryService } from './user-password-history.service';

@Component({
    selector: 'jhi-user-password-history',
    templateUrl: './user-password-history.component.html'
})
export class UserPasswordHistoryComponent implements OnInit, OnDestroy {
    userPasswordHistories: IUserPasswordHistory[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private userPasswordHistoryService: UserPasswordHistoryService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.userPasswordHistoryService.query().subscribe(
            (res: HttpResponse<IUserPasswordHistory[]>) => {
                this.userPasswordHistories = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInUserPasswordHistories();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IUserPasswordHistory) {
        return item.id;
    }

    registerChangeInUserPasswordHistories() {
        this.eventSubscriber = this.eventManager.subscribe('userPasswordHistoryListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
