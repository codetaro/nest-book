import { Entry } from '../../entry/sequelize/entry.entity';

export interface IUser {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthday?: Date;
  entries?: Entry[];
}
