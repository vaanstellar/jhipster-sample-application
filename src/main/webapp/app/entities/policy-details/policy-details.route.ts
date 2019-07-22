import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PolicyDetails } from 'app/shared/model/policy-details.model';
import { PolicyDetailsService } from './policy-details.service';
import { PolicyDetailsComponent } from './policy-details.component';
import { PolicyDetailsDetailComponent } from './policy-details-detail.component';
import { PolicyDetailsUpdateComponent } from './policy-details-update.component';
import { PolicyDetailsDeletePopupComponent } from './policy-details-delete-dialog.component';
import { IPolicyDetails } from 'app/shared/model/policy-details.model';

@Injectable({ providedIn: 'root' })
export class PolicyDetailsResolve implements Resolve<IPolicyDetails> {
  constructor(private service: PolicyDetailsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPolicyDetails> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<PolicyDetails>) => response.ok),
        map((policyDetails: HttpResponse<PolicyDetails>) => policyDetails.body)
      );
    }
    return of(new PolicyDetails());
  }
}

export const policyDetailsRoute: Routes = [
  {
    path: '',
    component: PolicyDetailsComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PolicyDetails'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PolicyDetailsDetailComponent,
    resolve: {
      policyDetails: PolicyDetailsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PolicyDetails'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PolicyDetailsUpdateComponent,
    resolve: {
      policyDetails: PolicyDetailsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PolicyDetails'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PolicyDetailsUpdateComponent,
    resolve: {
      policyDetails: PolicyDetailsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PolicyDetails'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const policyDetailsPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: PolicyDetailsDeletePopupComponent,
    resolve: {
      policyDetails: PolicyDetailsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PolicyDetails'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
