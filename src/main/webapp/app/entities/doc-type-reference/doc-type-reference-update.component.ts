import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { IDocTypeReference, DocTypeReference } from 'app/shared/model/doc-type-reference.model';
import { DocTypeReferenceService } from './doc-type-reference.service';

@Component({
  selector: 'jhi-doc-type-reference-update',
  templateUrl: './doc-type-reference-update.component.html'
})
export class DocTypeReferenceUpdateComponent implements OnInit {
  isSaving: boolean;
  createdDateDp: any;
  modifiedDateDp: any;

  editForm = this.fb.group({
    id: [],
    docType: [],
    docStorage: [],
    createdDate: [],
    modifiedDate: []
  });

  constructor(
    protected docTypeReferenceService: DocTypeReferenceService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ docTypeReference }) => {
      this.updateForm(docTypeReference);
    });
  }

  updateForm(docTypeReference: IDocTypeReference) {
    this.editForm.patchValue({
      id: docTypeReference.id,
      docType: docTypeReference.docType,
      docStorage: docTypeReference.docStorage,
      createdDate: docTypeReference.createdDate,
      modifiedDate: docTypeReference.modifiedDate
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const docTypeReference = this.createFromForm();
    if (docTypeReference.id !== undefined) {
      this.subscribeToSaveResponse(this.docTypeReferenceService.update(docTypeReference));
    } else {
      this.subscribeToSaveResponse(this.docTypeReferenceService.create(docTypeReference));
    }
  }

  private createFromForm(): IDocTypeReference {
    return {
      ...new DocTypeReference(),
      id: this.editForm.get(['id']).value,
      docType: this.editForm.get(['docType']).value,
      docStorage: this.editForm.get(['docStorage']).value,
      createdDate: this.editForm.get(['createdDate']).value,
      modifiedDate: this.editForm.get(['modifiedDate']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDocTypeReference>>) {
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
