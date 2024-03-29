export interface SaveURDomicileInputDTO {
  externalCode: string
  contractIdentifier: string
  externalContractCode: string
  payment: {
    holderDomicileDocument: string
    accountType: string // 'CC' | 'CD' | 'PG' | 'PP' | 'CI' | 'CG' // CC-(Conta Corrente), CD-(Conta Depósito), PG-(Conta Pagamento), PP-(Conta Poupança), CI-(Conta Investimento), CG-(Conta Garantia)
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
}
