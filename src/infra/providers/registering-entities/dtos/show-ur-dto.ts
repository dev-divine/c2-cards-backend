export interface ShowURInputDTO {
  externalCode: string
  externalContractCode: string
  contractIdentifier: string
}

export interface ShowUROutputDTO {
  success: boolean
  externalCode: string
  externalContractCode: string
  contractIdentifier: string
  processingProtocol: string
  processingDateTime: string
  receivablesUnitsDefinition: {
    holderDocument: string
    divisionRule: string
    definitionStatus: string
    commitmentStatus: string
    coveredReceivables: [
      {
        registrarCNPJ: string
        accreditorCNPJ: string
        contractEffectIdentifier: string
        finalRecipientUserDocument: string
        paymentArrangementCode: string
        constitutionStatus: string
        settlementDate: string
        requestedEffectValue: number
        committedEffectValue: number
        queueValue: number
        commitmentOrder: number
        totalConstitutedValue: number
        preContractedValue: number
        freeBalance: number
        blockedValue: number
      },
    ]
  }
}
