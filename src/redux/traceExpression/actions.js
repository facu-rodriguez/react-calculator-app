import { createAction } from 'redux-actions';

export const saveExpressionAction = createAction('SAVE_EXPRESSION', expression => expression);
export const deleteAllExpressionAction = createAction('DELETE_ALL_TRACE', state => state);
export const deleteSomeExpressionAction = createAction(
  'DELETE_SOME_EXPRESSION',
  expressionId => expressionId
);
export const editExpressionAction = createAction('EDIT_EXPRESSION', (id, newValue) => ({
  id,
  newValue
}));
