import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IUserExtra } from 'app/shared/model/user-extra.model';

type EntityResponseType = HttpResponse<IUserExtra>;
type EntityArrayResponseType = HttpResponse<IUserExtra[]>;

@Injectable({ providedIn: 'root' })
export class UserExtraService {
    public resourceUrl = SERVER_API_URL + 'api/user-extras';

    constructor(private http: HttpClient) {}

    create(userExtra: IUserExtra): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(userExtra);
        return this.http
            .post<IUserExtra>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(userExtra: IUserExtra): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(userExtra);
        return this.http
            .put<IUserExtra>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IUserExtra>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IUserExtra[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(userExtra: IUserExtra): IUserExtra {
        const copy: IUserExtra = Object.assign({}, userExtra, {
            passwordResetDate:
                userExtra.passwordResetDate != null && userExtra.passwordResetDate.isValid() ? userExtra.passwordResetDate.toJSON() : null,
            loginDate: userExtra.loginDate != null && userExtra.loginDate.isValid() ? userExtra.loginDate.toJSON() : null,
            lockDate: userExtra.lockDate != null && userExtra.lockDate.isValid() ? userExtra.lockDate.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.passwordResetDate = res.body.passwordResetDate != null ? moment(res.body.passwordResetDate) : null;
        res.body.loginDate = res.body.loginDate != null ? moment(res.body.loginDate) : null;
        res.body.lockDate = res.body.lockDate != null ? moment(res.body.lockDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((userExtra: IUserExtra) => {
            userExtra.passwordResetDate = userExtra.passwordResetDate != null ? moment(userExtra.passwordResetDate) : null;
            userExtra.loginDate = userExtra.loginDate != null ? moment(userExtra.loginDate) : null;
            userExtra.lockDate = userExtra.lockDate != null ? moment(userExtra.lockDate) : null;
        });
        return res;
    }
}
