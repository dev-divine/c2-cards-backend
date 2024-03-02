// import { FastifyReply, FastifyRequest } from 'fastify'
// import { z } from 'zod'

// import { zodStringParser } from '@core/utils/custom-zod-error'

// import { makeFetchOnlineScheduleUseCase } from '@modules/schedule/use-cases/factories/make-fetch-online-schedule'

// const bodySchema = z.object({
//   originator_document: z.string(zodStringParser('CPF/CNPJ do estabelecimento')),
//   financier_cnpj: z.string(zodStringParser('CNPJ do agente financeiro')),
//   accreditor_cnpj: z.string(zodStringParser('CNPJ da credenciadora')),
//   payment_arrangement_code: z.string(
//     zodStringParser('código do arranjo de pagamento'),
//   ),
//   start_date: z.string(zodStringParser('data de início')),
//   end_date: z.string(zodStringParser('data de fim')),
// })

// export async function fetchOnlineSchedule(
//   request: FastifyRequest,
//   reply: FastifyReply,
// ) {
//   const {
//     originator_document: originatorDocument,
//     financier_cnpj: financierCnpj,
//     accreditor_cnpj: accreditorCnpj,
//     payment_arrangement_code: paymentArrangementCode,
//     start_date: startDate,
//     end_date: endDate,
//   } = bodySchema.parse(request.body)

//   const fetchOnlineScheduleUseCase = makeFetchOnlineScheduleUseCase()

//   await fetchOnlineScheduleUseCase.execute({
//     originatorDocument,
//     financierCnpj,
//     accreditorCnpj,
//     paymentArrangementCode,
//     startDate,
//     endDate,
//   })

//   return reply.status(201).send()
// }
