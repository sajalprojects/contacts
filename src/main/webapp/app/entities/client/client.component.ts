import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IClient } from 'app/shared/model/client.model';
import { Principal } from 'app/core';
import { ClientService } from './client.service';

@Component({
    selector: 'jhi-client',
    templateUrl: './client.component.html'
})
export class ClientComponent implements OnInit, OnDestroy {
    clients: IClient[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private clientService: ClientService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.clientService.query().subscribe(
            (res: HttpResponse<IClient[]>) => {
                this.clients = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInClients();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IClient) {
        return item.id;
    }

    registerChangeInClients() {
        this.eventSubscriber = this.eventManager.subscribe('clientListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
