export interface SaveContractInputDTO {
  externalCode: string
  outstandingBalance: number
  outstandingBalanceOrLimit: number
  minimumValueToBeMaintained: number
}

export interface SaveContractOutputDTO {
  externalCode: string
  contractIdentifier: string
}
