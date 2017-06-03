import { Dictionary } from '../models/dictionary';
import * as dictionaries from '../actions/list-dictionaries';

export interface State {
  loaded: boolean;
  loading: boolean;
  dictionaries: Dictionary[];
};

const initialState: State = {
  loaded: false,
  loading: false,
  dictionaries: []
};

export function reducer(state = initialState, action: dictionaries.Actions): State {
  switch (action.type) {
    case dictionaries.LOAD: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case dictionaries.LOAD_SUCCESS: {
      const dictionaries = action.payload;

      return {
        loaded: true,
        loading: false,
        dictionaries
      };
    }

    case dictionaries.ADD_DICTIONARY_SUCCESS:
    case dictionaries.REMOVE_DICTIONARY_FAIL: {
      const dictionary = action.payload;

      if (state.dictionaries.find(dict => dict.id === dictionary.id)) {
        return state;
      }

      return Object.assign({}, state, {
        dictionaries: [ ...state.dictionaries, dictionary ]
      });
    }

    case dictionaries.REMOVE_DICTIONARY_SUCCESS:
    case dictionaries.ADD_DICTIONARY_FAIL: {
      const dictionary = action.payload;

      return Object.assign({}, state, {
        dictionaries: state.dictionaries.filter(dict => dict.id !== dictionary.id)
      });
    }

    default: {
      return state;
    }
  }
}

export const getLoaded = (state: State) => state.loaded;
export const getLoading = (state: State) => state.loading;
export const getDictionaries = (state: State) => state.dictionaries;