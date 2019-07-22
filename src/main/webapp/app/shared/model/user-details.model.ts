import { Moment } from 'moment';
import { IPolicyDetails } from 'app/shared/model/policy-details.model';

export interface IUserDetails {
  id?: number;
  nric?: string;
  name?: string;
  gender?: string;
  birthDate?: string;
  emailId?: string;
  phoneNo?: string;
  educationLevel?: string;
  residentialPostalCode?: string;
  residentialUnitNo?: string;
  residentialAddress1?: string;
  residentialAddress2?: string;
  residentialAddress3?: string;
  residentialAddress4?: string;
  residentialSameAsMailing?: string;
  mailingPostalCode?: string;
  mailingUnitNo?: string;
  mailingAddress1?: string;
  mailingAddress2?: string;
  mailingAddress3?: string;
  mailingAddress4?: string;
  occupation?: string;
  occupationCode?: string;
  residentialStatus?: string;
  nationality?: string;
  placeOfNationality?: string;
  countryOfBirth?: string;
  placeOfBirth?: string;
  nameOfEmployer?: string;
  annualIncome?: string;
  addressType?: string;
  maritalStatus?: string;
  uinfin?: string;
  createdDate?: Moment;
  modifiedDate?: Moment;
  hash1?: string;
  hash2?: string;
  policyDetails?: IPolicyDetails[];
}

export class UserDetails implements IUserDetails {
  constructor(
    public id?: number,
    public nric?: string,
    public name?: string,
    public gender?: string,
    public birthDate?: string,
    public emailId?: string,
    public phoneNo?: string,
    public educationLevel?: string,
    public residentialPostalCode?: string,
    public residentialUnitNo?: string,
    public residentialAddress1?: string,
    public residentialAddress2?: string,
    public residentialAddress3?: string,
    public residentialAddress4?: string,
    public residentialSameAsMailing?: string,
    public mailingPostalCode?: string,
    public mailingUnitNo?: string,
    public mailingAddress1?: string,
    public mailingAddress2?: string,
    public mailingAddress3?: string,
    public mailingAddress4?: string,
    public occupation?: string,
    public occupationCode?: string,
    public residentialStatus?: string,
    public nationality?: string,
    public placeOfNationality?: string,
    public countryOfBirth?: string,
    public placeOfBirth?: string,
    public nameOfEmployer?: string,
    public annualIncome?: string,
    public addressType?: string,
    public maritalStatus?: string,
    public uinfin?: string,
    public createdDate?: Moment,
    public modifiedDate?: Moment,
    public hash1?: string,
    public hash2?: string,
    public policyDetails?: IPolicyDetails[]
  ) {}
}
