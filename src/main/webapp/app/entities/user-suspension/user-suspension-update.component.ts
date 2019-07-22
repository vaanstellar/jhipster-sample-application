import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { IUserSuspension, UserSuspension } from 'app/shared/model/user-suspension.model';
import { UserSuspensionService } from './user-suspension.service';

@Component({
  selector: 'jhi-user-suspension-update',
  templateUrl: './user-suspension-update.component.html'
})
export class UserSuspensionUpdateComponent implements OnInit {
  isSaving: boolean;
  createdDateDp: any;
  modifiedDateDp: any;

  editForm = this.fb.group({
    id: [],
    emailId: [null, []],
    retryCount: [],
    suspensionTimeInMinutes: [],
    reason: [null, [Validators.maxLength(25)]],
    createdDate: [],
    modifiedDate: []
  });

  constructor(protected userSuspensionService: UserSuspensionService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ userSuspension }) => {
      this.updateForm(userSuspension);
    });
  }

  updateForm(userSuspension: IUserSuspension) {
    this.editForm.patchValue({
      id: userSuspension.id,
      emailId: userSuspension.emailId,
      retryCount: userSuspension.retryCount,
      suspensionTimeInMinutes: userSuspension.suspensionTimeInMinutes,
      reason: userSuspension.reason,
      createdDate: userSuspension.createdDate,
      modifiedDate: userSuspension.modifiedDate
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const userSuspension = this.createFromForm();
    if (userSuspension.id !== undefined) {
      this.subscribeToSaveResponse(this.userSuspensionService.update(userSuspension));
    } else {
      this.subscribeToSaveResponse(this.userSuspensionService.create(userSuspension));
    }
  }

  private createFromForm(): IUserSuspension {
    return {
      ...new UserSuspension(),
      id: this.editForm.get(['id']).value,
      emailId: this.editForm.get(['emailId']).value,
      retryCount: this.editForm.get(['retryCount']).value,
      suspensionTimeInMinutes: this.editForm.get(['suspensionTimeInMinutes']).value,
      reason: this.editForm.get(['reason']).value,
      createdDate: this.editForm.get(['createdDate']).value,
      modifiedDate: this.editForm.get(['modifiedDate']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserSuspension>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
