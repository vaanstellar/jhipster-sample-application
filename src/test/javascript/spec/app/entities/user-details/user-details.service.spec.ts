/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { UserDetailsService } from 'app/entities/user-details/user-details.service';
import { IUserDetails, UserDetails } from 'app/shared/model/user-details.model';

describe('Service Tests', () => {
  describe('UserDetails Service', () => {
    let injector: TestBed;
    let service: UserDetailsService;
    let httpMock: HttpTestingController;
    let elemDefault: IUserDetails;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(UserDetailsService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new UserDetails(
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
        currentDate,
        currentDate,
        'AAAAAAA',
        'AAAAAAA'
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

      it('should create a UserDetails', async () => {
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
          .create(new UserDetails(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a UserDetails', async () => {
        const returnedFromService = Object.assign(
          {
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
            occupationCode: 'BBBBBB',
            residentialStatus: 'BBBBBB',
            nationality: 'BBBBBB',
            placeOfNationality: 'BBBBBB',
            countryOfBirth: 'BBBBBB',
            placeOfBirth: 'BBBBBB',
            nameOfEmployer: 'BBBBBB',
            annualIncome: 'BBBBBB',
            addressType: 'BBBBBB',
            maritalStatus: 'BBBBBB',
            uinfin: 'BBBBBB',
            createdDate: currentDate.format(DATE_FORMAT),
            modifiedDate: currentDate.format(DATE_FORMAT),
            hash1: 'BBBBBB',
            hash2: 'BBBBBB'
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

      it('should return a list of UserDetails', async () => {
        const returnedFromService = Object.assign(
          {
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
            occupationCode: 'BBBBBB',
            residentialStatus: 'BBBBBB',
            nationality: 'BBBBBB',
            placeOfNationality: 'BBBBBB',
            countryOfBirth: 'BBBBBB',
            placeOfBirth: 'BBBBBB',
            nameOfEmployer: 'BBBBBB',
            annualIncome: 'BBBBBB',
            addressType: 'BBBBBB',
            maritalStatus: 'BBBBBB',
            uinfin: 'BBBBBB',
            createdDate: currentDate.format(DATE_FORMAT),
            modifiedDate: currentDate.format(DATE_FORMAT),
            hash1: 'BBBBBB',
            hash2: 'BBBBBB'
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

      it('should delete a UserDetails', async () => {
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
