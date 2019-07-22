/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { DocTypeReferenceDetailComponent } from 'app/entities/doc-type-reference/doc-type-reference-detail.component';
import { DocTypeReference } from 'app/shared/model/doc-type-reference.model';

describe('Component Tests', () => {
  describe('DocTypeReference Management Detail Component', () => {
    let comp: DocTypeReferenceDetailComponent;
    let fixture: ComponentFixture<DocTypeReferenceDetailComponent>;
    const route = ({ data: of({ docTypeReference: new DocTypeReference(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [DocTypeReferenceDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(DocTypeReferenceDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DocTypeReferenceDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.docTypeReference).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
