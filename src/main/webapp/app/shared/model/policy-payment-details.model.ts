import { Moment } from 'moment';
import { IPolicyDetails } from 'app/shared/model/policy-details.model';

export interface IPolicyPaymentDetails {
  id?: number;
  paymentTransactionNo?: string;
  prnNo?: string;
  encryptedPrnNo?: string;
  totalFirstPremium?: string;
  paymentMethod?: string;
  esbPaymentMode?: string;
  paymentStatus?: string;
  createdDate?: Moment;
  modifiedDate?: Moment;
  createdTime?: Moment;
  modifiedTime?: Moment;
  policyDetails?: IPolicyDetails;
}

export class PolicyPaymentDetails implements IPolicyPaymentDetails {
  constructor(
    public id?: number,
    public paymentTransactionNo?: string,
    public prnNo?: string,
    public encryptedPrnNo?: string,
    public totalFirstPremium?: string,
    public paymentMethod?: string,
    public esbPaymentMode?: string,
    public paymentStatus?: string,
    public createdDate?: Moment,
    public modifiedDate?: Moment,
    public createdTime?: Moment,
    public modifiedTime?: Moment,
    public policyDetails?: IPolicyDetails
  ) {}
}
