import api from '../config/api';

export default {
  getChoices: () => api.get('/14', {})
};
