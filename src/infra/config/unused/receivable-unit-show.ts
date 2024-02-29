// import { Entity } from '@core/domain/entities/entity'
// import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
// import { Optional } from '@core/domain/types/opcional'

// import { CoveredReceivable } from '@infra/config/unused/covered-receivable-show'

// interface Props {
//   urId: string
//   holderDocument: string
//   divisionRule: string
//   definitionStatus: string
//   commitmentStatus: string
//   createdAt: Date
//   updatedAt?: Date
//   deletedAt?: Date

//   coveredReceivables: CoveredReceivable[]
// }

// export class ReceivableUnit extends Entity<Props> {
//   get urId(): string {
//     return this.props.urId
//   }

//   set urId(value: string) {
//     this.props.urId = value
//   }

//   get holderDocument(): string {
//     return this.props.holderDocument
//   }

//   set holderDocument(value: string) {
//     this.props.holderDocument = value
//   }

//   get divisionRule(): string {
//     return this.props.divisionRule
//   }

//   set divisionRule(value: string) {
//     this.props.divisionRule = value
//   }

//   get definitionStatus(): string {
//     return this.props.definitionStatus
//   }

//   set definitionStatus(value: string) {
//     this.props.definitionStatus = value
//   }

//   get commitmentStatus(): string {
//     return this.props.commitmentStatus
//   }

//   set commitmentStatus(value: string) {
//     this.props.commitmentStatus = value
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

//   get coveredReceivables(): CoveredReceivable[] {
//     return this.props.coveredReceivables
//   }

//   set coveredReceivables(value: CoveredReceivable[]) {
//     this.props.coveredReceivables = value
//   }

//   static create(
//     props: Optional<Props, 'deletedAt'>,
//     id?: UniqueEntityID,
//   ): ReceivableUnit {
//     return new ReceivableUnit(
//       {
//         ...props,
//         createdAt: props.createdAt ?? new Date(),
//       },
//       id,
//     )
//   }
// }
