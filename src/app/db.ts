import { DBSchema } from '@ngrx/db';

export const DB_NAME = 'dictionaries_app';
export const DICTIONARIES_TABLE = 'dictionaries';

export const schema: DBSchema = {
  version: 1,
  name: DB_NAME,
  stores: {
    dictionaries: {
      autoIncrement: true,
      primaryKey: 'id'
    }
  }
};