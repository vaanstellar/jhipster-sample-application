/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { PolicyPaymentDetailsDeleteDialogComponent } from 'app/entities/policy-payment-details/policy-payment-details-delete-dialog.component';
import { PolicyPaymentDetailsService } from 'app/entities/policy-payment-details/policy-payment-details.service';

describe('Component Tests', () => {
  describe('PolicyPaymentDetails Management Delete Component', () => {
    let comp: PolicyPaymentDetailsDeleteDialogComponent;
    let fixture: ComponentFixture<PolicyPaymentDetailsDeleteDialogComponent>;
    let service: PolicyPaymentDetailsService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [PolicyPaymentDetailsDeleteDialogComponent]
      })
        .overrideTemplate(PolicyPaymentDetailsDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PolicyPaymentDetailsDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PolicyPaymentDetailsService);
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
