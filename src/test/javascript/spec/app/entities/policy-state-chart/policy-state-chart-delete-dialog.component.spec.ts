/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { PolicyStateChartDeleteDialogComponent } from 'app/entities/policy-state-chart/policy-state-chart-delete-dialog.component';
import { PolicyStateChartService } from 'app/entities/policy-state-chart/policy-state-chart.service';

describe('Component Tests', () => {
  describe('PolicyStateChart Management Delete Component', () => {
    let comp: PolicyStateChartDeleteDialogComponent;
    let fixture: ComponentFixture<PolicyStateChartDeleteDialogComponent>;
    let service: PolicyStateChartService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [PolicyStateChartDeleteDialogComponent]
      })
        .overrideTemplate(PolicyStateChartDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PolicyStateChartDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PolicyStateChartService);
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
