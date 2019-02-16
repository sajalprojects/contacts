import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ContactsSharedModule } from 'app/shared';
import { ContactsAdminModule } from 'app/admin/admin.module';
import {
    UserPasswordHistoryComponent,
    UserPasswordHistoryDetailComponent,
    UserPasswordHistoryUpdateComponent,
    UserPasswordHistoryDeletePopupComponent,
    UserPasswordHistoryDeleteDialogComponent,
    userPasswordHistoryRoute,
    userPasswordHistoryPopupRoute
} from './';

const ENTITY_STATES = [...userPasswordHistoryRoute, ...userPasswordHistoryPopupRoute];

@NgModule({
    imports: [ContactsSharedModule, ContactsAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        UserPasswordHistoryComponent,
        UserPasswordHistoryDetailComponent,
        UserPasswordHistoryUpdateComponent,
        UserPasswordHistoryDeleteDialogComponent,
        UserPasswordHistoryDeletePopupComponent
    ],
    entryComponents: [
        UserPasswordHistoryComponent,
        UserPasswordHistoryUpdateComponent,
        UserPasswordHistoryDeleteDialogComponent,
        UserPasswordHistoryDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ContactsUserPasswordHistoryModule {}
