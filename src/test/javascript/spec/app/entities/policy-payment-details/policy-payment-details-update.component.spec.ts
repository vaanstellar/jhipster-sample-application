/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { PolicyPaymentDetailsUpdateComponent } from 'app/entities/policy-payment-details/policy-payment-details-update.component';
import { PolicyPaymentDetailsService } from 'app/entities/policy-payment-details/policy-payment-details.service';
import { PolicyPaymentDetails } from 'app/shared/model/policy-payment-details.model';

describe('Component Tests', () => {
  describe('PolicyPaymentDetails Management Update Component', () => {
    let comp: PolicyPaymentDetailsUpdateComponent;
    let fixture: ComponentFixture<PolicyPaymentDetailsUpdateComponent>;
    let service: PolicyPaymentDetailsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [PolicyPaymentDetailsUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PolicyPaymentDetailsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PolicyPaymentDetailsUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PolicyPaymentDetailsService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PolicyPaymentDetails(123);
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
        const entity = new PolicyPaymentDetails();
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
