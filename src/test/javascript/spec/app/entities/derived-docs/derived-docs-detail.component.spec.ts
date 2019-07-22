/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { DerivedDocsDetailComponent } from 'app/entities/derived-docs/derived-docs-detail.component';
import { DerivedDocs } from 'app/shared/model/derived-docs.model';

describe('Component Tests', () => {
  describe('DerivedDocs Management Detail Component', () => {
    let comp: DerivedDocsDetailComponent;
    let fixture: ComponentFixture<DerivedDocsDetailComponent>;
    const route = ({ data: of({ derivedDocs: new DerivedDocs(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [DerivedDocsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(DerivedDocsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DerivedDocsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.derivedDocs).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
