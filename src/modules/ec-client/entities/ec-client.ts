import { Entity } from '@core/domain/entities/entity'
import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import { Optional } from '@core/domain/types/opcional'

interface Props {
  companyName: string
  companyDocument: string
  companyPhone: string
  companyEmail: string
  companyZipCode: string
  companyState: string
  companyCity: string
  companyNeighborhood: string
  companyStreet: string
  companyNumber: string
  companyComplement?: string
  responsibleName?: string
  responsibleEmail?: string
  responsiblePhone?: string
  responsibleDocument?: string
  responsibleZipCode?: string
  responsibleState?: string
  responsibleCity?: string
  responsibleNeighborhood?: string
  responsibleStreet?: string
  responsibleNumber?: string
  responsibleComplement?: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

export class EcClient extends Entity<Props> {
  get companyName(): string {
    return this.props.companyName
  }

  set companyName(value: string) {
    this.props.companyName = value
  }

  get companyDocument(): string {
    return this.props.companyDocument
  }

  set companyDocument(value: string) {
    this.props.companyDocument = value
  }

  get companyPhone(): string {
    return this.props.companyPhone
  }

  set companyPhone(value: string) {
    this.props.companyPhone = value
  }

  get companyEmail(): string {
    return this.props.companyEmail
  }

  set companyEmail(value: string) {
    this.props.companyEmail = value
  }

  get companyZipCode(): string {
    return this.props.companyZipCode
  }

  set companyZipCode(value: string) {
    this.props.companyZipCode = value
  }

  get companyState(): string {
    return this.props.companyState
  }

  set companyState(value: string) {
    this.props.companyState = value
  }

  get companyCity(): string {
    return this.props.companyCity
  }

  set companyCity(value: string) {
    this.props.companyCity = value
  }

  get companyNeighborhood(): string {
    return this.props.companyNeighborhood
  }

  set companyNeighborhood(value: string) {
    this.props.companyNeighborhood = value
  }

  get companyStreet(): string {
    return this.props.companyStreet
  }

  set companyStreet(value: string) {
    this.props.companyStreet = value
  }

  get companyNumber(): string {
    return this.props.companyNumber
  }

  set companyNumber(value: string) {
    this.props.companyNumber = value
  }

  get companyComplement(): string | undefined {
    return this.props.companyComplement
  }

  set companyComplement(value: string | undefined) {
    this.props.companyComplement = value
  }

  get responsibleName(): string | undefined {
    return this.props.responsibleName
  }

  set responsibleName(value: string | undefined) {
    this.props.responsibleName = value
  }

  get responsibleEmail(): string | undefined {
    return this.props.responsibleEmail
  }

  set responsibleEmail(value: string | undefined) {
    this.props.responsibleEmail = value
  }

  get responsiblePhone(): string | undefined {
    return this.props.responsiblePhone
  }

  set responsiblePhone(value: string | undefined) {
    this.props.responsiblePhone = value
  }

  get responsibleDocument(): string | undefined {
    return this.props.responsibleDocument
  }

  set responsibleDocument(value: string | undefined) {
    this.props.responsibleDocument = value
  }

  get responsibleZipCode(): string | undefined {
    return this.props.responsibleZipCode
  }

  set responsibleZipCode(value: string | undefined) {
    this.props.responsibleZipCode = value
  }

  get responsibleState(): string | undefined {
    return this.props.responsibleState
  }

  set responsibleState(value: string | undefined) {
    this.props.responsibleState = value
  }

  get responsibleCity(): string | undefined {
    return this.props.responsibleCity
  }

  set responsibleCity(value: string | undefined) {
    this.props.responsibleCity = value
  }

  get responsibleNeighborhood(): string | undefined {
    return this.props.responsibleNeighborhood
  }

  set responsibleNeighborhood(value: string | undefined) {
    this.props.responsibleNeighborhood = value
  }

  get responsibleStreet(): string | undefined {
    return this.props.responsibleStreet
  }

  set responsibleStreet(value: string | undefined) {
    this.props.responsibleStreet = value
  }

  get responsibleNumber(): string | undefined {
    return this.props.responsibleNumber
  }

  set responsibleNumber(value: string | undefined) {
    this.props.responsibleNumber = value
  }

  get responsibleComplement(): string | undefined {
    return this.props.responsibleComplement
  }

  set responsibleComplement(value: string | undefined) {
    this.props.responsibleComplement = value
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
    props: Optional<Props, 'createdAt' | 'updatedAt'>,
    id?: UniqueEntityID,
  ): EcClient {
    return new EcClient(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
      },
      id,
    )
  }
}
