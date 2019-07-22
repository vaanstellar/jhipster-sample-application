import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPolicyPaymentDetails } from 'app/shared/model/policy-payment-details.model';

@Component({
  selector: 'jhi-policy-payment-details-detail',
  templateUrl: './policy-payment-details-detail.component.html'
})
export class PolicyPaymentDetailsDetailComponent implements OnInit {
  policyPaymentDetails: IPolicyPaymentDetails;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ policyPaymentDetails }) => {
      this.policyPaymentDetails = policyPaymentDetails;
    });
  }

  previousState() {
    window.history.back();
  }
}
