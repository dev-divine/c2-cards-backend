import { URShow } from '@infra/config/unused/ur-show'

export class URViewModel {
  static toHTTP(ur: URShow) {
    return {
      id: ur.id,
      external_code: ur.externalCode,
      external_contract_code: ur.externalContractCode,
      contract_identifier: ur.contractIdentifier,
    }
  }
}
