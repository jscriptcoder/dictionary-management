
import { Action } from '@ngrx/store';
import { Dictionary } from '../models/dictionary';

export const ADD_DICTIONARY         = '[Dictionaries] Add Dictionary';
export const ADD_DICTIONARY_SUCCESS = '[Dictionaries] Add Dictionary Success';
export const ADD_DICTIONARY_FAIL    = '[Dictionaries] Add Dictionary Fail';

export const REMOVE_DICTIONARY         = '[Dictionaries] Remove Dictionary';
export const REMOVE_DICTIONARY_SUCCESS = '[Dictionaries] Remove Dictionary Success';
export const REMOVE_DICTIONARY_FAIL    = '[Dictionaries] Remove Dictionary Fail';

export const UPDATE_DICTIONARY         = '[Dictionaries] Update Dictionary';
export const UPDATE_DICTIONARY_SUCCESS = '[Dictionaries] Update Dictionary Success';
export const UPDATE_DICTIONARY_FAIL    = '[Dictionaries] Update Dictionary Fail';

export const LOAD              = '[Dictionaries] Load';
export const LOAD_SUCCESS      = '[Dictionaries] Load Success';
export const LOAD_FAIL         = '[Dictionaries] Load Fail';

/**
 * Add Dictionary to Dictionaries list Actions
 */
export class AddDictionaryAction implements Action {
  readonly type = ADD_DICTIONARY;
  constructor(public payload: Dictionary) {}
}

export class AddDictionarySuccessAction implements Action {
  readonly type = ADD_DICTIONARY_SUCCESS;

  constructor(public payload: Dictionary) { }
}

export class AddDictionaryFailAction implements Action {
  readonly type = ADD_DICTIONARY_FAIL;

  constructor(public payload: Dictionary) { }
}

/**
 * Remove Dictionary from Dictionaries list Actions
 */
export class RemoveDictionaryAction implements Action {
  readonly type = REMOVE_DICTIONARY;
  constructor(public payload: Dictionary) {}
}

export class RemoveDictionarySuccessAction implements Action {
  readonly type = REMOVE_DICTIONARY_SUCCESS;

  constructor(public payload: Dictionary) { }
}

export class RemoveDictionaryFailAction implements Action {
  readonly type = REMOVE_DICTIONARY_FAIL;

  constructor(public payload: Dictionary) {}
}

/**
 * Update Dictionary Actions
 */
export class UpdateDictionaryAction implements Action {
  readonly type = UPDATE_DICTIONARY;
  constructor(public payload: Dictionary) {}
}

export class UpdateDictionarySuccessAction implements Action {
  readonly type = UPDATE_DICTIONARY_SUCCESS;

  constructor(public payload: Dictionary) { }
}

export class UpdateDictionaryFailAction implements Action {
  readonly type = UPDATE_DICTIONARY_FAIL;

  constructor(public payload: Dictionary) {}
}

/**
 * Load Dictionaries
 */
export class LoadAction implements Action {
  readonly type = LOAD;
}

export class LoadSuccessAction implements Action {
  readonly type = LOAD_SUCCESS;

  constructor(public payload: Dictionary[]) {}
}

export class LoadFailAction implements Action {
  readonly type = LOAD_FAIL;

  constructor(public payload: any) {}
}

export type Actions
  = AddDictionaryAction
  | AddDictionarySuccessAction
  | AddDictionaryFailAction
  | RemoveDictionaryAction
  | RemoveDictionarySuccessAction
  | RemoveDictionaryFailAction
  | UpdateDictionaryAction
  | UpdateDictionarySuccessAction
  | UpdateDictionaryFailAction
  | LoadAction
  | LoadSuccessAction
  | LoadFailAction;