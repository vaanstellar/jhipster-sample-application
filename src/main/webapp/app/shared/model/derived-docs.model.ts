import { Moment } from 'moment';
import { IPolicyDetails } from 'app/shared/model/policy-details.model';
import { IDocTypeReference } from 'app/shared/model/doc-type-reference.model';

export interface IDerivedDocs {
  id?: number;
  docContent?: any;
  createdDate?: Moment;
  modifiedDate?: Moment;
  policyDetails?: IPolicyDetails;
  docTypeReference?: IDocTypeReference;
}

export class DerivedDocs implements IDerivedDocs {
  constructor(
    public id?: number,
    public docContent?: any,
    public createdDate?: Moment,
    public modifiedDate?: Moment,
    public policyDetails?: IPolicyDetails,
    public docTypeReference?: IDocTypeReference
  ) {}
}
