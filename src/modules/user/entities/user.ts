/* eslint-disable no-unused-vars */
import { Entity } from '@core/domain/entities/entity'
import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import { Optional } from '@core/domain/types/opcional'

export enum UserRole {
  SECRETARY = 'SECRETARY',
  DIRECTOR = 'DIRECTOR',
  DIVISION_HEAD = 'DIVISION_HEAD',
  USER = 'USER',
  
}

interface Props {
  name: string
  surname: string
  email: string
  document: string
  phone: string
  whatsapp: string
  job?: string
  role?: UserRole
  password: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

export class User extends Entity<Props> {
 
  get name(): string {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  get surname(): string {
    return this.props.surname
  }

  set surname(surname: string) {
    this.props.surname = surname
  }

  get email(): string {
    return this.props.email
  }

  set email(email: string) {
    this.props.email = email
  }

  get document(): string {
    return this.props.document
  }

  set document(document: string) {
    this.props.document = document
  }

  get phone(): string {
    return this.props.phone
  }

  set phone(phone: string) {
    this.props.phone = phone
  }

  get whatsapp(): string {
    return this.props.whatsapp
  }

  set whatsapp(whatsapp: string) {
    this.props.whatsapp = whatsapp
  }

  get job(): string | undefined {
    return this.props.job
  }

  set job(job: string | undefined) {
    this.props.job = job
  }

  get role(): UserRole | undefined {
    return this.props.role
  }

  set role(role: UserRole) {
    this.props.role = role
  }

  get password(): string {
    return this.props.password
  }

  set password(password: string) {
    this.props.password = password
  }

  get createdAt(): Date | undefined {
    return this.props.createdAt
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt
  }

  set updatedAt(updatedAt: Date) {
    this.props.updatedAt = updatedAt
  }

  get deletedAt(): Date | undefined {
    return this.props.deletedAt
  }

  set deletedAt(deletedAt: Date) {
    this.props.deletedAt = deletedAt
  }

  static create(
    props: Optional<Props, 'createdAt'>,
    id?: UniqueEntityID,
  ): User {
    const user = new User(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return user
  }
}
