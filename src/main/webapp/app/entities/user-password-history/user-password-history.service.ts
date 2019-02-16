import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IUserPasswordHistory } from 'app/shared/model/user-password-history.model';

type EntityResponseType = HttpResponse<IUserPasswordHistory>;
type EntityArrayResponseType = HttpResponse<IUserPasswordHistory[]>;

@Injectable({ providedIn: 'root' })
export class UserPasswordHistoryService {
    public resourceUrl = SERVER_API_URL + 'api/user-password-histories';

    constructor(private http: HttpClient) {}

    create(userPasswordHistory: IUserPasswordHistory): Observable<EntityResponseType> {
        return this.http.post<IUserPasswordHistory>(this.resourceUrl, userPasswordHistory, { observe: 'response' });
    }

    update(userPasswordHistory: IUserPasswordHistory): Observable<EntityResponseType> {
        return this.http.put<IUserPasswordHistory>(this.resourceUrl, userPasswordHistory, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IUserPasswordHistory>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IUserPasswordHistory[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
