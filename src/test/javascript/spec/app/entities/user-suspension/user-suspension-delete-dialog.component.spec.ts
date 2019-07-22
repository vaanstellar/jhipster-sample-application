/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { UserSuspensionDeleteDialogComponent } from 'app/entities/user-suspension/user-suspension-delete-dialog.component';
import { UserSuspensionService } from 'app/entities/user-suspension/user-suspension.service';

describe('Component Tests', () => {
  describe('UserSuspension Management Delete Component', () => {
    let comp: UserSuspensionDeleteDialogComponent;
    let fixture: ComponentFixture<UserSuspensionDeleteDialogComponent>;
    let service: UserSuspensionService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [UserSuspensionDeleteDialogComponent]
      })
        .overrideTemplate(UserSuspensionDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(UserSuspensionDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UserSuspensionService);
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
