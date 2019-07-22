import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPolicyPaymentDetails } from 'app/shared/model/policy-payment-details.model';
import { PolicyPaymentDetailsService } from './policy-payment-details.service';

@Component({
  selector: 'jhi-policy-payment-details-delete-dialog',
  templateUrl: './policy-payment-details-delete-dialog.component.html'
})
export class PolicyPaymentDetailsDeleteDialogComponent {
  policyPaymentDetails: IPolicyPaymentDetails;

  constructor(
    protected policyPaymentDetailsService: PolicyPaymentDetailsService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.policyPaymentDetailsService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'policyPaymentDetailsListModification',
        content: 'Deleted an policyPaymentDetails'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-policy-payment-details-delete-popup',
  template: ''
})
export class PolicyPaymentDetailsDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ policyPaymentDetails }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(PolicyPaymentDetailsDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.policyPaymentDetails = policyPaymentDetails;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/policy-payment-details', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/policy-payment-details', { outlets: { popup: null } }]);
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
