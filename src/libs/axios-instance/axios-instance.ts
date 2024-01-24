import axios from 'axios'
import { BASE_API_URL } from 'constants/api'

export const AXIOS_INSTANCE = axios.create({
  baseURL: BASE_API_URL,
})
