import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { UserDetails } from 'app/shared/model/user-details.model';
import { UserDetailsService } from './user-details.service';
import { UserDetailsComponent } from './user-details.component';
import { UserDetailsDetailComponent } from './user-details-detail.component';
import { UserDetailsUpdateComponent } from './user-details-update.component';
import { UserDetailsDeletePopupComponent } from './user-details-delete-dialog.component';
import { IUserDetails } from 'app/shared/model/user-details.model';

@Injectable({ providedIn: 'root' })
export class UserDetailsResolve implements Resolve<IUserDetails> {
  constructor(private service: UserDetailsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUserDetails> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<UserDetails>) => response.ok),
        map((userDetails: HttpResponse<UserDetails>) => userDetails.body)
      );
    }
    return of(new UserDetails());
  }
}

export const userDetailsRoute: Routes = [
  {
    path: '',
    component: UserDetailsComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'UserDetails'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: UserDetailsDetailComponent,
    resolve: {
      userDetails: UserDetailsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'UserDetails'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: UserDetailsUpdateComponent,
    resolve: {
      userDetails: UserDetailsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'UserDetails'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: UserDetailsUpdateComponent,
    resolve: {
      userDetails: UserDetailsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'UserDetails'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const userDetailsPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: UserDetailsDeletePopupComponent,
    resolve: {
      userDetails: UserDetailsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'UserDetails'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
