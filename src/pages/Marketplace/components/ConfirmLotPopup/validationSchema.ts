import { number, object } from 'yup'

export const validationSchema = object().shape({
  amount: number()
    .required('Required to fill out')
    .positive('Amount must be greater than 0'),
  price: number()
    .required('Required to fill out')
    .positive('Price must be greater than 0'),
})
