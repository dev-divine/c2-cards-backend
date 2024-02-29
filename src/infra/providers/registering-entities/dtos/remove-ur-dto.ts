export interface RemoveURInputDTO {
  operationType: 'baixa' | 'inativacao'
  externalCode: string
  externalContractCode: string
  contractIdentifier: string
}

export interface RemoveUROutputDTO {
  success: boolean
  externalCode: string
  externalContractCode: string
  contractIdentifier: string
}
