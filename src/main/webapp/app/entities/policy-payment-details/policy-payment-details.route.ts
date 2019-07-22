import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PolicyPaymentDetails } from 'app/shared/model/policy-payment-details.model';
import { PolicyPaymentDetailsService } from './policy-payment-details.service';
import { PolicyPaymentDetailsComponent } from './policy-payment-details.component';
import { PolicyPaymentDetailsDetailComponent } from './policy-payment-details-detail.component';
import { PolicyPaymentDetailsUpdateComponent } from './policy-payment-details-update.component';
import { PolicyPaymentDetailsDeletePopupComponent } from './policy-payment-details-delete-dialog.component';
import { IPolicyPaymentDetails } from 'app/shared/model/policy-payment-details.model';

@Injectable({ providedIn: 'root' })
export class PolicyPaymentDetailsResolve implements Resolve<IPolicyPaymentDetails> {
  constructor(private service: PolicyPaymentDetailsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPolicyPaymentDetails> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<PolicyPaymentDetails>) => response.ok),
        map((policyPaymentDetails: HttpResponse<PolicyPaymentDetails>) => policyPaymentDetails.body)
      );
    }
    return of(new PolicyPaymentDetails());
  }
}

export const policyPaymentDetailsRoute: Routes = [
  {
    path: '',
    component: PolicyPaymentDetailsComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PolicyPaymentDetails'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PolicyPaymentDetailsDetailComponent,
    resolve: {
      policyPaymentDetails: PolicyPaymentDetailsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PolicyPaymentDetails'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PolicyPaymentDetailsUpdateComponent,
    resolve: {
      policyPaymentDetails: PolicyPaymentDetailsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PolicyPaymentDetails'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PolicyPaymentDetailsUpdateComponent,
    resolve: {
      policyPaymentDetails: PolicyPaymentDetailsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PolicyPaymentDetails'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const policyPaymentDetailsPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: PolicyPaymentDetailsDeletePopupComponent,
    resolve: {
      policyPaymentDetails: PolicyPaymentDetailsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PolicyPaymentDetails'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
