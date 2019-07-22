/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { DerivedDocsDeleteDialogComponent } from 'app/entities/derived-docs/derived-docs-delete-dialog.component';
import { DerivedDocsService } from 'app/entities/derived-docs/derived-docs.service';

describe('Component Tests', () => {
  describe('DerivedDocs Management Delete Component', () => {
    let comp: DerivedDocsDeleteDialogComponent;
    let fixture: ComponentFixture<DerivedDocsDeleteDialogComponent>;
    let service: DerivedDocsService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [DerivedDocsDeleteDialogComponent]
      })
        .overrideTemplate(DerivedDocsDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DerivedDocsDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DerivedDocsService);
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
