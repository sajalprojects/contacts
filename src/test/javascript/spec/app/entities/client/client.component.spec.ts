/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ContactsTestModule } from '../../../test.module';
import { ClientComponent } from 'app/entities/client/client.component';
import { ClientService } from 'app/entities/client/client.service';
import { Client } from 'app/shared/model/client.model';

describe('Component Tests', () => {
    describe('Client Management Component', () => {
        let comp: ClientComponent;
        let fixture: ComponentFixture<ClientComponent>;
        let service: ClientService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ContactsTestModule],
                declarations: [ClientComponent],
                providers: []
            })
                .overrideTemplate(ClientComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ClientComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClientService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Client(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.clients[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
