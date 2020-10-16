import { Injectable } from '@nestjs/common';
import { Model } from 'sequelize-typescript';

@Injectable()
export class DatabaseUtilitiesService {

  public assign<T extends Model<T> = any, U = {}>(model: T, newModel: U): T {
    for (const key of Object.keys(model.dataValues)) {
      if (!newModel[key]) continue;
      if (model[key] !== newModel[key]) model[key] = newModel[key];
    }

    return model;
  }
}
