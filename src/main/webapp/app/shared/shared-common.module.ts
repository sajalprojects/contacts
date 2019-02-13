import { NgModule } from '@angular/core';

import { ContactsSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [ContactsSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [ContactsSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class ContactsSharedCommonModule {}
