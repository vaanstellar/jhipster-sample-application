/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { UserSuspensionService } from 'app/entities/user-suspension/user-suspension.service';
import { IUserSuspension, UserSuspension } from 'app/shared/model/user-suspension.model';

describe('Service Tests', () => {
  describe('UserSuspension Service', () => {
    let injector: TestBed;
    let service: UserSuspensionService;
    let httpMock: HttpTestingController;
    let elemDefault: IUserSuspension;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(UserSuspensionService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new UserSuspension(0, 'AAAAAAA', 0, 0, 'AAAAAAA', currentDate, currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            createdDate: currentDate.format(DATE_FORMAT),
            modifiedDate: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a UserSuspension', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            createdDate: currentDate.format(DATE_FORMAT),
            modifiedDate: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            createdDate: currentDate,
            modifiedDate: currentDate
          },
          returnedFromService
        );
        service
          .create(new UserSuspension(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a UserSuspension', async () => {
        const returnedFromService = Object.assign(
          {
            emailId: 'BBBBBB',
            retryCount: 1,
            suspensionTimeInMinutes: 1,
            reason: 'BBBBBB',
            createdDate: currentDate.format(DATE_FORMAT),
            modifiedDate: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            createdDate: currentDate,
            modifiedDate: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of UserSuspension', async () => {
        const returnedFromService = Object.assign(
          {
            emailId: 'BBBBBB',
            retryCount: 1,
            suspensionTimeInMinutes: 1,
            reason: 'BBBBBB',
            createdDate: currentDate.format(DATE_FORMAT),
            modifiedDate: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            createdDate: currentDate,
            modifiedDate: currentDate
          },
          returnedFromService
        );
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a UserSuspension', async () => {
        const rxPromise = service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
