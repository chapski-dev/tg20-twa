import { object, string, number } from 'yup'

export const getValidationSchema = (type: 'mint' | 'deploy' | 'transfer') => {
  const tickRegex = /^[a-z0-9-]{4}$/

  switch (type) {
    case 'mint':
      return object().shape({
        tick: string()
          .matches(tickRegex, 'Incorrect tick format')
          .required('Required to fill out'),
        amount: number()
          .required('Required to fill out')
          .min(0, 'Number cannot be negative'),
      })
    case 'deploy':
      return object().shape({
        tick: string()
          .matches(tickRegex, 'Incorrect tick format')
          .required('Required to fill out'),
        amount: number()
          .min(4000000, 'Total upply cant be less then 4.000.000')
          .required('Required to fill out'),
        // limit: number().when('amount', {
        //   is: (amount: any) => amount > 0,
        //   then: (schema: any) =>
        //     schema
        //       .min(0, 'Number cannot be negative')
        //       .max(
        //         ref('amount'),
        //         'Should be less than or equal to total supply'
        //       )
        //       .required('Required to fill out'),
        //   otherwise: (schema: any) => schema.required('Required to fill out'),
        // } as any),
        limit: number()
          .min(0, 'Number cannot be negative')
          .required('Required to fill out'),
      })
    case 'transfer':
      return object().shape({
        tick: string()
          .matches(tickRegex, 'Incorrect tick format')
          .required('Required to fill out'),
        to: string().required('Required to fill out'),
        amount: number()
          .required('Required to fill out')
          .min(0, 'Number cannot be negative'),
        memo: string(),
      })
  }
}
