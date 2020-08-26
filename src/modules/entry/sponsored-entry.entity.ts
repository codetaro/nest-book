import { Entry } from './entry.entity';
import { Column, Entity } from 'typeorm/index';

@Entity()
export class SponsoredEntry extends Entry {
  @Column() sponsorName: string;

  @Column() sponsorUrl: string;
}
