import { EcClient } from '@modules/ec-client/entities/ec-client'

export class EcClientViewModel {
  static toHTTP(ecClient: EcClient) {
    return {
      id: ecClient.id,
      companyName: ecClient.companyName,
      companyDocument: ecClient.companyDocument,
      companyPhone: ecClient.companyName,
      companyEmail: ecClient.companyEmail,
      companyZipCode: ecClient.companyZipCode,
      companyState: ecClient.companyState,
      companyCity: ecClient.companyCity,
      companyNeighborhood: ecClient.companyNeighborhood,
      companyStreet: ecClient.companyStreet,
      companyNumber: ecClient.companyNumber,
      companyComplement: ecClient.companyComplement,
      responsibleName: ecClient.responsibleName,
      responsibleEmail: ecClient.responsibleEmail,
      responsiblePhone: ecClient.responsiblePhone,
      responsibleDocument: ecClient.responsibleDocument,
      responsibleZipCode: ecClient.responsibleZipCode,
      responsibleState: ecClient.responsibleState,
      responsibleCity: ecClient.responsibleCity,
      responsibleNeighborhood: ecClient.responsibleNeighborhood,
      responsibleStreet: ecClient.responsibleStreet,
      responsibleNumber: ecClient.responsibleNumber,
      responsibleComplement: ecClient.responsibleComplement,
      createdAt: ecClient.createdAt,
    }
  }
}
