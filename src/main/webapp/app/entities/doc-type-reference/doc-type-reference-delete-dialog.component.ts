import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDocTypeReference } from 'app/shared/model/doc-type-reference.model';
import { DocTypeReferenceService } from './doc-type-reference.service';

@Component({
  selector: 'jhi-doc-type-reference-delete-dialog',
  templateUrl: './doc-type-reference-delete-dialog.component.html'
})
export class DocTypeReferenceDeleteDialogComponent {
  docTypeReference: IDocTypeReference;

  constructor(
    protected docTypeReferenceService: DocTypeReferenceService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.docTypeReferenceService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'docTypeReferenceListModification',
        content: 'Deleted an docTypeReference'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-doc-type-reference-delete-popup',
  template: ''
})
export class DocTypeReferenceDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ docTypeReference }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(DocTypeReferenceDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.docTypeReference = docTypeReference;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/doc-type-reference', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/doc-type-reference', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
