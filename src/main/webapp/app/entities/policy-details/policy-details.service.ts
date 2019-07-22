import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPolicyDetails } from 'app/shared/model/policy-details.model';

type EntityResponseType = HttpResponse<IPolicyDetails>;
type EntityArrayResponseType = HttpResponse<IPolicyDetails[]>;

@Injectable({ providedIn: 'root' })
export class PolicyDetailsService {
  public resourceUrl = SERVER_API_URL + 'api/policy-details';

  constructor(protected http: HttpClient) {}

  create(policyDetails: IPolicyDetails): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(policyDetails);
    return this.http
      .post<IPolicyDetails>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(policyDetails: IPolicyDetails): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(policyDetails);
    return this.http
      .put<IPolicyDetails>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPolicyDetails>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPolicyDetails[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(policyDetails: IPolicyDetails): IPolicyDetails {
    const copy: IPolicyDetails = Object.assign({}, policyDetails, {
      createdDate:
        policyDetails.createdDate != null && policyDetails.createdDate.isValid() ? policyDetails.createdDate.format(DATE_FORMAT) : null,
      modifiedDate:
        policyDetails.modifiedDate != null && policyDetails.modifiedDate.isValid() ? policyDetails.modifiedDate.format(DATE_FORMAT) : null
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
      res.body.forEach((policyDetails: IPolicyDetails) => {
        policyDetails.createdDate = policyDetails.createdDate != null ? moment(policyDetails.createdDate) : null;
        policyDetails.modifiedDate = policyDetails.modifiedDate != null ? moment(policyDetails.modifiedDate) : null;
      });
    }
    return res;
  }
}
