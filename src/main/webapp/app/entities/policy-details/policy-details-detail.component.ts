import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPolicyDetails } from 'app/shared/model/policy-details.model';

@Component({
  selector: 'jhi-policy-details-detail',
  templateUrl: './policy-details-detail.component.html'
})
export class PolicyDetailsDetailComponent implements OnInit {
  policyDetails: IPolicyDetails;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ policyDetails }) => {
      this.policyDetails = policyDetails;
    });
  }

  previousState() {
    window.history.back();
  }
}
