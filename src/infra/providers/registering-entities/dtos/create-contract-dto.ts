export interface CreateContractInputDTO {
  // externalCode: string
  // contractIdentifier: string
  debtorContractDocument: string // CNPJ ou CPF do "EC" com formatação
  /* participantDocument: string - CNPJ C2Cards com formatação */
  holderDocument: string // CNPJ C2Cards com formatação
  contractEffectType: number // 1-TROCA DE TITULARIDADE, 2-ONUS CESSAO
  outstandingBalanceOrLimit: number
  minimumValueToBeMaintained: number
  signatureDate: string // example: 2020-07-21
  expirationDate: string // example: 2020-07-21
  /* divisionRule: '1' | '2' - 1-VALOR, 2-PORCENTAGEM */
}

export interface CreateContractOutputDTO {
  success: boolean
  externalCode: string
  contractIdentifier: string
}
