import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared';
import {
  DerivedDocsComponent,
  DerivedDocsDetailComponent,
  DerivedDocsUpdateComponent,
  DerivedDocsDeletePopupComponent,
  DerivedDocsDeleteDialogComponent,
  derivedDocsRoute,
  derivedDocsPopupRoute
} from './';

const ENTITY_STATES = [...derivedDocsRoute, ...derivedDocsPopupRoute];

@NgModule({
  imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    DerivedDocsComponent,
    DerivedDocsDetailComponent,
    DerivedDocsUpdateComponent,
    DerivedDocsDeleteDialogComponent,
    DerivedDocsDeletePopupComponent
  ],
  entryComponents: [DerivedDocsComponent, DerivedDocsUpdateComponent, DerivedDocsDeleteDialogComponent, DerivedDocsDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationDerivedDocsModule {}
