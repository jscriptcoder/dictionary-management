import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';

import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Database } from '@ngrx/db';
import { Observable } from 'rxjs/Observable';
import { defer } from 'rxjs/observable/defer';
import { of } from 'rxjs/observable/of';

import * as dictionaries from '../actions/list-dictionaries';
import { Dictionary } from '../models/dictionary';
import { DB_NAME, DICTIONARIES_TABLE } from '../db';

@Injectable()
export class DictionariesEffects {

  @Effect({ dispatch: false })
  openDB$: Observable<any> = defer(() => this.db.open(DB_NAME) );

  /**
   * This effect makes use of the `startWith` operator to trigger
   * the effect immediately on startup.
   */
  @Effect()
  loadDictionaries$: Observable<Action> = this.actions$
    .ofType(dictionaries.LOAD)
    .startWith(new dictionaries.LoadAction())
    .switchMap(() =>
      this.db.query(DICTIONARIES_TABLE)
        .toArray()
        .map((dicts: Dictionary[]) => new dictionaries.LoadSuccessAction(dicts))
        .catch(error => of(new dictionaries.LoadFailAction(error)))
    );

  @Effect()
  addDictionary$: Observable<Action> = this.actions$
    .ofType(dictionaries.ADD_DICTIONARY)
    .map((action: dictionaries.AddDictionaryAction) => action.payload)
    .mergeMap(dictionary =>
      this.db.insert(DICTIONARIES_TABLE, [ dictionary ])
        .map(() => new dictionaries.AddDictionarySuccessAction(dictionary))
        .catch(() => of(new dictionaries.AddDictionaryFailAction(dictionary)))
    );


  @Effect()
  removeDictionary$: Observable<Action> = this.actions$
    .ofType(dictionaries.REMOVE_DICTIONARY)
    .map((action: dictionaries.RemoveDictionaryAction) => action.payload)
    .mergeMap(dictionary =>
      this.db.executeWrite(DICTIONARIES_TABLE, 'delete', [ dictionary.id ])
        .map(() => new dictionaries.RemoveDictionarySuccessAction(dictionary))
        .catch(() => of(new dictionaries.RemoveDictionaryFailAction(dictionary)))
    );

    constructor(private actions$: Actions, private db: Database) { }
}