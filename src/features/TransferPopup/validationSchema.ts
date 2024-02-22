import { Address } from '@ton/core';
import { number, object, string } from 'yup'


export const validationSchema = object().shape({
  address: string()
  .required('Required to fill out')
  .test('is-friendly', 'Incorrect wallet address format', (value) => Address.isFriendly(value)),
  amount: number()
    .required('Required to fill out')
    .min(0, 'Number cannot be negative'),
  memo: string(),
})
