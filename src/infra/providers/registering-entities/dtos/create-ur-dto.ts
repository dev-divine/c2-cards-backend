export interface CreateURInputDTO {
  externalCode: string
  externalContractCode: string
  contractIdentifier: string
  holderDocument: string
  coveredReceivables: [
    {
      accreditorCNPJ: string
      finalRecipientUserDocument: string
      paymentArrangementCode: string
      settlementDate: string
      amountToEncumber: number
    },
  ]
  payment: {
    holderDomicileDocument: string
    accountType: 'CC' | 'CD' | 'PG' | 'PP' | 'CI' | 'CG' // CC-(Conta Corrente), CD-(Conta Depósito), PG-(Conta Pagamento), PP-(Conta Poupança), CI-(Conta Investimento), CG-(Conta Garantia)
    compe: string
    ispb: string
    agency: string
    accountNumber: string
  }
}

export interface CreateUROutputDTO {
  success: boolean
  externalCode: string
  externalContractCode: string
  contractIdentifier: string
}
