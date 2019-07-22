import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { IUserDetails, UserDetails } from 'app/shared/model/user-details.model';
import { UserDetailsService } from './user-details.service';

@Component({
  selector: 'jhi-user-details-update',
  templateUrl: './user-details-update.component.html'
})
export class UserDetailsUpdateComponent implements OnInit {
  isSaving: boolean;
  createdDateDp: any;
  modifiedDateDp: any;

  editForm = this.fb.group({
    id: [],
    nric: [null, [Validators.required, Validators.maxLength(9)]],
    name: [],
    gender: [null, [Validators.maxLength(1)]],
    birthDate: [null, [Validators.maxLength(10)]],
    emailId: [null, [Validators.required, Validators.maxLength(320)]],
    phoneNo: [null, [Validators.maxLength(15)]],
    educationLevel: [null, [Validators.maxLength(1)]],
    residentialPostalCode: [null, [Validators.maxLength(6)]],
    residentialUnitNo: [null, [Validators.maxLength(7)]],
    residentialAddress1: [],
    residentialAddress2: [],
    residentialAddress3: [],
    residentialAddress4: [],
    residentialSameAsMailing: [null, [Validators.maxLength(5)]],
    mailingPostalCode: [null, [Validators.maxLength(10)]],
    mailingUnitNo: [null, [Validators.maxLength(10)]],
    mailingAddress1: [],
    mailingAddress2: [],
    mailingAddress3: [],
    mailingAddress4: [],
    occupation: [],
    occupationCode: [null, [Validators.maxLength(4)]],
    residentialStatus: [null, [Validators.maxLength(3)]],
    nationality: [null, [Validators.maxLength(10)]],
    placeOfNationality: [],
    countryOfBirth: [null, [Validators.maxLength(3)]],
    placeOfBirth: [],
    nameOfEmployer: [],
    annualIncome: [null, [Validators.maxLength(15)]],
    addressType: [null, [Validators.maxLength(25)]],
    maritalStatus: [null, [Validators.maxLength(1)]],
    uinfin: [null, [Validators.maxLength(9)]],
    createdDate: [],
    modifiedDate: [],
    hash1: [],
    hash2: []
  });

  constructor(protected userDetailsService: UserDetailsService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ userDetails }) => {
      this.updateForm(userDetails);
    });
  }

  updateForm(userDetails: IUserDetails) {
    this.editForm.patchValue({
      id: userDetails.id,
      nric: userDetails.nric,
      name: userDetails.name,
      gender: userDetails.gender,
      birthDate: userDetails.birthDate,
      emailId: userDetails.emailId,
      phoneNo: userDetails.phoneNo,
      educationLevel: userDetails.educationLevel,
      residentialPostalCode: userDetails.residentialPostalCode,
      residentialUnitNo: userDetails.residentialUnitNo,
      residentialAddress1: userDetails.residentialAddress1,
      residentialAddress2: userDetails.residentialAddress2,
      residentialAddress3: userDetails.residentialAddress3,
      residentialAddress4: userDetails.residentialAddress4,
      residentialSameAsMailing: userDetails.residentialSameAsMailing,
      mailingPostalCode: userDetails.mailingPostalCode,
      mailingUnitNo: userDetails.mailingUnitNo,
      mailingAddress1: userDetails.mailingAddress1,
      mailingAddress2: userDetails.mailingAddress2,
      mailingAddress3: userDetails.mailingAddress3,
      mailingAddress4: userDetails.mailingAddress4,
      occupation: userDetails.occupation,
      occupationCode: userDetails.occupationCode,
      residentialStatus: userDetails.residentialStatus,
      nationality: userDetails.nationality,
      placeOfNationality: userDetails.placeOfNationality,
      countryOfBirth: userDetails.countryOfBirth,
      placeOfBirth: userDetails.placeOfBirth,
      nameOfEmployer: userDetails.nameOfEmployer,
      annualIncome: userDetails.annualIncome,
      addressType: userDetails.addressType,
      maritalStatus: userDetails.maritalStatus,
      uinfin: userDetails.uinfin,
      createdDate: userDetails.createdDate,
      modifiedDate: userDetails.modifiedDate,
      hash1: userDetails.hash1,
      hash2: userDetails.hash2
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const userDetails = this.createFromForm();
    if (userDetails.id !== undefined) {
      this.subscribeToSaveResponse(this.userDetailsService.update(userDetails));
    } else {
      this.subscribeToSaveResponse(this.userDetailsService.create(userDetails));
    }
  }

  private createFromForm(): IUserDetails {
    return {
      ...new UserDetails(),
      id: this.editForm.get(['id']).value,
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
      occupationCode: this.editForm.get(['occupationCode']).value,
      residentialStatus: this.editForm.get(['residentialStatus']).value,
      nationality: this.editForm.get(['nationality']).value,
      placeOfNationality: this.editForm.get(['placeOfNationality']).value,
      countryOfBirth: this.editForm.get(['countryOfBirth']).value,
      placeOfBirth: this.editForm.get(['placeOfBirth']).value,
      nameOfEmployer: this.editForm.get(['nameOfEmployer']).value,
      annualIncome: this.editForm.get(['annualIncome']).value,
      addressType: this.editForm.get(['addressType']).value,
      maritalStatus: this.editForm.get(['maritalStatus']).value,
      uinfin: this.editForm.get(['uinfin']).value,
      createdDate: this.editForm.get(['createdDate']).value,
      modifiedDate: this.editForm.get(['modifiedDate']).value,
      hash1: this.editForm.get(['hash1']).value,
      hash2: this.editForm.get(['hash2']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserDetails>>) {
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
