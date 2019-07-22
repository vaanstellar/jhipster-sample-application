import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IUserSuspension } from 'app/shared/model/user-suspension.model';

type EntityResponseType = HttpResponse<IUserSuspension>;
type EntityArrayResponseType = HttpResponse<IUserSuspension[]>;

@Injectable({ providedIn: 'root' })
export class UserSuspensionService {
  public resourceUrl = SERVER_API_URL + 'api/user-suspensions';

  constructor(protected http: HttpClient) {}

  create(userSuspension: IUserSuspension): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(userSuspension);
    return this.http
      .post<IUserSuspension>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(userSuspension: IUserSuspension): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(userSuspension);
    return this.http
      .put<IUserSuspension>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IUserSuspension>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IUserSuspension[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(userSuspension: IUserSuspension): IUserSuspension {
    const copy: IUserSuspension = Object.assign({}, userSuspension, {
      createdDate:
        userSuspension.createdDate != null && userSuspension.createdDate.isValid() ? userSuspension.createdDate.format(DATE_FORMAT) : null,
      modifiedDate:
        userSuspension.modifiedDate != null && userSuspension.modifiedDate.isValid()
          ? userSuspension.modifiedDate.format(DATE_FORMAT)
          : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.createdDate = res.body.createdDate != null ? moment(res.body.createdDate) : null;
      res.body.modifiedDate = res.body.modifiedDate != null ? moment(res.body.modifiedDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((userSuspension: IUserSuspension) => {
        userSuspension.createdDate = userSuspension.createdDate != null ? moment(userSuspension.createdDate) : null;
        userSuspension.modifiedDate = userSuspension.modifiedDate != null ? moment(userSuspension.modifiedDate) : null;
      });
    }
    return res;
  }
}
