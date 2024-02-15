import { number, object, string } from 'yup'

export const validationSchema = object().shape({
  address: string().required('Required to fill out'),
  amount: number()
    .required('Required to fill out')
    .min(0, 'Number cannot be negative'),
  memo: string(),
})
