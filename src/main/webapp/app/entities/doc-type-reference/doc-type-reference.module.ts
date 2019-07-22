import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared';
import {
  DocTypeReferenceComponent,
  DocTypeReferenceDetailComponent,
  DocTypeReferenceUpdateComponent,
  DocTypeReferenceDeletePopupComponent,
  DocTypeReferenceDeleteDialogComponent,
  docTypeReferenceRoute,
  docTypeReferencePopupRoute
} from './';

const ENTITY_STATES = [...docTypeReferenceRoute, ...docTypeReferencePopupRoute];

@NgModule({
  imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    DocTypeReferenceComponent,
    DocTypeReferenceDetailComponent,
    DocTypeReferenceUpdateComponent,
    DocTypeReferenceDeleteDialogComponent,
    DocTypeReferenceDeletePopupComponent
  ],
  entryComponents: [
    DocTypeReferenceComponent,
    DocTypeReferenceUpdateComponent,
    DocTypeReferenceDeleteDialogComponent,
    DocTypeReferenceDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationDocTypeReferenceModule {}
