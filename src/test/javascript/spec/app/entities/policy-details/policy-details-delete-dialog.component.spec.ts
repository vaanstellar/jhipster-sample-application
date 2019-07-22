/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { PolicyDetailsDeleteDialogComponent } from 'app/entities/policy-details/policy-details-delete-dialog.component';
import { PolicyDetailsService } from 'app/entities/policy-details/policy-details.service';

describe('Component Tests', () => {
  describe('PolicyDetails Management Delete Component', () => {
    let comp: PolicyDetailsDeleteDialogComponent;
    let fixture: ComponentFixture<PolicyDetailsDeleteDialogComponent>;
    let service: PolicyDetailsService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [PolicyDetailsDeleteDialogComponent]
      })
        .overrideTemplate(PolicyDetailsDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PolicyDetailsDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PolicyDetailsService);
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
