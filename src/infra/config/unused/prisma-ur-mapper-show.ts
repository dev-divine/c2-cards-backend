// import {
//   CoveredReceivable as RawCoveredReceivable,
//   ReceivableUnit as RawReceivableUnit,
//   UR as RawUR,
// } from '@prisma/client'

// import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'

// import { CoveredReceivable } from '@modules/ur/entities/covered-receivable-show'
// import { ReceivableUnit } from '@modules/ur/entities/receivable-unit-show'
// import { URShow } from '@modules/ur/entities/ur-show'

// type ExtendedRawReceivableUnit = RawReceivableUnit & {
//   covered_receivables?: RawCoveredReceivable[]
// }

// type ExtendedRawUR = RawUR & {
//   receivables_units_definition?: ExtendedRawReceivableUnit[]
// }

// export class PrismaURMapperShow {
//   static toPrisma(ur: URShow) {
//     return {
//       id: ur.id,
//       external_code: ur.externalCode,
//       external_contract_code: ur.externalContractCode,
//       contract_identifier: ur.contractIdentifier,
//       receivables_units_definition: {
//         create: ur.receivablesUnitsDefinition.map((ru) => ({
//           id: ru.id,
//           holder_document: ru.holderDocument,
//           division_rule: ru.divisionRule,
//           definition_status: ru.definitionStatus,
//           commitment_status: ru.commitmentStatus,
//           covered_receivables: {
//             create: ru.coveredReceivables.map((cr) => ({
//               id: cr.id,
//               registrar_cnpj: cr.registrarCnpj,
//               accreditor_cnpj: cr.accreditorCnpj,
//               contract_effect_identifier: cr.contractEffectIdentifier,
//               final_recipient_user_document: cr.finalRecipientUserDocument,
//               payment_arrangement_code: cr.paymentArrangementCode,
//               constitution_status: cr.constitutionStatus,
//               settlement_date: cr.settlementDate,
//               requested_effect_value: cr.requestedEffectValue,
//               committed_effect_value: cr.committedEffectValue,
//               queue_value: cr.queueValue,
//               commitment_order: cr.commitmentOrder,
//               total_constituted_value: cr.totalConstitutedValue,
//               pre_contracted_value: cr.preContractedValue,
//               free_balance: cr.freeBalance,
//               blocked_value: cr.blockedValue,
//               receivable_unit_id: cr.receivableUnitId,
//             })),
//           },
//         })),
//       },
//     }
//   }

//   static toDomain(raw: ExtendedRawUR): URShow {
//     const receivablesUnitsDefinition = raw.receivables_units_definition
//       ? raw.receivables_units_definition?.map((ru) =>
//           ReceivableUnit.create(
//             {
//               urId: ru.ur_id,
//               holderDocument: ru.holder_document,
//               divisionRule: ru.division_rule,
//               definitionStatus: ru.definition_status,
//               commitmentStatus: ru.commitment_status,
//               createdAt: new Date(ru.created_at),
//               updatedAt: ru.updated_at ? new Date(ru.updated_at) : undefined,
//               deletedAt: ru.deleted_at ? new Date(ru.deleted_at) : undefined,
//               coveredReceivables: ru.covered_receivables
//                 ? ru.covered_receivables?.map((cr) =>
//                     CoveredReceivable.create(
//                       {
//                         registrarCnpj: cr.registrar_cnpj,
//                         accreditorCnpj: cr.accreditor_cnpj,
//                         contractEffectIdentifier: cr.contract_effect_identifier,
//                         finalRecipientUserDocument:
//                           cr.final_recipient_user_document,
//                         paymentArrangementCode: cr.payment_arrangement_code,
//                         constitutionStatus: cr.constitution_status,
//                         settlementDate: new Date(cr.settlement_date),
//                         requestedEffectValue: cr.requested_effect_value,
//                         committedEffectValue: cr.committed_effect_value,
//                         queueValue: cr.queue_value,
//                         commitmentOrder: cr.commitment_order,
//                         totalConstitutedValue: cr.total_constituted_value,
//                         preContractedValue: cr.pre_contracted_value,
//                         freeBalance: cr.free_balance,
//                         blockedValue: cr.blocked_value,
//                         receivableUnitId: cr.receivable_unit_id,
//                         createdAt: cr.created_at
//                           ? new Date(cr.created_at)
//                           : new Date(),
//                         updatedAt: cr.updated_at
//                           ? new Date(cr.updated_at)
//                           : undefined,
//                         deletedAt: cr.deleted_at
//                           ? new Date(cr.deleted_at)
//                           : undefined,
//                       },
//                       new UniqueEntityID(cr.id),
//                     ),
//                   )
//                 : [],
//             },
//             new UniqueEntityID(ru.id),
//           ),
//         )
//       : []

//     return URShow.create(
//       {
//         externalCode: raw.external_code,
//         externalContractCode: raw.external_contract_code,
//         contractIdentifier: raw.contract_identifier,
//         receivablesUnitsDefinition,
//         createdAt: new Date(raw.created_at),
//         updatedAt: raw.updated_at ? new Date(raw.updated_at) : undefined,
//         deletedAt: raw.deleted_at ? new Date(raw.deleted_at) : undefined,
//       },
//       new UniqueEntityID(raw.id),
//     )
//   }
// }
