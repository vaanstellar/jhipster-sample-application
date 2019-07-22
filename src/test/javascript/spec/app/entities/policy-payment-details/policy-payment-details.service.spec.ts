/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT, DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { PolicyPaymentDetailsService } from 'app/entities/policy-payment-details/policy-payment-details.service';
import { IPolicyPaymentDetails, PolicyPaymentDetails } from 'app/shared/model/policy-payment-details.model';

describe('Service Tests', () => {
  describe('PolicyPaymentDetails Service', () => {
    let injector: TestBed;
    let service: PolicyPaymentDetailsService;
    let httpMock: HttpTestingController;
    let elemDefault: IPolicyPaymentDetails;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(PolicyPaymentDetailsService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new PolicyPaymentDetails(
        0,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        currentDate,
        currentDate,
        currentDate,
        currentDate
      );
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            createdDate: currentDate.format(DATE_FORMAT),
            modifiedDate: currentDate.format(DATE_FORMAT),
            createdTime: currentDate.format(DATE_TIME_FORMAT),
            modifiedTime: currentDate.format(DATE_TIME_FORMAT)
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

      it('should create a PolicyPaymentDetails', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            createdDate: currentDate.format(DATE_FORMAT),
            modifiedDate: currentDate.format(DATE_FORMAT),
            createdTime: currentDate.format(DATE_TIME_FORMAT),
            modifiedTime: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            createdDate: currentDate,
            modifiedDate: currentDate,
            createdTime: currentDate,
            modifiedTime: currentDate
          },
          returnedFromService
        );
        service
          .create(new PolicyPaymentDetails(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a PolicyPaymentDetails', async () => {
        const returnedFromService = Object.assign(
          {
            paymentTransactionNo: 'BBBBBB',
            prnNo: 'BBBBBB',
            encryptedPrnNo: 'BBBBBB',
            totalFirstPremium: 'BBBBBB',
            paymentMethod: 'BBBBBB',
            esbPaymentMode: 'BBBBBB',
            paymentStatus: 'BBBBBB',
            createdDate: currentDate.format(DATE_FORMAT),
            modifiedDate: currentDate.format(DATE_FORMAT),
            createdTime: currentDate.format(DATE_TIME_FORMAT),
            modifiedTime: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            createdDate: currentDate,
            modifiedDate: currentDate,
            createdTime: currentDate,
            modifiedTime: currentDate
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

      it('should return a list of PolicyPaymentDetails', async () => {
        const returnedFromService = Object.assign(
          {
            paymentTransactionNo: 'BBBBBB',
            prnNo: 'BBBBBB',
            encryptedPrnNo: 'BBBBBB',
            totalFirstPremium: 'BBBBBB',
            paymentMethod: 'BBBBBB',
            esbPaymentMode: 'BBBBBB',
            paymentStatus: 'BBBBBB',
            createdDate: currentDate.format(DATE_FORMAT),
            modifiedDate: currentDate.format(DATE_FORMAT),
            createdTime: currentDate.format(DATE_TIME_FORMAT),
            modifiedTime: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            createdDate: currentDate,
            modifiedDate: currentDate,
            createdTime: currentDate,
            modifiedTime: currentDate
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

      it('should delete a PolicyPaymentDetails', async () => {
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
