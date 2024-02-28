import { Entity } from '@core/domain/entities/entity'
import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import { Optional } from '@core/domain/types/opcional'

import { env } from '@infra/env'

interface Props {
  ecClientName: string
  ecClientDocument: string
  externalCode?: string
  c2cardsDocument: string
  responsibleName: string
  responsibleDocument: string
  responsibleEmail: string
  responsibleWhatsapp: string
  protocol: string
  processingProtocol?: string
  processingDateTime?: Date
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
}

export class OptOut extends Entity<Props> {
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

  get externalCode(): string | undefined {
    return this.props.externalCode
  }

  set externalCode(value: string | undefined) {
    this.props.externalCode = value
  }

  get c2cardsDocument(): string {
    return this.props.c2cardsDocument
  }

  set c2cardsDocument(value: string) {
    this.props.c2cardsDocument = value
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

  get processingProtocol(): string | undefined {
    return this.props.processingProtocol
  }

  set processingProtocol(value: string | undefined) {
    this.props.processingProtocol = value
  }

  get processingDateTime(): Date | undefined {
    return this.props.processingDateTime
  }

  set processingDateTime(value: Date | undefined) {
    this.props.processingDateTime = value
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get updatedAt(): Date {
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
    props: Optional<Props, 'createdAt' | 'updatedAt' | 'c2cardsDocument'>,
    id?: UniqueEntityID,
  ): OptOut {
    return new OptOut(
      {
        ...props,
        c2cardsDocument: props.c2cardsDocument || env.C2_CARDS_DOCUMENT,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
      },
      id,
    )
  }
}
