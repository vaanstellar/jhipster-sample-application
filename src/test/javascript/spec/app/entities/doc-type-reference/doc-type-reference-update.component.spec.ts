/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { DocTypeReferenceUpdateComponent } from 'app/entities/doc-type-reference/doc-type-reference-update.component';
import { DocTypeReferenceService } from 'app/entities/doc-type-reference/doc-type-reference.service';
import { DocTypeReference } from 'app/shared/model/doc-type-reference.model';

describe('Component Tests', () => {
  describe('DocTypeReference Management Update Component', () => {
    let comp: DocTypeReferenceUpdateComponent;
    let fixture: ComponentFixture<DocTypeReferenceUpdateComponent>;
    let service: DocTypeReferenceService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [DocTypeReferenceUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(DocTypeReferenceUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DocTypeReferenceUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DocTypeReferenceService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new DocTypeReference(123);
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
        const entity = new DocTypeReference();
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
