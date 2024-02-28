export interface SaveURDomicileInputDTO {
  externalCode: string
  externalContractCode: string
  payment: {
    holderDomicileDocument: string
    accountType: 'CC' | 'CD' | 'PG' | 'PP' | 'CI' | 'CG' // CC-(Conta Corrente), CD-(Conta Depósito), PG-(Conta Pagamento), PP-(Conta Poupança), CI-(Conta Investimento), CG-(Conta Garantia)
    compe: string
    ispb: string
    agency: string
    accountNumber: string
  }
}

export interface SaveURDomicileOutputDTO {
  success: boolean
  externalCode: string
  externalContractCode: string
  contractIdentifier: string
  processingProtocol: string
  processingDateTime: string
}
