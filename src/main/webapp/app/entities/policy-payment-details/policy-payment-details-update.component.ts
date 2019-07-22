import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IPolicyPaymentDetails, PolicyPaymentDetails } from 'app/shared/model/policy-payment-details.model';
import { PolicyPaymentDetailsService } from './policy-payment-details.service';
import { IPolicyDetails } from 'app/shared/model/policy-details.model';
import { PolicyDetailsService } from 'app/entities/policy-details';

@Component({
  selector: 'jhi-policy-payment-details-update',
  templateUrl: './policy-payment-details-update.component.html'
})
export class PolicyPaymentDetailsUpdateComponent implements OnInit {
  isSaving: boolean;

  policydetails: IPolicyDetails[];
  createdDateDp: any;
  modifiedDateDp: any;

  editForm = this.fb.group({
    id: [],
    paymentTransactionNo: [null, [Validators.maxLength(50)]],
    prnNo: [],
    encryptedPrnNo: [],
    totalFirstPremium: [null, [Validators.maxLength(25)]],
    paymentMethod: [null, [Validators.maxLength(25)]],
    esbPaymentMode: [null, [Validators.maxLength(25)]],
    paymentStatus: [null, [Validators.maxLength(10)]],
    createdDate: [],
    modifiedDate: [],
    createdTime: [],
    modifiedTime: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected policyPaymentDetailsService: PolicyPaymentDetailsService,
    protected policyDetailsService: PolicyDetailsService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ policyPaymentDetails }) => {
      this.updateForm(policyPaymentDetails);
    });
    this.policyDetailsService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPolicyDetails[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPolicyDetails[]>) => response.body)
      )
      .subscribe((res: IPolicyDetails[]) => (this.policydetails = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(policyPaymentDetails: IPolicyPaymentDetails) {
    this.editForm.patchValue({
      id: policyPaymentDetails.id,
      paymentTransactionNo: policyPaymentDetails.paymentTransactionNo,
      prnNo: policyPaymentDetails.prnNo,
      encryptedPrnNo: policyPaymentDetails.encryptedPrnNo,
      totalFirstPremium: policyPaymentDetails.totalFirstPremium,
      paymentMethod: policyPaymentDetails.paymentMethod,
      esbPaymentMode: policyPaymentDetails.esbPaymentMode,
      paymentStatus: policyPaymentDetails.paymentStatus,
      createdDate: policyPaymentDetails.createdDate,
      modifiedDate: policyPaymentDetails.modifiedDate,
      createdTime: policyPaymentDetails.createdTime != null ? policyPaymentDetails.createdTime.format(DATE_TIME_FORMAT) : null,
      modifiedTime: policyPaymentDetails.modifiedTime != null ? policyPaymentDetails.modifiedTime.format(DATE_TIME_FORMAT) : null
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const policyPaymentDetails = this.createFromForm();
    if (policyPaymentDetails.id !== undefined) {
      this.subscribeToSaveResponse(this.policyPaymentDetailsService.update(policyPaymentDetails));
    } else {
      this.subscribeToSaveResponse(this.policyPaymentDetailsService.create(policyPaymentDetails));
    }
  }

  private createFromForm(): IPolicyPaymentDetails {
    return {
      ...new PolicyPaymentDetails(),
      id: this.editForm.get(['id']).value,
      paymentTransactionNo: this.editForm.get(['paymentTransactionNo']).value,
      prnNo: this.editForm.get(['prnNo']).value,
      encryptedPrnNo: this.editForm.get(['encryptedPrnNo']).value,
      totalFirstPremium: this.editForm.get(['totalFirstPremium']).value,
      paymentMethod: this.editForm.get(['paymentMethod']).value,
      esbPaymentMode: this.editForm.get(['esbPaymentMode']).value,
      paymentStatus: this.editForm.get(['paymentStatus']).value,
      createdDate: this.editForm.get(['createdDate']).value,
      modifiedDate: this.editForm.get(['modifiedDate']).value,
      createdTime:
        this.editForm.get(['createdTime']).value != null ? moment(this.editForm.get(['createdTime']).value, DATE_TIME_FORMAT) : undefined,
      modifiedTime:
        this.editForm.get(['modifiedTime']).value != null ? moment(this.editForm.get(['modifiedTime']).value, DATE_TIME_FORMAT) : undefined
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPolicyPaymentDetails>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackPolicyDetailsById(index: number, item: IPolicyDetails) {
    return item.id;
  }
}
