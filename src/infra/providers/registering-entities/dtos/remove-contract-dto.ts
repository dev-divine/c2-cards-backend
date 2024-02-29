export interface RemoveContractInputDTO {
  operationType: 'baixa' | 'inativacao'
  externalCode: string
  contractIdentifier: string
}

export interface RemoveContractOutputDTO {
  success: boolean
  externalCode: string
  contractIdentifier: string
}
