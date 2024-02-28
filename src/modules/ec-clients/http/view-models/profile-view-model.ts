import { ECClient } from '@modules/ec-clients/entities/ec-client'

export class ProfileViewModel {
  static toHTTP(eCClient: ECClient) {
    return {
      id: eCClient.id,
      user_id: eCClient.userId,
      profile: eCClient.profile,
      company_name: eCClient.companyName,
      company_document: eCClient.companyDocument,
      responsible_name: eCClient.responsibleName,
      responsible_document: eCClient.responsibleDocument,
      responsible_email: eCClient.responsibleEmail,
      responsible_whatsapp: eCClient.responsibleWhatsapp,
      company_zip_code: eCClient.companyZipCode,
      company_state: eCClient.companyState,
      company_city: eCClient.companyCity,
      company_street: eCClient.companyStreet,
      company_number: eCClient.companyNumber,
    }
  }
}
