import { Moment } from 'moment';
import { IDerivedDocs } from 'app/shared/model/derived-docs.model';

export interface IDocTypeReference {
  id?: number;
  docType?: string;
  docStorage?: string;
  createdDate?: Moment;
  modifiedDate?: Moment;
  derivedDocs?: IDerivedDocs[];
}

export class DocTypeReference implements IDocTypeReference {
  constructor(
    public id?: number,
    public docType?: string,
    public docStorage?: string,
    public createdDate?: Moment,
    public modifiedDate?: Moment,
    public derivedDocs?: IDerivedDocs[]
  ) {}
}
