/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ContactsTestModule } from '../../../test.module';
import { UserPasswordHistoryDetailComponent } from 'app/entities/user-password-history/user-password-history-detail.component';
import { UserPasswordHistory } from 'app/shared/model/user-password-history.model';

describe('Component Tests', () => {
    describe('UserPasswordHistory Management Detail Component', () => {
        let comp: UserPasswordHistoryDetailComponent;
        let fixture: ComponentFixture<UserPasswordHistoryDetailComponent>;
        const route = ({ data: of({ userPasswordHistory: new UserPasswordHistory(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ContactsTestModule],
                declarations: [UserPasswordHistoryDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(UserPasswordHistoryDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(UserPasswordHistoryDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.userPasswordHistory).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
