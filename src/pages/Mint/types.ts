// ! 'deploy' | 'transfer' -- deprecated (надо выпилить в будущем когда решить вопрос со связанностью типов с ActionsStatusContext и ActionsStatusProvider а так же блоком Inscribe)
export type MintFormType = 'mint' | 'deploy' | 'transfer'

export type ActionStatusData = {
  tick: string
  type: MintFormType
  status: 'failed' | 'in_progress' | 'success'
  current_value: string
  time: string
}
