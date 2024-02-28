export interface CreateContractInputDTO {
  externalCode: string // Código externo do contrato
  debtorContractDocument: string // CNPJ do contratante da dívida com formatação "Dúvida EC ou AF"
  renegotiation: '0' | '1' // 0-NÃO, 1-SIM (Se houve renegociação - Default NÃO)
  participantDocument: string // CNPJ C2Cards com formatação
  holderDocument: string // CNPJ C2Cards com formatação
  contractEffectType: '1' | '2' // 1-TROCA DE TITULARIDADE, 2-ONUS CESSAO
  outstandingBalance: number
  guaranteedOperationLimit: number
  minimumValueToBeMaintained: number
  signatureDate: string // example: 2020-07-21
  expirationDate: string // example: 2020-07-21
  divisionRule: '1' | '2' // 1-VALOR, 2-PORCENTAGEM
  installments: [
    {
      installmentDate: string // example: 2020-07-21
      installmentValue: number
    },
  ]
}

export interface CreateContractOutputDTO {
  success: boolean
  externalCode: string
  contractIdentifier: string
  processingProtocol: string
  processingDateTime: string
}
