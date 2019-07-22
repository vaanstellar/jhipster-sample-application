/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { PolicyStateChartDetailComponent } from 'app/entities/policy-state-chart/policy-state-chart-detail.component';
import { PolicyStateChart } from 'app/shared/model/policy-state-chart.model';

describe('Component Tests', () => {
  describe('PolicyStateChart Management Detail Component', () => {
    let comp: PolicyStateChartDetailComponent;
    let fixture: ComponentFixture<PolicyStateChartDetailComponent>;
    const route = ({ data: of({ policyStateChart: new PolicyStateChart(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [PolicyStateChartDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PolicyStateChartDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PolicyStateChartDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.policyStateChart).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
