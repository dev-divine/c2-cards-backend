import { Entity } from '@core/domain/entities/entity'
import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import { Optional } from '@core/domain/types/opcional'

interface ECClientProps {
  userId?: string
  companyName: string
  companyDocument: string
  companyEmail: string
  companyPhone: string
  companyZipCode: string
  companyState: string
  companyCity: string
  companyStreet: string
  companyNumber: string
  companyComplement?: string
  responsibleName: string
  responsibleDocument: string
  responsibleEmail: string
  responsibleWhatsapp: string
  zipCode: string
  state: string
  city: string
  street: string
  number: string
  complement?: string
  profile?: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

export class ECClient extends Entity<ECClientProps> {
  get userId(): string | undefined {
    return this.props.userId
  }

  set userId(value: string | undefined) {
    this.props.userId = value
  }

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

  get companyEmail(): string {
    return this.props.companyEmail
  }

  set companyEmail(value: string) {
    this.props.companyEmail = value
  }

  get companyPhone(): string {
    return this.props.companyPhone
  }

  set companyPhone(value: string) {
    this.props.companyPhone = value
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

  get responsibleName(): string {
    return this.props.responsibleName
  }

  set responsibleName(value: string) {
    this.props.responsibleName = value
  }

  get responsibleDocument(): string {
    return this.props.responsibleDocument
  }

  set responsibleDocument(value: string) {
    this.props.responsibleDocument = value
  }

  get responsibleEmail(): string {
    return this.props.responsibleEmail
  }

  set responsibleEmail(value: string) {
    this.props.responsibleEmail = value
  }

  get responsibleWhatsapp(): string {
    return this.props.responsibleWhatsapp
  }

  set responsibleWhatsapp(value: string) {
    this.props.responsibleWhatsapp = value
  }

  get zipCode(): string {
    return this.props.zipCode
  }

  set zipCode(value: string) {
    this.props.zipCode = value
  }

  get state(): string {
    return this.props.state
  }

  set state(value: string) {
    this.props.state = value
  }

  get city(): string {
    return this.props.city
  }

  set city(value: string) {
    this.props.city = value
  }

  get street(): string {
    return this.props.street
  }

  set street(value: string) {
    this.props.street = value
  }

  get number(): string {
    return this.props.number
  }

  set number(value: string) {
    this.props.number = value
  }

  get complement(): string | undefined {
    return this.props.complement
  }

  set complement(value: string | undefined) {
    this.props.complement = value
  }

  get profile(): string | undefined {
    return this.props.profile
  }

  set profile(value: string | undefined) {
    this.props.profile = value
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
    props: Optional<ECClientProps, 'createdAt' | 'profile'>,
    id?: UniqueEntityID,
  ): ECClient {
    return new ECClient(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        profile: props.profile ?? 'Cliente E.C.',
      },
      id,
    )
  }
}
