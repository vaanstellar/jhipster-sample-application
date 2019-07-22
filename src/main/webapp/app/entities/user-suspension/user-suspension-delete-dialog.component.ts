import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUserSuspension } from 'app/shared/model/user-suspension.model';
import { UserSuspensionService } from './user-suspension.service';

@Component({
  selector: 'jhi-user-suspension-delete-dialog',
  templateUrl: './user-suspension-delete-dialog.component.html'
})
export class UserSuspensionDeleteDialogComponent {
  userSuspension: IUserSuspension;

  constructor(
    protected userSuspensionService: UserSuspensionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.userSuspensionService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'userSuspensionListModification',
        content: 'Deleted an userSuspension'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-user-suspension-delete-popup',
  template: ''
})
export class UserSuspensionDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ userSuspension }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(UserSuspensionDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.userSuspension = userSuspension;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/user-suspension', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/user-suspension', { outlets: { popup: null } }]);
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
