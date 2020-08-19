import Immutable from 'seamless-immutable';
import { completeReducer, createReducer } from 'redux-recompose';

import { actions } from './actions1';

export const defaultState = {
  saveExpression: '32423424',
  saveExpressionLoading: false,
  saveExpressionError: null
};

const reducerDescription = {
  primaryActions: [actions.SAVE_EXPRESSION],

  override: {
    [actions.CLEAN_SAVE_EXPRESSION]: state => Immutable.merge(state, { saveExpression: '' })
  }
};

export const reducer = createReducer(Immutable(defaultState), completeReducer(reducerDescription));
