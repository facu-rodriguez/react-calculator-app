import { createTypes, completeTypes } from 'redux-recompose';

import traceService from 'services/traceService';

import {TYPE_ADD_EXPRESSION} from './constant';

export const actions = createTypes(
  completeTypes(['SAVE_EXPRESSION', 'DELETE_SOME_EXPRESSION', 'CHANGE_EXPRESSION'], ['DELETE_ALL', 'HANDLE_TRACE_EXPRESSION']),
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
    type: actions.DELETE_SOME_EXPRESSION_SUCCES,
    target: 'deleteSomeExpression',
    payload: payload
  }),
  deleteSomeExpressionFailure: error => ({
    type: actions.DELETE_SOME_EXPRESSION_FAILURE,
    target: 'deleteSomeExpression',
    payload: error
  }),
  changeExpressionSuccess: payload => ({
    type: actions.CHANGE_EXPRESSION_SUCCES,
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
      dispatch(privateActionCreators.saveExpressionSuccess(response.data.expression));
      dispatch(actionCreators.handleTraceExpression(TYPE_ADD_EXPRESSION));
    } else dispatch(privateActionCreators.saveExpressionFailure('salio mal'));

  },
  deleteSomeExpressionAction: expressionId => async dispatch => {
    dispatch({ type: actions.DELETE_SOME_EXPRESSION, target: 'deleteSomeExpression' });
    const response = await traceService.deleteSomeExpression(expressionId);
    if (response.ok) {
      dispatch(privateActionCreators.deleteSomeExpressionSuccess(response.data.choices));
    } else dispatch(privateActionCreators.deleteSomeExpressionFailure('salio re mal'));
  },
  changeExpressionAction: (id, newValue) => async dispatch => {
    dispatch({ type: actions.CHANGE_EXPRESSION, target: 'changeExpression' });
    const response = await traceService.putExpression(id, newValue);
    if (response.ok) {
      dispatch(privateActionCreators.changeExpressionSuccess(response.data.choices));
    } else dispatch(privateActionCreators.changeExpressionFailure('salio como el reverendo ogt'));
  },
  deleteAllAction: state => dispatch => dispatch({ type: actions.DELETE_ALL }, traceService.deleteAll(state)),
  handleTraceExpression: (type,expression, idExpresion, newValue) => (dispatch, getState) => {
    const traceExpressionArray = getState().traceExpressionTest.traceExpression;
    switch(type){
      case TYPE_ADD_EXPRESSION{

      }
    }






  }
};

export default actionCreators;
