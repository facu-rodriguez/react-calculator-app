import { createTypes, completeTypes } from 'redux-recompose';

import traceService from 'services/traceService';

export const actions = createTypes(
  completeTypes(['SAVE_EXPRESSION'], ['CLEAN_SAVE_EXPRESSION']),
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
  })
};

const actionCreators = {
  saveExpressionAction: expression => async dispatch => {
    dispatch({ type: actions.SAVE_EXPRESSION, target: 'saveExpression' });
    const response = await traceService.getChoices();
    if (response.ok) {
      dispatch(privateActionCreators.saveExpressionSuccess(response.data.choices));
    } else dispatch(privateActionCreators.saveExpressionFailure('salio mal'));
  },
  cleanSaveExpression: () => dispatch => dispatch({ type: actions.CLEAN_SAVE_EXPRESSION })
};

export default actionCreators;
