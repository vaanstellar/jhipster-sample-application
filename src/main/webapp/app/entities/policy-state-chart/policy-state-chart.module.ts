import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared';
import {
  PolicyStateChartComponent,
  PolicyStateChartDetailComponent,
  PolicyStateChartUpdateComponent,
  PolicyStateChartDeletePopupComponent,
  PolicyStateChartDeleteDialogComponent,
  policyStateChartRoute,
  policyStateChartPopupRoute
} from './';

const ENTITY_STATES = [...policyStateChartRoute, ...policyStateChartPopupRoute];

@NgModule({
  imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PolicyStateChartComponent,
    PolicyStateChartDetailComponent,
    PolicyStateChartUpdateComponent,
    PolicyStateChartDeleteDialogComponent,
    PolicyStateChartDeletePopupComponent
  ],
  entryComponents: [
    PolicyStateChartComponent,
    PolicyStateChartUpdateComponent,
    PolicyStateChartDeleteDialogComponent,
    PolicyStateChartDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationPolicyStateChartModule {}
