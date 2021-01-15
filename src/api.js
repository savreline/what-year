import axios from 'axios';

/* Make an axios request to the API url */
export const fetchQuestion = questionId => {
  return axios.get(`/api/question/${questionId}`)
    .then(res => res.data);
};

export const fetchQuestions = () => {
  return axios.get(`/api/question/`)
    .then(res => res.data);
};

export const addAnswer = (questionId, answer) => {
  return axios.post(`/api/question/${questionId}`, answer)
    .then(res => res.data);
};

export const fetchScores = () => {
  return axios.get('/api/players')
    .then(res => res.data);
};

export const addPlayer = player => {
  return axios.post('/api/players', player)
    .then(res => res.data);
};

export const fetchPlayer = playerName => {
  return axios.get(`/api/players/${playerName}`)
    .then(res => res.data);
};
