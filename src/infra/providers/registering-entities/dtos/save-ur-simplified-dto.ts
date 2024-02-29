export interface SaveURSimplifiedInputDTO {
  externalCode: string
  externalContractCode: string
  actionType: string
  coveredReceivables: {
    accreditorCNPJ: string
    finalRecipientUserDocument: string
    paymentArrangementCode: string
    settlementDate: string
    amountToEncumber: number
  }
}

export interface SaveURSimplifiedOutputDTO {
  success: boolean
  externalCode: string
  externalContractCode: string
  contractIdentifier: string
  processingProtocol: string
  processingDateTime: string
}