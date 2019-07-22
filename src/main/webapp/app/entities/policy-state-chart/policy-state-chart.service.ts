import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPolicyStateChart } from 'app/shared/model/policy-state-chart.model';

type EntityResponseType = HttpResponse<IPolicyStateChart>;
type EntityArrayResponseType = HttpResponse<IPolicyStateChart[]>;

@Injectable({ providedIn: 'root' })
export class PolicyStateChartService {
  public resourceUrl = SERVER_API_URL + 'api/policy-state-charts';

  constructor(protected http: HttpClient) {}

  create(policyStateChart: IPolicyStateChart): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(policyStateChart);
    return this.http
      .post<IPolicyStateChart>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(policyStateChart: IPolicyStateChart): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(policyStateChart);
    return this.http
      .put<IPolicyStateChart>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPolicyStateChart>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPolicyStateChart[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(policyStateChart: IPolicyStateChart): IPolicyStateChart {
    const copy: IPolicyStateChart = Object.assign({}, policyStateChart, {
      createdDate:
        policyStateChart.createdDate != null && policyStateChart.createdDate.isValid()
          ? policyStateChart.createdDate.format(DATE_FORMAT)
          : null,
      modifiedDate:
        policyStateChart.modifiedDate != null && policyStateChart.modifiedDate.isValid()
          ? policyStateChart.modifiedDate.format(DATE_FORMAT)
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
      res.body.forEach((policyStateChart: IPolicyStateChart) => {
        policyStateChart.createdDate = policyStateChart.createdDate != null ? moment(policyStateChart.createdDate) : null;
        policyStateChart.modifiedDate = policyStateChart.modifiedDate != null ? moment(policyStateChart.modifiedDate) : null;
      });
    }
    return res;
  }
}
