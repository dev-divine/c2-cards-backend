import { Entity } from '@core/domain/entities/entity'
import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import { Optional } from '@core/domain/types/opcional'

interface Props {
  scheduleProtocol: string
  requestStatus: string
  originatorDocument: string
  financierCnpj: string
  accreditorCnpj: string
  paymentArrangementCode: string
  startDate: string
  endDate: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

export class OnlineSchedule extends Entity<Props> {
  get scheduleProtocol(): string {
    return this.props.scheduleProtocol
  }

  set scheduleProtocol(value: string) {
    this.props.scheduleProtocol = value
  }

  get requestStatus(): string {
    return this.props.requestStatus
  }

  set requestStatus(value: string) {
    this.props.requestStatus = value
  }

  get originatorDocument(): string {
    return this.props.originatorDocument
  }

  set originatorDocument(value: string) {
    this.props.originatorDocument = value
  }

  get financierCnpj(): string {
    return this.props.financierCnpj
  }

  set financierCnpj(value: string) {
    this.props.financierCnpj = value
  }

  get accreditorCnpj(): string {
    return this.props.accreditorCnpj
  }

  set accreditorCnpj(value: string) {
    this.props.accreditorCnpj = value
  }

  get paymentArrangementCode(): string {
    return this.props.paymentArrangementCode
  }

  set paymentArrangementCode(value: string) {
    this.props.paymentArrangementCode = value
  }

  get startDate(): string {
    return this.props.startDate
  }

  set startDate(value: string) {
    this.props.startDate = value
  }

  get endDate(): string {
    return this.props.endDate
  }

  set endDate(value: string) {
    this.props.endDate = value
  }

  get createdAt(): Date | undefined {
    return this.props.createdAt
  }

  set createdAt(value: Date | undefined) {
    this.props.createdAt = value
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt
  }

  set updatedAt(value: Date) {
    this.props.updatedAt = value
  }

  get deletedAt(): Date | undefined {
    return this.props.deletedAt
  }

  set deletedAt(value: Date | undefined) {
    this.props.deletedAt = value
  }

  static create(
    props: Optional<Props, 'createdAt'>,
    id?: UniqueEntityID,
  ): OnlineSchedule {
    return new OnlineSchedule(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
  }
}
