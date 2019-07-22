/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { UserSuspensionDetailComponent } from 'app/entities/user-suspension/user-suspension-detail.component';
import { UserSuspension } from 'app/shared/model/user-suspension.model';

describe('Component Tests', () => {
  describe('UserSuspension Management Detail Component', () => {
    let comp: UserSuspensionDetailComponent;
    let fixture: ComponentFixture<UserSuspensionDetailComponent>;
    const route = ({ data: of({ userSuspension: new UserSuspension(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [UserSuspensionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(UserSuspensionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(UserSuspensionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.userSuspension).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
