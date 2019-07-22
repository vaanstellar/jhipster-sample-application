import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPolicyStateChart } from 'app/shared/model/policy-state-chart.model';
import { PolicyStateChartService } from './policy-state-chart.service';

@Component({
  selector: 'jhi-policy-state-chart-delete-dialog',
  templateUrl: './policy-state-chart-delete-dialog.component.html'
})
export class PolicyStateChartDeleteDialogComponent {
  policyStateChart: IPolicyStateChart;

  constructor(
    protected policyStateChartService: PolicyStateChartService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.policyStateChartService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'policyStateChartListModification',
        content: 'Deleted an policyStateChart'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-policy-state-chart-delete-popup',
  template: ''
})
export class PolicyStateChartDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ policyStateChart }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(PolicyStateChartDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.policyStateChart = policyStateChart;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/policy-state-chart', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/policy-state-chart', { outlets: { popup: null } }]);
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
