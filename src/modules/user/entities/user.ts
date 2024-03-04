import { Entity } from '@core/domain/entities/entity'
import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import { Optional } from '@core/domain/types/opcional'

export enum Role {
  DASHBOARD = 'DASHBOARD',
  CLIENTE_EC = 'CLIENTE_EC',
  OPT_IN = 'OPT_IN',
  RECEBIVEIS = 'RECEBIVEIS',
  URS = 'URS',
  ANTECIPACOES = 'ANTECIPACOES',
  USUARIOS = 'USUARIOS',
  NOTA_COMERCIAL = 'NOTA_COMERCIAL',
  SIMULACAO = 'SIMULACAO',
  ASSINATURAS = 'ASSINATURAS',
}

interface Props {
  name: string
  document: string
  email: string
  phone: string
  whatsapp: string
  job: string
  role: Role
  password: string
  accessLevel: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

export class User extends Entity<Props> {
  get name(): string {
    return this.props.name
  }

  set name(value: string) {
    this.props.name = value
  }

  get document(): string {
    return this.props.document
  }

  set document(value: string) {
    this.props.document = value
  }

  get email(): string {
    return this.props.email
  }

  set email(value: string) {
    this.props.email = value
  }

  get phone(): string {
    return this.props.phone
  }

  set phone(value: string) {
    this.props.phone = value
  }

  get whatsapp(): string {
    return this.props.whatsapp
  }

  set whatsapp(value: string) {
    this.props.whatsapp = value
  }

  get job(): string {
    return this.props.job
  }

  set job(value: string) {
    this.props.job = value
  }

  get role(): Role {
    return this.props.role
  }

  set role(value: Role) {
    this.props.role = value
  }

  get password(): string {
    return this.props.password
  }

  set password(value: string) {
    this.props.password = value
  }

  get accessLevel(): string {
    return this.props.accessLevel
  }

  set accessLevel(value: string) {
    this.props.accessLevel = value
  }

  get createdAt(): Date | undefined {
    return this.props.createdAt
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

  set deletedAt(value: Date) {
    this.props.deletedAt = value
  }

  static create(
    props: Optional<Props, 'accessLevel' | 'createdAt' | 'updatedAt'>,
    id?: UniqueEntityID,
  ): User {
    return new User(
      {
        ...props,
        accessLevel: props.accessLevel ?? 'Agente financeiro',
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
      },
      id,
    )
  }
}
