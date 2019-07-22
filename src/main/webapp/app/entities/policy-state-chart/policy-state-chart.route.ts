import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PolicyStateChart } from 'app/shared/model/policy-state-chart.model';
import { PolicyStateChartService } from './policy-state-chart.service';
import { PolicyStateChartComponent } from './policy-state-chart.component';
import { PolicyStateChartDetailComponent } from './policy-state-chart-detail.component';
import { PolicyStateChartUpdateComponent } from './policy-state-chart-update.component';
import { PolicyStateChartDeletePopupComponent } from './policy-state-chart-delete-dialog.component';
import { IPolicyStateChart } from 'app/shared/model/policy-state-chart.model';

@Injectable({ providedIn: 'root' })
export class PolicyStateChartResolve implements Resolve<IPolicyStateChart> {
  constructor(private service: PolicyStateChartService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPolicyStateChart> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<PolicyStateChart>) => response.ok),
        map((policyStateChart: HttpResponse<PolicyStateChart>) => policyStateChart.body)
      );
    }
    return of(new PolicyStateChart());
  }
}

export const policyStateChartRoute: Routes = [
  {
    path: '',
    component: PolicyStateChartComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PolicyStateCharts'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PolicyStateChartDetailComponent,
    resolve: {
      policyStateChart: PolicyStateChartResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PolicyStateCharts'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PolicyStateChartUpdateComponent,
    resolve: {
      policyStateChart: PolicyStateChartResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PolicyStateCharts'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PolicyStateChartUpdateComponent,
    resolve: {
      policyStateChart: PolicyStateChartResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PolicyStateCharts'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const policyStateChartPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: PolicyStateChartDeletePopupComponent,
    resolve: {
      policyStateChart: PolicyStateChartResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PolicyStateCharts'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
