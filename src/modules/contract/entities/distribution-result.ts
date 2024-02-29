import { Entity } from '@core/domain/entities/entity'
import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import { Optional } from '@core/domain/types/opcional'

interface Props {
  contractId: string
  affectedReceivablesUnitsQuantity: number
  affectedReceivablesUnitsValue: number
  commitmentSituation: string
  createdAt: Date
  updatedAt?: Date
  deletedAt?: Date
}

export class DistributionResult extends Entity<Props> {
  get contractId(): string {
    return this.props.contractId
  }

  set contractId(value: string) {
    this.props.contractId = value
  }

  get affectedReceivablesUnitsQuantity(): number {
    return this.props.affectedReceivablesUnitsQuantity
  }

  set affectedReceivablesUnitsQuantity(value: number) {
    this.props.affectedReceivablesUnitsQuantity = value
  }

  get affectedReceivablesUnitsValue(): number {
    return this.props.affectedReceivablesUnitsValue
  }

  set affectedReceivablesUnitsValue(value: number) {
    this.props.affectedReceivablesUnitsValue = value
  }

  get commitmentSituation(): string {
    return this.props.commitmentSituation
  }

  set commitmentSituation(value: string) {
    this.props.commitmentSituation = value
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

  static create(
    props: Optional<Props, 'createdAt'>,
    id?: UniqueEntityID,
  ): DistributionResult {
    return new DistributionResult(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
  }
}
