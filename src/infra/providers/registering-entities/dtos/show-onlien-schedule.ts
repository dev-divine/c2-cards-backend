export interface ShowOnlineScheduleInputDTO {
  originatorDocument: string
  financierCnpj: string
  accreditorCnpj: string
  paymentArrangementCode: string
  startDate: string
  endDate: string
}

export interface ShowOnlineScheduleOutputDTO {
  success: boolean
  scheduleProtocol: string
  requestStatus: string
}
