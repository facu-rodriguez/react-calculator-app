import getChoices from 'services/traceService';

export const defaultState = {
  traceExpression: []
};

export const addExpression = (state, expression) => {
  getChoices();
  return {
    ...state,
    traceExpression: [...state.traceExpression, expression]
  };
};

export const deleteTrace = state => {
  return {
    traceExpression: state
  };
};

export const deleteSome = (state, expressionId) => {
  return {
    traceExpression: [...state.traceExpression.filter(item => item.id !== expressionId)]
  };
};
export const changeExpression = (state, id, newValue) => {
  let newExpression = state.traceExpression.map(obj => {
    if (obj.id === id) {
      obj.expression = newValue;
    }
  });
  return {
    traceExpression: [...state.traceExpression]
  };
};

export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SAVE_EXPRESSION':
      return addExpression(state, action.payload);
      break;
    case 'DELETE_ALL_TRACE':
      return deleteTrace((state = []));
      break;
    case 'DELETE_SOME_EXPRESSION':
      return deleteSome(state, action.payload);
      break;
    case 'EDIT_EXPRESSION':
      return changeExpression(state, action.payload.id, action.payload.newValue);
      break;

    default:
      return state;
  }
};
