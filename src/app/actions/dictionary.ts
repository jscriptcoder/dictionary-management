
import { Action } from '@ngrx/store';
import { Domain, Range } from '../models/dictionary';

export const ADD_DOMAIN    = '[Dictionary] Add Domain';
export const REMOVE_DOMAIN = '[Dictionaries] Remove Domain';
export const UPDATE_DOMAIN = '[Dictionaries] Update Domain';

/**
 * Add Domain/Range to the Dictionary
 */
export class AddDomainAction implements Action {
  readonly type = ADD_DOMAIN;
  constructor(public domain: Dictionary, range: Range) { }
}

/**
 * Remove Domain/Range from the Dictionary
 */
export class RemoveDomainAction implements Action {
  readonly type = REMOVE_DOMAIN;
  constructor(public domain: Domain) { }
}

/**
 * Update Domain/Range
 */
export class UpdateDomainAction implements Action {
  readonly type = UPDATE_DOMAIN;
  constructor(public domain: Dictionary, range: Range) { }
}

export type Actions
  = AddDomainAction
  | RemoveDomainAction
  | UpdateDomainAction;