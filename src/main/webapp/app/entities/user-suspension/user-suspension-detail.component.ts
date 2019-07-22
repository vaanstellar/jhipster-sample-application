import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUserSuspension } from 'app/shared/model/user-suspension.model';

@Component({
  selector: 'jhi-user-suspension-detail',
  templateUrl: './user-suspension-detail.component.html'
})
export class UserSuspensionDetailComponent implements OnInit {
  userSuspension: IUserSuspension;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ userSuspension }) => {
      this.userSuspension = userSuspension;
    });
  }

  previousState() {
    window.history.back();
  }
}
