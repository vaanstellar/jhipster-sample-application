import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDerivedDocs } from 'app/shared/model/derived-docs.model';
import { DerivedDocsService } from './derived-docs.service';

@Component({
  selector: 'jhi-derived-docs-delete-dialog',
  templateUrl: './derived-docs-delete-dialog.component.html'
})
export class DerivedDocsDeleteDialogComponent {
  derivedDocs: IDerivedDocs;

  constructor(
    protected derivedDocsService: DerivedDocsService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.derivedDocsService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'derivedDocsListModification',
        content: 'Deleted an derivedDocs'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-derived-docs-delete-popup',
  template: ''
})
export class DerivedDocsDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ derivedDocs }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(DerivedDocsDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.derivedDocs = derivedDocs;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/derived-docs', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/derived-docs', { outlets: { popup: null } }]);
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
