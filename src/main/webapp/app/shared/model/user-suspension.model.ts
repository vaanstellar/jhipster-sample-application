import { Moment } from 'moment';

export interface IUserSuspension {
  id?: number;
  emailId?: string;
  retryCount?: number;
  suspensionTimeInMinutes?: number;
  reason?: string;
  createdDate?: Moment;
  modifiedDate?: Moment;
}

export class UserSuspension implements IUserSuspension {
  constructor(
    public id?: number,
    public emailId?: string,
    public retryCount?: number,
    public suspensionTimeInMinutes?: number,
    public reason?: string,
    public createdDate?: Moment,
    public modifiedDate?: Moment
  ) {}
}
