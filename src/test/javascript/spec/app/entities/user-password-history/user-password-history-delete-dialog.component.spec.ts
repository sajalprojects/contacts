/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ContactsTestModule } from '../../../test.module';
import { UserPasswordHistoryDeleteDialogComponent } from 'app/entities/user-password-history/user-password-history-delete-dialog.component';
import { UserPasswordHistoryService } from 'app/entities/user-password-history/user-password-history.service';

describe('Component Tests', () => {
    describe('UserPasswordHistory Management Delete Component', () => {
        let comp: UserPasswordHistoryDeleteDialogComponent;
        let fixture: ComponentFixture<UserPasswordHistoryDeleteDialogComponent>;
        let service: UserPasswordHistoryService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ContactsTestModule],
                declarations: [UserPasswordHistoryDeleteDialogComponent]
            })
                .overrideTemplate(UserPasswordHistoryDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(UserPasswordHistoryDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserPasswordHistoryService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it(
                'Should call delete service on confirmDelete',
                inject(
                    [],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });
});
