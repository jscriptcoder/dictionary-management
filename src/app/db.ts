import { DBSchema } from '@ngrx/db';

export const schema: DBSchema = {
  version: 1,
  name: 'dictionaries_app',
  stores: {
    dictionaries: {
      autoIncrement: true,
      primaryKey: 'id'
    }
  }
};