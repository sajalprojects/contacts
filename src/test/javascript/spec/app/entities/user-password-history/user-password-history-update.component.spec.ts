/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ContactsTestModule } from '../../../test.module';
import { UserPasswordHistoryUpdateComponent } from 'app/entities/user-password-history/user-password-history-update.component';
import { UserPasswordHistoryService } from 'app/entities/user-password-history/user-password-history.service';
import { UserPasswordHistory } from 'app/shared/model/user-password-history.model';

describe('Component Tests', () => {
    describe('UserPasswordHistory Management Update Component', () => {
        let comp: UserPasswordHistoryUpdateComponent;
        let fixture: ComponentFixture<UserPasswordHistoryUpdateComponent>;
        let service: UserPasswordHistoryService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ContactsTestModule],
                declarations: [UserPasswordHistoryUpdateComponent]
            })
                .overrideTemplate(UserPasswordHistoryUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(UserPasswordHistoryUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserPasswordHistoryService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new UserPasswordHistory(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.userPasswordHistory = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new UserPasswordHistory();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.userPasswordHistory = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
