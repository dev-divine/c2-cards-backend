export interface SaveContractInputDTO {
  externalCode: string
  outstandingBalanceOrLimit: number
  minimumValueToBeMaintained: number
}

export interface SaveContractOutputDTO {
  success: boolean
  externalCode: string
  contractIdentifier: string
}
