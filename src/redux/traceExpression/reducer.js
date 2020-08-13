export const defaultState = {
  traceExpression: []
};

export const addExpression = (state, expression) => {
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
  console.log({ expressionId });
  return {
    traceExpression: [...state.traceExpression.filter(item => item.id !== expressionId)]
  };
};
export const changeExpression = (state, index, newValue) => {
  let newExpression = state.traceExpression.splice(index, 1, newValue);
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
      console.log(action);
      return changeExpression(state, action.payload.index, action.payload.newValue);
      break;

    default:
      return state;
  }
};
