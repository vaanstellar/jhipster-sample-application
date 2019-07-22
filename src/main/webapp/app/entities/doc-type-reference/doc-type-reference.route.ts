import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DocTypeReference } from 'app/shared/model/doc-type-reference.model';
import { DocTypeReferenceService } from './doc-type-reference.service';
import { DocTypeReferenceComponent } from './doc-type-reference.component';
import { DocTypeReferenceDetailComponent } from './doc-type-reference-detail.component';
import { DocTypeReferenceUpdateComponent } from './doc-type-reference-update.component';
import { DocTypeReferenceDeletePopupComponent } from './doc-type-reference-delete-dialog.component';
import { IDocTypeReference } from 'app/shared/model/doc-type-reference.model';

@Injectable({ providedIn: 'root' })
export class DocTypeReferenceResolve implements Resolve<IDocTypeReference> {
  constructor(private service: DocTypeReferenceService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDocTypeReference> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<DocTypeReference>) => response.ok),
        map((docTypeReference: HttpResponse<DocTypeReference>) => docTypeReference.body)
      );
    }
    return of(new DocTypeReference());
  }
}

export const docTypeReferenceRoute: Routes = [
  {
    path: '',
    component: DocTypeReferenceComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'DocTypeReferences'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DocTypeReferenceDetailComponent,
    resolve: {
      docTypeReference: DocTypeReferenceResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'DocTypeReferences'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DocTypeReferenceUpdateComponent,
    resolve: {
      docTypeReference: DocTypeReferenceResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'DocTypeReferences'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DocTypeReferenceUpdateComponent,
    resolve: {
      docTypeReference: DocTypeReferenceResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'DocTypeReferences'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const docTypeReferencePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: DocTypeReferenceDeletePopupComponent,
    resolve: {
      docTypeReference: DocTypeReferenceResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'DocTypeReferences'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
