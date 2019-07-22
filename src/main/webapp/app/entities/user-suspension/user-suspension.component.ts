import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IUserSuspension } from 'app/shared/model/user-suspension.model';
import { AccountService } from 'app/core';
import { UserSuspensionService } from './user-suspension.service';

@Component({
  selector: 'jhi-user-suspension',
  templateUrl: './user-suspension.component.html'
})
export class UserSuspensionComponent implements OnInit, OnDestroy {
  userSuspensions: IUserSuspension[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected userSuspensionService: UserSuspensionService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.userSuspensionService
      .query()
      .pipe(
        filter((res: HttpResponse<IUserSuspension[]>) => res.ok),
        map((res: HttpResponse<IUserSuspension[]>) => res.body)
      )
      .subscribe(
        (res: IUserSuspension[]) => {
          this.userSuspensions = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInUserSuspensions();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IUserSuspension) {
    return item.id;
  }

  registerChangeInUserSuspensions() {
    this.eventSubscriber = this.eventManager.subscribe('userSuspensionListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
