/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { PolicyDetailsUpdateComponent } from 'app/entities/policy-details/policy-details-update.component';
import { PolicyDetailsService } from 'app/entities/policy-details/policy-details.service';
import { PolicyDetails } from 'app/shared/model/policy-details.model';

describe('Component Tests', () => {
  describe('PolicyDetails Management Update Component', () => {
    let comp: PolicyDetailsUpdateComponent;
    let fixture: ComponentFixture<PolicyDetailsUpdateComponent>;
    let service: PolicyDetailsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [PolicyDetailsUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PolicyDetailsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PolicyDetailsUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PolicyDetailsService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PolicyDetails(123);
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
        const entity = new PolicyDetails();
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
