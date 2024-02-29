import { Entity } from '@core/domain/entities/entity'
import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import { Optional } from '@core/domain/types/opcional'

import { CoveredReceivable } from '@modules/ur/entities/covered-receivable'
import { Payment } from '@modules/ur/entities/payment'

interface Props {
  externalCode: string
  externalContractCode: string
  contractIdentifier: string
  holderDocument: string
  createdAt: Date
  updatedAt?: Date
  deletedAt?: Date

  coveredReceivables: CoveredReceivable[]
  payment: Payment
}

export class UR extends Entity<Props> {
  get externalCode(): string {
    return this.props.externalCode
  }

  set externalCode(value: string) {
    this.props.externalCode = value
  }

  get externalContractCode(): string {
    return this.props.externalContractCode
  }

  set externalContractCode(value: string) {
    this.props.externalContractCode = value
  }

  get contractIdentifier(): string {
    return this.props.contractIdentifier
  }

  set contractIdentifier(value: string) {
    this.props.contractIdentifier = value
  }

  get holderDocument(): string {
    return this.props.holderDocument
  }

  set holderDocument(value: string) {
    this.props.holderDocument = value
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt
  }

  set updatedAt(value: Date | undefined) {
    this.props.updatedAt = value
  }

  get deletedAt(): Date | undefined {
    return this.props.deletedAt
  }

  set deletedAt(value: Date | undefined) {
    this.props.deletedAt = value
  }

  get coveredReceivables(): CoveredReceivable[] {
    return this.props.coveredReceivables
  }

  set coveredReceivables(value: CoveredReceivable[]) {
    this.props.coveredReceivables = value
  }

  get payment(): Payment {
    return this.props.payment
  }

  set payment(value: Payment) {
    this.props.payment = value
  }

  static create(props: Optional<Props, 'createdAt'>, id?: UniqueEntityID): UR {
    return new UR(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
  }
}
