export interface OptInInputDTO {
  financialAgentDocument: string
  signatureDate: string
  expirationDate?: string
  ecClientDocument: string
}

export interface OptInOutputDTO {
  externalCode: string
  protocol: string
}
