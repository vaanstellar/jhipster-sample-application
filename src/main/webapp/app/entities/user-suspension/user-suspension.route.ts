import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { UserSuspension } from 'app/shared/model/user-suspension.model';
import { UserSuspensionService } from './user-suspension.service';
import { UserSuspensionComponent } from './user-suspension.component';
import { UserSuspensionDetailComponent } from './user-suspension-detail.component';
import { UserSuspensionUpdateComponent } from './user-suspension-update.component';
import { UserSuspensionDeletePopupComponent } from './user-suspension-delete-dialog.component';
import { IUserSuspension } from 'app/shared/model/user-suspension.model';

@Injectable({ providedIn: 'root' })
export class UserSuspensionResolve implements Resolve<IUserSuspension> {
  constructor(private service: UserSuspensionService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUserSuspension> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<UserSuspension>) => response.ok),
        map((userSuspension: HttpResponse<UserSuspension>) => userSuspension.body)
      );
    }
    return of(new UserSuspension());
  }
}

export const userSuspensionRoute: Routes = [
  {
    path: '',
    component: UserSuspensionComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'UserSuspensions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: UserSuspensionDetailComponent,
    resolve: {
      userSuspension: UserSuspensionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'UserSuspensions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: UserSuspensionUpdateComponent,
    resolve: {
      userSuspension: UserSuspensionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'UserSuspensions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: UserSuspensionUpdateComponent,
    resolve: {
      userSuspension: UserSuspensionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'UserSuspensions'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const userSuspensionPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: UserSuspensionDeletePopupComponent,
    resolve: {
      userSuspension: UserSuspensionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'UserSuspensions'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
