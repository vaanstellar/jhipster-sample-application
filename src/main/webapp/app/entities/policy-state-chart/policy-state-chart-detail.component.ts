import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IPolicyStateChart } from 'app/shared/model/policy-state-chart.model';

@Component({
  selector: 'jhi-policy-state-chart-detail',
  templateUrl: './policy-state-chart-detail.component.html'
})
export class PolicyStateChartDetailComponent implements OnInit {
  policyStateChart: IPolicyStateChart;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ policyStateChart }) => {
      this.policyStateChart = policyStateChart;
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
