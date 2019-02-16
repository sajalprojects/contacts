/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { UserExtraService } from 'app/entities/user-extra/user-extra.service';
import { IUserExtra, UserExtra } from 'app/shared/model/user-extra.model';

describe('Service Tests', () => {
    describe('UserExtra Service', () => {
        let injector: TestBed;
        let service: UserExtraService;
        let httpMock: HttpTestingController;
        let elemDefault: IUserExtra;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(UserExtraService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new UserExtra(0, currentDate, 'AAAAAAA', currentDate, currentDate, 0);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        passwordResetDate: currentDate.format(DATE_TIME_FORMAT),
                        loginDate: currentDate.format(DATE_TIME_FORMAT),
                        lockDate: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a UserExtra', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        passwordResetDate: currentDate.format(DATE_TIME_FORMAT),
                        loginDate: currentDate.format(DATE_TIME_FORMAT),
                        lockDate: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        passwordResetDate: currentDate,
                        loginDate: currentDate,
                        lockDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new UserExtra(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a UserExtra', async () => {
                const returnedFromService = Object.assign(
                    {
                        passwordResetDate: currentDate.format(DATE_TIME_FORMAT),
                        otp: 'BBBBBB',
                        loginDate: currentDate.format(DATE_TIME_FORMAT),
                        lockDate: currentDate.format(DATE_TIME_FORMAT),
                        invalidTry: 1
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        passwordResetDate: currentDate,
                        loginDate: currentDate,
                        lockDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of UserExtra', async () => {
                const returnedFromService = Object.assign(
                    {
                        passwordResetDate: currentDate.format(DATE_TIME_FORMAT),
                        otp: 'BBBBBB',
                        loginDate: currentDate.format(DATE_TIME_FORMAT),
                        lockDate: currentDate.format(DATE_TIME_FORMAT),
                        invalidTry: 1
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        passwordResetDate: currentDate,
                        loginDate: currentDate,
                        lockDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .query(expected)
                    .pipe(take(1), map(resp => resp.body))
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a UserExtra', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
