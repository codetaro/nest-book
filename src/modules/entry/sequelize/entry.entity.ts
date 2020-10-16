import {
  AutoIncrement,
  BeforeValidate,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  DeletedAt, ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { IDefineOptions } from 'sequelize-typescript/lib/interfaces/IDefineOptions';
import { User } from '../../user/user.entity';

@Table({ timestamp: true, tableName: 'entries' } as IDefineOptions)
export class Entry extends Model<Entry> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  public id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public content: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  public userId: number;

  @CreatedAt public createdAt: Date;
  @UpdatedAt public updatedAt: Date;
  @DeletedAt public deletedAt: Date;

  @BelongsTo(() => User)
  public user: User;

  @BeforeValidate
  public static validateData(entry: Entry, options: any) {
    if (!options.transaction) {
      throw new Error('Missing transaction.');
    }
  }

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  public keywords: string;
}
