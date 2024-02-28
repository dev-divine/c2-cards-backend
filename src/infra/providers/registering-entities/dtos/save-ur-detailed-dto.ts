export interface SaveURDetailedInputDTO {
  extenalCode: string
  externalContractCode: string
  coveredReceivables: [
    {
      accreditorCNPJ: string
      finalRecipientUserDocument: string
      paymentArrangementCode: string
      settlementDate: string
      amountToEncumber: number
    },
  ]
}

export interface SaveURDetailedOutputDTO {
  success: boolean
  externalCode: string
  externalContractCode: string
  contractIdentifier: string
  processingProtocol: string
  processingDateTime: string
}
