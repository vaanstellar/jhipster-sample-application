/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { PolicyDetailsService } from 'app/entities/policy-details/policy-details.service';
import { IPolicyDetails, PolicyDetails } from 'app/shared/model/policy-details.model';

describe('Service Tests', () => {
  describe('PolicyDetails Service', () => {
    let injector: TestBed;
    let service: PolicyDetailsService;
    let httpMock: HttpTestingController;
    let elemDefault: IPolicyDetails;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(PolicyDetailsService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new PolicyDetails(
        0,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        currentDate,
        currentDate
      );
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

      it('should create a PolicyDetails', async () => {
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
          .create(new PolicyDetails(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a PolicyDetails', async () => {
        const returnedFromService = Object.assign(
          {
            policyCode: 'BBBBBB',
            planCode: 'BBBBBB',
            planType: 'BBBBBB',
            agentCode: 'BBBBBB',
            status: 'BBBBBB',
            riderNames: 'BBBBBB',
            contactByCall: 'BBBBBB',
            contactBySMS: 'BBBBBB',
            nric: 'BBBBBB',
            name: 'BBBBBB',
            gender: 'BBBBBB',
            birthDate: 'BBBBBB',
            emailId: 'BBBBBB',
            phoneNo: 'BBBBBB',
            educationLevel: 'BBBBBB',
            residentialPostalCode: 'BBBBBB',
            residentialUnitNo: 'BBBBBB',
            residentialAddress1: 'BBBBBB',
            residentialAddress2: 'BBBBBB',
            residentialAddress3: 'BBBBBB',
            residentialAddress4: 'BBBBBB',
            residentialSameAsMailing: 'BBBBBB',
            mailingPostalCode: 'BBBBBB',
            mailingUnitNo: 'BBBBBB',
            mailingAddress1: 'BBBBBB',
            mailingAddress2: 'BBBBBB',
            mailingAddress3: 'BBBBBB',
            mailingAddress4: 'BBBBBB',
            occupation: 'BBBBBB',
            residentialStatus: 'BBBBBB',
            nationality: 'BBBBBB',
            placeOfNationality: 'BBBBBB',
            countryOfBirth: 'BBBBBB',
            placeOfBirth: 'BBBBBB',
            occupationCode: 'BBBBBB',
            nameOfEmployer: 'BBBBBB',
            annualIncome: 'BBBBBB',
            addressType: 'BBBBBB',
            maritalStatus: 'BBBBBB',
            uinfin: 'BBBBBB',
            myInfoVerified: 'BBBBBB',
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

      it('should return a list of PolicyDetails', async () => {
        const returnedFromService = Object.assign(
          {
            policyCode: 'BBBBBB',
            planCode: 'BBBBBB',
            planType: 'BBBBBB',
            agentCode: 'BBBBBB',
            status: 'BBBBBB',
            riderNames: 'BBBBBB',
            contactByCall: 'BBBBBB',
            contactBySMS: 'BBBBBB',
            nric: 'BBBBBB',
            name: 'BBBBBB',
            gender: 'BBBBBB',
            birthDate: 'BBBBBB',
            emailId: 'BBBBBB',
            phoneNo: 'BBBBBB',
            educationLevel: 'BBBBBB',
            residentialPostalCode: 'BBBBBB',
            residentialUnitNo: 'BBBBBB',
            residentialAddress1: 'BBBBBB',
            residentialAddress2: 'BBBBBB',
            residentialAddress3: 'BBBBBB',
            residentialAddress4: 'BBBBBB',
            residentialSameAsMailing: 'BBBBBB',
            mailingPostalCode: 'BBBBBB',
            mailingUnitNo: 'BBBBBB',
            mailingAddress1: 'BBBBBB',
            mailingAddress2: 'BBBBBB',
            mailingAddress3: 'BBBBBB',
            mailingAddress4: 'BBBBBB',
            occupation: 'BBBBBB',
            residentialStatus: 'BBBBBB',
            nationality: 'BBBBBB',
            placeOfNationality: 'BBBBBB',
            countryOfBirth: 'BBBBBB',
            placeOfBirth: 'BBBBBB',
            occupationCode: 'BBBBBB',
            nameOfEmployer: 'BBBBBB',
            annualIncome: 'BBBBBB',
            addressType: 'BBBBBB',
            maritalStatus: 'BBBBBB',
            uinfin: 'BBBBBB',
            myInfoVerified: 'BBBBBB',
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

      it('should delete a PolicyDetails', async () => {
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
