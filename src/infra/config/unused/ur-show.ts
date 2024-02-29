// import { Entity } from '@core/domain/entities/entity'
// import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
// import { Optional } from '@core/domain/types/opcional'

// import { ReceivableUnit } from '@infra/config/unused/receivable-unit-show'

// interface Props {
//   externalCode: string
//   externalContractCode: string
//   contractIdentifier: string
//   createdAt: Date
//   updatedAt?: Date
//   deletedAt?: Date

//   receivablesUnitsDefinition: ReceivableUnit[]
// }

// export class URShow extends Entity<Props> {
//   get externalCode(): string {
//     return this.props.externalCode
//   }

//   set externalCode(value: string) {
//     this.props.externalCode = value
//   }

//   get externalContractCode(): string {
//     return this.props.externalContractCode
//   }

//   set externalContractCode(value: string) {
//     this.props.externalContractCode = value
//   }

//   get contractIdentifier(): string {
//     return this.props.contractIdentifier
//   }

//   set contractIdentifier(value: string) {
//     this.props.contractIdentifier = value
//   }

//   get createdAt(): Date {
//     return this.props.createdAt
//   }

//   get updatedAt(): Date | undefined {
//     return this.props.updatedAt
//   }

//   set updatedAt(value: Date | undefined) {
//     this.props.updatedAt = value
//   }

//   get deletedAt(): Date | undefined {
//     return this.props.deletedAt
//   }

//   set deletedAt(value: Date | undefined) {
//     this.props.deletedAt = value
//   }

//   get receivablesUnitsDefinition(): ReceivableUnit[] {
//     return this.props.receivablesUnitsDefinition
//   }

//   set receivablesUnitsDefinition(value: ReceivableUnit[]) {
//     this.props.receivablesUnitsDefinition = value
//   }

//   static create(
//     props: Optional<Props, 'createdAt'>,
//     id?: UniqueEntityID,
//   ): URShow {
//     return new URShow(
//       {
//         ...props,
//         createdAt: props.createdAt ?? new Date(),
//       },
//       id,
//     )
//   }
// }
