export interface SaveURSimplifiedDTO {
  contractIdentifier: string
  coveredReceivables: {
    accreditorCnpj: string
    finalRecipientUserDocument: string
    paymentArrangementCode: string
    settlementDate: string
    amountToEncumber: number
  }[]
}
