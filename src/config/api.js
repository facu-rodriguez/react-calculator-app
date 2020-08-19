import { create } from 'apisauce';

const api = create({
  baseURL: 'https://polls.apiblueprint.org/questions'
});

export default api;
