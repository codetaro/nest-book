import { CreateDateColumn, UpdateDateColumn, VersionColumn } from 'typeorm/index';

export class Versioning {
  @CreateDateColumn() created_at: Date;

  @UpdateDateColumn() modified_at: Date;

  @VersionColumn() revision: Date;
}
