export interface RemoveContractInputDTO {
  operationType: string // 'baixa' | 'inativacao'
  externalCode: string
  contractIdentifier: string
}

export interface RemoveContractOutputDTO {
  success: boolean
  externalCode: string
  contractIdentifier: string
}
