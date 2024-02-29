import { OnlineSchedule as RawOnlineSchedule } from '@prisma/client'

import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'

import { OnlineSchedule } from '@modules/schedule/entities/online-schedule'

export class PrismaECClientMapper {
  static toPrisma(schedule: OnlineSchedule) {
    return {
      id: schedule.id,
      schedule_protocol: schedule.scheduleProtocol,
      request_status: schedule.requestStatus,
      originator_document: schedule.originatorDocument,
      financier_cnpj: schedule.financierCnpj,
      accreditor_cnpj: schedule.accreditorCnpj,
      payment_arrangement_code: schedule.paymentArrangementCode,
      start_date: new Date(schedule.startDate),
      end_date: new Date(schedule.endDate),
      created_at: schedule.createdAt,
      updated_at: schedule.updatedAt,
      deleted_at: schedule.deletedAt,
    }
  }

  static toDomain(raw: RawOnlineSchedule): OnlineSchedule {
    return OnlineSchedule.create(
      {
        userId: raw.user_id ?? undefined,
        companyName: raw.company_name,
        companyDocument: raw.company_document,
        companyEmail: raw.company_email,
        companyPhone: raw.company_phone,
        companyZipCode: raw.company_zip_code,
        companyState: raw.company_state,
        companyCity: raw.company_city,
        companyStreet: raw.company_street,
        companyNumber: raw.company_number,
        companyComplement: raw.company_complement ?? undefined,
        responsibleName: raw.responsible_name,
        responsibleDocument: raw.responsible_document,
        responsibleEmail: raw.responsible_email,
        responsibleWhatsapp: raw.responsible_whatsapp,
        zipCode: raw.zip_code,
        state: raw.state,
        city: raw.city,
        street: raw.street,
        number: raw.number,
        complement: raw.complement ?? undefined,
        profile: raw.profile ?? undefined,
        createdAt: raw.created_at,
        updatedAt: raw.updated_at,
        deletedAt: raw.deleted_at ?? undefined,
      },
      new UniqueEntityID(raw.id),
    )
  }
}
