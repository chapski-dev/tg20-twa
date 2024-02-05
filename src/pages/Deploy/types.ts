export type InscribeFormType = 'mint' | 'deploy' | 'transfer'

export type ActionStatusData = {
  tick: string
  type: InscribeFormType
  status: 'failed' | 'in_progress' | 'success'
  current_value: string
  time: string
}
