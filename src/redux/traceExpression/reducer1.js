import Immutable from 'seamless-immutable';
import { completeReducer, createReducer } from 'redux-recompose';

import { actions } from './actions';

export const defaultState = {
  traceExpression: [],
  saveExpression: '',
  saveExpressionLoading: false,
  saveExpressionError: null,
  deleteSomeExpression: '',
  deleteSomeExpressionLoading: false,
  deleteSomeExpressionError: null,
  changeExpression: '',
  changeExpressionLoading: false,
  changeExpressionError: null
};

//const addExpression = (state, expression) => {
//  return {
//    ...state,
//    traceExpression: [...state.traceExpression, expression]
//  };
//};

const reducerDescription = {
  primaryActions: [actions.SAVE_EXPRESSION, actions.DELETE_SOME_EXPRESSION, actions.CHANGE_EXPRESSION],

  override: {
    [actions.DELETE_ALL]: state => Immutable.merge(state, { saveExpression: '' }),
    [actions.HANDLE_TRACE_EXPRESSION]: (state, action) =>
      Immutable.merge(state, {
        traceExpression: action.payload
      })
  }
};

export const reducer = createReducer(Immutable(defaultState), completeReducer(reducerDescription));
