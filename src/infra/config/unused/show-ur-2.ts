// import { FastifyReply, FastifyRequest } from 'fastify'

// import { querySchema } from '@core/utils/zod-pagination-query-schema'

// import { makeShowURUseCase } from '@infra/config/unused/make-show-ur'
// import { CitizenViewModel } from '@modules/citizen/http/view-models/citizen-view-model'

// export async function showUr(request: FastifyRequest, reply: FastifyReply) {
//   const { page, per_page: perPage } = querySchema.parse(request.query)

//   const showURUseCase = makeShowURUseCase()

//   const { ecClients, totalPages } = await showURUseCase.execute({
//     page,
//     perPage,
//   })

//   return reply.status(200).send({
//     citizens:
//       citizens?.map((citizen) => CitizenViewModel.toHTTP(citizen)) ?? [],
//     totalPages,
//   })
// }
