import { ECClient as RawECClient } from '@prisma/client'

import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'

import { ECClient } from '@modules/ec-clients/entities/ec-client'

export class PrismaECClientMapper {
  static toPrisma(eCClient: ECClient) {
    return {
      id: eCClient.id,
      user_id: eCClient.userId,
      company_name: eCClient.companyName,
      company_document: eCClient.companyDocument,
      company_email: eCClient.companyEmail,
      company_phone: eCClient.companyPhone,
      company_zip_code: eCClient.companyZipCode,
      company_state: eCClient.companyState,
      company_city: eCClient.companyCity,
      company_street: eCClient.companyStreet,
      company_number: eCClient.companyNumber,
      company_complement: eCClient.companyComplement,
      responsible_name: eCClient.responsibleName,
      responsible_document: eCClient.responsibleDocument,
      responsible_email: eCClient.responsibleEmail,
      responsible_whatsapp: eCClient.responsibleWhatsapp,
      zip_code: eCClient.zipCode,
      state: eCClient.state,
      city: eCClient.city,
      street: eCClient.street,
      number: eCClient.number,
      complement: eCClient.complement,
      profile: eCClient.profile,
      created_at: eCClient.createdAt,
      updated_at: eCClient.updatedAt,
      deleted_at: eCClient.deletedAt,
    }
  }

  static toDomain(raw: RawECClient): ECClient {
    return ECClient.create(
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
