import { OnlineSchedule } from '@modules/schedule/entities/online-schedule'

export class OnlineScheduleViewModel {
  static toHTTP(schedule: OnlineSchedule) {
    return {
      id: schedule.id,
      schedule_protocol: schedule.scheduleProtocol,
      request_status: schedule.requestStatus,
      originator_document: schedule.originatorDocument,
      financier_cnpj: schedule.financierCnpj,
      accreditor_cnpj: schedule.accreditorCnpj,
      payment_arrangement_code: schedule.paymentArrangementCode,
      start_date: schedule.startDate,
      end_date: schedule.endDate,
    }
  }
}
