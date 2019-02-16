/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ContactsTestModule } from '../../../test.module';
import { UserPasswordHistoryComponent } from 'app/entities/user-password-history/user-password-history.component';
import { UserPasswordHistoryService } from 'app/entities/user-password-history/user-password-history.service';
import { UserPasswordHistory } from 'app/shared/model/user-password-history.model';

describe('Component Tests', () => {
    describe('UserPasswordHistory Management Component', () => {
        let comp: UserPasswordHistoryComponent;
        let fixture: ComponentFixture<UserPasswordHistoryComponent>;
        let service: UserPasswordHistoryService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ContactsTestModule],
                declarations: [UserPasswordHistoryComponent],
                providers: []
            })
                .overrideTemplate(UserPasswordHistoryComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(UserPasswordHistoryComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserPasswordHistoryService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new UserPasswordHistory(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.userPasswordHistories[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
