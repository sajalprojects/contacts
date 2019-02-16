import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ContactsClientModule } from './client/client.module';
import { ContactsLocationModule } from './location/location.module';
import { ContactsCountryModule } from './country/country.module';
import { ContactsUserExtraModule } from './user-extra/user-extra.module';
import { ContactsUserPasswordHistoryModule } from './user-password-history/user-password-history.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        ContactsClientModule,
        ContactsLocationModule,
        ContactsCountryModule,
        ContactsUserExtraModule,
        ContactsUserPasswordHistoryModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ContactsEntityModule {}
