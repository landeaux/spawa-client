export const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://boiling-falls-11748.herokuapp.com/api'
  : 'http://localhost:5000/api'
export default API_URL
