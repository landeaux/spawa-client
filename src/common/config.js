export const API_URL = {
  production: 'https://boiling-falls-11748.herokuapp.com/api',
  staging: 'https://boiling-falls-11748.herokuapp.com/api',
  development: 'http://localhost:5000/api',
  test: 'http://localhost:5000/api',
}[process.env.NODE_ENV];

export default API_URL;
