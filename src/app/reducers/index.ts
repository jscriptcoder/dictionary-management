import { createSelector } from 'reselect';
import { ActionReducer } from '@ngrx/store';
import { combineReducers } from '@ngrx/store'
import * as fromRouter from '@ngrx/router-store';
import * as fromDictionaries from './list-dictionaries';

export interface State {
  dictionaries: fromDictionaries.State;
  router: fromRouter.RouterState;
}

const reducers = {
  dictionaries: fromDictionaries.reducer,
  router: fromRouter.routerReducer,
};

const combinedReducers: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any): State {
  return combinedReducers(state, action);
}

export const getDictionariesState = (state: State): fromDictionaries.State => state.dictionaries;
export const getDictionariesLoaded = createSelector(getDictionariesState, fromDictionaries.getLoaded);
export const getDictionariesLoading = createSelector(getDictionariesState, fromDictionaries.getLoading);
export const getDictionaries = createSelector(getDictionariesState, fromDictionaries.getDictionaries);