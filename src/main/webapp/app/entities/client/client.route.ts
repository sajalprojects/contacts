import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Client } from 'app/shared/model/client.model';
import { ClientService } from './client.service';
import { ClientComponent } from './client.component';
import { ClientDetailComponent } from './client-detail.component';
import { ClientUpdateComponent } from './client-update.component';
import { ClientDeletePopupComponent } from './client-delete-dialog.component';
import { IClient } from 'app/shared/model/client.model';

@Injectable({ providedIn: 'root' })
export class ClientResolve implements Resolve<IClient> {
    constructor(private service: ClientService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((client: HttpResponse<Client>) => client.body));
        }
        return of(new Client());
    }
}

export const clientRoute: Routes = [
    {
        path: 'client',
        component: ClientComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Clients'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'client/:id/view',
        component: ClientDetailComponent,
        resolve: {
            client: ClientResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Clients'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'client/new',
        component: ClientUpdateComponent,
        resolve: {
            client: ClientResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Clients'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'client/:id/edit',
        component: ClientUpdateComponent,
        resolve: {
            client: ClientResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Clients'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const clientPopupRoute: Routes = [
    {
        path: 'client/:id/delete',
        component: ClientDeletePopupComponent,
        resolve: {
            client: ClientResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Clients'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
