import { Moment } from 'moment';
import { IPolicyDetails } from 'app/shared/model/policy-details.model';

export interface IPolicyStateChart {
  id?: number;
  currentTask?: string;
  currentPayload?: any;
  status?: boolean;
  isProcessing?: boolean;
  createdDate?: Moment;
  modifiedDate?: Moment;
  policyDetails?: IPolicyDetails;
}

export class PolicyStateChart implements IPolicyStateChart {
  constructor(
    public id?: number,
    public currentTask?: string,
    public currentPayload?: any,
    public status?: boolean,
    public isProcessing?: boolean,
    public createdDate?: Moment,
    public modifiedDate?: Moment,
    public policyDetails?: IPolicyDetails
  ) {
    this.status = this.status || false;
    this.isProcessing = this.isProcessing || false;
  }
}
