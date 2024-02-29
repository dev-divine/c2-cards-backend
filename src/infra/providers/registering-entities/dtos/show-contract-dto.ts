export interface ShowContractInputDTO {
  externalCode: string
  contractIdentifier: string
}

export interface ShowContractOutputDTO {
  contract: {
    externalCode: string // Código externo do contrato
    contractIdentifier: string // Código externo do contrato
    contractSituation: '1' | '2' | '3' // 1-ATIVO, 2-BAIXADO, 3-INATIVADO
    debtorContractDocument: string // CNPJ do contratante da dívida com formatação "Dúvida EC ou AF"
    participantDocument: string // CNPJ C2Cards com formatação
    holderDocument: string // CNPJ C2Cards com formatação
    contractEffectType: '1' | '2' // 1-TROCA DE TITULARIDADE, 2-ONUS CESSAO
    outstandingBalanceOrLimit: number
    minimumValueToBeMaintained: number
    signatureDate: string // example: 2020-07-21
    expirationDate: string // example: 2020-07-21
    divisionRule: '1' | '2' // 1-VALOR, 2-PORCENTAGEM
    distributionResult: {
      affectedReceivablesUnitsQuantity: number // Quantidade de URs afetadas
      affectedReceivablesUnitsValue: number // Valor total das URs afetadas
      commitmentSituation: '1' | '2' | '3' // 1-FALHA, 2-EM PROCESSAMENTO, 3-PENDENTE EXTENSAO
    }
  }
}
