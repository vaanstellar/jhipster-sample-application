import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DerivedDocs } from 'app/shared/model/derived-docs.model';
import { DerivedDocsService } from './derived-docs.service';
import { DerivedDocsComponent } from './derived-docs.component';
import { DerivedDocsDetailComponent } from './derived-docs-detail.component';
import { DerivedDocsUpdateComponent } from './derived-docs-update.component';
import { DerivedDocsDeletePopupComponent } from './derived-docs-delete-dialog.component';
import { IDerivedDocs } from 'app/shared/model/derived-docs.model';

@Injectable({ providedIn: 'root' })
export class DerivedDocsResolve implements Resolve<IDerivedDocs> {
  constructor(private service: DerivedDocsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDerivedDocs> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<DerivedDocs>) => response.ok),
        map((derivedDocs: HttpResponse<DerivedDocs>) => derivedDocs.body)
      );
    }
    return of(new DerivedDocs());
  }
}

export const derivedDocsRoute: Routes = [
  {
    path: '',
    component: DerivedDocsComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'DerivedDocs'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DerivedDocsDetailComponent,
    resolve: {
      derivedDocs: DerivedDocsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'DerivedDocs'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DerivedDocsUpdateComponent,
    resolve: {
      derivedDocs: DerivedDocsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'DerivedDocs'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DerivedDocsUpdateComponent,
    resolve: {
      derivedDocs: DerivedDocsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'DerivedDocs'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const derivedDocsPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: DerivedDocsDeletePopupComponent,
    resolve: {
      derivedDocs: DerivedDocsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'DerivedDocs'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
