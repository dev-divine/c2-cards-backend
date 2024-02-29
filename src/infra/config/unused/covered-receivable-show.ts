// import { Entity } from '@core/domain/entities/entity'
// import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
// import { Optional } from '@core/domain/types/opcional'

// interface Props {
//   registrarCnpj: string
//   accreditorCnpj: string
//   contractEffectIdentifier: string
//   finalRecipientUserDocument: string
//   paymentArrangementCode: string
//   constitutionStatus: string
//   settlementDate: Date
//   requestedEffectValue: number
//   committedEffectValue: number
//   queueValue: number
//   commitmentOrder: number
//   totalConstitutedValue: number
//   preContractedValue: number
//   freeBalance: number
//   blockedValue: number
//   receivableUnitId: string
//   createdAt: Date
//   updatedAt?: Date
//   deletedAt?: Date
// }

// export class CoveredReceivable extends Entity<Props> {
//   get registrarCnpj(): string {
//     return this.props.registrarCnpj
//   }

//   set registrarCnpj(value: string) {
//     this.props.registrarCnpj = value
//   }

//   get accreditorCnpj(): string {
//     return this.props.accreditorCnpj
//   }

//   set accreditorCnpj(value: string) {
//     this.props.accreditorCnpj = value
//   }

//   get contractEffectIdentifier(): string {
//     return this.props.contractEffectIdentifier
//   }

//   set contractEffectIdentifier(value: string) {
//     this.props.contractEffectIdentifier = value
//   }

//   get finalRecipientUserDocument(): string {
//     return this.props.finalRecipientUserDocument
//   }

//   set finalRecipientUserDocument(value: string) {
//     this.props.finalRecipientUserDocument = value
//   }

//   get paymentArrangementCode(): string {
//     return this.props.paymentArrangementCode
//   }

//   set paymentArrangementCode(value: string) {
//     this.props.paymentArrangementCode = value
//   }

//   get constitutionStatus(): string {
//     return this.props.constitutionStatus
//   }

//   set constitutionStatus(value: string) {
//     this.props.constitutionStatus = value
//   }

//   get settlementDate(): Date {
//     return this.props.settlementDate
//   }

//   set settlementDate(value: Date) {
//     this.props.settlementDate = value
//   }

//   get requestedEffectValue(): number {
//     return this.props.requestedEffectValue
//   }

//   set requestedEffectValue(value: number) {
//     this.props.requestedEffectValue = value
//   }

//   get committedEffectValue(): number {
//     return this.props.committedEffectValue
//   }

//   set committedEffectValue(value: number) {
//     this.props.committedEffectValue = value
//   }

//   get queueValue(): number {
//     return this.props.queueValue
//   }

//   set queueValue(value: number) {
//     this.props.queueValue = value
//   }

//   get commitmentOrder(): number {
//     return this.props.commitmentOrder
//   }

//   set commitmentOrder(value: number) {
//     this.props.commitmentOrder = value
//   }

//   get totalConstitutedValue(): number {
//     return this.props.totalConstitutedValue
//   }

//   set totalConstitutedValue(value: number) {
//     this.props.totalConstitutedValue = value
//   }

//   get preContractedValue(): number {
//     return this.props.preContractedValue
//   }

//   set preContractedValue(value: number) {
//     this.props.preContractedValue = value
//   }

//   get freeBalance(): number {
//     return this.props.freeBalance
//   }

//   set freeBalance(value: number) {
//     this.props.freeBalance = value
//   }

//   get blockedValue(): number {
//     return this.props.blockedValue
//   }

//   set blockedValue(value: number) {
//     this.props.blockedValue = value
//   }

//   get receivableUnitId(): string {
//     return this.props.receivableUnitId
//   }

//   set receivableUnitId(value: string) {
//     this.props.receivableUnitId = value
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

//   static create(
//     props: Optional<Props, 'createdAt'>,
//     id?: UniqueEntityID,
//   ): CoveredReceivable {
//     return new CoveredReceivable(
//       {
//         ...props,
//         createdAt: props.createdAt ?? new Date(),
//       },
//       id,
//     )
//   }
// }
