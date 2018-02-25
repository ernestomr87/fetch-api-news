import axios from 'axios';

const APIKey = 'a451baeba0c04a8ca9780d965f5cbc83';

export function getSources() {
  return axios.get(`https://newsapi.org/v2/sources?apiKey=${APIKey}`);
}
