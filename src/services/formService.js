import api from '../config/api';

export default {
  postFormValues: values => api.post('/form', values)
};
