import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IPolicyDetails, PolicyDetails } from 'app/shared/model/policy-details.model';
import { PolicyDetailsService } from './policy-details.service';
import { IPolicyPaymentDetails } from 'app/shared/model/policy-payment-details.model';
import { PolicyPaymentDetailsService } from 'app/entities/policy-payment-details';
import { IPolicyStateChart } from 'app/shared/model/policy-state-chart.model';
import { PolicyStateChartService } from 'app/entities/policy-state-chart';
import { IUserDetails } from 'app/shared/model/user-details.model';
import { UserDetailsService } from 'app/entities/user-details';

@Component({
  selector: 'jhi-policy-details-update',
  templateUrl: './policy-details-update.component.html'
})
export class PolicyDetailsUpdateComponent implements OnInit {
  isSaving: boolean;

  policypaymentdetails: IPolicyPaymentDetails[];

  policystatecharts: IPolicyStateChart[];

  userdetails: IUserDetails[];
  createdDateDp: any;
  modifiedDateDp: any;

  editForm = this.fb.group({
    id: [],
    policyCode: [null, [Validators.maxLength(25)]],
    planCode: [null, [Validators.maxLength(10)]],
    planType: [null, [Validators.maxLength(25)]],
    agentCode: [],
    status: [null, [Validators.maxLength(25)]],
    riderNames: [],
    contactByCall: [null, [Validators.maxLength(5)]],
    contactBySMS: [null, [Validators.maxLength(5)]],
    nric: [null, [Validators.required, Validators.maxLength(9)]],
    name: [],
    gender: [null, [Validators.maxLength(1)]],
    birthDate: [null, [Validators.maxLength(10)]],
    emailId: [null, [Validators.required, Validators.maxLength(320)]],
    phoneNo: [null, [Validators.required, Validators.maxLength(15)]],
    educationLevel: [null, [Validators.maxLength(1)]],
    residentialPostalCode: [null, [Validators.maxLength(6)]],
    residentialUnitNo: [null, [Validators.maxLength(7)]],
    residentialAddress1: [],
    residentialAddress2: [],
    residentialAddress3: [],
    residentialAddress4: [],
    residentialSameAsMailing: [null, [Validators.maxLength(5)]],
    mailingPostalCode: [null, [Validators.maxLength(6)]],
    mailingUnitNo: [null, [Validators.maxLength(7)]],
    mailingAddress1: [],
    mailingAddress2: [],
    mailingAddress3: [],
    mailingAddress4: [],
    occupation: [],
    residentialStatus: [null, [Validators.maxLength(3)]],
    nationality: [null, [Validators.maxLength(10)]],
    placeOfNationality: [],
    countryOfBirth: [null, [Validators.maxLength(3)]],
    placeOfBirth: [],
    occupationCode: [null, [Validators.maxLength(4)]],
    nameOfEmployer: [],
    annualIncome: [null, [Validators.maxLength(15)]],
    addressType: [null, [Validators.maxLength(25)]],
    maritalStatus: [null, [Validators.maxLength(1)]],
    uinfin: [null, [Validators.maxLength(9)]],
    myInfoVerified: [null, [Validators.maxLength(15)]],
    createdDate: [],
    modifiedDate: [],
    policyPaymentDetails: [],
    policyStateChart: [],
    userDetails: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected policyDetailsService: PolicyDetailsService,
    protected policyPaymentDetailsService: PolicyPaymentDetailsService,
    protected policyStateChartService: PolicyStateChartService,
    protected userDetailsService: UserDetailsService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ policyDetails }) => {
      this.updateForm(policyDetails);
    });
    this.policyPaymentDetailsService
      .query({ filter: 'policydetails-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IPolicyPaymentDetails[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPolicyPaymentDetails[]>) => response.body)
      )
      .subscribe(
        (res: IPolicyPaymentDetails[]) => {
          if (!this.editForm.get('policyPaymentDetails').value || !this.editForm.get('policyPaymentDetails').value.id) {
            this.policypaymentdetails = res;
          } else {
            this.policyPaymentDetailsService
              .find(this.editForm.get('policyPaymentDetails').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IPolicyPaymentDetails>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IPolicyPaymentDetails>) => subResponse.body)
              )
              .subscribe(
                (subRes: IPolicyPaymentDetails) => (this.policypaymentdetails = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.policyStateChartService
      .query({ filter: 'policydetails-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IPolicyStateChart[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPolicyStateChart[]>) => response.body)
      )
      .subscribe(
        (res: IPolicyStateChart[]) => {
          if (!this.editForm.get('policyStateChart').value || !this.editForm.get('policyStateChart').value.id) {
            this.policystatecharts = res;
          } else {
            this.policyStateChartService
              .find(this.editForm.get('policyStateChart').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IPolicyStateChart>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IPolicyStateChart>) => subResponse.body)
              )
              .subscribe(
                (subRes: IPolicyStateChart) => (this.policystatecharts = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.userDetailsService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUserDetails[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUserDetails[]>) => response.body)
      )
      .subscribe((res: IUserDetails[]) => (this.userdetails = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(policyDetails: IPolicyDetails) {
    this.editForm.patchValue({
      id: policyDetails.id,
      policyCode: policyDetails.policyCode,
      planCode: policyDetails.planCode,
      planType: policyDetails.planType,
      agentCode: policyDetails.agentCode,
      status: policyDetails.status,
      riderNames: policyDetails.riderNames,
      contactByCall: policyDetails.contactByCall,
      contactBySMS: policyDetails.contactBySMS,
      nric: policyDetails.nric,
      name: policyDetails.name,
      gender: policyDetails.gender,
      birthDate: policyDetails.birthDate,
      emailId: policyDetails.emailId,
      phoneNo: policyDetails.phoneNo,
      educationLevel: policyDetails.educationLevel,
      residentialPostalCode: policyDetails.residentialPostalCode,
      residentialUnitNo: policyDetails.residentialUnitNo,
      residentialAddress1: policyDetails.residentialAddress1,
      residentialAddress2: policyDetails.residentialAddress2,
      residentialAddress3: policyDetails.residentialAddress3,
      residentialAddress4: policyDetails.residentialAddress4,
      residentialSameAsMailing: policyDetails.residentialSameAsMailing,
      mailingPostalCode: policyDetails.mailingPostalCode,
      mailingUnitNo: policyDetails.mailingUnitNo,
      mailingAddress1: policyDetails.mailingAddress1,
      mailingAddress2: policyDetails.mailingAddress2,
      mailingAddress3: policyDetails.mailingAddress3,
      mailingAddress4: policyDetails.mailingAddress4,
      occupation: policyDetails.occupation,
      residentialStatus: policyDetails.residentialStatus,
      nationality: policyDetails.nationality,
      placeOfNationality: policyDetails.placeOfNationality,
      countryOfBirth: policyDetails.countryOfBirth,
      placeOfBirth: policyDetails.placeOfBirth,
      occupationCode: policyDetails.occupationCode,
      nameOfEmployer: policyDetails.nameOfEmployer,
      annualIncome: policyDetails.annualIncome,
      addressType: policyDetails.addressType,
      maritalStatus: policyDetails.maritalStatus,
      uinfin: policyDetails.uinfin,
      myInfoVerified: policyDetails.myInfoVerified,
      createdDate: policyDetails.createdDate,
      modifiedDate: policyDetails.modifiedDate,
      policyPaymentDetails: policyDetails.policyPaymentDetails,
      policyStateChart: policyDetails.policyStateChart,
      userDetails: policyDetails.userDetails
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const policyDetails = this.createFromForm();
    if (policyDetails.id !== undefined) {
      this.subscribeToSaveResponse(this.policyDetailsService.update(policyDetails));
    } else {
      this.subscribeToSaveResponse(this.policyDetailsService.create(policyDetails));
    }
  }

  private createFromForm(): IPolicyDetails {
    return {
      ...new PolicyDetails(),
      id: this.editForm.get(['id']).value,
      policyCode: this.editForm.get(['policyCode']).value,
      planCode: this.editForm.get(['planCode']).value,
      planType: this.editForm.get(['planType']).value,
      agentCode: this.editForm.get(['agentCode']).value,
      status: this.editForm.get(['status']).value,
      riderNames: this.editForm.get(['riderNames']).value,
      contactByCall: this.editForm.get(['contactByCall']).value,
      contactBySMS: this.editForm.get(['contactBySMS']).value,
      nric: this.editForm.get(['nric']).value,
      name: this.editForm.get(['name']).value,
      gender: this.editForm.get(['gender']).value,
      birthDate: this.editForm.get(['birthDate']).value,
      emailId: this.editForm.get(['emailId']).value,
      phoneNo: this.editForm.get(['phoneNo']).value,
      educationLevel: this.editForm.get(['educationLevel']).value,
      residentialPostalCode: this.editForm.get(['residentialPostalCode']).value,
      residentialUnitNo: this.editForm.get(['residentialUnitNo']).value,
      residentialAddress1: this.editForm.get(['residentialAddress1']).value,
      residentialAddress2: this.editForm.get(['residentialAddress2']).value,
      residentialAddress3: this.editForm.get(['residentialAddress3']).value,
      residentialAddress4: this.editForm.get(['residentialAddress4']).value,
      residentialSameAsMailing: this.editForm.get(['residentialSameAsMailing']).value,
      mailingPostalCode: this.editForm.get(['mailingPostalCode']).value,
      mailingUnitNo: this.editForm.get(['mailingUnitNo']).value,
      mailingAddress1: this.editForm.get(['mailingAddress1']).value,
      mailingAddress2: this.editForm.get(['mailingAddress2']).value,
      mailingAddress3: this.editForm.get(['mailingAddress3']).value,
      mailingAddress4: this.editForm.get(['mailingAddress4']).value,
      occupation: this.editForm.get(['occupation']).value,
      residentialStatus: this.editForm.get(['residentialStatus']).value,
      nationality: this.editForm.get(['nationality']).value,
      placeOfNationality: this.editForm.get(['placeOfNationality']).value,
      countryOfBirth: this.editForm.get(['countryOfBirth']).value,
      placeOfBirth: this.editForm.get(['placeOfBirth']).value,
      occupationCode: this.editForm.get(['occupationCode']).value,
      nameOfEmployer: this.editForm.get(['nameOfEmployer']).value,
      annualIncome: this.editForm.get(['annualIncome']).value,
      addressType: this.editForm.get(['addressType']).value,
      maritalStatus: this.editForm.get(['maritalStatus']).value,
      uinfin: this.editForm.get(['uinfin']).value,
      myInfoVerified: this.editForm.get(['myInfoVerified']).value,
      createdDate: this.editForm.get(['createdDate']).value,
      modifiedDate: this.editForm.get(['modifiedDate']).value,
      policyPaymentDetails: this.editForm.get(['policyPaymentDetails']).value,
      policyStateChart: this.editForm.get(['policyStateChart']).value,
      userDetails: this.editForm.get(['userDetails']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPolicyDetails>>) {
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

  trackPolicyPaymentDetailsById(index: number, item: IPolicyPaymentDetails) {
    return item.id;
  }

  trackPolicyStateChartById(index: number, item: IPolicyStateChart) {
    return item.id;
  }

  trackUserDetailsById(index: number, item: IUserDetails) {
    return item.id;
  }
}
