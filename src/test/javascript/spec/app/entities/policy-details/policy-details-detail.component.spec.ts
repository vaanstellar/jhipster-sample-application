/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { PolicyDetailsDetailComponent } from 'app/entities/policy-details/policy-details-detail.component';
import { PolicyDetails } from 'app/shared/model/policy-details.model';

describe('Component Tests', () => {
  describe('PolicyDetails Management Detail Component', () => {
    let comp: PolicyDetailsDetailComponent;
    let fixture: ComponentFixture<PolicyDetailsDetailComponent>;
    const route = ({ data: of({ policyDetails: new PolicyDetails(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [PolicyDetailsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PolicyDetailsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PolicyDetailsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.policyDetails).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
