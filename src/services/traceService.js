import api from '../config/api';

export default {
  getTrace: () => api.get('', {}),
  postTrace: expression => api.post('', expression),
  deleteAll: state => api.delete('', state),
  deleteSomeExpression: expressionId => api.delete('', expressionId),
  putExpression: (id, newValue) => api.put('', { id, newValue })
};
