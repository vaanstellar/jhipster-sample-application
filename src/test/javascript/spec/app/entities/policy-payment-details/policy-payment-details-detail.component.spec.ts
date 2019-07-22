/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { PolicyPaymentDetailsDetailComponent } from 'app/entities/policy-payment-details/policy-payment-details-detail.component';
import { PolicyPaymentDetails } from 'app/shared/model/policy-payment-details.model';

describe('Component Tests', () => {
  describe('PolicyPaymentDetails Management Detail Component', () => {
    let comp: PolicyPaymentDetailsDetailComponent;
    let fixture: ComponentFixture<PolicyPaymentDetailsDetailComponent>;
    const route = ({ data: of({ policyPaymentDetails: new PolicyPaymentDetails(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [PolicyPaymentDetailsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PolicyPaymentDetailsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PolicyPaymentDetailsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.policyPaymentDetails).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
