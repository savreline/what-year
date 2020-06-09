import axios from 'axios';

/* Make an axios request to the API url */
export const fetchQuestion = questionId => {
  return axios.get(`/api/question/${questionId}`)
    .then(res => res.data);
};
