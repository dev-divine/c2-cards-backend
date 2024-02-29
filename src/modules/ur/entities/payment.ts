import { Entity } from '@core/domain/entities/entity'
import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'

interface Props {
  holderDomicileDocument: string
  accountType: string
  compe: string
  ispb: string
  agency: string
  accountNumber: string
}

export class Payment extends Entity<Props> {
  get holderDomicileDocument(): string {
    return this.props.holderDomicileDocument
  }

  set holderDomicileDocument(value: string) {
    this.props.holderDomicileDocument = value
  }

  get accountType(): string {
    return this.props.accountType
  }

  set accountType(value: string) {
    this.props.accountType = value
  }

  get compe(): string {
    return this.props.compe
  }

  set compe(value: string) {
    this.props.compe = value
  }

  get ispb(): string {
    return this.props.ispb
  }

  set ispb(value: string) {
    this.props.ispb = value
  }

  get agency(): string {
    return this.props.agency
  }

  set agency(value: string) {
    this.props.agency = value
  }

  get accountNumber(): string {
    return this.props.accountNumber
  }

  set accountNumber(value: string) {
    this.props.accountNumber = value
  }

  static create(props: Props, id?: UniqueEntityID): Payment {
    return new Payment(
      {
        ...props,
      },
      id,
    )
  }
}
