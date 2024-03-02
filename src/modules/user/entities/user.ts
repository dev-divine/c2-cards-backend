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
  sportsFacilityId?: string
  name: string
  email: string
  document: string
  phone: string
  password: string
  position?: string
  job?: string
  role?: UserRole
  lastRent?: Date
  numberOfRentals?: number

  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

export class User extends Entity<Props> {
  get sportsFacilityId(): string | undefined {
    return this.props.sportsFacilityId
  }

  set sportsFacilityId(sportsFacilityId: string | undefined) {
    this.props.sportsFacilityId = sportsFacilityId
  }

  get name(): string {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
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

  get password(): string {
    return this.props.password
  }

  set password(password: string) {
    this.props.password = password
  }

  get position(): string | undefined {
    return this.props.position
  }

  set position(position: string | undefined) {
    this.props.position = position
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

  get lastRent(): Date | undefined {
    return this.props.lastRent
  }

  set lastRent(lastRent: Date) {
    this.props.lastRent = lastRent
  }

  get numberOfRentals(): number | undefined {
    return this.props.numberOfRentals
  }

  set numberOfRentals(numberOfRentals: number) {
    this.props.numberOfRentals = numberOfRentals
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
