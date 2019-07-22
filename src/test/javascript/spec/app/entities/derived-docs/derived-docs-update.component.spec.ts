/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { DerivedDocsUpdateComponent } from 'app/entities/derived-docs/derived-docs-update.component';
import { DerivedDocsService } from 'app/entities/derived-docs/derived-docs.service';
import { DerivedDocs } from 'app/shared/model/derived-docs.model';

describe('Component Tests', () => {
  describe('DerivedDocs Management Update Component', () => {
    let comp: DerivedDocsUpdateComponent;
    let fixture: ComponentFixture<DerivedDocsUpdateComponent>;
    let service: DerivedDocsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [DerivedDocsUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(DerivedDocsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DerivedDocsUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DerivedDocsService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new DerivedDocs(123);
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
        const entity = new DerivedDocs();
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
