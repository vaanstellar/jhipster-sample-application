import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDerivedDocs } from 'app/shared/model/derived-docs.model';

type EntityResponseType = HttpResponse<IDerivedDocs>;
type EntityArrayResponseType = HttpResponse<IDerivedDocs[]>;

@Injectable({ providedIn: 'root' })
export class DerivedDocsService {
  public resourceUrl = SERVER_API_URL + 'api/derived-docs';

  constructor(protected http: HttpClient) {}

  create(derivedDocs: IDerivedDocs): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(derivedDocs);
    return this.http
      .post<IDerivedDocs>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(derivedDocs: IDerivedDocs): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(derivedDocs);
    return this.http
      .put<IDerivedDocs>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IDerivedDocs>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IDerivedDocs[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(derivedDocs: IDerivedDocs): IDerivedDocs {
    const copy: IDerivedDocs = Object.assign({}, derivedDocs, {
      createdDate:
        derivedDocs.createdDate != null && derivedDocs.createdDate.isValid() ? derivedDocs.createdDate.format(DATE_FORMAT) : null,
      modifiedDate:
        derivedDocs.modifiedDate != null && derivedDocs.modifiedDate.isValid() ? derivedDocs.modifiedDate.format(DATE_FORMAT) : null
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
      res.body.forEach((derivedDocs: IDerivedDocs) => {
        derivedDocs.createdDate = derivedDocs.createdDate != null ? moment(derivedDocs.createdDate) : null;
        derivedDocs.modifiedDate = derivedDocs.modifiedDate != null ? moment(derivedDocs.modifiedDate) : null;
      });
    }
    return res;
  }
}
