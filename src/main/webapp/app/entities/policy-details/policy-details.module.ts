import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared';
import {
  PolicyDetailsComponent,
  PolicyDetailsDetailComponent,
  PolicyDetailsUpdateComponent,
  PolicyDetailsDeletePopupComponent,
  PolicyDetailsDeleteDialogComponent,
  policyDetailsRoute,
  policyDetailsPopupRoute
} from './';

const ENTITY_STATES = [...policyDetailsRoute, ...policyDetailsPopupRoute];

@NgModule({
  imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PolicyDetailsComponent,
    PolicyDetailsDetailComponent,
    PolicyDetailsUpdateComponent,
    PolicyDetailsDeleteDialogComponent,
    PolicyDetailsDeletePopupComponent
  ],
  entryComponents: [
    PolicyDetailsComponent,
    PolicyDetailsUpdateComponent,
    PolicyDetailsDeleteDialogComponent,
    PolicyDetailsDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationPolicyDetailsModule {}
