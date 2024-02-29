export interface SaveURSimplifiedInputDTO {
  externalCode: string
  externalContractCode: string
  contractIdentifier: string
  actionType: string
  coveredReceivables: {
    accreditorCnpj: string
    finalRecipientUserDocument: string
    paymentArrangementCode: string
    settlementDate: string
    amountToEncumber: number
  }[]
}

export interface SaveURSimplifiedOutputDTO {
  success: boolean
  externalCode: string
  externalContractCode: string
  contractIdentifier: string
}
