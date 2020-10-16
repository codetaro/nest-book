import { Column, CreatedAt, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { IDefineOptions } from 'sequelize-typescript/lib/interfaces/IDefineOptions';
import { Keyword } from './keyword.entity';
import { Entry } from '../entry/sequelize/entry.entity';

@Table({
  timestamp: true,
  tableName: 'keywords_entries',
  deletedAt: false,
  updatedAt: false
} as IDefineOptions)
export class KeywordEntry extends Model<KeywordEntry> {
  @ForeignKey(() => Keyword)
  @Column({
    type: DataType.BIGINT,
    allowNull: false
  })
  public keywordId: number;

  @ForeignKey(() => Entry)
  @Column({
    type: DataType.BIGINT,
    allowNull: false
  })
  public entryId: number;

  @CreatedAt public createdAt: Date;
}
