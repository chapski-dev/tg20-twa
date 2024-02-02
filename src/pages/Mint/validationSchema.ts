import { object, string, number } from 'yup'

export const getValidationSchema = () => {
  const tickRegex = /^[a-z0-9-]{4}$/

  return object().shape({
    tick: string()
      .matches(tickRegex, 'Incorrect tick format')
      .required('Required to fill out'),
    amount: number()
      .required('Required to fill out')
      .min(0, 'Number cannot be negative'),
  });
};
