import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared';
import {
  UserSuspensionComponent,
  UserSuspensionDetailComponent,
  UserSuspensionUpdateComponent,
  UserSuspensionDeletePopupComponent,
  UserSuspensionDeleteDialogComponent,
  userSuspensionRoute,
  userSuspensionPopupRoute
} from './';

const ENTITY_STATES = [...userSuspensionRoute, ...userSuspensionPopupRoute];

@NgModule({
  imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    UserSuspensionComponent,
    UserSuspensionDetailComponent,
    UserSuspensionUpdateComponent,
    UserSuspensionDeleteDialogComponent,
    UserSuspensionDeletePopupComponent
  ],
  entryComponents: [
    UserSuspensionComponent,
    UserSuspensionUpdateComponent,
    UserSuspensionDeleteDialogComponent,
    UserSuspensionDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationUserSuspensionModule {}
