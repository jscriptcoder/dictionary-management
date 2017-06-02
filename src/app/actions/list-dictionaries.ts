
import { Action } from '@ngrx/store';
import { Dictionary } from '../models/dictionary';

export const ADD_DICTIONARY    = '[Dictionaries] Add Dictionary';
export const REMOVE_DICTIONARY = '[Dictionaries] Remove Dictionary';
export const UPDATE_DICTIONARY = '[Dictionaries] Update Dictionary';

/**
 * Add Dictionary to Dictionaries list
 */
export class AddDictionaryAction implements Action {
  readonly type = ADD_DICTIONARY;
  constructor(public dictionary: Dictionary) { }
}

/**
 * Remove Dictionary from Dictionaries list
 */
export class RemoveDictionaryAction implements Action {
  readonly type = REMOVE_DICTIONARY;
  constructor(public dictionaryId: number) { }
}

/**
 * Update Dictionary
 */
export class UpdateDictionaryAction implements Action {
  readonly type = UPDATE_DICTIONARY;
  constructor(public dictionary: Dictionary) { }
}

export type Actions
  = AddDictionaryAction
  | RemoveDictionaryAction
  | UpdateDictionaryAction;