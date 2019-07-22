import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IUserDetails } from 'app/shared/model/user-details.model';

type EntityResponseType = HttpResponse<IUserDetails>;
type EntityArrayResponseType = HttpResponse<IUserDetails[]>;

@Injectable({ providedIn: 'root' })
export class UserDetailsService {
  public resourceUrl = SERVER_API_URL + 'api/user-details';

  constructor(protected http: HttpClient) {}

  create(userDetails: IUserDetails): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(userDetails);
    return this.http
      .post<IUserDetails>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(userDetails: IUserDetails): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(userDetails);
    return this.http
      .put<IUserDetails>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IUserDetails>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IUserDetails[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(userDetails: IUserDetails): IUserDetails {
    const copy: IUserDetails = Object.assign({}, userDetails, {
      createdDate:
        userDetails.createdDate != null && userDetails.createdDate.isValid() ? userDetails.createdDate.format(DATE_FORMAT) : null,
      modifiedDate:
        userDetails.modifiedDate != null && userDetails.modifiedDate.isValid() ? userDetails.modifiedDate.format(DATE_FORMAT) : null
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
      res.body.forEach((userDetails: IUserDetails) => {
        userDetails.createdDate = userDetails.createdDate != null ? moment(userDetails.createdDate) : null;
        userDetails.modifiedDate = userDetails.modifiedDate != null ? moment(userDetails.modifiedDate) : null;
      });
    }
    return res;
  }
}
