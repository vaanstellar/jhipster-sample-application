import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IDerivedDocs } from 'app/shared/model/derived-docs.model';

@Component({
  selector: 'jhi-derived-docs-detail',
  templateUrl: './derived-docs-detail.component.html'
})
export class DerivedDocsDetailComponent implements OnInit {
  derivedDocs: IDerivedDocs;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ derivedDocs }) => {
      this.derivedDocs = derivedDocs;
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }
  previousState() {
    window.history.back();
  }
}
