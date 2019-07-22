import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IDerivedDocs, DerivedDocs } from 'app/shared/model/derived-docs.model';
import { DerivedDocsService } from './derived-docs.service';
import { IPolicyDetails } from 'app/shared/model/policy-details.model';
import { PolicyDetailsService } from 'app/entities/policy-details';
import { IDocTypeReference } from 'app/shared/model/doc-type-reference.model';
import { DocTypeReferenceService } from 'app/entities/doc-type-reference';

@Component({
  selector: 'jhi-derived-docs-update',
  templateUrl: './derived-docs-update.component.html'
})
export class DerivedDocsUpdateComponent implements OnInit {
  isSaving: boolean;

  policydetails: IPolicyDetails[];

  doctypereferences: IDocTypeReference[];
  createdDateDp: any;
  modifiedDateDp: any;

  editForm = this.fb.group({
    id: [],
    docContent: [],
    createdDate: [],
    modifiedDate: [],
    policyDetails: [],
    docTypeReference: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected derivedDocsService: DerivedDocsService,
    protected policyDetailsService: PolicyDetailsService,
    protected docTypeReferenceService: DocTypeReferenceService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ derivedDocs }) => {
      this.updateForm(derivedDocs);
    });
    this.policyDetailsService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPolicyDetails[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPolicyDetails[]>) => response.body)
      )
      .subscribe((res: IPolicyDetails[]) => (this.policydetails = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.docTypeReferenceService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IDocTypeReference[]>) => mayBeOk.ok),
        map((response: HttpResponse<IDocTypeReference[]>) => response.body)
      )
      .subscribe((res: IDocTypeReference[]) => (this.doctypereferences = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(derivedDocs: IDerivedDocs) {
    this.editForm.patchValue({
      id: derivedDocs.id,
      docContent: derivedDocs.docContent,
      createdDate: derivedDocs.createdDate,
      modifiedDate: derivedDocs.modifiedDate,
      policyDetails: derivedDocs.policyDetails,
      docTypeReference: derivedDocs.docTypeReference
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
    const derivedDocs = this.createFromForm();
    if (derivedDocs.id !== undefined) {
      this.subscribeToSaveResponse(this.derivedDocsService.update(derivedDocs));
    } else {
      this.subscribeToSaveResponse(this.derivedDocsService.create(derivedDocs));
    }
  }

  private createFromForm(): IDerivedDocs {
    return {
      ...new DerivedDocs(),
      id: this.editForm.get(['id']).value,
      docContent: this.editForm.get(['docContent']).value,
      createdDate: this.editForm.get(['createdDate']).value,
      modifiedDate: this.editForm.get(['modifiedDate']).value,
      policyDetails: this.editForm.get(['policyDetails']).value,
      docTypeReference: this.editForm.get(['docTypeReference']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDerivedDocs>>) {
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

  trackDocTypeReferenceById(index: number, item: IDocTypeReference) {
    return item.id;
  }
}
