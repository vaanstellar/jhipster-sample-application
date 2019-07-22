/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { UserSuspensionComponent } from 'app/entities/user-suspension/user-suspension.component';
import { UserSuspensionService } from 'app/entities/user-suspension/user-suspension.service';
import { UserSuspension } from 'app/shared/model/user-suspension.model';

describe('Component Tests', () => {
  describe('UserSuspension Management Component', () => {
    let comp: UserSuspensionComponent;
    let fixture: ComponentFixture<UserSuspensionComponent>;
    let service: UserSuspensionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [UserSuspensionComponent],
        providers: []
      })
        .overrideTemplate(UserSuspensionComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UserSuspensionComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UserSuspensionService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new UserSuspension(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.userSuspensions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
