import axios from 'axios'

const Api = axios.create({
  baseURL: 'https://osm-expense-tracker-f0320512353f.herokuapp.com',
})

export default Api
