import { Entity } from '@core/domain/entities/entity'
import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'

interface Props {
  accreditorCnpj: string
  finalRecipientUserDocument: string
  paymentArrangementCode: string
  settlementDate: string
  amountToEncumber: number
}

export class CoveredReceivable extends Entity<Props> {
  get accreditorCnpj(): string {
    return this.props.accreditorCnpj
  }

  set accreditorCnpj(value: string) {
    this.props.accreditorCnpj = value
  }

  get finalRecipientUserDocument(): string {
    return this.props.finalRecipientUserDocument
  }

  set finalRecipientUserDocument(value: string) {
    this.props.finalRecipientUserDocument = value
  }

  get paymentArrangementCode(): string {
    return this.props.paymentArrangementCode
  }

  set paymentArrangementCode(value: string) {
    this.props.paymentArrangementCode = value
  }

  get settlementDate(): string {
    return this.props.settlementDate
  }

  set settlementDate(value: string) {
    this.props.settlementDate = value
  }

  get amountToEncumber(): number {
    return this.props.amountToEncumber
  }

  set amountToEncumber(value: number) {
    this.props.amountToEncumber = value
  }

  static create(props: Props, id?: UniqueEntityID): CoveredReceivable {
    return new CoveredReceivable(
      {
        ...props,
      },
      id,
    )
  }
}
