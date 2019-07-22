/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { PolicyStateChartUpdateComponent } from 'app/entities/policy-state-chart/policy-state-chart-update.component';
import { PolicyStateChartService } from 'app/entities/policy-state-chart/policy-state-chart.service';
import { PolicyStateChart } from 'app/shared/model/policy-state-chart.model';

describe('Component Tests', () => {
  describe('PolicyStateChart Management Update Component', () => {
    let comp: PolicyStateChartUpdateComponent;
    let fixture: ComponentFixture<PolicyStateChartUpdateComponent>;
    let service: PolicyStateChartService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [PolicyStateChartUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PolicyStateChartUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PolicyStateChartUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PolicyStateChartService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PolicyStateChart(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new PolicyStateChart();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
