import { createTypes, completeTypes } from 'redux-recompose';

import traceService from 'services/traceService';

import { TYPE_ADD_EXPRESSION, TYPE_DELETE_EXPRESSION, TYPE_CHANGE_EXPRESSION } from './constant';

export const actions = createTypes(
  completeTypes(
    ['SAVE_EXPRESSION', 'DELETE_SOME_EXPRESSION', 'CHANGE_EXPRESSION'],
    ['DELETE_ALL', 'HANDLE_TRACE_EXPRESSION']
  ),
  '@@TRACE_EXPRESSION'
);

const privateActionCreators = {
  saveExpressionSuccess: payload => ({
    type: actions.SAVE_EXPRESSION_SUCCESS,
    target: 'saveExpression',
    payload: payload
  }),
  saveExpressionFailure: error => ({
    type: actions.SAVE_EXPRESSION_FAILURE,
    target: 'saveExpression',
    payload: error
  }),
  deleteSomeExpressionSuccess: payload => ({
    type: actions.DELETE_SOME_EXPRESSION_SUCCESS,
    target: 'deleteSomeExpression',
    payload: payload
  }),
  deleteSomeExpressionFailure: error => ({
    type: actions.DELETE_SOME_EXPRESSION_FAILURE,
    target: 'deleteSomeExpression',
    payload: error
  }),
  changeExpressionSuccess: payload => ({
    type: actions.CHANGE_EXPRESSION_SUCCESS,
    target: 'changeExpression',
    payload: payload
  }),
  changeExpressionFailure: error => ({
    type: actions.CHANGE_EXPRESSION_FAILURE,
    target: 'changeExpression',
    payload: error
  })
};

const actionCreators = {
  saveExpressionAction: expression => async dispatch => {
    dispatch({ type: actions.SAVE_EXPRESSION, target: 'saveExpression' });
    const response = await traceService.postTrace(expression);
    if (response.ok) {
      let answ = response.data.map(i => i.message);
      window.alert(answ);
      dispatch(privateActionCreators.saveExpressionSuccess(expression));
      dispatch(
        actionCreators.handleTraceExpression(TYPE_ADD_EXPRESSION, expression.expression, expression.id)
      );
      traceService.getTrace();
    } else dispatch(privateActionCreators.saveExpressionFailure('salio mal'));
  },
  deleteSomeExpressionAction: expressionId => async dispatch => {
    dispatch({ type: actions.DELETE_SOME_EXPRESSION, target: 'deleteSomeExpression' });
    const response = await traceService.deleteSomeExpression(expressionId);
    if (response.ok) {
      let answ = response.data.map(i => i.message);
      window.alert(answ);
      dispatch(privateActionCreators.deleteSomeExpressionSuccess(expressionId));
      dispatch(actionCreators.handleTraceExpression(TYPE_DELETE_EXPRESSION, undefined, expressionId.id));
    } else dispatch(privateActionCreators.deleteSomeExpressionFailure('salio mal'));
  },
  changeExpressionAction: newValue => async dispatch => {
    dispatch({ type: actions.CHANGE_EXPRESSION, target: 'changeExpression' });
    const response = await traceService.putExpression(newValue);
    if (response.ok) {
      let answ = response.data.map(i => i.message);
      window.alert(answ);
      dispatch(privateActionCreators.changeExpressionSuccess(newValue));
      dispatch(
        actionCreators.handleTraceExpression(TYPE_CHANGE_EXPRESSION, newValue.expression, newValue.id)
      );
    } else dispatch(privateActionCreators.changeExpressionFailure('salio mal'));
  },
  handleTraceExpression: (type, expression, idExpresion) => (dispatch, getState) => {
    const traceExpressionArray = getState().traceExpression;
    switch (type) {
      case TYPE_ADD_EXPRESSION:
        dispatch({
          type: actions.HANDLE_TRACE_EXPRESSION,
          payload: [...traceExpressionArray.traceExpression, { id: idExpresion, expression: expression }]
        });
        break;
      case TYPE_DELETE_EXPRESSION:
        dispatch({
          type: actions.HANDLE_TRACE_EXPRESSION,
          payload: traceExpressionArray.traceExpression.filter(item => item.id !== idExpresion)
        });
        break;
      case TYPE_CHANGE_EXPRESSION:
        let newExpression = traceExpressionArray.traceExpression.map(obj => {
          if (obj.id === idExpresion) {
            return { ...obj, expression };
          }
          return obj;
        });
        dispatch({
          type: actions.HANDLE_TRACE_EXPRESSION,
          payload: newExpression
        });

        break;
    }
  },

  deleteAllAction: () => async dispatch => {
    dispatch({ type: actions.DELETE_ALL }, traceService.deleteAll());
    const response = await traceService.deleteAll();
    let answ = response.data.map(i => i.message);
    window.alert(answ);
  }
};

export default actionCreators;
