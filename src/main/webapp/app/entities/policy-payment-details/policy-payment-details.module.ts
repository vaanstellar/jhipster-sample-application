import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared';
import {
  PolicyPaymentDetailsComponent,
  PolicyPaymentDetailsDetailComponent,
  PolicyPaymentDetailsUpdateComponent,
  PolicyPaymentDetailsDeletePopupComponent,
  PolicyPaymentDetailsDeleteDialogComponent,
  policyPaymentDetailsRoute,
  policyPaymentDetailsPopupRoute
} from './';

const ENTITY_STATES = [...policyPaymentDetailsRoute, ...policyPaymentDetailsPopupRoute];

@NgModule({
  imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PolicyPaymentDetailsComponent,
    PolicyPaymentDetailsDetailComponent,
    PolicyPaymentDetailsUpdateComponent,
    PolicyPaymentDetailsDeleteDialogComponent,
    PolicyPaymentDetailsDeletePopupComponent
  ],
  entryComponents: [
    PolicyPaymentDetailsComponent,
    PolicyPaymentDetailsUpdateComponent,
    PolicyPaymentDetailsDeleteDialogComponent,
    PolicyPaymentDetailsDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationPolicyPaymentDetailsModule {}
