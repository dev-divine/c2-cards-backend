import { Entity } from '@core/domain/entities/entity'
import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import { Optional } from '@core/domain/types/opcional'

import { DistributionResult } from '@modules/contract/entities/distribution-result'

interface Props {
  externalCode: string
  contractIdentifier: string
  contractStatus?: string
  debtorContractDocument: string
  participantCnpj: string
  holderDocument: string
  contractEffectType: number
  outstandingBalanceOrLimit: number
  minimumValueToBeMaintained: number
  signatureDate: string
  expirationDate: string
  divisionRule: number
  createdAt: Date
  updatedAt?: Date
  deletedAt?: Date

  distributionResult?: DistributionResult
}

export class Contract extends Entity<Props> {
  get externalCode(): string {
    return this.props.externalCode
  }

  set externalCode(value: string) {
    this.props.externalCode = value
  }

  get contractIdentifier(): string {
    return this.props.contractIdentifier
  }

  set contractIdentifier(value: string) {
    this.props.contractIdentifier = value
  }

  get contractStatus(): string | undefined {
    return this.props.contractStatus
  }

  set contractStatus(value: string | undefined) {
    this.props.contractStatus = value
  }

  get debtorContractDocument(): string {
    return this.props.debtorContractDocument
  }

  set debtorContractDocument(value: string) {
    this.props.debtorContractDocument = value
  }

  get participantCnpj(): string {
    return this.props.participantCnpj
  }

  set participantCnpj(value: string) {
    this.props.participantCnpj = value
  }

  get holderDocument(): string {
    return this.props.holderDocument
  }

  set holderDocument(value: string) {
    this.props.holderDocument = value
  }

  get contractEffectType(): number {
    return this.props.contractEffectType
  }

  set contractEffectType(value: number) {
    this.props.contractEffectType = value
  }

  get outstandingBalanceOrLimit(): number {
    return this.props.outstandingBalanceOrLimit
  }

  set outstandingBalanceOrLimit(value: number) {
    this.props.outstandingBalanceOrLimit = value
  }

  get minimumValueToBeMaintained(): number {
    return this.props.minimumValueToBeMaintained
  }

  set minimumValueToBeMaintained(value: number) {
    this.props.minimumValueToBeMaintained = value
  }

  get signatureDate(): string {
    return this.props.signatureDate
  }

  set signatureDate(value: string) {
    this.props.signatureDate = value
  }

  get expirationDate(): string {
    return this.props.expirationDate
  }

  set expirationDate(value: string) {
    this.props.expirationDate = value
  }

  get divisionRule(): number {
    return this.props.divisionRule
  }

  set divisionRule(value: number) {
    this.props.divisionRule = value
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

  get distributionResult(): DistributionResult | undefined {
    return this.props.distributionResult
  }

  set distributionResult(value: DistributionResult | undefined) {
    this.props.distributionResult = value
  }

  static create(
    props: Optional<Props, 'createdAt' | 'distributionResult'>,
    id?: UniqueEntityID,
  ): Contract {
    return new Contract(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
  }
}
