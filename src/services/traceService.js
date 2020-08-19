import api from '../config/api';

export default {
  getTrace: () => api.get('/14', {}),
  postTrace: expression => api.post('/14', { expression: expression.expression, id: expression.id }),
  deleteAll: state => api.delete('/14', state),
  deleteSomeExpression: expressionId => api.delete('/14', expressionId),
  putExpression: (id, newValue) => api.put('/14', { id, newValue })
};
