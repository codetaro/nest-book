import { User } from '../user.entity';
import { IUser } from './IUser';

export interface IUserService {
  findAll(options?: object): Promise<User[]>;
  findOne(options: object): Promise<User | null>;
  findById(id: number): Promise<User | null>;
  create(user: IUser): Promise<User>;
  update(id: number, newValue: IUser): Promise<User | null>;
  delete(id: number): Promise<void>;
}
