import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDocTypeReference } from 'app/shared/model/doc-type-reference.model';

@Component({
  selector: 'jhi-doc-type-reference-detail',
  templateUrl: './doc-type-reference-detail.component.html'
})
export class DocTypeReferenceDetailComponent implements OnInit {
  docTypeReference: IDocTypeReference;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ docTypeReference }) => {
      this.docTypeReference = docTypeReference;
    });
  }

  previousState() {
    window.history.back();
  }
}
