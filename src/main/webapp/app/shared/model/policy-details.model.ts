import { Moment } from 'moment';
import { IPolicyPaymentDetails } from 'app/shared/model/policy-payment-details.model';
import { IPolicyStateChart } from 'app/shared/model/policy-state-chart.model';
import { IDerivedDocs } from 'app/shared/model/derived-docs.model';
import { IUserDetails } from 'app/shared/model/user-details.model';

export interface IPolicyDetails {
  id?: number;
  policyCode?: string;
  planCode?: string;
  planType?: string;
  agentCode?: string;
  status?: string;
  riderNames?: string;
  contactByCall?: string;
  contactBySMS?: string;
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
  residentialStatus?: string;
  nationality?: string;
  placeOfNationality?: string;
  countryOfBirth?: string;
  placeOfBirth?: string;
  occupationCode?: string;
  nameOfEmployer?: string;
  annualIncome?: string;
  addressType?: string;
  maritalStatus?: string;
  uinfin?: string;
  myInfoVerified?: string;
  createdDate?: Moment;
  modifiedDate?: Moment;
  policyPaymentDetails?: IPolicyPaymentDetails;
  policyStateChart?: IPolicyStateChart;
  derivedDocs?: IDerivedDocs[];
  userDetails?: IUserDetails;
}

export class PolicyDetails implements IPolicyDetails {
  constructor(
    public id?: number,
    public policyCode?: string,
    public planCode?: string,
    public planType?: string,
    public agentCode?: string,
    public status?: string,
    public riderNames?: string,
    public contactByCall?: string,
    public contactBySMS?: string,
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
    public residentialStatus?: string,
    public nationality?: string,
    public placeOfNationality?: string,
    public countryOfBirth?: string,
    public placeOfBirth?: string,
    public occupationCode?: string,
    public nameOfEmployer?: string,
    public annualIncome?: string,
    public addressType?: string,
    public maritalStatus?: string,
    public uinfin?: string,
    public myInfoVerified?: string,
    public createdDate?: Moment,
    public modifiedDate?: Moment,
    public policyPaymentDetails?: IPolicyPaymentDetails,
    public policyStateChart?: IPolicyStateChart,
    public derivedDocs?: IDerivedDocs[],
    public userDetails?: IUserDetails
  ) {}
}
