import { object, string, number, mixed } from 'yup'

export const getValidationSchema = () => {
  const tickRegex = /^[a-z0-9-]{4}$/
  return object().shape({
    tick: string()
      .matches(tickRegex, 'Incorrect tick format')
      .required('Required to fill out'),
    amount: number()
      .min(4000000, 'Total upply cant be less then 4.000.000')
      .required('Required to fill out'),
    // file: mixed().required('File is required'),
    limit: number()
      .min(0, 'Number cannot be negative')
      .required('Required to fill out'),
  })
}
