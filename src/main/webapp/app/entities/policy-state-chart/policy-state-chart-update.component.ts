import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IPolicyStateChart, PolicyStateChart } from 'app/shared/model/policy-state-chart.model';
import { PolicyStateChartService } from './policy-state-chart.service';
import { IPolicyDetails } from 'app/shared/model/policy-details.model';
import { PolicyDetailsService } from 'app/entities/policy-details';

@Component({
  selector: 'jhi-policy-state-chart-update',
  templateUrl: './policy-state-chart-update.component.html'
})
export class PolicyStateChartUpdateComponent implements OnInit {
  isSaving: boolean;

  policydetails: IPolicyDetails[];
  createdDateDp: any;
  modifiedDateDp: any;

  editForm = this.fb.group({
    id: [],
    currentTask: [null, [Validators.maxLength(25)]],
    currentPayload: [],
    status: [],
    isProcessing: [],
    createdDate: [],
    modifiedDate: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected policyStateChartService: PolicyStateChartService,
    protected policyDetailsService: PolicyDetailsService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ policyStateChart }) => {
      this.updateForm(policyStateChart);
    });
    this.policyDetailsService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPolicyDetails[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPolicyDetails[]>) => response.body)
      )
      .subscribe((res: IPolicyDetails[]) => (this.policydetails = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(policyStateChart: IPolicyStateChart) {
    this.editForm.patchValue({
      id: policyStateChart.id,
      currentTask: policyStateChart.currentTask,
      currentPayload: policyStateChart.currentPayload,
      status: policyStateChart.status,
      isProcessing: policyStateChart.isProcessing,
      createdDate: policyStateChart.createdDate,
      modifiedDate: policyStateChart.modifiedDate
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  setFileData(event, field: string, isImage) {
    return new Promise((resolve, reject) => {
      if (event && event.target && event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        if (isImage && !/^image\//.test(file.type)) {
          reject(`File was expected to be an image but was found to be ${file.type}`);
        } else {
          const filedContentType: string = field + 'ContentType';
          this.dataUtils.toBase64(file, base64Data => {
            this.editForm.patchValue({
              [field]: base64Data,
              [filedContentType]: file.type
            });
          });
        }
      } else {
        reject(`Base64 data was not set as file could not be extracted from passed parameter: ${event}`);
      }
    }).then(
      () => console.log('blob added'), // sucess
      this.onError
    );
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const policyStateChart = this.createFromForm();
    if (policyStateChart.id !== undefined) {
      this.subscribeToSaveResponse(this.policyStateChartService.update(policyStateChart));
    } else {
      this.subscribeToSaveResponse(this.policyStateChartService.create(policyStateChart));
    }
  }

  private createFromForm(): IPolicyStateChart {
    return {
      ...new PolicyStateChart(),
      id: this.editForm.get(['id']).value,
      currentTask: this.editForm.get(['currentTask']).value,
      currentPayload: this.editForm.get(['currentPayload']).value,
      status: this.editForm.get(['status']).value,
      isProcessing: this.editForm.get(['isProcessing']).value,
      createdDate: this.editForm.get(['createdDate']).value,
      modifiedDate: this.editForm.get(['modifiedDate']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPolicyStateChart>>) {
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
