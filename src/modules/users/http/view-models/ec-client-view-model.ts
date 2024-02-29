import { ECClient } from '@modules/ec-client/entities/ec-client'

export class ECClientViewModel {
  static toHTTP(eCClient: ECClient) {
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
}
