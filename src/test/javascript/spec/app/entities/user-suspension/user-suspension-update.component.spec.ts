/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { UserSuspensionUpdateComponent } from 'app/entities/user-suspension/user-suspension-update.component';
import { UserSuspensionService } from 'app/entities/user-suspension/user-suspension.service';
import { UserSuspension } from 'app/shared/model/user-suspension.model';

describe('Component Tests', () => {
  describe('UserSuspension Management Update Component', () => {
    let comp: UserSuspensionUpdateComponent;
    let fixture: ComponentFixture<UserSuspensionUpdateComponent>;
    let service: UserSuspensionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [UserSuspensionUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(UserSuspensionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UserSuspensionUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UserSuspensionService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new UserSuspension(123);
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
        const entity = new UserSuspension();
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
