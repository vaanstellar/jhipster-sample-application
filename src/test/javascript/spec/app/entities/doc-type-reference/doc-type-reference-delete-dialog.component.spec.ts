/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { DocTypeReferenceDeleteDialogComponent } from 'app/entities/doc-type-reference/doc-type-reference-delete-dialog.component';
import { DocTypeReferenceService } from 'app/entities/doc-type-reference/doc-type-reference.service';

describe('Component Tests', () => {
  describe('DocTypeReference Management Delete Component', () => {
    let comp: DocTypeReferenceDeleteDialogComponent;
    let fixture: ComponentFixture<DocTypeReferenceDeleteDialogComponent>;
    let service: DocTypeReferenceService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [DocTypeReferenceDeleteDialogComponent]
      })
        .overrideTemplate(DocTypeReferenceDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DocTypeReferenceDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DocTypeReferenceService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
