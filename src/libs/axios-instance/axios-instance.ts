import axios from 'axios'
import { BASE_API_URL, BASE_API_URL_V2 } from 'constants/api'

export const AXIOS_INSTANCE = axios.create({
  baseURL: BASE_API_URL,
})

export const AXIOS_INSTANCE_V2 = axios.create({
  baseURL: BASE_API_URL_V2,
})
