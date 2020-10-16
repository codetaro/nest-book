import { databaseConfig } from '../../shared/config/data-base.config';
import { Sequelize } from 'sequelize-typescript';
import { User } from '../user/user.entity';
import { Entry } from '../entry/sequelize/entry.entity';
import { Keyword } from '../keyword/keyword.entity';
import { KeywordEntry } from '../keyword/keywordEntry.entity';

export const databaseProvider = {
  provide: 'SequelizeInstance',
  useFactory: async () => {
    let config;
    switch (process.env.NODE_ENV) {
      case 'prod':
      case 'production':
      case 'dev':
      case 'development':
      default:
        config = databaseConfig.development;
    }

    const sequelize = new Sequelize(config);
    sequelize.addModels([User, Entry, Keyword, KeywordEntry]);
    return sequelize;
  },
};
