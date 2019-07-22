import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPolicyPaymentDetails } from 'app/shared/model/policy-payment-details.model';

type EntityResponseType = HttpResponse<IPolicyPaymentDetails>;
type EntityArrayResponseType = HttpResponse<IPolicyPaymentDetails[]>;

@Injectable({ providedIn: 'root' })
export class PolicyPaymentDetailsService {
  public resourceUrl = SERVER_API_URL + 'api/policy-payment-details';

  constructor(protected http: HttpClient) {}

  create(policyPaymentDetails: IPolicyPaymentDetails): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(policyPaymentDetails);
    return this.http
      .post<IPolicyPaymentDetails>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(policyPaymentDetails: IPolicyPaymentDetails): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(policyPaymentDetails);
    return this.http
      .put<IPolicyPaymentDetails>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPolicyPaymentDetails>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPolicyPaymentDetails[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(policyPaymentDetails: IPolicyPaymentDetails): IPolicyPaymentDetails {
    const copy: IPolicyPaymentDetails = Object.assign({}, policyPaymentDetails, {
      createdDate:
        policyPaymentDetails.createdDate != null && policyPaymentDetails.createdDate.isValid()
          ? policyPaymentDetails.createdDate.format(DATE_FORMAT)
          : null,
      modifiedDate:
        policyPaymentDetails.modifiedDate != null && policyPaymentDetails.modifiedDate.isValid()
          ? policyPaymentDetails.modifiedDate.format(DATE_FORMAT)
          : null,
      createdTime:
        policyPaymentDetails.createdTime != null && policyPaymentDetails.createdTime.isValid()
          ? policyPaymentDetails.createdTime.toJSON()
          : null,
      modifiedTime:
        policyPaymentDetails.modifiedTime != null && policyPaymentDetails.modifiedTime.isValid()
          ? policyPaymentDetails.modifiedTime.toJSON()
          : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.createdDate = res.body.createdDate != null ? moment(res.body.createdDate) : null;
      res.body.modifiedDate = res.body.modifiedDate != null ? moment(res.body.modifiedDate) : null;
      res.body.createdTime = res.body.createdTime != null ? moment(res.body.createdTime) : null;
      res.body.modifiedTime = res.body.modifiedTime != null ? moment(res.body.modifiedTime) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((policyPaymentDetails: IPolicyPaymentDetails) => {
        policyPaymentDetails.createdDate = policyPaymentDetails.createdDate != null ? moment(policyPaymentDetails.createdDate) : null;
        policyPaymentDetails.modifiedDate = policyPaymentDetails.modifiedDate != null ? moment(policyPaymentDetails.modifiedDate) : null;
        policyPaymentDetails.createdTime = policyPaymentDetails.createdTime != null ? moment(policyPaymentDetails.createdTime) : null;
        policyPaymentDetails.modifiedTime = policyPaymentDetails.modifiedTime != null ? moment(policyPaymentDetails.modifiedTime) : null;
      });
    }
    return res;
  }
}
