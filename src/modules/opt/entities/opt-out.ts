import { Entity } from '@core/domain/entities/entity'
import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import { Optional } from '@core/domain/types/opcional'

interface Props {
  ecClientName: string
  ecClientDocument: string
  externalCode: string
  c2cardsDocument: string
  responsibleName: string
  responsibleDocument: string
  responsibleEmail: string
  responsibleWhatsapp: string
  protocol: string
  createdAt: Date
  updatedAt?: Date
  deletedAt?: Date
}

export class OptOut extends Entity<Props> {
  get externalCode(): string {
    return this.props.externalCode
  }

  set externalCode(value: string) {
    this.props.externalCode = value
  }

  get ecClientName(): string {
    return this.props.ecClientName
  }

  set ecClientName(value: string) {
    this.props.ecClientName = value
  }

  get ecClientDocument(): string {
    return this.props.ecClientDocument
  }

  set ecClientDocument(value: string) {
    this.props.ecClientDocument = value
  }

  get c2cardsDocument(): string {
    return this.props.c2cardsDocument
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

  get protocol(): string {
    return this.props.protocol
  }

  set protocol(value: string) {
    this.props.protocol = value
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
  ): OptOut {
    return new OptOut(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
  }
}
