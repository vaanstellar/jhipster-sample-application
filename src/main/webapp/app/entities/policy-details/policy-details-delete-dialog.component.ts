import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPolicyDetails } from 'app/shared/model/policy-details.model';
import { PolicyDetailsService } from './policy-details.service';

@Component({
  selector: 'jhi-policy-details-delete-dialog',
  templateUrl: './policy-details-delete-dialog.component.html'
})
export class PolicyDetailsDeleteDialogComponent {
  policyDetails: IPolicyDetails;

  constructor(
    protected policyDetailsService: PolicyDetailsService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.policyDetailsService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'policyDetailsListModification',
        content: 'Deleted an policyDetails'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-policy-details-delete-popup',
  template: ''
})
export class PolicyDetailsDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ policyDetails }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(PolicyDetailsDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.policyDetails = policyDetails;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/policy-details', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/policy-details', { outlets: { popup: null } }]);
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
