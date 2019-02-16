import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserPasswordHistory } from 'app/shared/model/user-password-history.model';
import { UserPasswordHistoryService } from './user-password-history.service';
import { UserPasswordHistoryComponent } from './user-password-history.component';
import { UserPasswordHistoryDetailComponent } from './user-password-history-detail.component';
import { UserPasswordHistoryUpdateComponent } from './user-password-history-update.component';
import { UserPasswordHistoryDeletePopupComponent } from './user-password-history-delete-dialog.component';
import { IUserPasswordHistory } from 'app/shared/model/user-password-history.model';

@Injectable({ providedIn: 'root' })
export class UserPasswordHistoryResolve implements Resolve<IUserPasswordHistory> {
    constructor(private service: UserPasswordHistoryService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((userPasswordHistory: HttpResponse<UserPasswordHistory>) => userPasswordHistory.body));
        }
        return of(new UserPasswordHistory());
    }
}

export const userPasswordHistoryRoute: Routes = [
    {
        path: 'user-password-history',
        component: UserPasswordHistoryComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserPasswordHistories'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'user-password-history/:id/view',
        component: UserPasswordHistoryDetailComponent,
        resolve: {
            userPasswordHistory: UserPasswordHistoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserPasswordHistories'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'user-password-history/new',
        component: UserPasswordHistoryUpdateComponent,
        resolve: {
            userPasswordHistory: UserPasswordHistoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserPasswordHistories'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'user-password-history/:id/edit',
        component: UserPasswordHistoryUpdateComponent,
        resolve: {
            userPasswordHistory: UserPasswordHistoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserPasswordHistories'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const userPasswordHistoryPopupRoute: Routes = [
    {
        path: 'user-password-history/:id/delete',
        component: UserPasswordHistoryDeletePopupComponent,
        resolve: {
            userPasswordHistory: UserPasswordHistoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserPasswordHistories'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
