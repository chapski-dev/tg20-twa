import axios from 'axios'
import { BASE_API_URL, BASE_API_URL_V2, BASE_API_URL_V3 } from 'constants/api'

export const AXIOS_INSTANCE = axios.create({
  baseURL: BASE_API_URL,
})

export const AXIOS_INSTANCE_V2 = axios.create({
  baseURL: BASE_API_URL_V2,
})

export const AXIOS_INSTANCE_V3 = axios.create({
  baseURL: BASE_API_URL_V3,
})
