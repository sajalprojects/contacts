import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserExtra } from 'app/shared/model/user-extra.model';
import { UserExtraService } from './user-extra.service';
import { UserExtraComponent } from './user-extra.component';
import { UserExtraDetailComponent } from './user-extra-detail.component';
import { UserExtraUpdateComponent } from './user-extra-update.component';
import { UserExtraDeletePopupComponent } from './user-extra-delete-dialog.component';
import { IUserExtra } from 'app/shared/model/user-extra.model';

@Injectable({ providedIn: 'root' })
export class UserExtraResolve implements Resolve<IUserExtra> {
    constructor(private service: UserExtraService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((userExtra: HttpResponse<UserExtra>) => userExtra.body));
        }
        return of(new UserExtra());
    }
}

export const userExtraRoute: Routes = [
    {
        path: 'user-extra',
        component: UserExtraComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserExtras'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'user-extra/:id/view',
        component: UserExtraDetailComponent,
        resolve: {
            userExtra: UserExtraResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserExtras'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'user-extra/new',
        component: UserExtraUpdateComponent,
        resolve: {
            userExtra: UserExtraResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserExtras'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'user-extra/:id/edit',
        component: UserExtraUpdateComponent,
        resolve: {
            userExtra: UserExtraResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserExtras'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const userExtraPopupRoute: Routes = [
    {
        path: 'user-extra/:id/delete',
        component: UserExtraDeletePopupComponent,
        resolve: {
            userExtra: UserExtraResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserExtras'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
